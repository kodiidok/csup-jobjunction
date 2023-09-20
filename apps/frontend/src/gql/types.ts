import { gql } from "@apollo/client";

export interface User {
  email: string
  id: string
  name: string
  username: string
}

export interface UpdateRoomInput {
  roomStatus: string
}