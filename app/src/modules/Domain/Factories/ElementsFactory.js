import PubSub from 'pubsub-js';

import { ElementType } from '../Enums/Elements';
import { topic } from '../Enums/PubSubTopics';
import { ContainerLayoutType } from '../Enums/ContainerLayoutTypes';

class ElementsFactory {
    static guidCounter = 1;

    createElement(type, parent, width, height) {
        console.log("Creating element " + type);
        switch (type) {
            case ElementType.Container: return this.createContainer(parent, width, height);
            case ElementType.Label:     return this.createLabel(parent, width, height);
            case ElementType.Image:     return this.createImage(parent, width, height);
            case ElementType.Button:    return this.createButton(parent, width, height);
        }

        return this._createBoilerplate(parent, width, height);
    }

    copyElement(origin) {
        var newElement = this.createElement(origin.meta.type, 
                                            origin.parent, 
                                            origin.properties.width, 
                                            origin.properties.height);

        newElement.properties = JSON.parse(JSON.stringify(origin.properties));  
        newElement.meta = JSON.parse(JSON.stringify(origin.meta));
        return newElement;
    }

    createContainer(parent, width, height) {
        var container = this._createBoilerplate(parent, width, height);

        container.id = "container@" + this._makeUniqueIdentifier();
        container.properties.name = "Container";
        container.properties.layoutType = ContainerLayoutType.Free;
        container.meta.type = ElementType.Container;

        return container;
    }

    createLabel(parent, width, height) {
        var label = this._createBoilerplate(parent, width, height);
        
        label.id = "label@" + this._makeUniqueIdentifier();
        label.properties.name = "Label";
        label.properties.text = "text";
        label.properties.textSize = 13;
        label.properties.bgColor = "#000000";
        label.meta.type = ElementType.Label;

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
        button.properties.text = "Button";
        button.properties.textSize = 13;
        button.properties.textColor = "#000000";
        button.properties.bgColor = "#ffffff";
        button.properties.borderColor = "#44cc44";
        button.properties.strokeWidth = 3;
        button.properties.borderRadius = 3;
        button.properties.shadowOffsetX = 5;
        button.properties.shadowOffsetY = 5;
        button.properties.shadowBlur = 5;
        button.properties.shadowColor = "#aaaaaa";
        button.properties.contentVerAlignment = 'center';
        button.properties.contentHorAlignment = 'center';
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
                visible: true,
                name: "undefined_name",
                x: 0,
                y: 0,
                width: width,
                height: height,
                contentVerAlignment: 'top',
                contentHorAlignment: 'left'
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


        model.setVisible = function(value) {
            if (model.content)
            {
                for (var ch of model.content)
                {
                    ch.setVisible(value);
                }
            }

            PubSub.publish(topic.ElemPropertyChanged, {
                key: 'visible',
                value: value,
                model: model
            });
        }

        model.remove = function() {
            if (model.content)
            {
                for (var ch of model.content)
                {
                    PubSub.publish(topic.ElemRemoved, { model: ch } );
                }
            }

            model.parent.content = model.parent.content.filter((value) => { return value != model; });
            model.parent.commit();

            PubSub.publish(topic.ElemSelectionChanged, {
                oldSel: model,
                newSel: model.parent.getRoot()
            })
           
            PubSub.publish(topic.ElemRemoved, { model: model } );
        }

        model.duplicate = function() {
            var copy = this.copyElement(model);
            model.parent.content.push(copy);
            model.parent.commit();
            PubSub.publish(topic.ElemCreated, copy);
        }.bind(this)

        return model;
    }

    _makeUniqueIdentifier() {
        ElementsFactory.guidCounter = ElementsFactory.guidCounter+1;
        return ElementsFactory.guidCounter;
    }
}

export default ElementsFactory;
