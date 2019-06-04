import CircularJSON from 'circular-json';
import PubSub from 'pubsub-js';

import { topic } from '../../Domain/Enums/PubSubTopics';

import * as SessionManager from '../Managers/SessionManager';

class SolutionController {
    name = 'SolutionController';

    constructor(structureController) {
        this._structureController = structureController;
    }

    onSaveProjectCb(msg, data) {
        console.log(data);
        let jsonStringSource = CircularJSON.stringify(this._structureController.elementRoot);
        
        SessionManager.saveProject(data["id"], data["name"], jsonStringSource)
        .then(function(response) {
            console.log(response);
        });
    }

    onGenerateProjectCb(msg, data) {
        SessionManager.generateProject(data.projectId)
        .then(function(response) {
            console.log(response["result"])
            // note that there is big change this will fail:
            // if e.g.:
            // json is invalid or
            // backend can't handle this json
        });
    }

    onFetchProjectsListCb(msg, data) {
        // get projects from database
        SessionManager.getProjects()
        .then(function(response) {
            // returns list of projects, in this format:
            // [
            //     {id: 1, name: "TestName", source: "Not blank!"},
            //     {id: 2, name: "TestName2", source: "Testing is the future"},
            // ]
            console.log(response);
            if (response == false) {
                PubSub.publish(topic.FetchProjectsListFailed, {});
            } else {
                PubSub.publish(topic.FetchProjectsListCompleted, response);
            }
        });
    }

    onNewProjectCb(msg, data) {
        SessionManager.addProject(data.nameProject, data.sourceProject)
        .then(function(response) {
               let id = response["id"]; // save this to handle generating later
               let name = response["name"]; // save this too (to pass this on save)
               let source = response["source"];
        });
    }

    onPreviewProjectCb(msg, data) {
        window.open(`http://127.0.0.1:8000/ed/projects/preview/${data.projectId}/html/`);
    }
}

export default SolutionController;
