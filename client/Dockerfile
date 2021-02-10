FROM node:12.20.1

RUN  apt-get update && apt-get upgrade -y -qq && \
     apt-get install -y -qq --no-install-recommends wget git curl jq

# install node
#ARG NODE_VERSION="setup_12.x"

#RUN curl -sL https://deb.nodesource.com/${NODE_VERSION}  | bash -
#RUN DEBIAN_FRONTEND="noninteractive" apt-get -y install nodejs npm

RUN mkdir /rundeck-cli /scripts
COPY rundeck-cli /rundeck-cli
COPY project /rundeck-cli/projects
COPY import.yml /rundeck-cli

COPY scripts /scripts
RUN chmod +x /scripts/init.sh

WORKDIR /rundeck-cli

RUN npm install

CMD /scripts/init.sh
