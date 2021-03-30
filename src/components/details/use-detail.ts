import { useMemo } from 'react';
import { genericController, SWAPIEndpoint } from '../../api/generic-api';
import { useAsync, AsyncReturnType } from '../../common/hooks/use-async';

export const useDetail = <T>(
  id: number,
  controllerName: SWAPIEndpoint
): AsyncReturnType<T> => {
  const controller = useMemo(
    () => genericController<T>(controllerName).getById(id),
    [controllerName, id]
  );
  const { isLoading, result, error } = useAsync<T>(controller);
  return { isLoading, result, error };
};
