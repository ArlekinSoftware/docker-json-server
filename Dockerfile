FROM node:9

ARG PROJECT_DIR=/json-server

COPY . ${PROJECT_DIR}
RUN  npm --prefix ${PROJECT_DIR} install ${PROJECT_DIR}

EXPOSE 3000 8080
WORKDIR ${PROJECT_DIR}