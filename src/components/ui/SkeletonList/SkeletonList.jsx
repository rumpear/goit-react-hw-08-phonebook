import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

export const SkeletonList = () => {
  return (
    <Grid container gap={1}>
      {Array.from(new Array(4)).map((_, index) => (
        <Stack key={index} width={275}>
          <Skeleton variant="text" animation="wave" height={35} />
          <Skeleton variant="text" animation="wave" height={35} />
        </Stack>
      ))}
    </Grid>
  );
};
