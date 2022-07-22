import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { SocketProvider } from '../../context/SocketContext';
import Ticker from './Ticker';

const Home = () => {
  const [indexTickers, setIndexTickers] = useState([]);

  useEffect(() => {
    const fetchIndexTickers = async () => {
      const data = await (await fetch('http://localhost:4000/ui/home/tickers')).json();
      setIndexTickers(data);
    };

    fetchIndexTickers();
  }, []);

  return (
    <SocketProvider>
      <Grid container justifyContent='center'>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              borderStyle: 'solid',
              borderRadius: 2,
              borderWidth: { xs: 0, md: 1 },
              borderColor: grey[300],
              padding: 2,
            }}
          >
            <Typography variant='h5' gutterBottom>
              Tickers
            </Typography>
            <Stack spacing={2} divider={<Divider flexItem />}>
              {indexTickers.map((ticker) => (
                <Ticker key={ticker} name={ticker} />
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </SocketProvider>
  );
};

export default Home;
