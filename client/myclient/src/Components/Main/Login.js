import React, { Component } from 'react';
import {Grid,Button,Form,Header,Message,Segment,Checkbox} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import validator from 'validator';
import _ from 'lodash';

import InlineError from '../messages/InlineError';

export default class Login extends Component {
    state={
        data:{
            email:'',
            pass:''
        },
        loading:false,
        error:{}
    }
    handleChange=(e,{name,value})=>{
        this.setState({data:{...this.state.data,[name]:value}});
        // console.log(this.state.data);
    }
    handleSubmit=()=>{
        const error=this.validate(this.state.data);
        this.setState({error:error});
        (_.isEmpty(this.state.error))
        ?(
        console.log(this.state.data)
        )
        :(console.log('Cannot submit'));
    }
    validate=(data)=>{
        const err={};
        if (!validator.isEmail(data.email)) {
            err.email='Invalid email'
        }
        if (!data.pass) {
            err.pass='Your password is missing'
        }
        return err;
    }
    render() {
        const {error}=this.state;
        return (
            <div className='login-form'>
                <Grid textAlign='center' style={{height:'100%', marginTop:80}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth:500}}>
                <Form>
                <Segment raised textAlign='left'>
                <Header as='h2' color='blue' textAlign='center'>Please fill in login form</Header>
                <Form.Input fluid icon='mail' iconPosition='left' type='email' placeholder='Email' name='email' id='email' value={this.state.data.email} onChange={this.handleChange} required error={!!error.email}/>
                {(error.email)?(<InlineError text={error.email}/>):('')}

                <Form.Input fluid icon='privacy' iconPosition='left' type='password' placeholder='Password' name='pass' id='pass' value={this.state.data.pass} onChange={this.handleChange} required error={!!error.pass}/>
                {(error.pass)?(<InlineError text={error.pass}/>):('')}
                <br/>
                <Checkbox label='Remember me'/>
                <br/>
                <Button color='blue' fluid size='medium' type='submit' onClick={this.handleSubmit}>Login</Button>
                </Segment>
                </Form>
                <Message attached='bottom' warning floating>New to us? <Link to='/signup'><a>Signup</a></Link></Message>
                </Grid.Column>
                </Grid>
            </div>
        )
    }
}
