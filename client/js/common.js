axios.defaults.baseURL = "http://localhost:5002";
axios.interceptors.request.use(
  function (config) {
    console.log(config);
    const configUrl = config.url;
    if (configUrl.includes("auth/admin")) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "access_token"
      )}`;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
