ARG RUNDECK_IMAGE
FROM ${RUNDECK_IMAGE}

RUN  sudo apt-get update && sudo apt-get upgrade -y -qq && \
     sudo apt-get install -y -qq --no-install-recommends wget git curl jq iputils-ping sysstat

COPY --chown=rundeck:root remco /etc/remco
