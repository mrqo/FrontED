import React from 'react';
import PubSub from 'pubsub-js';

import { withStyles } from '@material-ui/core/styles';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';

import GeneralProperties from './GeneralProperties';
import ImageProperties from './ImageProperties';
import LabelProperties from './LabelProperties';
import ButtonProperties from './ButtonProperties';
import ContainerProperties from './ContainerProperties';

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
    }

    getContent() {
        var propGroups = [];

        if (this.state.model != null)
        {
            if (this.state.modelType !== ElementType.Unknown) {
                //propGroups.push();
            }
            
            if (this.state.modelType === ElementType.Label) {
                propGroups.push(
                    <LabelProperties 
                        model={this.state.model} 
                        key={this.state.model.id}
                        onChange={this.onPropertyChanged}/>
                );
            }
    
            if (this.state.modelType === ElementType.Image) {
                propGroups.push(
                    <ImageProperties 
                        model={this.state.model}
                        key={this.state.model.id}
                        onChange={this.onPropertyChanged}/>
                );
            }

            if (this.state.modelType === ElementType.Button) {
                propGroups.push(
                    <ButtonProperties 
                        model={this.state.model}
                        key={this.state.model.id}
                        onChange={this.onPropertyChanged}/>
                );
            }

            if (this.state.modelType == ElementType.Container) {
                propGroups.push(
                    <ContainerProperties
                        model={this.state.model}
                        key={this.state.model.id}
                        onChange={this.onPropertyChanged}/>
                );
            }
    
            return (
                <div className="widget-content" width={1}>
                    { this.state.modelType !== ElementType.Unknown
                        ? <GeneralProperties
                            model={this.state.model}
                            key={this.state.model.id}
                            onChange={this.onPropertyChanged}
                        />
                        : <div/>
                    }
                    { propGroups }
                </div>
            )
        }
    }

    onModelChangedCb(msg, data) {
        //console.log("model changed");
        
        //only if currently inspected model was changed or first time selected
        if (!this.state.model || this.state.model.id == data.model.id)
        {
          this.setState({
              model: data.model,
              modelType: data.model.meta.type
          });
        }
    }

    onSelectionChangedCb(msg, data) {
        if (data.newSel)
        {
            this.setState({
                model: data.newSel,
                modelType: data.newSel.meta.type
            });
        }
    }

    onPropertyChanged(key, value) {
        PubSub.publish(topic.ElemPropertyChanged, {
            key: key,
            value: value
        });
    }
}

export default (PropertiesWidget);
