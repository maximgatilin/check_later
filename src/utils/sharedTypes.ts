export type ActionType = 'watch' | 'read';

export interface ContentEntity {
  actionType: ActionType;
  id: string;
  name: string;
  image?: string;
}