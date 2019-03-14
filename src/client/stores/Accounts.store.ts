import { action, observable } from "mobx";
import { RootStore } from "./RootStore.store";

export class AccountsStore {
  protected rootStore: RootStore;

  public constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable public errorMessage: string = undefined;
  @observable public email: string = "";
  @observable public username: string = "";
  @observable public password: string = "";

  @action public success = () => {
    if (this.errorMessage !== undefined) {
      return false;
    } else {
      this.resetCredentials();
      return true;
    }
  };

  @action public handleChange = (name: string, value: string) => {
    if (name === "email") {
      this.email = value;
      this.errorMessage = undefined;
    }
    if (name === "username") {
      this.username = value;
      this.errorMessage = undefined;
    }
    if (name === "password") {
      this.password = value;
      this.errorMessage = undefined;
    }
  };

  @action public resetCredentials = () => {
    this.email = "";
    this.username = "";
    this.password = "";
    this.errorMessage = undefined;
  };
}
