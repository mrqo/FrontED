class PropertiesController {
    name = 'PropertiesController';

    constructor(structureController) {
        this._structureController = structureController;
        this._curSelection = null;
    }

    onSelectionChangedCb(msg, data) {
        this._curSelection = data.new;
    }

    // PubSub Callback
    onPropertyChangedCb(msg, data) {

    }
}

export default PropertiesController;