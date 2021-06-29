import Book from "./Book";
import Common from "./Common";
import User from "./User";

export default interface Reserve extends Common {
  reserver: User;
  book: Book;
  position: boolean;
}
