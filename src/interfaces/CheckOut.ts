import Common from "./Common";
import Copy from "./Copy";
import User from "./User";

export default interface CheckOut extends Common {
  borrower: User;
  copy: Copy;
  returned: boolean;
  dueAt: Date;
}
