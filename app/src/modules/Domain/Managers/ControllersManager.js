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
        this._initStructureSubs.bind(this._structureController)()
        this._initDesignSubs.bind(this._designController)()
        this._initPropertiesSubs.bind(this._propertiesController)()
    }

    // Has context of StructureController
    _initStructureSubs() {
        this._selectionChangedCbToken = PubSub.subscribe(
            topic.ElemSelectionChanged,
            this.onSelectionChangedCb.bind(this)
        );

        this._creationRequestedCbToken = PubSub.subscribe(
            topic.ElemCreationRequested,
            this.onCreationRequestedCb.bind(this)
        );
    }

    // Has context of DesignController
    _initDesignSubs() {
        this._selectionChangedCbToken = PubSub.subscribe(
            topic.ElemSelectionChanged, 
            this.onSelectionChangedCb.bind(this)
        );
    }

    // Has context of PropertiesController
    _initPropertiesSubs() {
        this._selectionChangedCbToken = PubSub.subscribe(
            topic.ElemSelectionChanged,
            this.onSelectionChangedCb.bind(this)
        );

        this.propertyChangedCbToken = PubSub.subscribe(
            topic.ElemPropertyChanged,
            this.onPropertyChangedCb.bind(this)
        )
    }
}

export default ControllersManager;