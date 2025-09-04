import { BaseId } from "./base-id.value-object";
import { v4 } from "uuid";

export class UserId extends BaseId {
  static create(): UserId {
    return new UserId(v4());
  }

  static fromString(id: string | null | undefined): UserId {
    if (id === null || id === undefined) {
      throw new Error("UserId cannot be null or undefined");
    }

    if (!BaseId.isValidUUID(id)) {
      throw new Error(`Invalid UserId: ${id}`);
    }
    return new UserId(id);
  }
}