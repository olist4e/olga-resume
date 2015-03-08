FROM olga-resume-base

# Add code
ADD . /opt/local/resume

# Move installed packages to appropriate place
RUN rm -rf /opt/local/resume/node_modules && ln -s /opt/nodedeps/node_modules /opt/local/resume

# Build app
WORKDIR /opt/local/resume
RUN cd /opt/local/resume && gulp bower-install && gulp build

# Add configuration
# RUN rm -rf /etc/nginx/sites-enabled/default
# ADD conf/olga-resume.conf /etc/nginx/sites-enabled/olga-resume.conf

EXPOSE 3000
CMD ["/opt/local/resume/bin/www"]
