import { Button, Grid, TextField } from '@material-ui/core';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

interface searchProps {
  onChange: Function;
}

export const SearchInput = ({ onChange }: searchProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchValue] = useDebounce<string>(searchText, 500);
  useEffect(() => {
    onChange(searchValue);
  }, [searchValue]);

  const handleInput = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };
  const handleClickClean = () => {
    setSearchText('');
  };

  return (
    <Grid
      container
      direction={'row'}
      alignItems={'center'}
      justify={'space-around'}
    >
      <Grid item>
        <TextField
          id={'txtSearch'}
          label={'Search'}
          onChange={handleInput}
          value={searchText}
          size={'medium'}
        />
      </Grid>
      <Grid item>
        <Button
          onClick={handleClickClean}
          variant={'contained'}
          disabled={searchText ? false : true}
        >
          Clean
        </Button>
      </Grid>
    </Grid>
  );
};
