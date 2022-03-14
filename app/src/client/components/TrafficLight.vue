<template>
  <div class="wrapper">
    <div class="outer">
      <div class="inner">
        <div :class="[
          'circle red',
          trafficLight.state,
        ]"></div>
        <div :class="[
          'circle amber',
          trafficLight.state,
        ]"></div>
        <div :class="[
          'circle green',
          trafficLight.state,
        ]"></div>
      </div>
    </div>
    <div class="label">
      <h4>{{ trafficLight.name }}</h4>
    </div>
  </div>
</template>
<script lang="ts">
import { onBeforeUnmount, defineComponent, PropType } from 'vue';
import { TrafficLight } from '@/client/models/TrafficLight';

export default defineComponent({
  name: 'TrafficLight',
  props: {
    trafficLight: {
      required: true,
      type: Object as PropType<TrafficLight>,
    },
  },
  emits: [
    'check-status',
  ],
  setup(props, { emit }) {
    const interValId = setInterval(() => emit('check-status', props.trafficLight), 10_000);

    onBeforeUnmount(() => clearInterval(interValId));
  },
});
</script>

<style lang="scss" scoped>
$black: #656565;
$space: 1.5rem;

.wrapper {
  flex-grow: 1;
}
.outer {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  max-width: 14rem;
  min-height: 26rem;
  background-color: #ddd;
  border-radius: 7rem;
  border: $black 2px solid;
}

.inner {
  position: absolute;
  background-color: $black;
  top: $space;
  right: $space;
  bottom: $space;
  left: $space;
  flex-grow: 1;
  border-radius: 7rem;
  border: #656565 2px solid;
}
.circle {
  opacity: 50%;
  border-radius: 50%;
  width: 5.5rem;
  height: 5.5rem;
  margin-top: $space;
  margin-left: auto;
  margin-right: auto;
  transition: opacity 0.8s ease-in;
}

$red: rgb(241, 67, 27);
$amber: rgb(252, 154, 27);
$green: rgb(13, 183, 83);
$redGradient: radial-gradient($red, darken($red, 10%) 95%);

.red {
  background: $redGradient;
  &.sad {
    animation: flashing 0.8s infinite;
  }
}
.amber {
  background: radial-gradient($amber, darken($amber, 10%) 95%);
  &.transitioning {
    animation: flashing 0.8s infinite;
  }
}
.green {
  background: radial-gradient($green, darken($green, 10%) 95%);
  &.happy {
    opacity: 100%;
    transform: scale(1.2);
  }
}

@keyframes flashing {
  0% {
    opacity: 50%;
    transform: scale(1.0);
  }
  100% {
    opacity: 100%;
    transform: scale(1.2);
  }
}

</style>
