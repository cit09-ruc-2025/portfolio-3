export const fetchHttp = async ({ url, options = {} }) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  let finalUrl = baseURL + url;
  if (options.params) {
    const queryString = new URLSearchParams(
      Object.entries(options.params).map(([k, v]) => [k, String(v)])
    ).toString();
    finalUrl += `?${queryString}`;
  }

  const response = await fetch(finalUrl, {
    ...options,
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data?.message || "HTTP Error");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};
