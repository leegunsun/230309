# nginx 이미지를 사용
FROM node:latest


# work dir
WORKDIR /app
#/home/blog/client

# work dir 에 build 폴더 생성 : /home/blog/build
#RUN mkdir ./build

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사ㅇㅇ
COPY . .
#./build ./build

# nginx 의 default.conf 를 삭제
#RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 복사
#COPY ./blog.conf /etc/nginx/conf.d
RUN npm install 

# 80 포트 오픈
EXPOSE 3000

# container 실행 시 자동으로 실행할 command. nginx 시작
CMD ["node", "index.js"]