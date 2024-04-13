import axios from 'axios'

const urlBase =
    process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL
        : process.env.NEXT_PUBLIC_BACKEND_URL

export const apiCaller = axios.create({
    baseURL: `${urlBase}`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})