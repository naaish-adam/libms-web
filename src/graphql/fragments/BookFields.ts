import { gql } from "@apollo/client";

const BookFields = gql`
  fragment BookFields on Book {
    id
    isbn
    name
    cover
    author
    category
    publishedDate
    createdAt
    updatedAt
  }
`;
export default BookFields;
