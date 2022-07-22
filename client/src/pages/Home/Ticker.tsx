import { useEffect, useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import { TickerResponse } from '../../types';
import TickerRow from './TickerRow';

const Ticker = ({ name }: { name: string }) => {
  const socket = useSocket();

  const [ticker, setTicker] = useState<TickerResponse | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    socket.emit('ticker:start', { name });

    socket.on(`ticker/${name}/fulfilled`, ({ data }: { data: TickerResponse }) => setTicker(data));
    socket.on(`ticker/${name}/rejected`, ({ error }) => setError(error));

    return () => {
      socket.emit('ticker:stop', { name });

      socket.off(`ticker/${name}/fulfilled`);
      socket.off(`ticker/${name}/rejected`);
    };
  }, [name, socket]);

  if (ticker !== null && error == null) {
    return <TickerRow ticker={ticker} />;
  }

  return null;
};

export default Ticker;
