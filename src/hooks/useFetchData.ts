import { useEffect, useState } from "react";

type UseFetchDataResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

function useFetchData<T>(
  fetchFunction: (params: string) => Promise<T>,
  params: string
): UseFetchDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const result = await fetchFunction(params);
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [fetchFunction, params]);

  return { data, isLoading, error };
}

export default useFetchData;
