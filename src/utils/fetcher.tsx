import axios from 'axios'

const urlBase =
    process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL
        : process.env.NEXT_PUBLIC_BACKEND_URL

export const apiCaller = axios.create({
    baseURL: `${urlBase}`,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    withCredentials: true,
})