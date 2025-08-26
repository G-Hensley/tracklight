import type { Priority, Id, ISODate, Tag, Ticket, StatusColumnName, BoardState } from "./types";

// Helpers
const uid = (): Id => (
  crypto?.randomUUID() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
) as Id;

const nowISO = (): ISODate => new Date().toISOString() as ISODate;

function insertAt<T>(arr: T[], index: number, item: T): T[] {
  const i = Math.max(0, Math.min(index, arr.length));
  return [...arr.slice(0, i), item, ...arr.slice(1)];
}

function normalizeColumnPositions(columns: BoardState["columns"]) {
  return columns
    .slice()
    .sort((a, b) => a.position - b.position)
    .map((c, i) => ({ ...c, position: i }));
}

// actions
export type BoardAction =
  | { type: 'ADD_TICKET'; payload: { title: string; columnId: Id; priority: Priority; assignee?: string; dueDate?: ISODate; tags?: Tag[]; description?: string } }
  | { type: 'UPDATE_TICKET'; payload: { id: Id; patch: Partial<Omit<Ticket,'id'|'projectId'>> } }
  | { type: 'MOVE_TICKET'; payload: { id: Id; toColumnId: Id; toIndex?: number } }
  | { type: 'DELETE_TICKET'; payload: { id: Id } }
  | { type: 'ADD_COLUMN'; payload: { name: StatusColumnName; position?: number } }
  | { type: 'REORDER_COLUMN'; payload: { id: Id; newPosition: number } }
  | { type: 'HYDRATE'; payload: { state: BoardState } };

// ---------- reducer ----------
export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'HYDRATE': {

      return action.payload.state;
    }

    case 'ADD_TICKET': {
      const { title, columnId, priority, assignee, dueDate, tags, description } = action.payload;

      // (optional) column existence guard; ignore if unknown
      const hasColumn = state.columns.some(c => c.id === columnId);
      if (!hasColumn) return state;

      const newTicket: Ticket = {
        id: uid(),
        projectId: state.project.id,
        columnId,
        title,
        description,
        priority,
        assignee,
        dueDate,
        tags: tags ?? [],
        createdAt: nowISO()
      };

      return {
        ...state,
        tickets: [...state.tickets, newTicket]
      };
    }

    case 'UPDATE_TICKET': {
      const { id, patch } = action.payload;
      const idx = state.tickets.findIndex(t => t.id === id);
      if (idx === -1) return state;

      const before = state.tickets[idx];
      const updated: Ticket = {
        ...before,
        ...patch,
        id: before.id,                 // never allow change
        projectId: before.projectId    // never allow change
      };

      const nextTickets = state.tickets.slice();
      nextTickets[idx] = updated;

      return { ...state, tickets: nextTickets };
    }

    case 'MOVE_TICKET': {
      const { id, toColumnId } = action.payload;
      const ticket = state.tickets.find(t => t.id === id);
      if (!ticket) return state;
      const hasColumn = state.columns.some(c => c.id === toColumnId);
      if (!hasColumn) return state;

      // Update columnId; (optional ordering by toIndex can be added later)
      const nextTickets = state.tickets.map(t =>
        t.id === id ? { ...t, columnId: toColumnId } : t
      );

      return { ...state, tickets: nextTickets };
    }

    case 'DELETE_TICKET': {
      const { id } = action.payload;
      const next = state.tickets.filter(t => t.id !== id);
      if (next.length === state.tickets.length) return state; // nothing removed
      return { ...state, tickets: next };
    }

    case 'ADD_COLUMN': {
      const { name, position } = action.payload;
      const newCol = {
        id: uid(),
        projectId: state.project.id,
        name,
        position: position ?? state.columns.length
      };

      const cols = position == null
        ? [...state.columns, newCol]
        : insertAt(state.columns, position, newCol);

      return { ...state, columns: normalizeColumnPositions(cols) };
    }

    case 'REORDER_COLUMN': {
      const { id, newPosition } = action.payload;
      const idx = state.columns.findIndex(c => c.id === id);
      if (idx === -1) return state;

      const col = state.columns[idx];
      const without = [...state.columns.slice(0, idx), ...state.columns.slice(idx + 1)];
      const inserted = insertAt(without, newPosition, col);

      return { ...state, columns: normalizeColumnPositions(inserted) };
    }

    default:
      return state;
  }
}