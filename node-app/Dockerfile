FROM node:current-slim

WORKDIR . 
COPY package.json  . 

RUN npm install --production
COPY . . 
EXPOSE 3000
CMD npm run start:production