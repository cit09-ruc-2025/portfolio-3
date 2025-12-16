import { getCookie } from "./cookie";

export const fetchHttp = async ({ url, options = {} }) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  let finalUrl = baseURL + url;
  if (options.params) {
    const queryString = new URLSearchParams(
      Object.entries(options.params).map(([k, v]) => [k, String(v)])
    ).toString();
    finalUrl += `?${queryString}`;
  }

  const token = getCookie("token");

  const response = await fetch(finalUrl, {
    ...options,
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      status: response.status,
      ...data
    };
  }

  return data;
};
