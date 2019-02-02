FROM node:8.15.0-jessie

COPY . /root
WORKDIR /root
CMD ["node", "app.js"]
