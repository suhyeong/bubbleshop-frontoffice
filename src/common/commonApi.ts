import axios from "axios";

let isRefreshing = false;  // 토큰 갱신 중인지 플래그
let waitQueue: any[] = [];  // 대기 중인 요청들

const api = axios.create({
    withCredentials: true
});

const processQueue = (error: any) => {
    waitQueue.forEach(queue => {
        if (error) {
            queue.reject(error);
        } else {
            queue.resolve();
        }
    });
    waitQueue = [];
}

// 401 에러가 발생할 경우 AccessToken 만료 > 자동으로 refresh 요청
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 401 에러 발생 & 리프레시 API 호출이 아닌 경우 리프레시 호출
        if (error.response?.status === 401
        && !(originalRequest.method === 'PUT' && originalRequest.url === '/auth/v1/auth')) {
            //alert("401 error! access token refresh");
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    waitQueue.push({resolve, reject});
                })
                    .then(() => { return api(originalRequest); })
                    .catch(error => { return Promise.reject(error); });
            }

            isRefreshing = true;

            try {
                await axios.put(`/member-proxy/auth/v1/auth`, {}, {
                    withCredentials: true
                });
                //alert("token refresh success");
                processQueue(null);
                return api(originalRequest);
            } catch (e) {
                //alert("token refresh error, guest token create");
                await axios.post(`/member-proxy/auth/v1/auth`, {}, {
                    withCredentials: true
                });
                processQueue(e);
                return api(originalRequest);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;