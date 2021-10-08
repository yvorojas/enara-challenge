FROM node:12
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
EXPOSE 3080
RUN npm run compile
COPY /public /usr/src/app/dist/public
CMD [ "npm", "start" ]