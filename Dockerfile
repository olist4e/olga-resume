FROM olga-resume-base

# Add code
ADD . /opt/local/resume

# Move installed packages to appropriate place
RUN ln -s /opt/nodedeps/node_modules /opt/local/resume

# Build app
WORKDIR /opt/local/resume
RUN cd /opt/local/resume && gulp build

# Add configuration
# RUN rm -rf /etc/nginx/sites-enabled/default
# ADD conf/olga-resume.conf /etc/nginx/sites-enabled/olga-resume.conf

CMD ["/opt/local/resume/data/dataServer/bin/www"]
