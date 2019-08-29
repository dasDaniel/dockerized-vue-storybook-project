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