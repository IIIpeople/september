import axios from 'axios'
const service = axios.create({
    // baseURL: 'http://192.168.8.128:8335/api', // url = base url + request url
    baseURL: 'http://localhost:52199/api', // url = base url + request url
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    }
})

service.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    console.log(error);
    return Promise.reject(error);
});
service.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error);
    if (error) {
        console.log('服务器异常,请联系管理员!');
    }
    return Promise.reject(error);
});
export default service
