export interface Project {
  id: number;
  manager: string;
  name: string;
  description: string;
  developers: Array<{
    id: number;
    first_name: string;
    last_name: string;
  }>;
}
