import { BaseId } from "./base-id.value-object";
import { v4 } from "uuid";

export class ProjectId extends BaseId {
  static create(): ProjectId {
    return new ProjectId(v4());
  }

  static fromString(id: string | null | undefined): ProjectId {
    if (id === null || id === undefined) {
      throw new Error("ProjectId cannot be null or undefined");
    }
    
    if (!BaseId.isValidUUID(id)) {
      throw new Error(`Invalid ProjectId: ${id}`);
    }
    
    return new ProjectId(id);
  }
}