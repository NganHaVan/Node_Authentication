import React, { Component } from 'react'
import {Grid,Button,Form,Header,Message,Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import validator from 'validator';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import InlineError from '../messages/InlineError';
import {userSignUp} from '../../Redux/actions/login';

class Signup extends Component {
    constructor(){
        super();
        this.state={
            data:{
                username:'',
                email:'',
                password:''
            },
            passConfirm:'',
            error:{}
        }
    }
    handleChange=(e,{name,value})=>{
        this.setState({
            data:{...this.state.data,[name]:value}
        })
        // console.log(e);
    }
    handlePass=(e)=>{
        this.setState({passConfirm:e.target.value});
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const error=this.validate(this.state.data,this.state.passConfirm);
        this.setState({error});
        // console.log(this.state);
        if (Object.keys(error).length===0) {
            this.props.userSignUp(this.state.data)
            .then(()=>{
                // we are connecting signup API
                if (!this.props.users.success) {
                    this.setState({
                        error:{
                            global:this.props.users.message
                        }
                    })
                } 
                
            })
        }
    }
    validate=(data,passConfirm)=>{
        const err={};
        if (!validator.isEmail(data.email)) {
            err.email='Invalid email'
        }
        if (!data.username) {
            err.username='Your username is missing'
        }
        if (!data.password) {
            err.password='Your password is missing'
        }
        if (!passConfirm) {
            err.passConfirm='Your password confirm is missing'
        }else if (data.password!==passConfirm) {
            err.notMatch='Your passwords do not match'
        }
        return err;
    }
    render() {
        const {error}=this.state;
        return (
            <div className='login-form'>
                <Grid textAlign='center' style={{height:'100%', marginTop:50}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth:500}}>
                <Form>
                <Segment raised textAlign='left'>
                <Header as='h2' color='blue' textAlign='center'>Please fill in signup form</Header>
                {error.notMatch?(<Message negative header={error.notMatch}/>):('')}
                {error.global?(<Message negative header={error.global}/>):('')}

                <Form.Input fluid icon='user' iconPosition='left' type='text' placeholder='Username' required name='username' id='username' value={this.state.data.username} onChange={this.handleChange}/>
                {error.username?<InlineError text={error.username}/>:('')}

                <Form.Input fluid icon='mail' iconPosition='left' type='email' placeholder='Email' name='email' id='email' value={this.state.data.email} required onChange={this.handleChange}/>
                {error.email?<InlineError text={error.email}/>:('')}

                <Form.Input fluid icon='privacy' iconPosition='left' type='password' placeholder='Password' name='password' id='password' value={this.state.data.password} required onChange={this.handleChange}/>
                {error.password?<InlineError text={error.password}/>:('')}
                
                <Form.Input fluid icon='privacy' iconPosition='left' type='password' placeholder='Password Confirm' required name='passConfirm' value={this.state.passConfirm} onChange={this.handlePass}/>
                {error.passConfirm?<InlineError text={error.passConfirm}/>:('')}

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

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        userSignUp
    },dispatch)
}
function mapStateToProps(state){
    return{
        users:state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)