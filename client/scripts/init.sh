echo "Init Script Starting"
## Place Init Script Code here as needed.  This is run as part of DockerFile steps for Client node.

# load project
./bin/cli load --rundeck_url $RUNDECK_URL --config_file "$CONFIG_FILE" --path /rundeck-cli
