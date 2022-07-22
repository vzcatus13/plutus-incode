import { TickerResponse } from '../../types';
import { Box, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const TickerRow = ({
  ticker,
}: {
  ticker: Pick<TickerResponse, 'change' | 'change_percent' | 'price' | 'ticker'>;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'start',
        }}
      >
        <Typography variant='subtitle1'>{ticker.ticker}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Typography variant='subtitle1'>{ticker.price}$</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        {' '}
        <Typography
          variant='subtitle1'
          sx={{
            color: ticker.change > 0 ? green[700] : red[700],
          }}
        >
          {ticker.change}$
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0.5,
            borderRadius: 2,
            color: ticker.change_percent > 0 ? green[700] : red[700],
            backgroundColor: ticker.change_percent > 0 ? green[100] : red[100],
          }}
          data-testid='change-percent-flexbox'
        >
          {ticker.change_percent > 0 ? (
            <ArrowUpward fontSize='small' />
          ) : (
            <ArrowDownward fontSize='small' />
          )}
          <Typography variant='subtitle1'>{ticker.change_percent}%</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TickerRow;
