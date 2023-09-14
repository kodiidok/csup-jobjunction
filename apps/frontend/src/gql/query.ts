import { gql } from "@apollo/client";

export const USERS_QUERY = gql`
  {
    users {
      email
      id
      name
      password
      username
    }
  }
`;

export const COMPANIES_QUERY = gql`
  {
    users {
      email
      id
      name
      password
      username
    }
  }
`;

export const STUDENTS_QUERY = gql`
  {
    users {
      email
      id
      name
      password
      username
    }
  }
`;
