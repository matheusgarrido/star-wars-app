import { useEffect, useMemo, useState } from 'react';
import {
  genericController,
  PagebleResponse,
  PageData,
  SWAPIEndpoint,
} from '../../api/generic-api';
import { useAsync, AsyncReturnType } from '../../common/hooks/use-async';

interface ListReturnType<T> {
  isLoading: boolean;
  error: boolean;
  data: T[];
  pageData: PageData | undefined;
}

export const useList = <T>(
  controllerName: SWAPIEndpoint,
  page: number,
  searchText: string | null
): ListReturnType<T> => {
  const [data, setData] = useState<T[]>([]);
  const [pageData, setPageData] = useState<PageData>();
  const controller = useMemo(
    () => genericController<T>(controllerName).getAll(page, searchText),
    [controllerName, page, searchText]
  );
  const { isLoading, result, error } = useAsync<PagebleResponse<T>>(controller);

  useEffect(() => {
    if (!result) return;
    const newData = result.data.map((item) => {
      return { ...item, id: getIdFromURL(item.url) };
    });
    setData(newData);
    setPageData(result.page);
    // console.log(object);
  }, [result]);

  function getIdFromURL(url: string): number {
    const matchs = url.match('/\\d+/');
    if (matchs) {
      const id: string = matchs[0].replace('/', '');
      return parseInt(id);
    }
    return 0;
  }

  return { isLoading, result, error };
};
