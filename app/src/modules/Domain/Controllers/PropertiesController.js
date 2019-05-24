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
        this.setProperty(data.key, data.value, data.model);      
    }

    setProperty(key, value, model) {
        if (!model)
          model = this._curSelModel; // currently selected model by default

        if (!model)
            return;

        console.log("Setting property '" + key + "' to: " + value);
        model.properties[key] = value;
        model.commit();
    }
}

export default PropertiesController;
