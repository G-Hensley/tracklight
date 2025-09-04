import { describe, expect, it } from "vitest";
import { ProjectStatusId } from "../Ids/project-status.value-object";

describe('ProjectStatusId Value Object', () => {

  describe('create()', () => {
    it('should generate a valid UUID', () => {
      const projectStatusId = ProjectStatusId.create();
      expect(ProjectStatusId.isValidUUID(projectStatusId.value)).toBe(true);
    });
  });

  describe('fromString()', () => {
    it('should accept valid UUID format', () => {
      const validUUID = '123e4567-e89b-12d3-a456-426614174000';
      const projectStatusId = ProjectStatusId.fromString(validUUID);
      expect(projectStatusId.value).toBe(validUUID);
    });

    it('should reject invalid UUID format', () => {
      const invalidUUID = 'invalid-uuid-format';
      expect(() => ProjectStatusId.fromString(invalidUUID)).toThrowError(`Invalid ProjectStatusId: ${invalidUUID}`);
    });
  });

  describe('equals()', () => {
    it('should return true for equal ProjectStatusIds', () => {
      const projectStatusId1 = ProjectStatusId.fromString('123e4567-e89b-12d3-a456-426614174000');
      const projectStatusId2 = ProjectStatusId.fromString('123e4567-e89b-12d3-a456-426614174000');
      expect(projectStatusId1.equals(projectStatusId2)).toBe(true);
    });

    it('should return false for different ProjectStatusIds', () => {
      const projectStatusId1 = ProjectStatusId.fromString('123e4567-e89b-12d3-a456-426614174000');
      const projectStatusId2 = ProjectStatusId.fromString('123e4567-e89b-12d3-a456-426614174001');
      expect(projectStatusId1.equals(projectStatusId2)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      expect(() => ProjectStatusId.fromString('')).toThrowError('Invalid ProjectStatusId: ');
    });

    it('should handle null or undefined', () => {
      expect(() => ProjectStatusId.fromString(null)).toThrowError('ProjectStatusId cannot be null or undefined');
      expect(() => ProjectStatusId.fromString(undefined)).toThrowError('ProjectStatusId cannot be null or undefined');
    });

    it('should handle case sensitivity correctly', () => {
      const lowerCaseUUID = '123e4567-e89b-12d3-a456-426614174000';
      const upperCaseUUID = '123E4567-E89B-12D3-A456-426614174000';
      expect(ProjectStatusId.fromString(lowerCaseUUID).equals(ProjectStatusId.fromString(upperCaseUUID))).toBe(true);
    });

    it('should generate unique IDs', () => {
      const projectStatusId1 = ProjectStatusId.create();
      const projectStatusId2 = ProjectStatusId.create();
      expect(projectStatusId1.equals(projectStatusId2)).toBe(false);
    });
  });

});