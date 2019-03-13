import { action, observable } from "mobx";
import { RootStore } from "./RootStore.store";

export class MoviesStore {
  protected rootStore: RootStore;

  public constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable public movieList: boolean = true;
  @observable public selectedMovie: number = undefined;
  @observable public query: string = "";

  @action public resetQuery = () => {
    this.query = "";
  };

  @action public handleMovieView = () => {
    this.movieList ? (this.movieList = false) : (this.movieList = true);
  };
}
