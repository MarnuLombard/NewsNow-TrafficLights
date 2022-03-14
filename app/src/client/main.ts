import { createApp } from 'vue';
import TrafficLights from './views/TrafficLights.vue';
import router from './router';

createApp(TrafficLights).use(router).mount('#app');
