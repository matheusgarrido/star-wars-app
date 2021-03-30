import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface FieldProps {
  name: string;
  value: string;
}
export const Field = (props: FieldProps) => {
  const { name, value } = props;
  return (
    <div>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{value}</Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </div>
  );
};
