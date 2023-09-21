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
        students {
          id
        }
      }
      floor
      id
      interviews {
        id
        students {
          id
        }
      }
      roomName
      roomNumber
      roomStatus
      stall {
        company {
          id
          name
        }
        id
      }
    }
  }
`;
