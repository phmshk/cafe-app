import { useEffect, useState } from "react";

type UseFetchDataResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

function useFetchData<T>(
  fetchFunction: (params?: any) => Promise<T>,
  params?: unknown
): UseFetchDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchFunction(params);
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}

export default useFetchData;
