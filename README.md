# Developing
Install nodejs and npm

```
gem install sass compass
bower install
npm install
```

Run data server
Run static server

# Deploying
Install docker (see https://docs.docker.com/installation/)
Install docker-compose (see http://docs.docker.com/compose/)

## Build the base image
You only need to do this when you change the dependencies

```
./init.sh
```

## Build the data and app images

Run docker-compose up -d from this directory

To restart, docker-compose restart
