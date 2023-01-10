import {Argv} from'yargs'
import {waitForRundeckReady, asyncForEach, loadConfigYaml, runeckLoginToken, createWaitForRundeckReady} from '../lib/util'

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
    username: string,
    password: string,
    config_file: string,
    path: string,
    debug: boolean
}


interface Setting{
    key: string,
    value: string,
}

class AddSettingCommand {
command = "addSettings"
describe = "Add Rundeck Global Settings"

builder(yargs: Argv) {
        return yargs
            .option("r", {
                alias: "rundeck_url",
                describe: "Rundeck URL",
                type: 'string',
                default: false,
                require: true
            })
            .option("ru", {
                alias: "username",
                describe: "Rundeck Username",
                type: 'string',
                default: false,
                require: true
            })
            .option("rp", {
                alias: "password",
                describe: "Rundeck password",
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
        const file = await FS.readFile(config_file, 'utf8')
        const config = loadConfigYaml(file);

        const settings: Setting[]  = config.settings;

        const username = opts.username
        const password = opts.password

        await createWaitForRundeckReady(
          () => new Rundeck(new PasswordCredentialProvider(rundeckUrl, username, password), {noRetryPolicy: true, baseUri: rundeckUrl}),
          5 * 60 * 1000
        )
        console.info(`Client connected.`)

        const rundeckAuth = await runeckLoginToken(rundeckUrl, username, password)
        const token = rundeckAuth["token"]
        const client = rundeckAuth["client"]

        console.log("Rundeck started!!!");

        console.log("----------------------------------");
        console.log("Import Global Settings");
        console.log("----------------------------------");

        if (settings != null) {
            console.log("----------------------------------");
            console.log("Importing Global Settings");
            console.log("----------------------------------");

            await asyncForEach(settings, async (setting) => {
                console.log("importing setting: " + setting.key);
                console.log("value: " + setting.value);
               try{
                    const settingResponse = await client.sendRequest({
                      headers: {'Content-Type': 'application/json'},
                      baseUrl: rundeckUrl,
                      pathTemplate: "/api/38/config/save",
                      method: 'POST',
                      body: [
                        {
                          "key" : setting.key,
                          "value": setting.value
                        }
                      ]
                  });

                    let setting_resp = JSON.stringify(settingResponse)
                    console.log(setting_resp)

                }catch(e){
                    console.log("Error importing setting" + setting.key + ":" + e);
                }

        });

      }
    }
  }

module.exports = new AddSettingCommand()