import axios from 'axios';

const axiosService = axios.create({
    headers: {
    'Content-Type': 'application/json',
},
});

// Interceptor para agregar el token a cada request
axiosService.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            //config.headers.Authorization = `Bearer ${token}`;
            config.headers.Authorization = token;
            }return config;
        },
    (error) => {
        return Promise.reject(error);
    }
);

//Con este interceptor se maneja la expiración del token
// Si el token expira, se hace un request al endpoint de refresh token y se actualiza el access token en localStorage
// Si el refresh token también ha expirado, se redirige al usuario a la página de login
axiosService.interceptors.response.use(
    (response) => response,
    async (error) => {
        //Guarda la configuración de la request original que falló.
        const originalRequest = error.config;

        //Verifica si el error es de tipo 401 (Unauthorized) y si la request original no ha sido reintentada aún.
        if (
        error.response?.status === 401 &&
        !originalRequest._retry // evita bucles infinitos
        ) {
        originalRequest._retry = true;

        //Obtenemos el refresh token del localstorage de forma que despues lo podamos pasar como parametro al endpoint de refresh token
        const refreshToken = localStorage.getItem('refreshToken');

        try {
            const response = await axios.post('/refresh-token', null, {
            headers: {
                'refresh-token': refreshToken!,
            },
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data;

            //Guardar nuevos tokens
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            //Actualizar header y reintentar la request original
            originalRequest.headers.Authorization = accessToken;
            return axiosService(originalRequest);
        } catch (err) {
            //Si no se pudo refrescar el token: lo manda al login
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(err);
        }
        }
        return Promise.reject(error);
    }
);

export default axiosService;