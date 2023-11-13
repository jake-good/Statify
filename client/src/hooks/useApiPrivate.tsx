import { apiClientPrivate } from "../api/apiClient";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useApiPrivate = () => {
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = apiClientPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      apiClientPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [auth]);

  return apiClientPrivate;
};

export default useApiPrivate;
