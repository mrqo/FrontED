class DesignController {
    name = 'DesignController';

    constructor(structureController) {
        this._structureController = structureController;
    }

    // PubSub Callback
    onSelectionChanged(msg, data) {

    }
}

export default DesignController;