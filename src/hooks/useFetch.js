import { useState, useEffect } from "react";

const BASE_API_URL = process.env.REACT_APP_API_URL;
const AUTHORIZATION = process.env.REACT_APP_JWT_SECRET_HEADER;

const useFetch = ({ url, options, token }) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_API_URL}/${url}`, {
          ...options,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            [AUTHORIZATION]: token,
          },
        });

        if (res.ok) {
          setIsLoading(false);
          const json = await res.json();
          setResponse(json);
        }
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, [url, options, token]);

  return { response, isLoading, error };
};

export default useFetch;
