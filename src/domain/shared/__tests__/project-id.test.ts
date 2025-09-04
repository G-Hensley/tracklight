import { describe, expect, it } from "vitest";
import { ProjectId } from "../Ids/project-id.value-object";

describe('ProjectId Value Object', () => {

  describe('create()', () => {
    it('should generate a valid UUID', () => {
      const projectId = ProjectId.create();
      expect(ProjectId.isValidUUID(projectId.value)).toBe(true);
    });
  });

  describe('fromString()', () => {
    it('should accept valid UUID format', () => {
      const validUUID = '123e4567-e89b-12d3-a456-426614174000';
      const projectId = ProjectId.fromString(validUUID);
      expect(projectId.value).toBe(validUUID);
    });

    it('should reject invalid UUID format', () => {
      const invalidUUID = 'invalid-uuid-format';
      expect(() => ProjectId.fromString(invalidUUID)).toThrowError(`Invalid ProjectId: ${invalidUUID}`);
    });
  });

  describe('equals()', () => {
    it('should return true for equal ProjectIds', () => {
      const projectId1 = ProjectId.fromString('123e4567-e89b-12d3-a456-426614174000');
      const projectId2 = ProjectId.fromString('123e4567-e89b-12d3-a456-426614174000');
      expect(projectId1.equals(projectId2)).toBe(true);
    });

    it('should return false for different ProjectIds', () => {
      const projectId1 = ProjectId.fromString('123e4567-e89b-12d3-a456-426614174000');
      const projectId2 = ProjectId.fromString('123e4567-e89b-12d3-a456-426614174001');
      expect(projectId1.equals(projectId2)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      expect(() => ProjectId.fromString('')).toThrowError('Invalid ProjectId: ');
    });

    it('should handle null or undefined', () => {
      expect(() => ProjectId.fromString(null)).toThrowError('ProjectId cannot be null or undefined');
      expect(() => ProjectId.fromString(undefined)).toThrowError('ProjectId cannot be null or undefined');
    });

    it('should handle case sensitivity correctly', () => {
      const lowerCaseUUID = '123e4567-e89b-12d3-a456-426614174000';
      const upperCaseUUID = '123E4567-E89B-12D3-A456-426614174000';
      expect(ProjectId.fromString(lowerCaseUUID).equals(ProjectId.fromString(upperCaseUUID))).toBe(true);
    });

    it('should generate unique IDs', () => {
      const projectId1 = ProjectId.create();
      const projectId2 = ProjectId.create();
      expect(projectId1.equals(projectId2)).toBe(false);
    });
  });

});