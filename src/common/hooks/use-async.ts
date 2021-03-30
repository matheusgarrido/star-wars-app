import { useEffect, useState } from 'react';

export interface AsyncReturnType<T> {
  isLoading: boolean;
  result: T | undefined;
  error: boolean;
}
export const useAsync = <T>(asyncFunction: Promise<T>): AsyncReturnType<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<T>();

  useEffect(() => {
    const fn = async () => {
      setIsLoading(true);
      try {
        const result = await asyncFunction;
        setIsLoading(false);
        setResult(result);
      } catch (err) {
        setIsLoading(false);
        setError(true);
      }
    };
    fn();
  }, [setIsLoading, setResult, setError, asyncFunction]);

  return { isLoading, result, error };
};
