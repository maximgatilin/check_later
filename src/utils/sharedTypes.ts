export interface ContentEntity {
  action_type: 'watch' | 'read';
  id: string;
  name: string;
  image?: string;
}