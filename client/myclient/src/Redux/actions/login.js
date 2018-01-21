import axios from 'axios';

export function userLoggedIn(user){
    return {
        type:'USER_LOGGED_IN',
        payload:user
    }
}

export function login(user)  {
    return (dispatch)=>{
        // get data from server
        return axios.post('/api/auth/login',user)
        .then((res)=>{
            // console.log(res.data);
            dispatch(userLoggedIn(res.data));
            localStorage.userToken=res.data.token;
            // console.log(res.data);
        })
    }
};

export function logout(){
    return (dispatch)=>{
        return axios.get('/logout')
        .then((res)=>{
            // console.log(res.data);
            dispatch({type:'USER_LOGOUT'});
            localStorage.removeItem('userToken');   
        })
    }
    
};

export function userSignUp(user){
    return (dispatch)=>{
        return axios.post('/api/auth/signup',user)
        .then((res)=>{
            dispatch({type:'USER_SIGNUP',payload:res.data});
            console.log(res.data);
        })
        .catch(err=>{throw err});
    }
}

export function userProfile(token){
    return (dispatch)=>{
        return axios({
            url:'/profile',
            method:'get',
            headers:{
                'content-type':'application/x-www-form-urlencoded',
                'authorization':token
            }
        })
        .then((res)=>{
            console.log(res.data);
            dispatch({type:'USER_PROFILE',payload:res.data});
        })
    }
};

