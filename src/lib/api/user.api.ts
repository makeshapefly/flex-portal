import axios from 'axios';
import { PUBLIC_BE_WEB_USER_ENDPOINT } from '$env/static/public';
import { persisted } from 'svelte-persisted-store'
import type { WebUser } from '../../types/webUser';
import { get } from 'svelte/store'
//import { token } from '$lib/stores/stores';

axios.interceptors.request.use((config) => {
    console.log('Outgoing request:');
    console.log('URL:', config.url);
    console.log('Method:', config.method);
    console.log('Headers:', config.headers);
    console.log('Data:', config.data);
    return config;
}, (error) => {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
});

console.log(PUBLIC_BE_WEB_USER_ENDPOINT)

/*export const createUser = async (webUser: WebUser) => {
    try {
        const idToken = get(token);
        const accessToken = idToken.id
        const res = await axios.post(PUBLIC_BE_WEB_USER_ENDPOINT, {
            name: webUser.name,
            firebaseUid: webUser.firebaseUser?.uid,
            customer: webUser.customer
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        let user = res.data;
    } catch (e) {
        console.log("errrr: " + e)
    }
} */

export const getUser = async (uid: string, token: string) => {
    try {
        const res = await axios.get("http://localhost:3000/user/id/" + uid, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        let user = res.data;
        return user;
    } catch (e) {
        console.log(e)
    }
}
