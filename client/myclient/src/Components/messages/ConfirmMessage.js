import React,{Component} from 'react';
import {Message} from 'semantic-ui-react';

export default class  extends Component {
    render() {
        return (
            <div>
                <Message info 
                    icon='inbox'
                    header='Please verify your email!'
                    content='To get the latest updates, go check your email to confirm.'
                />
            </div>
        );
    }
}
