import { BaseId } from './base-id.value-object';
import { v4 } from 'uuid';

export class PriorityId extends BaseId {
  static create(): PriorityId {
    return new PriorityId(v4());
  }

  static fromString(id: string | null | undefined): PriorityId {
    if (id === null || id === undefined) {
      throw new Error('PriorityId cannot be null or undefined');
    }
    
    if (!BaseId.isValidUUID(id)) {
      throw new Error(`Invalid PriorityId: ${id}`);
    }
    
    return new PriorityId(id);
  }
}