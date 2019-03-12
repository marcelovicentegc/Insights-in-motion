[![Build Status](https://travis-ci.org/marcelovicentegc/Insights-in-motion.svg?style=flat-square&branch=master)](https://travis-ci.org/marcelovicentegc/Insights-in-motion)

# 🎥 Insights in motion

A web app that consumes the [TMDb](https://www.themoviedb.org/ "TMDb's homepage") API and allows searching movies and its details.

## Directions

1. Clone this repository: `git clone https://github.com/marcelovicentegc/Insights-in-motion.git`
2. Change directory into cloned repository: `cd Your-favorite-movies`
3. Set an API key for TMDb on a `.env`
4. If you are willing to use the Apollo Engine service, set an API key for it as well on the `.env`
5. Create a Postgres database and set your credentials on a `ormconfig.json`
6. Install dependencies: `yarn`
7. Run the application with Apollo Server: `yarn start`; or with Apollo Engine: `yarn start-with-engine`

## To do

1. [ ] Display registration validation errors to end-user
2. [ ] Style custom user list
3. [ ] Add custom search
4. [ ] Fetch images from trending movies and display them on the landing page under the floating-posters tag
5. [ ] Add movies' stats
