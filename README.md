# README

### Steps

- Create new project
  `npm init`
- Install vue
  `npm install vue --save`
  `npm install vue-loader vue-template-compiler @babel/core babel-loader babel-preset-vue --save-dev`
- Install storybook
  `npm install @storybook/vue --save-dev`
- Update package.json - add storybook script
```json
"scripts": {
  "storybook": "start-storybook"
}
```
- create a component `components/MyButton.vue`
- crate `.storybook/config.js`
- create first story `/stories/index.js`