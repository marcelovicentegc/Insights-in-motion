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

const mutation = (email: string, username: string, password: string) => `
mutation { 
  createUser(email: "${email}", username: "${username}", password: "${password}", avatar: null) {
      path
      message
    }
  }
`;

describe("User tests ------------------------------------", () => {
  test("Create an user", async () => {
    const response = await request(
      url,
      mutation(duplicatedEmail, duplicatedUsername, password)
    );
    expect(response).toEqual({ createUser: null });
  });
  test("Raises duplicated email error", async () => {
    const response: any = await request(
      url,
      mutation(duplicatedEmail, faker.internet.userName(), password)
    );
    expect(response.errors);
  });
  test("Raises email length validation error", async () => {
    const response: any = await request(
      url,
      mutation("a", faker.internet.email(), password)
    );
    expect(response.createUser).toHaveLength(1);
    expect(response).toEqual({
      createUser: [{ message: invalidEmail, path: "createUser" }]
    });
  });
  test("Raises password length validation error", async () => {
    const response: any = await request(
      url,
      mutation(faker.internet.email(), faker.internet.userName(), "k8")
    );
    expect(response.createUser).toHaveLength(1);
    expect(response).toEqual({
      createUser: [{ message: passwordNotLongEnough, path: "createUser" }]
    });
  });
  test("Raises duplicated username validation error", async () => {
    const response: any = await request(
      url,
      mutation(faker.internet.email(), duplicatedUsername, password)
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
      mutation(faker.internet.email(), "ki", password)
    );
    expect(response.createUser).toHaveLength(1);
    expect(response).toEqual({
      createUser: [{ message: usernameNotLongEnough, path: "createUser" }]
    });
  });
});
