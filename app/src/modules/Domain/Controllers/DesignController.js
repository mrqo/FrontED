class DesignController {
    name = 'DesignController';

    constructor(structureController) {
        this._structureController = structureController;
    }

    onSelectionChangedCb(msg, data) {
        console.log(msg, data);
    }
}

export default DesignController;
