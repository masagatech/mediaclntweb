export class UserReq {
  constructor(public email: string, public pwd: string) {

  }
}

export class LoginUser {
  UserData: any;
}

export interface LoginUserModel {
  _id: string;
  email: string;
  pwd: string;
  name: string;
  status: boolean,
  errcode: string,
  err: string,
  sessiondetails: any;
}