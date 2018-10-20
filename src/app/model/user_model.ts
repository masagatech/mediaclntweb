export class UserReq {
  constructor(public code: string, public pwd: string) {

  }
}

export class LoginUser {
  UserData: any;
}

export interface LoginUserModel {
  _id: string;
  ucode: string;
  pwd: string;
  full_name: string;
  email: string;
  utype: string;
  wsid: number;
  status: boolean,
  errcode: string,
  err: string,
  sessiondetails: any;
}