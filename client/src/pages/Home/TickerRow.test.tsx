import { green, grey } from '@mui/material/colors';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

it('should render correctly', () => {
  render(<TickerRow ticker={ticker} onDisable={() => null} />);

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

it('should disable ticker on button click', () => {
  const handleOnDisable = jest.fn();

  render(<TickerRow ticker={ticker} onDisable={handleOnDisable} />);

  const turnOffButton = screen.getByRole('button', { name: /^turn off/i });
  userEvent.click(turnOffButton);

  expect(handleOnDisable).lastCalledWith(true);

  expect(screen.getByText(ticker.ticker)).toHaveStyle({
    color: grey[700],
  });
  expect(screen.getByText(`${ticker.price}$`)).toHaveStyle({
    color: grey[700],
  });
  expect(screen.getByText(`${ticker.change}$`)).toHaveStyle({
    color: grey[700],
  });
  expect(screen.getByTestId('change-percent-flexbox')).toHaveStyle({
    color: grey[700],
    backgroundColor: grey[100],
  });

  const turnOnButton = screen.getByRole('button', { name: /^turn on/i });
  userEvent.click(turnOnButton);

  expect(handleOnDisable).lastCalledWith(false);

  expect(screen.getByText(ticker.ticker)).toHaveStyle({
    color: 'inherit',
  });
  expect(screen.getByText(`${ticker.price}$`)).toHaveStyle({
    color: 'inherit',
  });
  expect(screen.getByText(`${ticker.change}$`)).toHaveStyle({
    color: green[700],
  });
  expect(screen.getByTestId('change-percent-flexbox')).toHaveStyle({
    color: green[700],
    backgroundColor: green[100],
  });
});
