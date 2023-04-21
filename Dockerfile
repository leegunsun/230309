# nginx 이미지를 사용
FROM node:latest

ARG MYSQL_USERNAME
ARG MYSQL_PASSWORD
ARG MYSQL_DATABASE
ARG MYSQL_HOST
ARG SECRET_KEY
ARG SERVER_PORT


RUN echo "MYSQL_USERNAME" is $MYSQL_USERNAME
RUN echo "MYSQL_PASSWORD" is $MYSQL_PASSWORD
RUN echo "MYSQL_DATABASE" is $MYSQL_DATABASE
RUN echo "MYSQL_HOST" is $MYSQL_HOST
RUN echo "SECRET_KEY" is $SECRET_KEY
RUN echo "SERVER_PORT" is $SERVER_PORT

# work dir
WORKDIR /app
#/home/blog/client

# work dir 에 build 폴더 생성 : /home/blog/build
#RUN mkdir ./build

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사ㅇㅇddd
COPY . .
#./build ./build

# nginx 의 default.conf 를 삭제
#RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 복사
#COPY ./blog.conf /etc/nginx/conf.d
RUN npm install 


# 80 포트 오픈
EXPOSE 3000

# container 실행 시 자동으로 실행할 command. nginx 시작하겠습니다.da
CMD ["npx","nodemon", "app.js"]