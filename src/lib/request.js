const BASE_API_URL = process.env.REACT_APP_API_URL;

export const httpRequest = async (url, options = {}) => {
  try {
    const response = await fetch(`${BASE_API_URL}/${url}`, {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers, // Allow custom headers to be passed through options
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error;
  }
};
