import { Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { GenericSchema } from '../../api/schemas/generic-schema';
import { SearchInput } from './searchInput';
import { useList } from './use-list';

export const List = <T extends GenericSchema>() => {
  const onChangeSearch = (text: string | null) => {
    console.info(text);
  };
  const endpoint = 'people';
  const page = 1;
  const searchText = '';
  const data = useList<T>(endpoint, page, searchText);
  return (
    <Grid container direction={'column'} justify={'space-around'}>
      <Grid item>
        <SearchInput onChange={onChangeSearch} />
      </Grid>
      <Grid item>
        <div style={{ height: 400, width: '100%' }}>
          {/* <DataGrid
            autoHeight
            rows={}
            rowCount={}
            loading={}
            columns={}
            page={}
            pageSize={10}
            paginationMode={'server'}
          /> */}
        </div>
      </Grid>
    </Grid>
  );
};
