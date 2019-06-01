import * as faker from "faker";
import { request } from "graphql-request";
import {
  duplicate,
  invalidEmail,
  passwordNotLongEnough,
  usernameNotLongEnough
} from "../utils/errorMessages";

const url = `http://127.0.0.1:8080/graphql`;
const duplicatedEmail = faker.internet.email();
const duplicatedUsername = faker.internet.userName();
const password = faker.internet.password();

const createUser = (email: string, username: string, password: string) => `
mutation { 
  createUser(email: "${email}", username: "${username}", password: "${password}", avatar: null) {
      path
      message
    }
  }
`;

const loginUser = (email: string | undefined, password: string) => `
mutation {
    loginUser(email: "${email}", password: "${password}") {
      email
    }
}
`;

const logoutUser = () => `
mutation {
  logoutUser
}
`;

describe("User tests ------------------------------------", () => {
  test("Create an user", async () => {
    const response = await request(
      url,
      createUser(duplicatedEmail, duplicatedUsername, password)
    );
    expect(response).toEqual({ createUser: null });
  });

  test("Logs created user in", async () => {
    const response = await request(url, loginUser(duplicatedEmail, password));
    expect(response).toEqual({
      loginUser: {
        email: duplicatedEmail
      }
    });
  });

  test("Logs created user out", async () => {
    const response = await request(url, logoutUser());
    expect(response).toEqual({
      logoutUser: true
    });
  });

  test("Raises duplicated email error", async () => {
    const response: any = await request(
      url,
      createUser(duplicatedEmail, faker.internet.userName(), password)
    );
    expect(response).toEqual({
      createUser: [{ message: "Email " + duplicate, path: "createUser" }]
    });
  });
  test("Raises email length validation error", async () => {
    const response: any = await request(
      url,
      createUser("a", faker.internet.email(), password)
    );
    expect(response.createUser).toHaveLength(1);
    expect(response).toEqual({
      createUser: [{ message: invalidEmail, path: "createUser" }]
    });
  });
  test("Raises password length validation error", async () => {
    const response: any = await request(
      url,
      createUser(faker.internet.email(), faker.internet.userName(), "k8")
    );
    expect(response.createUser).toHaveLength(1);
    expect(response).toEqual({
      createUser: [{ message: passwordNotLongEnough, path: "createUser" }]
    });
  });
  test("Raises duplicated username validation error", async () => {
    const response: any = await request(
      url,
      createUser(faker.internet.email(), duplicatedUsername, password)
    );
    expect(response.createUser).toHaveLength(1);
    expect(response.createUser[0]).toEqual({
      message: "Username " + duplicate,
      path: "createUser"
    });
  });
  test("Raises username length validation error", async () => {
    const response: any = await request(
      url,
      createUser(faker.internet.email(), "ki", password)
    );
    expect(response.createUser).toHaveLength(1);
    expect(response).toEqual({
      createUser: [{ message: usernameNotLongEnough, path: "createUser" }]
    });
  });
});
