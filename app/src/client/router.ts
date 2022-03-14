import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TrafficLights from '@/client/views/TrafficLights.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/client',
  },
  {
    path: '/client',
    name: 'client',
    component: TrafficLights,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
