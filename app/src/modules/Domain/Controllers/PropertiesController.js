class PropertiesController {
    name = 'PropertiesController';

    constructor(structureController) {
        this._structureController = structureController;
        this._curSelModel = null;
    }

    onSelectionChangedCb(msg, data) {
        this._curSelModel = data.newSel;
    }

    onPropertyChangedCb(msg, data) {
        this.setProperty(data.key, data.value);      
    }

    setProperty(key, value) {
        if (this._curSelModel == null)
            return;

        this._curSelModel.properties[key] = value;
        this._curSelModel.commit();
    }
}

export default PropertiesController;