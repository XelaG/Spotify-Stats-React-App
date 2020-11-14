FROM node:12-alpine as builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:12-alpine
WORKDIR /app
RUN yarn global add serve
COPY --from=builder /app/build .
CMD ["serve", "-p", "8080", "-s", "."]
