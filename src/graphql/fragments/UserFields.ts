import { gql } from "@apollo/client";

const UserFields = gql`
  fragment UserFields on User {
    id
    username
    role
  }
`;
export default UserFields;
