import { mutate } from "swr";
import axios from "axios";

export function fetcher(path) {
  return axios
    .get(path)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(error);
    });
}

export async function fetchAndCache(key) {
  console.log("Prefetching", key);
  const request = await fetcher(key);
  mutate(key, request, false);
  return request;
}