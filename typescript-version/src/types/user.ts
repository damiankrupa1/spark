export interface registerModel {
  name: string;
  email: string;
  password: string;
}

export interface loginModel {
  email: string;
  password: string;
}

export interface User{
  id:string;
  email: string;
  name: string;
  role:string;
}

export interface registerResponse {
  user: User;
  tokens: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    }
  }
}

export interface loginResponse extends registerResponse {}
