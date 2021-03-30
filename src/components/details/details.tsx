import { Button, CircularProgress, Grid } from '@material-ui/core';
import { getDetailData } from '../../api/controller-defs';
import { SWAPIEndpoint } from '../../api/generic-api';
import { GenericSchema } from '../../api/schemas/generic-schema';
import { Field } from './fields';
import { useDetail } from './use-detail';
interface DetailsProps {
  id: number;
  controller: SWAPIEndpoint;
}

export const Details = <T extends GenericSchema>(props: DetailsProps) => {
  const { id, controller } = props;
  const { isLoading, result, error } = useDetail<T>(id, controller);
  const columns = getDetailData(controller);
  if (isLoading)
    return (
      <div className={'centeredComponent '}>
        <CircularProgress />
      </div>
    );
  if (!result) return null;
  return (
    <Grid container direction={'column'} spacing={2} alignItems={'stretch'}>
      <Grid>
        {Object.entries(result)
          .filter((item) => {
            const [key] = item;
            return columns?.find((field) => field === key);
          })
          .map((item) => {
            const [key, value] = item;
            return <Field name={key} value={value} />;
          })}
      </Grid>
      <Grid>
        <Button variant={'outlined'}>Voltar</Button>
      </Grid>
    </Grid>
  );
};
