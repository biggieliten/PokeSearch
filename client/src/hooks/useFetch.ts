import { useEffect, useState } from "react";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `An unexpected error has occured: ${response.statusText}`
          );
        }

        const jsonData = await response.json();

        setData(jsonData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (url) {
      fetchAPI();
    }
  }, [url]);
  return { data, loading, error };
}

export default useFetch;
