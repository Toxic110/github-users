export interface IUser {
  avatar_url: string;
  id: number;
  login: string;
  type: string;
  url: string;
}

export interface IUserResponse {
  items: IUser[];
  total_count: number;
}
