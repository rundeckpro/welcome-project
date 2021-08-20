echo "Init Script Starting"
## Place Init Script Code here as needed.  This is run as part of DockerFile steps for Client node.

##Replace values from .env file on import.yml once it's on the docker image.
sed -i 's#AWS_ACCESS_KEY#'"$AWS_ACCESS_KEY"'#g' $CONFIG_FILE
sed -i 's#AWS_SECRET_KEY#'"$AWS_SECRET_KEY"'#g' $CONFIG_FILE

sed -i 's#AZURE_API_KEY#'"$AZURE_API_KEY"'#g' $CONFIG_FILE
sed -i 's#AZURE_CLIENTID#'"$AZURE_CLIENTID"'#g' $CONFIG_FILE
sed -i 's#AZURE_SUBSCRIPTIONID#'"$AZURE_SUBSCRIPTIONID"'#g' $CONFIG_FILE
sed -i 's#AZURE_TENANTID#'"$AZURE_TENANTID"'#g' $CONFIG_FILE



sed -i 's#GCP_PROJECTID#'"$GCP_PROJECTID"'#g' $CONFIG_FILE
sed -i 's#GCP_ZONE#'"$GCP_ZONE"'#g' $CONFIG_FILE
sed -i 's#GCP_KEY_PATH#'"$GCP_KEY_PATH"'#g' $CONFIG_FILE

sed -i 's#OCI_TENANTID#'"$OCI_TENANTID"'#g' $CONFIG_FILE
sed -i 's#OCI_FINGERPRINT#'"$OCI_FINGERPRINT"'#g' $CONFIG_FILE
sed -i 's#OCI_USERID#'"$OCI_USERID"'#g' $CONFIG_FILE
sed -i 's#OCI_REGION#'"$OCI_REGION"'#g' $CONFIG_FILE
sed -i 's#OCI_KEY_PATH#'"$OCI_KEY_PATH"'#g' $CONFIG_FILE

cat $CONFIG_FILE

chmod +x bin/cli

# Load Rundeck Information (Projects, Users, etc.)
./bin/cli load --rundeck_url $RUNDECK_URL --config_file "$CONFIG_FILE" --path /rundeck-cli
./bin/cli updateProject --rundeck_url $RUNDECK_URL --config_file "$CONFIG_FILE" --path /rundeck-cli
./bin/cli addUsers --rundeck_url $RUNDECK_URL --config_file "$CONFIG_FILE" --path /rundeck-cli
