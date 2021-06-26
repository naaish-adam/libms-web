import Book from "./Book";
import Common from "./Common";

export enum CopyStatus {
  AVAILABLE = "AVAILABLE",
  RESERVED = "RESERVED",
  CHECKED_OUT = "CHECKED_OUT",
}

export default interface Copy extends Common {
  rackNo: string;
  status: CopyStatus;
  book?: Book;
}
