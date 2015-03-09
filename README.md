# Developing

## Installation
Install nodejs and npm

```
gem install sass compass
npm install
gulp bower-install
```

## Testing in development mode

Run the javascript server
```
gulp watch
```

Run the api
```
bin/www
```

Go to http://localhost:3000 and test.

## Testing production code on development machine
Build javascript package
```
gulp build
```

Run webserver
```
NODE_ENV=production bin/www
```

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
