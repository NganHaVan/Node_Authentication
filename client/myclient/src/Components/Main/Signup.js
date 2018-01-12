import React, { Component } from 'react'
import {Grid,Button,Form,Header,Message,Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class Signup extends Component {
    render() {
        return (
            <div className='login-form'>
                <Grid textAlign='center' style={{height:'100%', marginTop:50}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth:500}}>
                <Form>
                <Segment raised>
                <Header as='h2' color='blue' textAlign='center'>Please fill in signup form</Header>
                <Form.Input fluid icon='user' iconPosition='left' type='text' placeholder='Username' required name='username' id='username' onChange={this.handleChange}/>
                <Form.Input fluid icon='mail' iconPosition='left' type='email' placeholder='Email' name='email' id='email' required onChange={this.handleChange}/>
                <Form.Input fluid icon='privacy' iconPosition='left' type='password' placeholder='Password' name='password' id='password' required onChange={this.handleChange}/>
                <Form.Input fluid icon='privacy' iconPosition='left' type='password' placeholder='Password Confirm' name='passConfirm' id='passConfirm' required onChange={this.handleChange}/>
                <Button style={{marginTop:8}} color='blue' fluid size='medium' onClick={this.handleSubmit}>Signup</Button>
                </Segment>
                </Form>
                <Message attached='bottom' warning floating>Already had an account. Please <Link to='/login'>Login</Link></Message>
                </Grid.Column>
                </Grid>
            </div>
        )
    }
}
