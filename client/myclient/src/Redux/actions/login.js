import axios from 'axios';

export function login(user)  {
    return (dispatch)=>{
        // get data from server
        return axios.post('/api/auth/login',user)
        .then((res)=>{
            dispatch({type:'USER_LOGGED_IN',payload:res.data});
            console.log(res);
        })
    }
};
