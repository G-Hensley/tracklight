import { BaseId } from './base-id.value-object';
import { v4 } from 'uuid';

export class ProjectStatusId extends BaseId {
  static create(): ProjectStatusId {
    return new ProjectStatusId(v4());
  }

  static fromString(id: string | null | undefined): ProjectStatusId {
    if (id === null || id === undefined) {
      throw new Error('ProjectStatusId cannot be null or undefined');
    }
    
    if (!BaseId.isValidUUID(id)) {
      throw new Error(`Invalid ProjectStatusId: ${id}`);
    }
    
    return new ProjectStatusId(id);
  }
}