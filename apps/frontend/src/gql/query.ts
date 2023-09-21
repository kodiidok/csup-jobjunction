import { gql } from "@apollo/client";

export const COMPANIES_QUERY = gql`
  {
    companies {
      email
      id
      name
      password
      role {
        division
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
        division
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
        currentStudent
        id
        roomNumber
        roomStatus
        stall {
          company {
            email
            id
            name
          }
          floorPlanLocation
          id
          stallNumber
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
      currentStudent
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
      remainingInterviews
      roomNumber
      roomStatus
      stall {
        company {
          id
          email
          name
        }
        floorPlanLocation
        id
        stallNumber
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
      floorPlanLocation
      id
      stallNumber
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
        division
        id
        name
      }
      username
    }
  }
`;
