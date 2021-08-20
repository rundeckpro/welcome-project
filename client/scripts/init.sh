echo "Init Script Starting"
## Place Init Script Code here as needed.  This is run as part of DockerFile steps for Client node.

cat $CONFIG_FILE

chmod +x bin/cli

# Load Rundeck Information (Projects, Users, etc.)
./bin/cli load --rundeck_url $RUNDECK_URL --config_file "$CONFIG_FILE" --path /rundeck-cli
./bin/cli updateProject --rundeck_url $RUNDECK_URL --config_file "$CONFIG_FILE" --path /rundeck-cli
./bin/cli addUsers --rundeck_url $RUNDECK_URL --config_file "$CONFIG_FILE" --path /rundeck-cli
