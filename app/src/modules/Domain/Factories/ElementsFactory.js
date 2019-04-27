import PubSub from 'pubsub-js';

import { ElementType } from '../Enums/Elements';
import { topic } from '../Enums/PubSubTopics';

class ElementsFactory {
    createElement(type, parent, width, height) {
        console.trace();
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

        // #TODO: Configure container properties here
        container.name = "Container";
        container.meta.type = ElementType.Container;

        return container;
    }

    createLabel(parent, width, height) {
        var label = this._createBoilerplate(parent, width, height);

        // #TODO: Configure label properties here
        label.name = "Label";
        label.content.text = "text";
        label.meta.type = ElementType.Label;

        return label;
    }

    createImage(parent, width, height) {
        var image = this._createBoilerplate(parent, width, height);
        
        // #TODO: Configure image properties here
        image.name = "Image";
        image.content.src = "source";
        image.meta.type = ElementType.Image;
        
        return image;
    }

    createButton(parent, width, height) {
        const DEF_WIDTH = 105;
        const DEF_HEIGHT = 45;

        width = width == undefined ? DEF_WIDTH : width;
        height = height == undefined ? DEF_HEIGHT : height;
        
        var button = this._createBoilerplate(parent, width, height);

        button.name = "Button";
        button.content.text = "button";
        button.meta.type = ElementType.Button;

        return button;
    }

    _createBoilerplate(parent, width, height) {
        var model = {
            parent: parent,
            id: "id",
            name: "undefined_name",
            properties: {
                x: 0,
                y: 0,
                width: width,
                height: height,
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
}

export default ElementsFactory;
