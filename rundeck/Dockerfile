ARG RUNDECK_IMAGE
FROM ${RUNDECK_IMAGE}

RUN sudo apt-get update
RUN sudo apt-get install -y -qq --no-install-recommends wget git curl jq iputils-ping sysstat
RUN ssh-keygen -q -t rsa -N '' -f ~/.ssh/id_rsa <<< y

COPY --chown=rundeck:root remco /etc/remco

COPY plugins/. /home/rundeck/libext
