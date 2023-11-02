import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_API;

export const createNewMessage = (message, userId) => {
    return axios
        .post(`${backendUrl}/createMessage`, {
            message,
            userId
        }, {
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

export const getMessages = (userId) => {
    return axios
        .post(`${backendUrl}/getAllMessages`, {
            userId
        }, {
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

export const removeMessage = (messageId) => {
    return axios
        .delete(`${backendUrl}/removeMessage`, {
            data: {
                messageId
            },
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