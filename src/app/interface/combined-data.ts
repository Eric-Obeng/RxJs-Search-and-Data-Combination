export interface userDetails {
  id: number;
  name: string;
  email: string;
}

export interface userPosts {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface CombinedData {
  userDetails: userDetails;
  userPosts: userPosts[];
}
