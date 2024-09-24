import { useState, useEffect } from "react";

const BASE_API_URL = process.env.REACT_APP_API_URL;
const AUTHORIZATION = process.env.REACT_APP_JWT_SECRET_HEADER;

const useFetch = ({ url, options = {}, token }) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return; // Ensure there's a URL before fetching

      try {
        setIsLoading(true);

        const res = await fetch(`${BASE_API_URL}/${url}`, {
          ...options,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(token && { [AUTHORIZATION]: token }), // Only add the token if it exists
            ...options.headers, // Allow overriding/adding custom headers
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setResponse(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false); // Ensure loading state is stopped in both success and error cases
      }
    };

    fetchData();
  }, [url, options, token]);

  return { response, isLoading, error };
};

export default useFetch;
