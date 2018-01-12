import React, { Component } from 'react';
import {Grid,Button,Form,Header,Message,Segment,Checkbox} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import validator from 'validator';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import InlineError from '../messages/InlineError';
import {login} from '../../Redux/actions/login';

class Login extends Component {
    state={
        data:{
            email:'',
            password:''
        },
        loading:false,
        error:{}
    }
    handleChange=(e,{name,value})=>{
        this.setState({data:{...this.state.data,[name]:value}});
        // console.log(this.state.data);
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        // console.log(this.state.data);
        const error=this.validate(this.state.data);
        this.setState({
               error,
               loading:true
            });
        /* (_.isEmpty(this.state.error))
        ?(
        this.props.history.push('/')
        )
        :(console.log('Cannot submit')); */
        if (Object.keys(error).length===0) {
            this.props.login(this.state.data)
            .then(()=>{
                if (this.props.users.success) {
                    this.props.history.push('/profile');
                } else{
                    this.setState({
                        error:{
                            global:this.props.users.message
                        }
                    })
                }
                // console.log(this.props.users);
            })
            .catch(err=>{
                console.log(err.response.data);
                this.setState({
                    error:{
                        global:err.response.data.message
                    }
                })
            })
        }
    }
    validate=(data)=>{
        const err={};
        if (!validator.isEmail(data.email)) {
            err.email='Invalid email'
        }
        if (!data.password) {
            err.password='Your password is missing'
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
                {(error.global)?(
                    <Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{error.global}</p>
                    </Message>
                ):('')}
                <Form.Input fluid icon='mail' iconPosition='left' type='email' placeholder='Email' name='email' id='email' value={this.state.data.email} onChange={this.handleChange} required error={!!error.email}/>
                {(error.email)?(<InlineError text={error.email}/>):('')}

                <Form.Input fluid icon='privacy' iconPosition='left' type='password' placeholder='Password' name='password' id='password' value={this.state.data.password} onChange={this.handleChange} required error={!!error.password}/>
                {(error.password)?(<InlineError text={error.password}/>):('')}
                <br/>
                <Checkbox label='Remember me'/>
                <br/>
                <Button color='blue' fluid size='medium' type='submit' onClick={this.handleSubmit}>Login</Button>
                </Segment>
                </Form>
                <Message attached='bottom' warning floating>New to us? <Link to='/signup'>Signup</Link></Message>
                </Grid.Column>
                </Grid>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        login
    },dispatch)
}
function mapStateToProps(state){
    return {
        users:state.user
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
