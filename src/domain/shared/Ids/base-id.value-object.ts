export abstract class BaseId {

  protected constructor(private readonly id: string) {
    if (!id) {
      throw new Error(`Invalid UUID format: ${id}`);
    }
    if (!BaseId.isValidUUID(id)) {
      throw new Error(`Invalid UUID format: ${id}`);
    }
    Object.freeze(this);
  }

  public get value(): string {
    return this.id;
  }

  toString(): string {
    return this.id.toString();
  }

  static isValidUUID(id: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  }

  equals<T extends BaseId>(other: T): boolean {
    return this.value.toLowerCase() === other.value.toLowerCase() && this.constructor === other.constructor;
  }
}