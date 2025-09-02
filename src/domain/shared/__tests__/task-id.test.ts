import { describe, expect, it } from "vitest";
import { TaskId } from "../task-id.value-object";

describe('TaskId Value Object', () => {
  describe('create()', () => {
    it('should generate a valid UUID', () => {
      const taskId = TaskId.create();
      expect(TaskId.isValidUUID(taskId.value)).toBe(true);
    });
  });
});