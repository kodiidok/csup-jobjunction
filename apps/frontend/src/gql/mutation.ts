import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login(
    $username: String!
    $password: String!
    $rememberMe: Boolean!
  ) {
    login(username: $username, password: $password, rememberMe: $rememberMe) {
      ... on CurrentUser {
        id
      }
      __typename
    }
  }
`;

export const UPDATE_ROOM_MUTATION = gql`
  mutation UpdateRoom($id: ID!, $input: UpdateRoomInput!) {
    updateRoom(id: $id, input: $input) {
      completedInterviews {
        id
      }
      currentStudent
      id
      interviews {
        id
      }
      roomNumber
      roomStatus
      stall {
        company {
          id
          name
        }
        floorPlanLocation
        id
        stallNumber
      }
    }
  }
`;
