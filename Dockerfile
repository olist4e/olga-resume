FROM olga-resume-base

# Add code
ADD . /opt/local/resume

# Move installed packages to appropriate place
RUN cp -a /opt/nodedeps/node_modules /opt/local/resume

# Add configuration
ADD conf/olga-resume.conf /etc/nginx/sites-enabled/olga-resume.conf

CMD ["nginx"]
