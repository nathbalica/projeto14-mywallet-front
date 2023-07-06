import axios from "axios"

function configToken(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

function login(body) {
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/login`, body);

    return promise;
}

function signUp(body) {
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, body);

    return promise;
}


function getTransaction(token) {
    const config = configToken(token)
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/transactions`, config)

    return promise;
}

// function listHabits(token) {
//     const config = configToken(token)
//     const req = axios.get(`${BASE_URL}/habits`, config)

//     return req;
// }

// function lisHabitsToday(token) {
//     const config = configToken(token)
//     const req = axios.get(`${BASE_URL}/habits/today`, config)

//     return req;
// }

// function checkEnable(habitId, token) {
//     const config = configToken(token);
//     const req = axios.post(
//         `${BASE_URL}/habits/${habitId}/check`,
//         {},
//         config
//     );

//     return req;
// }

// function checkDisable(habitId, token) {
//     const config = configToken(token);
//     const req = axios.post(
//         `${BASE_URL}/habits/${habitId}/uncheck`,
//         {},
//         config
//     );

//     return req;
// }

// function getHistory(token) {
//     const config = configToken(token)
//     const req = axios.get(`${BASE_URL}/habits/history/daily`, config)
//     return req;
// }

const apis = {
    login,
    signUp,
    getTransaction
}

export default apis;