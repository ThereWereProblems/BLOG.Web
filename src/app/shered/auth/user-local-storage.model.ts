import { LoginResult } from "./login-result.model";

export class UserLocalStorage{
    userData?: LoginResult;
    expiresAt?: Date;
  }