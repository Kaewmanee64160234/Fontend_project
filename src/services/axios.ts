import router from "@/router";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

function delay(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

instance.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async function (config) {
    // await delay(1000);
    return config;
  // },
  // function (error) {
  //   // Do something with request error
  //   if (401 === error.response.status) {
  //     router.replace("/login");
  //   }
  //   return Promise.reject(error);
  }
);

export default instance;
