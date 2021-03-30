import React, { useEffect, useState, KeyboardEvent } from 'react';
import { genericController, PageData } from './api/generic-api';
import { People } from './api/schemas/people';
import { Details } from './components/details/details';
import { List } from './components/list/list';
import './styles/reset.css';
import './styles/components.css';

export default function App() {
  //Function getPeople
  const { getAll } = genericController<People>('people');
  //All results of people
  const [schema, setSchema] = useState<People[]>();
  //Page data
  const [page, setPage] = useState<PageData>();
  //Input value
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getAll(1, '').then((res) => {
      setSchema(res.data);
      setPage(res.page);
    });
  }, []);

  return (
    // <div>
    //   <div>
    //     {page?.totalCurrentRegisters} of {page?.totalRegisters}
    //   </div>
    //   <div>
    // <Details<People> id={2} controller="people" />
    <List<People> />

    //   </div>
    //   <div>
    //     <button disabled={!page?.previousPage ? true : false}>Previous</button>
    //     Page {page?.currentPage} of {page?.totalPages}
    //     <button disabled={!page?.nextPage ? true : false}>Next</button>
    //   </div>
    // </div>
  );
}
