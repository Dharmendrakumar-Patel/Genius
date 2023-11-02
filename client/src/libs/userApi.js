import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_API

export const signup = (fullName,email,password) => {
    return axios
        .post(`${backendUrl}/signup`, {
            fullName,
            email,
            password   
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            return res.data
        }).catch(err => {
            console.log(err)
        })
};

export const login = (email,password) => {
    console.log(email,password)
    return axios
        .post(`${backendUrl}/login`, {
            email,
            password
        },{
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then(res => {
            localStorage.setItem('token', res?.data?.token)
            return res.data
        }).catch(err => {
            console.log(err)
        })
};

export const logout = () => {
    return axios
        .get(`${backendUrl}/logout`)
        .then(res => {
            localStorage.removeItem('token')
            return res.data
        }).catch(err => {
            console.log(err)
        })  
};

export const getUserByToken = (token) => { 
    return axios
        .post(`${backendUrl}/getUserByToken`, {
            token
        },{
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
};

export const deleteUser = (userId) => {
    console.log(userId)
    return axios
        .delete(`${backendUrl}/deleteUser/${userId}`,{
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then(res => {
            return res.data
        }).catch(err => {
            console.log(err)
        })
};

export const isLoggedIn = () => {
    if (localStorage.getItem('token')) {
        return true;
    }else{
        return false;
    }
};
