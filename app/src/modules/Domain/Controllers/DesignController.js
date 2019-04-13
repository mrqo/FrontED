class DesignController {
    name = 'DesignController';

    constructor(structureController) {
        this._structureController = structureController;
    }

    // PubSub Callback
    onSelectionChanged(msg, data) {
        console.log("design")
        console.log(msg)
    }
}

export default DesignController;
