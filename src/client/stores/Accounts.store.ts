import { action, observable } from "mobx";
import { RootStore } from "./RootStore.store";

export class AccountsStore {
  protected rootStore: RootStore;

  public constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable public error: string = undefined;

  @action public success = (errorMessage: string) => {
    if (errorMessage) {
      return false;
    } else {
      return true;
    }
  };
}
