import { useEffect, useState } from "react";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T>();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAPI = async () => {
		if(!shouldFetch) return;

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);

        if (!response.ok) {
          const msg = `Request failed: ${response.status} ${response.statusText}`;
          setError(msg);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
        setData(undefined);
      } finally {
        setLoading(false);
		setShouldFetch(false);
      }
    };
    if (url) {
      fetchAPI();
    }
  }, [url]);
  return { data, loading, error, setShouldFetch };
}

export default useFetch;
