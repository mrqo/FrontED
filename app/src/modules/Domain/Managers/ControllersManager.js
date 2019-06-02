import PubSub from 'pubsub-js';

import { elementType } from '../Enums/Elements';
import { topic } from '../Enums/PubSubTopics';

import ElementsFactory from '../Factories/ElementsFactory';

import SolutionController from '../Controllers/SolutionController';
import PropertiesController from '../Controllers/PropertiesController';
import StructureController from '../Controllers/StructureController';


class ControllersManager {
    constructor() {
        this._elementsFactory = new ElementsFactory();

        this._structureController = new StructureController(this._elementsFactory);
        this._solutionController = new SolutionController(this._structureController);
        this._propertiesController = new PropertiesController(this._structureController);
    }

    get solutionController() {
        return this._solutionController;
    }

    get structureController() {
        return this._structureController;
    }

    get propertiesController() {
        return this._propertiesController;
    }

    initSubscriptions() {
        this._initStructureSubs.bind(this._structureController)()
        this._initSolutionSubs.bind(this._solutionController)()
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

    // Has context of SolutionController
    _initSolutionSubs() {
        this._saveProjectCbToken = PubSub.subscribe(
            topic.SaveProject,
            this.onSaveProjectCb.bind(this)
        );

        this._onNewProjectCbToken = PubSub.subscribe(
            topic.NewProjectRequested,
            this.onNewProjectCb.bind(this)
        );

        this._onFetchProjectsListCb = PubSub.subscribe(
            topic.FetchProjectsListRequested,
            this.onFetchProjectsListCb.bind(this)
        );

        this._onPreviewProjectCb = PubSub.subscribe(
            topic.PreviewProjectRequested,
            this.onPreviewProjectCb.bind(this)
        );
        
        this._onGenerateProjectCb = PubSub.subscribe(
            topic.GenerateProjectRequested,
            this.onGenerateProjectCb.bind(this)
        );
    }

    // Has context of PropertiesController
    _initPropertiesSubs() {
        this._selectionChangedCbToken = PubSub.subscribe(
            topic.ElemSelectionChanged,
            this.onSelectionChangedCb.bind(this)
        );

        this._propertyChangedCbToken = PubSub.subscribe(
            topic.ElemPropertyChanged,
            this.onPropertyChangedCb.bind(this)
        )
    }
}

export default ControllersManager;
