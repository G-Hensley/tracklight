import { describe, expect, it } from "vitest";
import { UserId } from "../user-id.value-object";

describe("UserId Value Object", () => {

  describe("create()", () => {
    it("should generate a valid UUID", () => {
      const userId = UserId.create();
      expect(UserId.isValidUUID(userId.value)).toBe(true);
    })
  });

  describe("fromString()", () => {
    it("should accept valid UUID format", () => {
      const validUUID = "123e4567-e89b-12d3-a456-426614174000";
      const userId = UserId.fromString(validUUID);
      expect(userId.value).toBe(validUUID);
    })
  });

  describe("equals()", () => {
    it("should return true for equal UserIds", () => {
      const userId1 = UserId.fromString("123e4567-e89b-12d3-a456-426614174000");
      const userId2 = UserId.fromString("123e4567-e89b-12d3-a456-426614174000");
      expect(userId1.equals(userId2)).toBe(true);
    });

    it("should return false for different UserIds", () => {
      const userId1 = UserId.fromString("123e4567-e89b-12d3-a456-426614174000");
      const userId2 = UserId.fromString("123e4567-e89b-12d3-a456-426614174001");
      expect(userId1.equals(userId2)).toBe(false);
    });
  });

  describe('edge cases', () => {
      it('should handle empty string', () => {
        expect(() => UserId.fromString('')).toThrowError('Invalid UserId: ');
      });
  
      it('should handle null or undefined', () => {
        expect(() => UserId.fromString(null)).toThrowError('UserId cannot be null or undefined');
        expect(() => UserId.fromString(undefined)).toThrowError('UserId cannot be null or undefined');
      });
  
      it('should handle case sensitivity correctly', () => {
        const lowerCaseUUID = '123e4567-e89b-12d3-a456-426614174000';
        const upperCaseUUID = '123E4567-E89B-12D3-A456-426614174000';
        expect(UserId.fromString(lowerCaseUUID).equals(UserId.fromString(upperCaseUUID))).toBe(true);
      });
  
      it('should generate unique IDs', () => {
        const userId1 = UserId.create();
        const userId2 = UserId.create();
        expect(userId1.equals(userId2)).toBe(false);
      });
    });

});