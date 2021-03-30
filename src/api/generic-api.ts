import { AxiosResponse } from 'axios';
import { getAxiosInstance } from './axios-instance';

//Endpoints list
export type SWAPIEndpoint =
  | 'films'
  | 'people'
  | 'starships'
  | 'vehicles'
  | 'species'
  | 'planets';

// Page Data
export interface PageData {
  totalPages: number;
  totalRegisters: number;
  totalCurrentRegisters: number;
  nextPage: number | null;
  previousPage: number | null;
  currentPage: number;
}

//Pageble Response
export interface PagebleResponse<T> {
  data: T[];
  page: PageData;
}

//All methods
export interface ResourceReturn<T> {
  getSchema: () => void;
  getById: (id: number) => Promise<T>;
  getAll: (
    page: number,
    search: string | null | undefined
  ) => Promise<PagebleResponse<T>>;
}

//Controller
export const genericController = <T>(
  endpoint: SWAPIEndpoint
): ResourceReturn<T> => {
  const axios = getAxiosInstance();
  //Get schema
  const getSchema = async () => {
    const response = await axios.get(`/${endpoint}/schema`);
    return response.data;
  };
  //Get item by id
  const getById = async (id: number): Promise<T> => {
    const response = await axios.get(`/${endpoint}/${id}`);
    return response.data;
  };
  //Get all items filtered
  const getAll = async (
    page: number = 1,
    search: string | null | undefined = ''
  ): Promise<PagebleResponse<T>> => {
    const query = search ? `search=${search}&` : '';
    const response = await axios.get(`/${endpoint}?${query}page=${page}`);
    const data: T[] = response.data.results;
    const pageData: PageData = getPageData(response, page);
    return { data, page: pageData };
  };
  //Returning the methods
  return { getSchema, getById, getAll };
};

//Get Page Data
function getPageData(response: AxiosResponse, currentPage: number) {
  const previousPage: number | null = getPageNumber(response.data.previous);
  const nextPage: number | null = getPageNumber(response.data.next);
  const totalRegisters: number = response.data.count;
  const totalCurrentRegisters: number = response.data.results.length;
  //If is not the last page then calculate, else get current page
  const totalPages: number = nextPage
    ? getTotalPages(totalRegisters, totalCurrentRegisters)
    : currentPage;
  return {
    previousPage,
    nextPage,
    totalPages,
    totalRegisters,
    totalCurrentRegisters,
    currentPage,
  };
}

//Get the PageNumber
function getPageNumber(url: string | null): number | null {
  if (!url) return null;
  const matchs = url.match('page=\\d+');
  if (matchs) return parseInt(matchs[0].replace('page=', ''));
  return null;
}

function getTotalPages(totalRegisters: number, totalCurrentRegisters: number) {
  return Math.ceil(totalRegisters / totalCurrentRegisters);
}
