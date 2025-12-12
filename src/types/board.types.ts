export interface BoardMember {
  id: number;
  name: string;
  position: string;
  description: string;
}

export interface BoardProps {
  members: BoardMember[];
}
