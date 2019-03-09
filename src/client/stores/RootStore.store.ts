import { MoviesStore } from "./Movies.store";

export class RootStore {
  public moviesStore: MoviesStore;

  public constructor() {
    this.moviesStore = new MoviesStore(this);

    return {
      moviesStore: this.moviesStore
    };
  }
}
