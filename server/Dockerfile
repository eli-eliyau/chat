FROM node:alpine
WORKDIR /src/app
COPY package*.json /src
RUN npm install --force

COPY . . 

CMD ["npm","run","w"]
EXPOSE 4000
CMD ["npm","start"]