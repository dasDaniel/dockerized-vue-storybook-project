<template>
  <button :class="className" :alt="{alt}"><slot></slot></button>
</template>

<script>
export default {
  props: {
    alt: {
      type: String,
      default: ""
    },
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
