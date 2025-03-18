FROM node:23.10
WORKDIR /tipsyAPI
COPY . .
RUN npm install
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install ffmpeg -y
EXPOSE 3013
CMD [ "npm", "start" ]