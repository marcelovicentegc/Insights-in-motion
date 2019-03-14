import { AccountsStore } from "./Accounts.store";
import { MoviesStore } from "./Movies.store";

export class RootStore {
  public moviesStore: MoviesStore;
  public accountsStore: AccountsStore;

  public constructor() {
    this.moviesStore = new MoviesStore(this);
    this.accountsStore = new AccountsStore(this);

    return {
      moviesStore: this.moviesStore,
      accountsStore: this.accountsStore
    };
  }
}
