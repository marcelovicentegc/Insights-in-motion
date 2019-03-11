FROM node:10.15.1
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
COPY ormconfig.example.json ./ormconfig.json
EXPOSE 3000
CMD ["yarn", "start"]