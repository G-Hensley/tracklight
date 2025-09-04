import { describe, expect, it } from "vitest";
import { Email } from "../email.value-object";

describe("Email Value Object", () => {

  describe("create()", () => {
    it("should create an Email with valid format", () => {
      const email = Email.create("test@example.com");
      expect(email).toBeInstanceOf(Email);
      expect(email.value).toBe("test@example.com");
    });
  });

  describe("equals()", () => {
    it("should return true for equal emails", () => {
      const email1 = Email.create("test@example.com");
      const email2 = Email.create("test@example.com");
      expect(email1.equals(email2)).toBe(true);
    });

    it("should return false for different emails", () => {
      const email1 = Email.create("test@example.com");
      const email2 = Email.create("test2@example.com");
      expect(email1.equals(email2)).toBe(false);
    });

    describe("isValidEmail()", () => {
      it("should validate correct email formats", () => {
        const validEmails = [
          "test@example.com",
          "user.name+tag+sorting@example.com",
          "x@example.com",
          "example-indeed@strange-example.com"
        ];
        validEmails.forEach(email => {
          expect(Email.create(email)).toBeInstanceOf(Email);
        });
      });

      it("should invalidate incorrect email formats", () => {
        const invalidEmails = [
          "plainaddress",
          "@missingusername.com",
          "username@.com",
          "username@.com.",
          "username@com",
          "username@-example.com",
          "username@example..com"
        ];
        invalidEmails.forEach(email => {
          expect(() => Email.create(email)).toThrowError(`Invalid email format: ${email}`);
        });
      });
    });
  });

  describe("edge cases", () => {
    it("should handle empty string", () => {
      expect(() => Email.create("")).toThrowError("Email cannot be empty");
    });
    it("should handle null or undefined", () => {
      expect(() => Email.create(null)).toThrowError("Email cannot be empty");
      expect(() => Email.create(undefined)).toThrowError("Email cannot be empty");
    });
    it("should trim whitespace", () => {
      const email = Email.create("   test@example.com   ");
      expect(email.value).toBe("test@example.com");
    });
    it("should be case insensitive", () => {
      const email1 = Email.create("Test@Example.com");
      const email2 = Email.create("test@example.com");
      expect(email1.equals(email2)).toBe(true);
    });
    it("should handle maximum length", () => {
      const longEmail = "a".repeat(64) + "@" + "b".repeat(185) + ".com";
      expect(() => Email.create(longEmail)).toThrowError(`Invalid email format: ${longEmail}`);
    });
    it("should handle consecutive dots", () => {
      expect(() => Email.create("test..example@example.com")).toThrowError("Invalid email format: test..example@example.com");
    });
  });
});