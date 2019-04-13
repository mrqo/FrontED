class PropertiesController {
    name = 'PropertiesController';

    constructor(structureController) {
        this._structureController = structureController;
        this._curSelection = null;
    }

    // PubSub Callback
    onSelectionChanged(msg, data) {
        this._curSelection = data.new;
    }

    // PubSub Callback
    onPropertyChanged(msg, data) {

    }
}

export default PropertiesController;