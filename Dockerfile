FROM node:lts-alpine
                 
WORKDIR /app

COPY package*.json .

RUN npm install 

USER node

COPY . .

CMD ["npm", "start"]

EXPOSE 1993