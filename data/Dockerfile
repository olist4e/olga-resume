FROM nodesource/trusty:0.10.36

# Install Node.js and npm
#RUN apt-get update && apt-get install -y curl build-essential && curl -sL https://deb.nodesource.com/setup | sudo bash - && apt-get install -y nodejs

# Bundle app source
COPY . /opt/local/resume/data

# Install app dependencies
# RUN npm install -g gulp bower
RUN cd /opt/local/resume/data/dataServer; npm install;

EXPOSE  3000
CMD ["/opt/local/resume/data/dataServer/bin/www"]
