FROM node:alpine
WORKDIR /server
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci  --legacy-peer-deps --no-cache
COPY . .
RUN npm run compile
EXPOSE 4000 
CMD [ "npm" , "start" ]
