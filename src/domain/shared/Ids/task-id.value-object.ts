import { BaseId } from './base-id.value-object';
import { v4 } from 'uuid';

export class TaskId extends BaseId {
  static create(): TaskId {
    return new TaskId(v4());
  }

  static fromString(id: string | null | undefined): TaskId {
    if (id === null || id === undefined) {
      throw new Error('TaskId cannot be null or undefined');
    }
    
    if (!BaseId.isValidUUID(id)) {
      throw new Error(`Invalid TaskId: ${id}`);
    }
    
    return new TaskId(id);
  }
}