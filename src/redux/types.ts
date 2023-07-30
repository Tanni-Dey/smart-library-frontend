export interface IUser {
  user: {
    email: string | null;
    password: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

export interface ICreditional {
  email: string;
  password: string;
}

export interface IData {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: string[];
}
export interface IResponse {
  sucess: boolean;
  data: IData[];
}
