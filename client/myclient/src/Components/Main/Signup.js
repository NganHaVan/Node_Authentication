import React, { Component } from 'react'
import {Grid,Button,Form,Header,Message,Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class Signup extends Component {
    constructor(){
        super();
        this.state={
            data:{
                username:'',
                email:'',
                password:'',
                passConfirm:''
            },
            error:{}
        }
    }
    handleChange=(e,{name,value})=>{
        this.setState({
            data:{...this.state.data,[name]:value}
            // passConfirm:this.refs
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state);
    }
    
    render() {
        return (
            <div className='login-form'>
                <Grid textAlign='center' style={{height:'100%', marginTop:50}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth:500}}>
                <Form>
                <Segment raised>
                <Header as='h2' color='blue' textAlign='center'>Please fill in signup form</Header>
                <Form.Input fluid icon='user' iconPosition='left' type='text' placeholder='Username' required name='username' id='username' value={this.state.data.username} onChange={this.handleChange}/>
                <Form.Input fluid icon='mail' iconPosition='left' type='email' placeholder='Email' name='email' id='email' value={this.state.data.email} required onChange={this.handleChange}/>
                <Form.Input fluid icon='privacy' iconPosition='left' type='password' placeholder='Password' name='password' id='password' value={this.state.data.password} required onChange={this.handleChange}/>
                <Form.Input fluid icon='privacy' iconPosition='left' type='password' placeholder='Password Confirm' name='passConfirm' id='passConfirm' refs={this.state.passConfirm} required onChange={this.handleChange}/>
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
