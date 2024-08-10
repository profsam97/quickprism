FROM node:22 AS buildnode
WORKDIR /usr/src/app
COPY src ./client
RUN cd client && npm install
RUN cd client && npm run build

FROM node:22
WORKDIR /usr/src/app
COPY --from=buildnode /usr/src/app/client /usr/src/app/
EXPOSE 5000
CMD [ "npm", "start" ]