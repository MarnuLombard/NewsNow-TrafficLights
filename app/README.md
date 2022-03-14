## NewsNow
#### Full Stack Developer Exercise

---

# Server
Entrypoint is in `main.ts`.
Routing and serving http requests are done via `express`.  
Each route has its own small controller to deal with the logic of serving the data.  
The database layer is handled via `prism`, see schema file at `./prisma/schema.prisma`

---

#Client

The UI code is written in `vue` version 3. I've stuck with the new "Composition" API more than the traditional "Options" API. `vue-cli` is used to compile and was used to generate the project, for the sake of simplicity and speed of development.

There is only really one parent and one child component, `./views/TrafficLights.vue` and`./components/TrafficLight.vue` respectively. The data-fetching is done in the parent and the result of the `/status` call is displayed in the child.
