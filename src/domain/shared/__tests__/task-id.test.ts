import { describe, expect, it } from "vitest";
import { TaskId } from "../Ids/task-id.value-object";

describe('TaskId Value Object', () => {

  describe('create()', () => {
    it('should generate a valid UUID', () => {
      const taskId = TaskId.create();
      expect(TaskId.isValidUUID(taskId.value)).toBe(true);
    });
  });

  describe('fromString()', () => {
    it('should accept valid UUID format', () => {
      const validUUID = '123e4567-e89b-12d3-a456-426614174000';
      const taskId = TaskId.fromString(validUUID);
      expect(taskId.value).toBe(validUUID);
    });

    it('should reject invalid UUID format', () => {
      const invalidUUID = 'invalid-uuid-format';
      expect(() => TaskId.fromString(invalidUUID)).toThrowError(`Invalid TaskId: ${invalidUUID}`);
    });
  });

  describe('equals()', () => {
    it('should return true for equal TaskIds', () => {
      const taskId1 = TaskId.fromString('123e4567-e89b-12d3-a456-426614174000');
      const taskId2 = TaskId.fromString('123e4567-e89b-12d3-a456-426614174000');
      expect(taskId1.equals(taskId2)).toBe(true);
    });

    it('should return false for different TaskIds', () => {
      const taskId1 = TaskId.fromString('123e4567-e89b-12d3-a456-426614174000');
      const taskId2 = TaskId.fromString('123e4567-e89b-12d3-a456-426614174001');
      expect(taskId1.equals(taskId2)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      expect(() => TaskId.fromString('')).toThrowError('Invalid TaskId: ');
    });

    it('should handle null or undefined', () => {
      expect(() => TaskId.fromString(null)).toThrowError('TaskId cannot be null or undefined');
      expect(() => TaskId.fromString(undefined)).toThrowError('TaskId cannot be null or undefined');
    });

    it('should handle case sensitivity correctly', () => {
      const lowerCaseUUID = '123e4567-e89b-12d3-a456-426614174000';
      const upperCaseUUID = '123E4567-E89B-12D3-A456-426614174000';
      expect(TaskId.fromString(lowerCaseUUID).equals(TaskId.fromString(upperCaseUUID))).toBe(true);
    });

    it('should generate unique IDs', () => {
      const taskId1 = TaskId.create();
      const taskId2 = TaskId.create();
      expect(taskId1.equals(taskId2)).toBe(false);
    });
  });

});