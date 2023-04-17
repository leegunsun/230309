# nginx 이미지를 사용
FROM node:latest
ENV MYSQL_USERNAME root
ENV MYSQL_PASSWORD 4321aaaa
ENV MYSQL_DATABASE newJeans
ENV MYSQL_HOST express-database.ctg1j1jhkerv.ap-northeast-2.rds.amazonaws.com
ENV SECRET_KEY %SFDSG%^dsa$D$%@S%567325REW%wfd553^%$HFDGFD&^*^%FDGFD&%^$*$GFDGDF&^$&%$%$^$%GFDGFDGDFVXCUYREKHRSD%*H2DSA355FGDS^$%%$^$$dsadag2%!@
ENV SERVER_PORT 3000


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