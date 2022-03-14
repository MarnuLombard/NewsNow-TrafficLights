## NewsNow
#### Full Stack Developer Exercise

---
*Please see `./app/README.md` and `./containers/README.md` for rationale and an explanation of the approaches I took*

---
# Running:

Ensure that you have `docker` and `docker-compose` installed on your system.

The database password myst be generated.
If you are on a *nix system, I recommend doing:
```bash
openssl rand -base64 20 | sed 's/[^A-Z a-z 0-9]//g' awk '{print "MYSQL_PASSWORD="$1}' >> .env
```

Then start the container:
```bash
docker-compose up
```
*Make sure you don't have something else bound to port 80 on your system.*

And head over to [http://localhost](http://localhost/).  
You will be redirected to the `/client` path to view the dashboard (brief stated that this should be the path that serves the dashboard).


---

# Brief:

*All code you send us should be entirely your own (although you may make use of publicly available libraries), should be of the quality you would expect to submit for a real NewsNow project and must remain confidential, so may not be published online.*

## Traffic light ‘server-status’ dashboard

### Front-end
Create an app using Vue.js that achieves the following core functionality:
* Render a number of traffic light components on a webpage, like the ones shown above (with your own design interpretation on this).
* Every 10 seconds each component should make a request to a `/status` endpoint with any required data pertaining to the external site associated with that traffic light, and retrieve the HTTP status code from the response.
* If the status code is 200, then ensure the green light is illuminated and the red light is dimmed.
* If the status code is not 200, or there is a timeout or other error, then ensure the green light is dimmed and the red light flashes.
* Load a list of pre-configured traffic light dashboards from a `/dashboards` endpoint, and display them for selection in the UI.
* On selection of a pre-configured traffic light dashboard, display this dashboard with its traffic light components in the UI.

###Back-end
Create a server using Node.js with the following endpoints:
* A `/status` endpoint that will handle status requests relating to a traffic light component, using the incoming data to perform a status check on an external site and then return a status response code to the front-end.
* A `/dashboards` endpoint that will return data relating to pre-configured dashboards saved in a database (MySQL or SQLite). A dashboard consists of one or more pre-configured traffic lights, and a pre-configured traffic light may be referenced by multiple dashboard configurations.
* A `/client` endpoint that will serve the Vue app to the browser.

### Application delivery
Please deliver your code (in TGZ format) with a Dockerfile that will build an image that will run the back-end server (with sample dashboard and traffic light configuration stored in the database).
