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

    copyElement(origin, parent) {
        console.log("Copying " +  origin.meta.type);
        var newElement = this.createElement(
            origin.meta.type, 
            parent ? parent : origin.parent, 
            origin.properties.width, 
            origin.properties.height
        );

        console.log("new id: " + newElement.id);

        newElement.properties = JSON.parse(JSON.stringify(origin.properties));  
        newElement.meta = JSON.parse(JSON.stringify(origin.meta));

        origin.content.map((el) => { newElement.content.push(this.copyElement(el, newElement)) });

        return newElement;
    }

    createContainer(parent, width, height) {
        var container = this._createBoilerplate(parent, width, height);

        container.id = "container@" + this._makeUniqueIdentifier();
        container.properties.name = "Container";
        container.properties.layoutType = ContainerLayoutType.Free;
        container.properties.bgColor = "#ffffff00";
        container.properties.borderColor = "#ffffff00";
        container.properties.strokeWidth = 0;
        container.properties.borderRadius = 0;
        container.properties.shadowOffsetX = 0;
        container.properties.shadowOffsetY = 0;
        container.properties.shadowBlur = 0;
        container.properties.shadowColor = "#ffffff";
        container.meta.type = ElementType.Container;

        return container;
    }

    createLabel(parent, width, height) {
        var label = this._createBoilerplate(parent, width, height);
        
        label.id = "label@" + this._makeUniqueIdentifier();
        label.properties.height = 20;
        label.properties.width = 140;
        label.properties.name = "Label";
        label.properties.text = "Place for your text.";
        label.properties.textColor = "#000000";
        label.properties.textSize = 13;
        label.properties.fontFamily = 'Calibri';
        label.properties.bgColor = "#ffffff00";
        label.properties.borderColor = "#ffffff00";
        label.properties.strokeWidth = 0;
        label.properties.borderRadius = 0;
        label.properties.shadowOffsetX = 0;
        label.properties.shadowOffsetY = 0;
        label.properties.shadowBlur = 0;
        label.properties.shadowColor = "#ffffff";
        label.meta.type = ElementType.Label;

        return label;
    }

    createImage(parent, width, height) {
        var image = this._createBoilerplate(parent, width, height);

        image.id = "image@" + this._makeUniqueIdentifier();
        image.properties.name = "Image";
        image.properties.height = 64;
        image.properties.width = 64;
        image.properties.src = "https://cdn1.iconfinder.com/data/icons/social-17/48/photos2-512.png";
        image.meta.type = ElementType.Image;
        
        return image;
    }

    createButton(parent, width, height) {
        var button = this._createBoilerplate(parent, width, height);

        button.id = "button@" + this._makeUniqueIdentifier();
        button.properties.height = 60;
        button.properties.width = 100;
        button.properties.name = "Button";
        button.properties.text = "Press";
        button.properties.textSize = 20;
        button.properties.fontFamily = 'Calibri';
        button.properties.textColor = "#ffffff";
        button.properties.bgColor = "#266ee2";
        button.properties.borderColor = "#266ee2";
        button.properties.strokeWidth = 0;
        button.properties.borderRadius = 6;
        button.properties.shadowOffsetX = 5;
        button.properties.shadowOffsetY = 5;
        button.properties.shadowBlur = 6;
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
            copy.content.map((el) => PubSub.publish(topic.ElemCreated, el));
        }.bind(this)

        return model;
    }

    _makeUniqueIdentifier() {
        ElementsFactory.guidCounter = ElementsFactory.guidCounter+1;
        return ElementsFactory.guidCounter;
    }
}

export default ElementsFactory;
