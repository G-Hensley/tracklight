import type { Priority, Id, ISODate, Tag, Ticket, StatusColumnName, BoardState } from "./types";

// actions
export type BoardAction =
  | { type: 'ADD_TICKET'; payload: { title: string; columnId: Id; priority: Priority; assignee?: string; dueDate?: ISODate; tags?: Tag[]; description?: string } }
  | { type: 'UPDATE_TICKET'; payload: { id: Id; patch: Partial<Omit<Ticket,'id'|'projectId'>> } }
  | { type: 'MOVE_TICKET'; payload: { id: Id; toColumnId: Id; toIndex?: number } }
  | { type: 'DELETE_TICKET'; payload: { id: Id } }
  | { type: 'ADD_COLUMN'; payload: { name: StatusColumnName; position?: number } }
  | { type: 'REORDER_COLUMN'; payload: { id: Id; newPosition: number } }
  | { type: 'HYDRATE'; payload: { state: BoardState } };

// reducer signature
export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  return action.type === 'HYDRATE' ? action.payload.state : state;
};