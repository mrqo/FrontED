import React from 'react';
import PubSub from 'pubsub-js';

import { withStyles } from '@material-ui/core/styles';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';

import GeneralProperties from './GeneralProperties';
import ImageProperties from './ImageProperties';
import LabelProperties from './LabelProperties';
import ButtonProperties from './ButtonProperties';

import { ElementType } from '../../Domain/Enums/Elements';
import { topic } from '../../Domain/Enums/PubSubTopics';

class PropertiesWidget extends Widget {
    state = {
        widgetName: "Properties",
        model: null,
        modelType: ElementType.Unknown,
    }

    constructor(props) {
        super(props);
        props.manager.initSubscriptions(this);
        console.log(props.manager)
    }

    getContent() {
        var propGroups = [];

        if (this.state.model != null)
        {
            console.log(this.state.model.name);
            
            if (this.state.modelType != ElementType.Unknown) {
                propGroups.push();
            }
            
            if (this.state.modelType == ElementType.Label) {
                propGroups.push(<LabelProperties/>);
            }
    
            if (this.state.modelType == ElementType.Image) {
                propGroups.push(<ImageProperties/>);
            }

            if (this.state.modelType == ElementType.Button) {
                propGroups.push(<ButtonProperties/>);
            }

            /*if (this.state.modelType == ElementType.Container) {
                propGroups.push(<ContainerProperties/>);
            }*/
    
            return (
                <div className="widget-content" width={1}>
                    { this.state.modelType != ElementType.Unknown
                        ? <GeneralProperties
                            name={this.state.model.name}
                            aliasName={""}
                        />
                        : <div/>
                    }
                    { propGroups }
                </div>
            )
        }
    }

    onSelectionChangedCb(msg, data) {
        this.setState({
            model: data.newSel,
            modelType: data.newSel.meta.type
        });
    }
}

export default (PropertiesWidget);
