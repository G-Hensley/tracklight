import { boardReducer, type BoardAction } from "../Store";
import type { BoardState, Id, Tag, StatusColumnName, Priority } from "../types";
import { expect, test } from 'vitest';

const id = (s: string) => s as Id;
const now = () => "2025-08-25";

const seed: BoardState = {
  project: { id: id("p1"), name: "Project 1", createdAt: now() },
  columns: [
    { id: id("col-1"), projectId: id("p1"), name: "Backlog" as StatusColumnName, position: 0 },
    { id: id("col-2"), projectId: id("p1"), name: "In Progress" as StatusColumnName, position: 1 },
  ],
  tickets: []
};

// Test for boardReducer hydrate action
test('HYDRATE action replaces the state', () => {
  const newState: BoardState = {
    project: { id: id("p2"), name: 'Project 2', createdAt: now() },
    columns: [],
    tickets: []
  };

  const action: BoardAction = { type: "HYDRATE", payload: { state: newState } };
  const result = boardReducer(seed, action);

  expect(result).toEqual(newState);
});

// Test for boardReducer add ticket action
test('ADD_TICKET action creates a new ticket', () => {
  const action: BoardAction = {
    type: "ADD_TICKET",
    payload: {
      title: "New Ticket",
      columnId: id("col-1"),
      priority: 'low',
      tags: ['bug' as Tag]
    }
  };

  const next = boardReducer(seed, action);

  expect(next.tickets).toHaveLength(1);
  const t = next.tickets[0];
  expect(t.title).toBe("New Ticket");
  expect(t.columnId).toBe(id("col-1"));
  expect(t.priority).toBe<Priority>("low");

  expect(next).not.toBe(seed);
  expect(seed.tickets).toHaveLength(0);
});

// Test for boardReducer update ticket action
test('UPDATE_TICKET action updates an existing ticket', () => {
  const added = boardReducer(seed, {
    type: "ADD_TICKET",
    payload: { title: "T1", columnId: id("col-1"), priority: "medium" }
  });
  const ticketId = added.tickets[0].id;
  const before = added.tickets[0];

  const next = boardReducer(added, {
    type: "UPDATE_TICKET",
    payload: { id: ticketId, patch: { title: "T1 updated" } }
  });

  const after = next.tickets.find(t => t.id === ticketId)!;

  expect(after.title).toBe("T1 updated");
  expect(after.priority).toBe("medium");
  expect(after).not.toBe(before);
})

test("MOVE_TICKET changes column (and optional index) correctly", () => {

  const s1 = boardReducer(seed, {
    type: "ADD_TICKET",
    payload: { title: "A", columnId: id("col-1"), priority: "low" }
  });
  const s2 = boardReducer(s1, {
    type: "ADD_TICKET",
    payload: { title: "B", columnId: id("col-1"), priority: "low" }
  });
  const a = s2.tickets.find(t => t.title === "A")!;

  const s3 = boardReducer(s2, {
    type: "MOVE_TICKET",
    payload: { id: a.id, toColumnId: id("col-2"), toIndex: 0 }
  });

  const movedA = s3.tickets.find(t => t.id === a.id)!;
  expect(movedA.columnId).toBe(id("col-2"));

  expect(s3).not.toBe(s2);
});

test("DELETE_TICKET removes the ticket", () => {
  const s1 = boardReducer(seed, {
    type: "ADD_TICKET",
    payload: { title: "X", columnId: id("col-1"), priority: "high" }
  });
  const idToDelete = s1.tickets[0].id;

  const s2 = boardReducer(s1, { type: "DELETE_TICKET", payload: { id: idToDelete } });
  expect(s2.tickets.find(t => t.id === idToDelete)).toBeUndefined();
  expect(s2.tickets).toHaveLength(0);
});

test("ADD_COLUMN appends at the end with correct position", () => {
  const s1 = boardReducer(seed, { type: "ADD_COLUMN", payload: { name: "Review", position: undefined } });
  expect(s1.columns).toHaveLength(3);
  const last = s1.columns[2];
  expect(last.name).toBe("Review");
  expect(last.position).toBe(2);
});