import axios, { AxiosRequestConfig, AxiosResponseTransformer } from "axios";
import humps from "humps";
import PersistenceKeys from "constants/persistenceKeys";

export const HttpClient = axios.create({
  transformResponse: [
    ...((axios.defaults.transformResponse as AxiosResponseTransformer[]) || []),
    (data) => humps.camelizeKeys(data),
  ],
});

HttpClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const newConfig = config;

  const token = localStorage.getItem(PersistenceKeys.TOKEN);

  newConfig.headers = {
    ...config.headers,
    Authorization: token ? `Bearer ${token}` : "",
  };

  if (config.params) {
    newConfig.params = humps.decamelizeKeys(config.params);
  }

  if (!(config.data instanceof FormData)) {
    humps.decamelizeKeys(config.data);
  }

  if (config.headers?.["content-type"] === "application/json") {
    if (config.params) {
      newConfig.data = humps.decamelizeKeys(config.data);
    }
  }

  return newConfig;
});
