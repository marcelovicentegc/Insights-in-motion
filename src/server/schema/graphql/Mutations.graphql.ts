import gql from "graphql-tag";

export const createUser = gql`
  mutation CreateUser(
    $email: String!
    $username: String!
    $password: String!
    $avatar: Upload
  ) {
    createUser(
      email: $email
      username: $username
      password: $password
      avatar: $avatar
    ) {
      path
      message
    }
  }
`;

export const updateUser = gql`
  mutation UpdateUser(
    $id: ID!
    $email: String
    $username: String
    $password: String
    $avatar: Upload
  ) {
    updateUser(
      id: $id
      email: $email
      username: $username
      password: $password
      avatar: $avatar
    )
  }
`;

export const deleteUser = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const loginUser = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      email
    }
  }
`;

export const logoutUser = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

export const appendMovie = gql`
  mutation AppendMovie($movieId: Int, $userId: String) {
    appendMovie(movieId: $movieId, userId: $userId) {
      movieId
      userId
    }
  }
`;

export const dettachMovie = gql`
  mutation DettachMovie($movieId: Int) {
    dettachMovie(movieId: $movieId)
  }
`;
