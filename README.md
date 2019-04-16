[![Build Status](https://img.shields.io/travis/marcelovicentegc/Insights-in-motion.svg?branch=master&style=flat-square)](https://travis-ci.org/marcelovicentegc/Insights-in-motion)

# 🎥 Insights in motion

A web app that consumes the [TMDb](https://www.themoviedb.org/ "TMDb's homepage") API and allows searching movies and its details.

## Directions

1. Clone this repository: `git clone https://github.com/marcelovicentegc/Insights-in-motion.git`
2. Change directory into cloned repository: `cd Insights-in-motion`
3. Set an API key for TMDb on a `.env`
4. If you are willing to use the Apollo Engine service, set an API key for it as well on the `.env`
5. Create a Postgres database and set your credentials on a `ormconfig.json`
6. Start Redis server: sudo service redis-service start
7. Install dependencies: `yarn`
8. Run the application with Apollo Server: `yarn start`; or with Apollo Engine: `yarn start-with-engine`
9. As the database cleans itself whenever the server restarts for updates, there is a default user which you can log in with, with email: `user@example.com` and password `user`

## To do

1. [ ] Format server-side errors
