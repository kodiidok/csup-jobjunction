import { gql } from "@apollo/client";

export const COMPANIES_QUERY = gql`
  {
    companies {
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

export const COMPANIES_BY_NAME_QUERY = gql`
  query GetCompaniesByName($name: string) {
    companies(name: $name) {
      email
      id
      name
    }
  }
`;

export const STUDENTS_QUERY = gql`
  {
    students {
      email
      id
      name
      password
      role {
        id
        name
      }
      studentId
      username
    }
  }
`;

export const INTERVIEWS_QUERY = gql`
  {
    interviews {
      id
      interviewDate
      interviewTime
      room {
        id
        roomName
        roomNumber
        roomStatus
        floor
        stall {
          company {
            email
            id
            name
          }
          id
        }
      }
      status
      students {
        email
        id
        name
        studentId
      }
    }
  }
`;

export const ROOMS_QUERY = gql`
  {
    rooms {
      id
      interviews {
        id
        interviewDate
        interviewTime
        status
        students {
          id
          email
          name
        }
      }
      completedInterviews {
        id
        name
        email
      }
      roomName
      roomNumber
      roomStatus
      floor
      stall {
        company {
          id
          email
          name
        }
        id
      }
    }
  }
`;

export const STALLS_QUERY = gql`
  {
    stalls {
      company {
        email
        id
        name
      }
      id
    }
  }
`;

export const USERS_QUERY = gql`
  {
    users {
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
