import {Argv} from'yargs'
import {waitForRundeckReady, createStoragePassword, createProject, asyncForEach, loadConfigYaml, createAcl, createWaitForRundeckReady} from '../lib/util'

import { Rundeck, PasswordCredentialProvider}from 'ts-rundeck'
import Path from 'path'
import * as FS from '../async/fs'
import { JobUuidOption } from 'ts-rundeck/dist/lib/models'
import YAML from 'yaml'
import fetch from 'node-fetch';
import FormData from 'form-data';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'

interface Opts {
    rundeck_url: string,
    config_file: string,
    path: string,
    debug: boolean
}


interface User{
    username: string,
    email: string,
}

class AddUserCommand {
command = "addUsers"
describe = "Add Rundeck Users"

builder(yargs: Argv) {
        return yargs
            .option("r", {
                alias: "rundeck_url",
                describe: "Rundeck URL",
                type: 'string',
                default: false,
                require: true
            })
            .option("f", {
                alias: "config_file",
                describe: "Config file",
                type: 'string',
                default: false,
                require: true
            })
            .option("p", {
                alias: "path",
                describe: "Path",
                type: 'string',
                default: false,
                require: true
            })
            .option('debug', {
                describe: 'Debug node process',
                type: 'boolean',
                default: false
            })
    }


    async handler(opts: Opts) {
        const rundeckUrl = opts.rundeck_url;
        const path = opts.path;
        const config_file = path + '/' + opts.config_file

        console.log("starting");
        const file = await FS.readFile(config_file, 'utf8');
        const config = loadConfigYaml(file);

        const users: User[]  = config.users;

        const username = 'admin'
        const password = 'admin'

        console.log("Waiting for Rundeck");
        await createWaitForRundeckReady(
          () => new Rundeck(new PasswordCredentialProvider(rundeckUrl, username, password), {noRetryPolicy: true, baseUri: rundeckUrl}),
          5 * 60 * 1000
        )
        console.info(`Client connected.`)

        const client = new Rundeck(new PasswordCredentialProvider(rundeckUrl, username, password), {baseUri: rundeckUrl})


        console.log("----------------------------------");
        console.log("Importing Users");
        console.log("----------------------------------");

        if (users != null) {
            console.log("----------------------------------");
            console.log("importing users");
            console.log("----------------------------------");

            await asyncForEach(users, async (usr) => {
                console.log("importing user: " + usr.username);
                console.log("email: " + usr.email);
               try{
                    const userResponse = client.sendRequest({
                      headers: {'Content-Type': 'application/json'},
                      baseUrl: rundeckUrl,
                      pathTemplate: "/api/36/secure/users/create",
                      method: 'PUT',
                      body: {
                        "username" : usr.username,
                        "email": usr.email,
                        "pwd": "admin",
                        "confirmpwd": "admin",
                        "roles": ["user"]
                      }
                    });

                    let user = JSON.stringify(userResponse)
                    console.log(user)

                }catch(e){
                    console.log("Error importing user" + usr.username + ":" + e);
                }

        });

      }
    }
  }

module.exports = new AddUserCommand()
