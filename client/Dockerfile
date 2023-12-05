FROM node:alpine
WORKDIR /client
ENV NODE_ENV=production
COPY package*.json ./ 
RUN npm ci  --legacy-peer-deps --no-cache
COPY . .
RUN npm run build 
CMD [ "npm" , "start" ]