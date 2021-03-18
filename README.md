![Rundeck](https://www.rundeck.com/hubfs/Images/logos/rundeck-logotype-512.png)

# Welcome to the Rundeck Welcome Project

This project includes sample projects that show how Rundeck can integrate to turn alerts into action.  After opening the project, click the **Tours** button to get a walk through of the various components and see Rundeck in action.

## Licenses

A license will be required for Rundeck Enterprise Enterprise to use this demo.  Existing licenses will work or Trials are available at the links below:
*Note: (PagerDuty/Rundeck employees, please do not request trials. Inquire with product organization to get started with this demo.)*

### Rundeck Enterprise

Rundeck Enterprise Trial license can be requested from here [https://www.rundeck.com/see-demo](https://www.rundeck.com/see-demo) and installed one of two ways.

- Place a copy of your license file at the root of this repository with a file name of `rundeck-enterprise.key`.  (this must be done before booting the Docker environment.)
- Upload your license file in the Rundeck GUI after booting the environment the first time.

## Setup / Starting the environment
Running this requires Docker installed on your machine.  We recommend the latest version.

**Build and Up**  
> **NOTE:** Building is not necessary the first time. Use 'build' to update the images used to the latest version.
```
docker-compose build
docker-compose up -d
```
The initial build can take a few minutes to run and get everything started.  After the containers are built and started use the command below to watch Rundeck logs for `Grails application running at http://0.0.0.0:4440/ in environment: production`

```
docker logs -f rundeck
```

> **NOTE:** If you wish to use more than three nodes in the demo, use the following command to add more nodes and adjust the `node=X` to how many nodes you'd like:
```
docker-compose up -d --scale node=5
```

**Accessing Rundeck**

To access Rundeck, head to http://localhost:4440 and login using the following credentials:

username: `admin`<br>
password: `admin`


**Stop**
Use the following command to stop the system, but keep the work you've done so far:

```
docker-compose stop
```

To remove the containers that were built and free up space on your machine:

```
docker-compose down
```

**Full Clean**
This command will remove all associated volumes and images as well.
```
docker-compose down --volume --rmi all
```


## Assistance
For help or questions with this image please email `hello@rundeck.com` and we will do our best to help.

### Disclaimer
Some of the setup/installation methods used in this environment are not recommended for production deployments. Do not run this environment for production purposes or with sensitive data. For installation best practices follow our docs site and guidance from our world class Support team.
