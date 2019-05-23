import PubSub from 'pubsub-js';

import { ElementType } from '../Enums/Elements';
import { topic } from '../Enums/PubSubTopics';

class ElementsFactory {
    createElement(type, parent, width, height) {
        switch (type) {
            case ElementType.Container: return this.createContainer(parent, width, height);
            case ElementType.Label:     return this.createLabel(parent, width, height);
            case ElementType.Image:     return this.createImage(parent, width, height);
            case ElementType.Button:    return this.createButton(parent, width, height);
        }

        return this._createBoilerplate(parent, width, height);
    }

    createContainer(parent, width, height) {
        var container = this._createBoilerplate(parent, width, height);

        container.id = "containter@" + this._makeUniqueIdentifier();
        container.properties.name = "Container";
        container.meta.type = ElementType.Container;

        return container;
    }

    createLabel(parent, width, height) {
        var label = this._createBoilerplate(parent, width, height);
        
        label.id = "label@" + this._makeUniqueIdentifier();
        label.properties.name = "Label";
        label.properties.text = "text";
        label.properties.textSize = 13;
        label.meta.type = ElementType.Label;
        label.properties.bgColor = "#000000";

        return label;
    }

    createImage(parent, width, height) {
        var image = this._createBoilerplate(parent, width, height);

        image.id = "image@" + this._makeUniqueIdentifier();
        image.properties.name = "Image";
        image.properties.src = "source";
        image.meta.type = ElementType.Image;
        
        return image;
    }

    createButton(parent, width, height) {
        var button = this._createBoilerplate(parent, width, height);

        button.id = "button@" + this._makeUniqueIdentifier();
        button.properties.name = "Button";
        button.properties.text = "button";
        button.properties.textSize = 13;
        button.properties.textColor = "#000000";
        button.properties.bgColor = "#ffffff";
        button.properties.borderColor = "#44cc44";
        button.properties.strokeWidth = 3;
        button.properties.borderRadius = 3;
        button.meta.type = ElementType.Button;
                
        return button;
    }

    _createBoilerplate(parent, width, height) {
        const DEF_WIDTH = 120;
        const DEF_HEIGHT = 60;

        width  = width  === undefined ? DEF_WIDTH  : width;
        height = height === undefined ? DEF_HEIGHT : height;

        var model = {
            parent: parent,
            id: "" + this._makeUniqueIdentifier(),
            properties: {
                name: "undefined_name",
                x: 0,
                y: 0,
                width: width,
                height: height
            },
            content: [],
            meta: {
                type: ElementType.Unknown
            }
        };

        model.commit = function() {
            PubSub.publish(topic.ModelChanged, {
                model: model   
            });
        };

        model.getRoot = function() {
            var _getRoot = function(node) {
                if (node.parent == null)
                    return node;
                return _getRoot(node.parent);
            };

            return _getRoot(model);
        }

        return model;
    }

    _makeUniqueIdentifier() {
        return 0;
    }
}

export default ElementsFactory;
