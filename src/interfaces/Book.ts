import Common from "./Common";
import Copy from "./Copy";

export default interface Book extends Common {
  name: string;
  author: string;
  isbn?: string;
  cover?: string;
  category: string;
  publishedDate: Date;
  copies?: Copy[];
}
