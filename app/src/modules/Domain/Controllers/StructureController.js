
import PubSub from 'pubsub-js';
import { topic } from '../Enums/PubSubTopics';

class StructureController {
    constructor(elementsFactory) {
        this._elementsFactory = elementsFactory;
        this._elementRoot = this._elementsFactory.createElement();
        this._selectedNode = this._elementRoot;
    }

    get selectedNode() {
        return this._selectedNode; 
    }

    onSelectionChanged(msg, data) {
        console.log(data);
        this._selectedNode = data.newSel;
        console.log("StructureController: Selection changed to");
        console.log(this._selectedNode);
    }

    addElement(type, width, height) {
        this._addElement(type, this.selectedNode, width, height);
    }

    _addElement(type, parent, width, height) {
        if (parent == null)
            return false;
        
        var elem = this._elementsFactory.createElement(type, parent, width, height);
        parent.content.push(elem);
        parent.commit();
        return elem;
    }

    removeElement(elemId) {
    
    }
}

export default StructureController;