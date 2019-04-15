import PubSub from 'pubsub-js';

import { elementType } from '../Enums/Elements';
import { topic } from '../Enums/PubSubTopics';

class ElementsFactory {
    createElement(type, parent, width, height) {
        switch (type) {
            case elementType.Container: return this.createContainer(parent, width, height);
            case elementType.Label: return this.createLabel(parent, width, height);
            case elementType.Image: return this.createImage(parent, width, height);
        }

        return this._createBoilerplate(parent, width, height);
    }

    createContainer(parent, width, height) {
        var container = this._createBoilerplate(parent, width, height);

        // #TODO: Configure container properties here
        container.name = "Container";
        container.meta.type = elementType.Container;

        return container;
    }

    createLabel(parent, width, height) {
        var label = this._createBoilerplate(parent, width, height);

        // #TODO: Configure label properties here
        label.name = "Label";
        label.content.text = "text";
        label.meta.type = elementType.Label;

        return label;
    }

    createImage(parent, width, height) {
        var image = this._createBoilerplate(parent, width, height);
        
        // #TODO: Configure image properties here
        image.name = "Image"
        image.content.src = "source";
        image.meta.type = elementType.Image;
        
        return image;
    }

    _createBoilerplate(parent, width, height) {
        var model = {
            parent: parent,
            id: "id",
            name: "unk",
            properties: {
                width: width,
                height: height,
            },
            content: [],
            meta: {
                type: elementType.Unknown
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