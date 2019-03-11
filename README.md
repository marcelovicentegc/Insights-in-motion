# 🎥 Insights in motion

A web app that consumes the [TMDb](https://www.themoviedb.org/ "TMDb's homepage") API and allows searching movies and its details.

## Directions

1. Clone this repository: `git clone https://github.com/marcelovicentegc/Insights-in-motion.git`
2. Change directory into cloned repository: `c Your-favorite-movies`
3. Set an API key for TMDb on a `.env`
4. If you are willing to use the Apollo Engine service, set an API key on the `.env` file
5. Create a Postgres database and set your credentials on a `ormconfig.json`
6. Install dependencies: `yarn`
7. Run the application with Apollo Server: `yarn start`; or with Apollo Engine: `yarn start-with-engine`
