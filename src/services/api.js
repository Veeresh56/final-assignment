const BASE_URL = "https://api-dev-stage.iserveu.online";

export const fetchTransactions = async (body) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${BASE_URL}/idbi/sb/reports/querysubmit_user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    throw new Error("API failed");
  }

  return res.json();
};


export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
};