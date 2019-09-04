# Creating a dockerized vue-storybook project

## Description: Steps to create a docker container with a vue storybook
## Tags: vue, storybook, docker


### Overview

- Setup
  - 1. Create new project
  - 2. Install vue and dependencies
  - 3. Install storybook

- Build
  - 4. Add storybook script `package.json`
  - 5. Create a component `/components/MyButton.vue`
  - 6. Create configuration `/.storybook/config.js`
  - 7. Create a story `/stories/button.js`

- Ship
  - 8. Create `dockerfile`
  - 9. Create `.dockerignore`
  - 10. Create `docker-compose.yml`


### 1. Create a new project

Assuming you don't have a project created, start by creating a new directory and starting a new project within by running the `init` command.

```sh
npm init
```

This will ask some questions about the project setup, like name, version etc. Fill these in however you like.

### 2. Install vue

Next up, install the vue dependencies. Typically `vue` is not installed as a dev dependency and the other dependencies are. I'm leaving it as is, even though in this example they could all be same.

```sh
npm install vue --save
npm install vue-loader vue-template-compiler @babel/core babel-loader babel-preset-vue --save-dev
```

### 3. Install storybook

This is just one more dependency, but it takes a while to install compared to the others.

```sh
npm install @storybook/vue --save-dev
```

### 4. Add storybook script

Open `package.json` file and replace the `"test":...` script with:

```json
    "storybook": "start-storybook -s 8086"`
```

This will allow us to use `npm run storybook` to start the storybook application.

It also uses the same port number every time it starts, so that we can make the port available through docker easier.

### 5. Creating a component

To illustrate a basic component in storybook, let's create a button component in `/components/MyButton.vue`

This component will allow changing color to `red`, `blue` or `green` and have the ability to set `rounded` to true or false'. It uses a slot to define the button text.

```vue
<template>
  <button :class="className"><slot></slot></button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    },
    rounded: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    className() {
      let c = ['btn']
      if (this.color.toLowerCase() === 'red') c.push('btn-red');
      if (this.color.toLowerCase() === 'blue') c.push('btn-blue');
      if (this.color.toLowerCase() === 'green') c.push('btn-green');
      if (this.rounded) c.push('btn-rounded');
      return c.join(' ')
    }
  },
};
</script>

<style scoped>
.btn {
  text-decoration: none;
  font-size: 25px;
  color: #ffffff;
  font-family: arial;
  background: linear-gradient(to bottom, hsl(224, 10%, 68%), hsl(225, 3%, 51%));
  box-shadow: 0px 1px 5px hsl(215, 8%, 16%);
  border: solid hsl(217, 10%, 74%) 1px;
  border-radius: 2px;
  padding: 15px;
  text-shadow: 0px 1px 2px #000000;
  -webkit-transition: all 0.15s ease;
  -moz-transition: all 0.15s ease;
  -o-transition: all 0.15s ease;
  transition: all 0.15s ease;
}
.btn:hover {
  opacity: 0.9;
  background: linear-gradient(to bottom, hsl(224, 10%, 68%), hsl(225, 3%, 51%));
  box-shadow: 0px 1px 2px #000000;
}
.btn.btn-rounded{
  border-radius: 8px;
}
.btn.btn-red{
  background: linear-gradient(to bottom, hsl(0, 100%, 68%), hsl(0, 63%, 51%));
  box-shadow: 0px 1px 5px hsl(0, 68%, 16%);
  border: solid hsl(0, 100%, 74%) 1px;
}
.btn.btn-red:hover{
  background: linear-gradient(to bottom, hsl(0, 100%, 62%), hsl(0, 63%, 48%));
  box-shadow: 0px 1px 2px #000000;
}
.btn.btn-blue{
  background: linear-gradient(to bottom, hsl(255, 100%, 68%), hsl(255, 63%, 51%));
  box-shadow: 0px 1px 5px hsl(255, 68%, 16%);
  border: solid hsl(255, 100%, 74%) 1px;
}
.btn.btn-blue:hover{
  background: linear-gradient(to bottom, hsl(255, 100%, 62%), hsl(255, 63%, 48%));
  box-shadow: 0px 1px 2px #000000;
}
.btn.btn-green{
  background: linear-gradient(to bottom, hsl(108, 100%, 68%), hsl(108, 63%, 51%));
  box-shadow: 0px 1px 5px hsl(108, 68%, 16%);
  border: solid hsl(108, 100%, 74%) 1px;
}
.btn.btn-green:hover{
  background: linear-gradient(to bottom, hsl(108, 100%, 62%), hsl(108, 63%, 48%));
  box-shadow: 0px 1px 2px #000000;
}
</style>
```

### 6. Create Storybook configuration

Create a new file: `.storybook/config.js` with:

```js
import { configure } from '@storybook/vue';

function loadStories() {
  const req = require.context('../stories', true, /\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
```

This will scan through the `stories` folder for any `.js` files for stories to load.

### 7. Create a story

Create a file `stories/button.js` 

```js
import { storiesOf } from '@storybook/vue';
import MyButton from '../components/MyButton';

storiesOf('Button', module)
  .add('default', () => ({
    components: { MyButton },
    template: '<my-button>Default</my-button>'
  }))
  .add('red', () => ({
    components: { MyButton },
    template: '<my-button color="red">Red</my-button>'
  }))
  .add('blue', () => ({
    components: { MyButton },
    template: '<my-button color="blue">Blue</my-button>'
  }))
  .add('green', () => ({
    components: { MyButton },
    template: '<my-button color="green">Green</my-button>'
  }))
  .add('rounded', () => ({
    components: { MyButton },
    template: '<my-button :rounded="true">Rounded</my-button>'
  }))
```

## Test it

At this point, you should be able to run storybook using 

```sh
npm run storybook
```

### 8. Create Dockerfile (for docker image)

This file defines what the image instructions are.
The image is based off the node version 10, using alpine Linux. I'm using Alpine because it's small, and has all the things needed for this purpose.

Create the `Dockerfile` and put in the following instructions.

```docker
# Select reference image
FROM node:10-alpine

# This is optional. Sets the level of logging that you see
ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
WORKDIR /usr/src/app

# Copy project files into the docker image
COPY . .

# Install app dependencies
RUN npm set progress=false && npm install

# Make port 8086 available
EXPOSE 8086

# run storybook app
CMD ["npm", "run", "storybook"]

```

### 9. Skip node_modules with .dockerignore

Create a `.dockerignore` file and put in the following

```txt
node_modules/
```

This will prevent your local node modules file to be copied into the docker image. Since different environments may require different dependency versions (binaries), preventing docker from copying `node_modules` will prevent headaches and you should most likely always do it.

### 10. Create a docker container

Create a `docker-compose.yml` file and paste the following:

```yml
version: '3'
services:
  storybook:
    ports:
      - "8086:8086"
    build: .
```


This file makes it easier to run the container, so you don't need to run a build and run command for the `Dockerfile`. 

Then run it with:

```sh
docker-compose up

# or to force building after making changes you can use --build
docker-compose up --build
```

The first time it runs, it will take a bit longer, since it needs to download the required images, but subsequent runs should be faster.

After storybook is ready, you can test it using localhost:8086

