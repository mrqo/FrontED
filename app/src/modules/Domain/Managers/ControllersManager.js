import PubSub from 'pubsub-js';

import { elementType } from '../Enums/Elements';
import { topic } from '../Enums/PubSubTopics';

import ElementsFactory from '../Factories/ElementsFactory';

import DesignController from '../Controllers/DesignController';
import PropertiesController from '../Controllers/PropertiesController';
import StructureController from '../Controllers/StructureController';


class ControllersManager {
    constructor() {
        this._elementsFactory = new ElementsFactory();

        this._structureController = new StructureController(this._elementsFactory);
        this._designController = new DesignController(this._structureController);
        this._propertiesController = new PropertiesController(this._structureController);
    }

    get designController() {
        return this._designController;
    }

    get structureController() {
        return this._structureController;
    }

    get propertiesController() {
        return this._propertiesController;
    }

    initSubscriptions() {
        /*
        var container = this._elementsFactory.createContainer(this);
        
        var root = this._elementsFactory.createElement(elementType.Container, null, 50, 50);
        this._structureController.addElement(elementType.Label, root, 10, 10);
        console.log(root);
        */
        
        var elemSelChangedForStructureToken = PubSub.subscribe(
            topic.ElemSelectionChanged,
            this._structureController.onSelectionChanged
                .bind(this._structureController)
        );
        
        var elemCreateForStructureToken = PubSub.subscribe(
            topic.ElemCreationRequested,
            (msg, data) => {
                this.structureController.addElement(data.type);
            }
        );

        var elemSelChangedForDesignToken = PubSub.subscribe(
            topic.ElemSelectionChanged, 
            this._designController.onSelectionChanged
                .bind(this._designController)
        );

        var elemSelChangedForPropsToken = PubSub.subscribe(
            topic.ElemSelectionChanged,
            this._propertiesController.onSelectionChanged
                .bind(this._propertiesController)
        );

        var elemPropChangedToken = PubSub.subscribe(
            topic.ElemPropertyChanged,
            this._propertiesController.onPropertyChanged
                .bind(this._propertiesController)
        )
    }
}

export default ControllersManager;