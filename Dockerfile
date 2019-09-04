# STEP 1 build static website
FROM node:10-alpine
# RUN apk update && apk add --no-cache make git

ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
WORKDIR /usr/src/app

# Copy project files into the docker image
COPY . .

# Install app dependencies
RUN npm set progress=false && npm install

EXPOSE 8086
CMD ["npm", "run", "storybook"]
