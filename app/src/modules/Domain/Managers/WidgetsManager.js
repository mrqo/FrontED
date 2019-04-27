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
        } else if (widget instanceof StructureWidget) {
            this._initStructureSubs.bind(widget)()
        } else if (widget instanceof EditingWidget) {
            this._initEditingSubs.bind(widget)()
        } else if (widget instanceof PropertiesWidget) {
            console.log("PROPERTY SUBS")
            this._initPropertiesSubs.bind(widget)()
        } else {
            console.log("Could not match widget.")
        }
    }

    // Has context of ControlsWidget
    _initControlsSubs() {
        
    }

    // Has context of StructureWidget
    _initStructureSubs() {
        this._modelChangedEventToken = PubSub.subscribe(
            topic.ModelChanged, 
            this.onModelChangedCb.bind(this)
        );
    }

    // Has context of EditingWidget
    _initEditingSubs() {
        this._modelChangedEventCbToken = PubSub.subscribe(
            topic.ModelChanged, 
            this.onModelChangedCb.bind(this)
        );

        this._selectionChangedCbToken = PubSub.subscribe(
            topic.ElemSelectionChanged,
            this.onSelectionChangedCb.bind(this)
        );

        this._elemCreatedCbToken = PubSub.subscribe(
            topic.ElemCreated,
            this.onElemCreatedCb.bind(this)
        );
    }

    // Has context of PropertiesWidget
    _initPropertiesSubs() {
        this._selectionChangedCbToken = PubSub.subscribe(
            topic.ElemSelectionChanged, 
            this.onSelectionChangedCb.bind(this)
        );
    }
}

export default WidgetsManager