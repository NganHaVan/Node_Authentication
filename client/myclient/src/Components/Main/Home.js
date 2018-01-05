import React, { Component } from 'react';
import {Container,Header,Button,Segment,Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div>
            <Segment textAlign='center' style={{marginTop:'10%'}} vertical>
                <Container>
                <Header as='h1' content='Welcome to my website'/>
                <Header as='h3' content='Do whatever you want in my website'/>  
                <Button as={Link} to='/login' color='violet' size='huge'>Getting started
                <Icon name='right arrow'/></Button>  
                </Container>
            </Segment>
            </div>
        )
    }
}
