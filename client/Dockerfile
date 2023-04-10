ARG BUILD_DEV_IMAGE
FROM ${BUILD_DEV_IMAGE}

RUN mkdir -p /app/data
COPY acls /app/data/acls/
COPY projects /app/data/projects/
COPY import.yml /app/data/import.yml

COPY ceate-key.sh ./scripts/ceate-key.sh

RUN ls -lrt ./scripts
RUN chmod +x ./scripts/ceate-key.sh

CMD ./scripts/ceate-key.sh
