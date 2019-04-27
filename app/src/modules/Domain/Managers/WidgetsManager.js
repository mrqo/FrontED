import PubSub from 'pubsub-js';

import { topic } from '../Enums/PubSubTopics';

import ControlsWidget from '../../Manipulation/components/ControlsWidget';
import StructureWidget from '../../Manipulation/components/StructureWidget';
import EditingWidget from '../../Design/components/EditingWidget';
import PropertiesWidget from '../../Customization/components/PropertiesWidget';

class WidgetsManager {
    constructor() { }

    initSubscriptions(widget) {
        if (widget instanceof ControlsWidget) {
            this._initControlsSubs.bind(widget)()
        }
        if (widget instanceof StructureWidget) {
            this._initStructureSubs.bind(widget)()
        }
        if (widget instanceof EditingWidget) {
            this._initEditingSubs.bind(widget)()
        }
        if (widget instanceof PropertiesWidget) {
            this._initPropertiesSubs.bind(widget)()
        }
    }

    // Has context of ControlsWidget
    _initControlsSubs() {
        
    }

    // Has context of StructureWidget
    _initStructureSubs() {
        this._modelChangedEventToken = PubSub.subscribe(topic.ModelChanged, this.onModelChanged.bind(this));
    }

    // Has context of EditingWidget
    _initEditingSubs() {
        this._modelChangedEventToken = PubSub.subscribe(topic.ModelChanged, this.onModelChanged.bind(this));
    }

    // Has context of PropertiesWidget
    _initPropertiesSubs() {
        this._modelChangedEventToken = PubSub.subscribe(topic.ElemSelectionChanged, this.onModelChanged.bind(this));
    }
}

export default WidgetsManager