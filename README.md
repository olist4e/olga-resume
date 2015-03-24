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

## Build the base image
You only need to do this when you change the dependencies

```
./init.sh
```

## Build the app image

```
docker build -t olist4e/olga-resume .
docker push olist4e/olga-resume
```

## Deploy the image

```
ssh dev.ohworth.com
sudo salt-call state.highstate
```


