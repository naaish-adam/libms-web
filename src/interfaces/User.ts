import Common from "./Common";

export enum UserRole {
  LIBRARIAN = "LIBRARIAN",
  MEMBER = "MEMBER",
}

export default interface User extends Common {
  username: string;
  role: UserRole;
}
