FROM node:14

WORKDIR /usr/spalhejs

COPY package*.json ./

RUN npm i -g @adonisjs/cli

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
