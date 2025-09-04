export class Email {
  private constructor(private readonly email: string) {
    Object.freeze(this);
  }

  static create(email: string | null | undefined): Email {
    // Validate email for null, undefined, or empty string
    if (!email || email.trim() === '' || email === null || email === undefined) {
      throw new Error('Email cannot be empty');
    }

    // Trim whitespace from the email string and validate format
    const normalizedEmail = email.trim().toLowerCase();
    if (!Email.isValidEmail(normalizedEmail)) {
      throw new Error(`Invalid email format: ${normalizedEmail}`);
    }

    return new Email(normalizedEmail);
  }

  private static isValidEmail(email: string): boolean {
    // More comprehensive email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    
    // Additional checks for edge cases
    if (email.length > 254) return false;
    if (email.includes('..')) return false;
    if (email.startsWith('.') || email.endsWith('.')) return false;
    if (email.includes('@.') || email.includes('.@')) return false;
    
    const parts = email.split('@');
    if (parts.length !== 2) return false;
    
    const [localPart, domainPart] = parts;
    if (!localPart || !domainPart) return false;
    if (localPart.length > 64) return false;
    if (domainPart.startsWith('-') || domainPart.endsWith('-')) return false;
    if (!domainPart.includes('.')) return false;

    return emailRegex.test(email);
  }

  get value(): string { return this.email; }
  toString(): string { return this.email; }
  equals(other: Email): boolean { return this.email === other.email; }
}