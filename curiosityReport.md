# Curiosity Report: Docker

Ever since our instruction on Docker I’ve been wanting to dive deeper and understand how I would use it in a personal project. At the time of writing this, I understand it generally, but it still seems abstract in what it actually does and how to use it. Containers and images are something that’s used in the real world, so it would be good to become familiar with them. The purpose of this project is to:

1. Go through the process of doing my own research and writing my own documentation so I internalize this
1. Act as a resource that makes sense to me that I'm able to follow later
1. Get a good grade in CS 329

## Containers
Containers are a lightweight form of storage that packages up code and all dependencies. Containers are easily portable because they don’t encounter issues with running in different environments as they make up the environment itself. They also take up less space and are faster than spinning up a virtual machine.

### Images
When a container is running, a container image can be captured. This keeps track of the difference between the current state and the parent container, and is cheaper in terms of storage space. Images can be uploaded to a public or private repo and pulled down to create a container.

### Volumes
When a container is stopped, all data on it is lost unless persisted by volumes. A volume is a folder on the host machine. Files can be created and mounted into future containers.

## Docker Compose
Each Docker container should ideally run just one process. Docker Compose is a tool for running multiple containers at the same time. It receives its directions from the docker-compose.yml file.

Example docker-compose.yml:

```
version: ‘2’
services:
	web:
		build: .
		ports:
			- “8080:8080”
	db:
		image: “mysql”
		environment:
			MYSQL_ROOT_PASSWORD: password
		volumes:
			- db-data:/foo

volumes:
	db-data:
```

## Benefits of Docker
Docker is useful in cases where I would need to deploy an application, especially when the software is likely to run on multiple environments. Dependencies are packaged with the application. Containers easily scalable, as many containers can be spun off the same container to accomplish a large amount of work. In addition, as seen in this class, docker can be interacted with via GitHub Actions. If security is compromised on one container, the rest of the containers are not affected. An image can have all required software already installed rather than having to manually install an environment each time. Different projects or components of a project can be partitioned into different Docker containers for organization.

### Downsides of Docker
From my research, it appears that the downsides to Docker are the additional complexity, initial configuration time, and slight overhead increase. However, the benefits of containerization appear to greatly outweigh any downsides, particularly for users further along the learning curve.

For small and simple applications, Docker may not be necessary. As Docker is focused on making an environment stable, code that an individual user will use on their own does not inherently need to be containerized. Ultimately, it isn’t bad, there are just cases where it’s overkill.

## Quick Reference
### Terminology
**Dockerfile**: Instructions to build a Docker image

**Image**: An immutable template for running Docker containers

**Container**: A running process (your software actually running in the real world)

### Important commands
- `docker ps`: List all running containers on your system
- `docker images -a`: List all images
- `docker build pathToDockerfile`: Run your Dockerfile to build an image
    - `-t tagName`: Add a tag
- `docker rmi`: Delete an image
- `docker run imageID`: Run a container (can use the tag name instead of the imageID)
    - `-p localPort:containerPort`: Specify port forwarding
- `docker rm containerID`: Delete a container
    - `f`: Force deletion
    - `-v`: Remove associated volumes
- `docker push`: Send an image to an online repo (such as DockerHub or ECR)
- `docker pull`: Pull an image from an online repo
- `docker start`: Start a container's daemon
- `docker stop`: Stop a container's daemon
    - `-t numSeconds`: Wait a specified number of seconds before stopping
- `docker logs`: Get the generated logs
- `docker volume create folderName`: Create a volume
- `docker run --mount source=localFolder, target=/containerFolder`: Mount a volume
- `docker compose up`: Run all the containers specified in the docker-compose file together
- `docker compose down`: Shut down all containers together

### Creating a Dockerfile
The name should be "Dockerfile" (case-sensitive)

Each step is a layer. Docker will cache layers if nothing has changed. Installing dependencies prior to caching that we don’t have to reinstall node_modules whenever we make a change.

You can create a .dockerignore file (like a .gitignore file)

`FROM` - set the base image for later instructions (must be the first instruction)

`WORKDIR` - change directory

`COPY` - copy files

`RUN` - open a terminal session and run a command

`ENV` - set an environment variable

`EXPOSE` - define ports the container listens to when running

`CMD` - what commands should the container run upon being initialized? (only one CMD per Dockerfile)

#### Example Dockerfile:
```
FROM node:12
WORKDIR /app
RUN npm install
COPY package*.json ./
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]
```

## Sources I found helpful in trying to learn about Docker:
[CS 392 documentation](https://github.com/devops329/devops/blob/main/instruction/containers/containers.md)

[Learn Docker in 7 Easy Steps - Full Beginner's Tutorial](https://www.youtube.com/watch?v=gAkwW2tuIqE)

[ChatGPT](chatgpt.com)

[Docker](docker.com)

[When Not to Use Docker](https://www.freecodecamp.org/news/7-cases-when-not-to-use-docker/)
