import { v4 } from "uuid";

export class TaskId {

  private constructor(private readonly id: string) {
    Object.freeze(this);
  }

  public static create(): TaskId {
    return new TaskId(v4());
  }

  public static fromString(id: string | null | undefined): TaskId {
    if (!id || !TaskId.isValidUUID(id.toLowerCase())) {
      throw new Error(`Invalid TaskId: ${id}`);
    }
    return new TaskId(id);
  }

  public get value(): string {
    return this.id;
  }

  public toString(): string {
    return this.id.toString();
  }

  public static isValidUUID(id: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id);
  }

  public equals(other: TaskId): boolean {
    return this.id.toLowerCase() === other.id.toLowerCase();
  }

}