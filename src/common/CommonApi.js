import axios from "axios";

const api = axios.create({
    withCredentials: true
});

// 401 에러가 발생할 경우 AccessToken 만료 > 자동으로 refresh 요청
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 401 에러 발생 & 리프레시 API 호출이 아닌 경우 리프레시 호출
        if (error.response?.status === 401
        && !(originalRequest.method === 'PUT' && originalRequest.url === '/auth/v1/auth')) {
            //alert("401 error! access token refresh");
            try {
                await axios.put(`/member-proxy/auth/v1/auth`, {}, {
                    withCredentials: true
                });
                //alert("token refresh success");
                return api(originalRequest);
            } catch (e) {
                //alert("token refresh error, guest token create");
                await axios.post(`/member-proxy/auth/v1/auth`, {}, {
                    withCredentials: true
                });
                return api(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);

export default api;