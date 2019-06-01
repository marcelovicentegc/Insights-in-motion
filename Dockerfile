FROM node:10.15.1
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
RUN pip install redis
COPY ormconfig.example.json ./ormconfig.json
EXPOSE 3000
CMD ["yarn", "test-alone"]