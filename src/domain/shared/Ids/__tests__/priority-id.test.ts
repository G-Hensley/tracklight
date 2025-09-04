import { describe, expect, it } from "vitest";
import { PriorityId } from "../priority-id.value-object";

describe('PriorityId Value Object', () => {

  describe('create()', () => {
    it('should generate a valid UUID', () => {
      const priorityId = PriorityId.create();
      expect(PriorityId.isValidUUID(priorityId.value)).toBe(true);
    });
  });

  describe('fromString()', () => {
    it('should accept valid UUID format', () => {
      const validUUID = '123e4567-e89b-12d3-a456-426614174000';
      const priorityId = PriorityId.fromString(validUUID);
      expect(priorityId.value).toBe(validUUID);
    });

    it('should reject invalid UUID format', () => {
      const invalidUUID = 'invalid-uuid-format';
      expect(() => PriorityId.fromString(invalidUUID)).toThrowError(`Invalid PriorityId: ${invalidUUID}`);
    });
  });

  describe('equals()', () => {
    it('should return true for equal PriorityIds', () => {
      const priorityId1 = PriorityId.fromString('123e4567-e89b-12d3-a456-426614174000');
      const priorityId2 = PriorityId.fromString('123e4567-e89b-12d3-a456-426614174000');
      expect(priorityId1.equals(priorityId2)).toBe(true);
    });

    it('should return false for different PriorityIds', () => {
      const priorityId1 = PriorityId.fromString('123e4567-e89b-12d3-a456-426614174000');
      const priorityId2 = PriorityId.fromString('123e4567-e89b-12d3-a456-426614174001');
      expect(priorityId1.equals(priorityId2)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      expect(() => PriorityId.fromString('')).toThrowError('Invalid PriorityId: ');
    });

    it('should handle null or undefined', () => {
      expect(() => PriorityId.fromString(null)).toThrowError('PriorityId cannot be null or undefined');
      expect(() => PriorityId.fromString(undefined)).toThrowError('PriorityId cannot be null or undefined');
    });

    it('should handle case sensitivity correctly', () => {
      const lowerCaseUUID = '123e4567-e89b-12d3-a456-426614174000';
      const upperCaseUUID = '123E4567-E89B-12D3-A456-426614174000';
      expect(PriorityId.fromString(lowerCaseUUID).equals(PriorityId.fromString(upperCaseUUID))).toBe(true);
    });

    it('should generate unique IDs', () => {
      const priorityId1 = PriorityId.create();
      const priorityId2 = PriorityId.create();
      expect(priorityId1.equals(priorityId2)).toBe(false);
    });
  });

});