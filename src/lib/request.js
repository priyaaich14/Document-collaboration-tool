const BASE_API_URL = process.env.REACT_APP_API_URL;

export const httpRequest = (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_API_URL}/${url}`, {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          resolve(res.json());
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
