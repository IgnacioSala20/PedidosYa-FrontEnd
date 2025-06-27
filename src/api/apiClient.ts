import axios from 'axios';

const axiosService = axios.create({
    headers: {
    'Content-Type': 'application/json',
},
});

//Interceptor para agregar el token a cada request
axiosService.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            //config.headers.Authorization = token;
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
    //Esto nos permite reenviar la petición original cuando obtengamos un nuevo token
    const originalRequest = error.config;

    //Aqui verificamos que sea 401 y que ademas se evita un loop infinito si ya se intento la request una vez.
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      //Agarramos el refresh token del localStorage
      //Si no existe, redirigimos al usuario a la página de login
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        window.location.href = '/login';
        return Promise.reject(error);
      }
      try {
        //Hacemos un request al endpoint de refresh token para obtener un nuevo access token
        //Si el refresh token es válido, se actualiza el access token y el refresh token
        //Si el refresh token ha expirado, se redirige al usuario a la página
        const response = await axios.post('http://localhost:3001/users/refresh-token', null, {
          headers: {
            'refresh-token': refreshToken,
          },
        });
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        //Reintentamos la petición original con el nuevo token
        //Esto es importante para que la petición que falló se reenvíe con el nuevo token
        //y no se pierda la información de la petición original
        return axiosService(originalRequest);
      } catch (err) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    } else {
      console.warn('No es un error 401 o ya fue reintentado');
    }
    return Promise.reject(error);
  }
);

export default axiosService;