export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
  isAdmin: boolean;
  pointTests: IPointTest[];
  regDate: string;
  isBanned: boolean;
}

export interface IUpdateUser {
  id: string,
  email: string,
  password: string,
  name: string,
  isBanned?: boolean,
  isAdmin?: boolean,
}

export interface IPointTest {
  idUser: string;
  idTest: string;
  points: number;
}

export interface IStatUser {
  value: number;
  isFilled: boolean;
}
