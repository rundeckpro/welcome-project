import {Argv} from'yargs'
import {createWaitForRundeckReady, updateProperty, asyncForEach, loadConfigYaml, runeckLoginToken} from '../lib/util'
import { Rundeck, PasswordCredentialProvider}from 'ts-rundeck'
import * as FS from '../async/fs'
import YAML from 'yaml'

interface Opts {
    rundeck_url: string,
    username: string,
    password: string,
    config_file: string,
    path: string,
    debug: boolean
}

interface Project {
    name: string,
    archive: string,
    configuration: ProjectConfigurations[]
}

interface ProjectConfigurations {
    key: string,
    value: string
}


class ProjectUpdateCommand {
command = "updateProject"
describe = "Update projects key"

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
        const rundeckUrl = opts.rundeck_url
        const path = opts.path;
        const config_file = path + '/' + opts.config_file

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

        console.log("----------------------------------")

        const file = await FS.readFile(config_file, 'utf8')
        const config = loadConfigYaml(file)

        const projects: Project[] = config.projects;
        console.log("----------------------------------");
        console.log("configuring projects");
        console.log("----------------------------------");

        await asyncForEach(projects, async (project) => {
            console.log('Importing project: ' + project.name);
            console.log("----------------------------------");

            if(project.configuration!=null){
                await asyncForEach(project.configuration, async (config) => {
                    console.log('config: ' +config.key);
                    console.log('value: ' +config.value.toString());

                    await updateProperty(client, project.name, config.key.toString(), config.value.toString())
                });
            }
            console.log("----------------------------------");

        });

        console.log("----------------------------------")
        console.log("finish")


    }

}

module.exports = new ProjectUpdateCommand()