<template>
  <div v-for="trafficLight in trafficLights">
    <TrafficLight :traffic-light="trafficLight"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import TrafficLight from "../components/TrafficLight.vue";

export default defineComponent({
  name: 'TrafficLights',
  data: () => ({
    trafficLights: [],
  }),
  components: {
    TrafficLight,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
