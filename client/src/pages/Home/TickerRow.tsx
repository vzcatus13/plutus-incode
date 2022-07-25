import { TickerResponse } from '../../types';
import { Box, Typography, IconButton } from '@mui/material';
import { green, red, grey } from '@mui/material/colors';
import { ArrowUpward, ArrowDownward, VisibilityOff, Visibility } from '@mui/icons-material';
import { useState } from 'react';

const TickerRow = ({
  ticker,
  onDisable,
}: {
  ticker: Pick<TickerResponse, 'change' | 'change_percent' | 'price' | 'ticker'>;
  onDisable: (disabled: boolean) => void;
}) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const tickerChangeColor = ticker.change_percent >= 0 ? green[700] : red[700];
  const tickerChangeBackground = ticker.change_percent >= 0 ? green[100] : red[100];
  const tickerDisabledColor = grey[700];
  const tickerDisabledBackground = grey[100];

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
        <Typography
          variant='subtitle1'
          sx={{
            color: isDisabled ? tickerDisabledColor : 'inherit',
          }}
        >
          {ticker.ticker}
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
        <Typography
          variant='subtitle1'
          sx={{
            color: isDisabled ? tickerDisabledColor : 'inherit',
          }}
        >
          {ticker.price}$
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
        <Typography
          variant='subtitle1'
          sx={{
            color: isDisabled ? tickerDisabledColor : tickerChangeColor,
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
            color: isDisabled ? tickerDisabledColor : tickerChangeColor,
            backgroundColor: isDisabled ? tickerDisabledBackground : tickerChangeBackground,
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
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton
          onClick={() => {
            setIsDisabled((isDisabled) => {
              onDisable(!isDisabled);
              return !isDisabled;
            });
          }}
          aria-label={isDisabled ? 'turn on ticker' : 'turn off ticker'}
        >
          {isDisabled ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default TickerRow;
