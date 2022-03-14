<template>
  <div class="traffic-lights">
    <div class="parent">
      <button :class="{
          'button': true,
          'active': dashboard.uuid === currentDashboard.uuid,
        }"
        type="button"
        v-bind:key="dashboard.uuid"
        @click.prevent="() => selectDashboard(dashboard)"
        v-for="dashboard of this.dashboards">

        {{ ucFirst(dashboard.name) }}
      </button>
    </div>
    <div class="parent">
      <TrafficLight
        v-bind:key="trafficLight.uuid"
        v-for="trafficLight in this.currentDashboard?.trafficLights"
        :traffic-light="trafficLight"
        @check-status="checkStatus"
      />
      </div>
    <div class="errorText">
      <p v-bind:key="index" v-for="(error, index) in errors">{{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, reactive, ref,
} from 'vue';
import { route } from '@/shared/helpers/route';
import Prisma from '@prisma/client';
import { ErrorResponse, handleResponse } from '@/client/helpers/handleResponse';
import { TrafficLight as TrafficLightModel } from '@/client/models/TrafficLight';
import TrafficLight from '../components/TrafficLight.vue';

type DashboardWithRelationship = Prisma.Dashboard & {trafficLights: Prisma.TrafficLight[]};
type DashboardWithModels = Prisma.Dashboard & {trafficLights: TrafficLightModel[]};

export default defineComponent({
  name: 'TrafficLights',
  setup() {
    const dashboards = ref<DashboardWithModels[]>([]);
    const currentDashboard = ref<DashboardWithModels>();
    const errors = ref<string[]>([]);

    function handleError(err: Error | ErrorResponse | string) {
      // Not the most robust error handling, but this is not a robust system
      if (typeof err === 'string') {
        errors.value.push(err);
      } else {
        errors.value.push(err instanceof Error ? err.message : err.statusText);
      }
    }

    function checkStatus(light: TrafficLightModel) {
      fetch(route('status.show', { id: light.uuid }).full)
        .then(handleResponse)
        .then(() => light.makeHappy())
        .catch((err) => {
          light.makeSad();
          handleError(err);
        });
    }

    function ucFirst(string: string): string {
      return string.slice(0, 1).toUpperCase() + string.slice(1, string.length).toLowerCase();
    }

    function selectDashboard(dashboard: DashboardWithModels): void {
      currentDashboard.value = dashboard;
      currentDashboard.value?.trafficLights.map(checkStatus);
    }

    onMounted(() => {
      return fetch(route('dashboards.index').full)
        .then(handleResponse)
        .then((dashboardsResponse: DashboardWithRelationship[]) => {
          dashboards.value = dashboardsResponse.map((board) => {
            // eslint-disable-next-line no-param-reassign
            board.trafficLights = board.trafficLights.map(
              (light) => reactive(new TrafficLightModel(light)),
            );

            return board as DashboardWithModels;
          });
          [currentDashboard.value] = reactive(dashboards.value.filter((board) => board.default));

          currentDashboard.value?.trafficLights.map(checkStatus);
        })
        .catch(handleError);
    });

    return {
      dashboards,
      currentDashboard,
      errors,
      checkStatus,
      ucFirst,
      selectDashboard,
    };
  },
  components: {
    TrafficLight,
  },
});
</script>

<style scoped lang="scss">
.traffic-lights {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.errorText {
  border: crimson 1px solid;
  background: mix(crimson, white, 20%);
  color: mix(crimson, black, 80%);
  border-radius: 5px;
}
.parent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 0.8rem 1.4rem;
  padding-bottom: 3em;
}
$blue: #00a0ff;

.button {
  background: $blue linear-gradient($blue, darken($blue, 5%));
  border: #fff 1px solid;
  border-radius: 8px;
  font-size: 1.8rem;
  font-weight: 600;
  color: lighten($blue, 50%);
  padding: 0.5rem 1rem;
  transition: background-color 0.2s;

  &:hover, &.active {
    background: lighten($blue, 30%);
    border-top: lighten($blue, 20%) 1px solid;
    border-left: lighten($blue, 20%) 1px solid;
    color: white;
    cursor: pointer;
  }
}
</style>
