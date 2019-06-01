import PubSub from 'pubsub-js';
import { topic } from '../Enums/PubSubTopics';
import * as SessionManager from '../Managers/SessionManager';


class StructureController {
    constructor(elementsFactory) {
        this._elementsFactory = elementsFactory;
        this._elementRoot = this._elementsFactory.createElement();
        this._selectedNode = this._elementRoot;
    }

    get selectedNode() {
        return this._selectedNode;
    }

    onSelectionChangedCb(msg, data) {
        this._selectedNode = data.newSel;
    }

    onCreationRequestedCb(msg, data) {
        this.addElement(data.type);
    }

    onSaveProjectCb(msg, data) {
        console.log(msg);
        console.log(data);
        console.log(this._elementRoot);

/*
        // id, name, source
        // remember to convert JSON SOURCE to String(JSON) source
        SessionManager.saveProject(projectId, "changeNameToThis", "changeSourceToThis")
        .then(function(response) {
               // it returns the same as newProject: id, name, source
        })
        */
    }

    addElement(type, width, height) {
        var elem = this._addElement(type, this.selectedNode, width, height);

        PubSub.publish(topic.ElemCreated, elem);
        return elem;
    }

    _addElement(type, parent, width, height) {
        if (parent == null)
            return null;

        var elem = this._elementsFactory.createElement(type, parent, width, height);
        parent.content.push(elem);
        parent.commit();
        return elem;
    }

    removeElement(elemId) {

    }
}

export default StructureController;
