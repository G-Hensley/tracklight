type Id = string & { readonly brand: unique symbol };
type ISODate = string;
type Tag = string;

interface Priority { 
  'low': string; 
  'medium': string;
  'high': string;
};

interface StatusColumnName {
  'Backlog': string;
  'To Do': string;
  'In Progress': string;
  'Review': string;
  'Done': string;
};

interface Project {
  id: Id;
  name: string;
  description?: string;
  createdAt: ISODate;
};

interface Column {
  id: Id;
  projectId: Id;
  name: StatusColumnName[keyof StatusColumnName];
  position: number;
};

interface Ticket {
  id: Id;
  projectId: Id;
  columnId: Id;
  title: string;
  description?: string;
  priority: Priority[keyof Priority];
  assignee?: string;
  dueDate?: ISODate;
  tags: Tag[];
  createdAt: ISODate;
  updatedAt: ISODate;
};

interface BoardState {
  project: Project;
  columns: Column[];
  tickets: Ticket[];
};

interface FilterState {
  query: string;
  priorities: Priority[keyof Priority][];
  tags: Tag[];
  assignee?: string; 
}

export type { Id, ISODate, Tag, Priority, StatusColumnName, Project, Column, Ticket, BoardState, FilterState };