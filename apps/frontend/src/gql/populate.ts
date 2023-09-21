import { gql } from "@apollo/client";

export const CREATE_COMPANY = gql`
  mutation CreateCompany($input: CreateCompanyInput) {
    createCompany(input: $input) {
      email
      id
      name
      password
      role {
        id
        name
      }
      username
    }
  }
`;
