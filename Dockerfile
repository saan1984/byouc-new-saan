FROM node:latest

ENV http_proxy http://qy1prdproxy01.ie.intuit.net:80
ENV no_proxy ".intuit.net, .intuit.com, localhost, 127.0.0.1"
RUN npm config set proxy http://qy1prdproxy01.ie.intuit.net:80
RUN npm config set https-proxy http://qy1prdproxy01.ie.intuit.net:80
RUN npm install -g jasmine-node

ADD package.json /tmp/package.json
RUN cd /tmp && npm install --production
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app
ADD . /opt/app

EXPOSE 3000

CMD ["npm", "start"]
