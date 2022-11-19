export interface SignUpRequestModel {
  email: string;
  nickname: string;
  password: string;
}

export interface LoginRequestModel {
  email: string;
  password: string;
}

export interface CheckNicknameRequestModel {
  nickname: string;
}

export interface CheckEmailRequestModel {
  email: string;
}
