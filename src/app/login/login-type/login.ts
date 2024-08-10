import { User } from "../login-model/user"

export type LoginResponse = {
  user: User;
  token: string
}
