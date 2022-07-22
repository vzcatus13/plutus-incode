import { green } from '@mui/material/colors';
import { render, screen } from '@testing-library/react';
import { TickerResponse } from '../../types';
import TickerRow from './TickerRow';

const ticker = {
  ticker: 'AAPL',
  exchange: 'NASDAQ',
  price: 279.29,
  change: 64.52,
  change_percent: 0.84,
  dividend: 0.56,
  yield: 1.34,
  last_trade_time: '2021-04-30T11:53:21.000Z',
} as TickerResponse;

test('renders correctly', () => {
  render(<TickerRow ticker={ticker} />);

  expect(screen.getByText(ticker.ticker)).toBeInTheDocument();
  expect(screen.getByText(`${ticker.price}$`)).toBeInTheDocument();
  expect(screen.getByText(`${ticker.change}$`)).toBeInTheDocument();
  expect(screen.getByText(`${ticker.change_percent}%`)).toBeInTheDocument();

  expect(screen.getByText(`${ticker.change}$`)).toHaveStyle({
    color: green[700],
  });
  expect(screen.getByTestId('change-percent-flexbox')).toHaveStyle({
    color: green[700],
    backgroundColor: green[100],
  });
});
