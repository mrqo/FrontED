import React from 'react';
import PubSub from 'pubsub-js';

import { withStyles } from '@material-ui/core/styles';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';

import GeneralProperties from './GeneralProperties';
import ImageProperties from './ImageProperties';
import LabelProperties from './LabelProperties';

import { elementType } from '../../Domain/Enums/Elements';
import { topic } from '../../Domain/Enums/PubSubTopics';

const styles = theme => ({
});

class PropertiesWidget extends Widget {
    state = {
        widgetName: "Properties",
        model: null,
        modelType: elementType.Unknown,
    }

    constructor(props) {
        super(props);

        this._modelChangedEventToken = PubSub.subscribe(topic.ElemSelectionChanged, this.onModelChanged.bind(this));
    }

    getContent() {
        var propGroups = [];

        if (this.state.model != null)
        {
            console.log(this.state.model.name);
            
            if (this.state.modelType != elementType.Unknown) {
                propGroups.push();
            }
            
            if (this.state.modelType == elementType.Label) {
                propGroups.push(<LabelProperties/>);
            }
    
            if (this.state.modelType == elementType.Image) {
                propGroups.push(<ImageProperties/>);
            }
    
            return (
                <div className="widget-content" width={1}>
                    { this.state.modelType != elementType.Unknown
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

    onModelChanged(msg, data) {
        this.setState({
            model: data.newSel,
            modelType: data.newSel.meta.type
        });
    }
}

export default withStyles(styles)(PropertiesWidget);