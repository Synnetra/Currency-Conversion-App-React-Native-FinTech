const WS_ADDR = 'wss://demo.fxcib.com/api/WebSocket/Getees?key=123123123';

export interface BaseChartData {
  currencyPair: 'EUR/USD' | 'EUR/GBP' | 'USD/EUR' | 'USD/GBP' | 'GBP/EUR' | 'GBP/USD';
  granularity: 'S5' | 'S10' | 'S15' | 'S30' | 'M1' | 'M3' | 'M4'
  | 'M5' | 'M10' | 'M15' | 'M30' | 'H1' | 'H2' | 'H3' | 'H4' | 'H6' | 'H8' | 'H12' | 'D' | 'W' | 'M';
  priceType?: 'Bid'|'Ask';
  dates?: {start: Date, end: Date};
}

export const ws = (() => {
  let ws = new WebSocket(WS_ADDR);
  let closed = false;
  ws.onopen = () => console.log('socket opened.');
  ws.onerror = (event: ErrorEvent) => console.error('Websocket error observed:', event.message);
  ws.onclose = () => {
    console.log('socket closed.');
    closed = true;
  }

  return {
    reopen() {
      ws.close();
      ws = new WebSocket(WS_ADDR);
      closed = false;
    },
    isClosed() {
      return closed;
    },
    onMessage(handler: (this: WebSocket, ev: MessageEvent) => void) {
      ws.addEventListener('message', handler);
    },
    onMessageDestroy(handler: (this: WebSocket, ev: MessageEvent) => void) {
      ws.removeEventListener('message', handler);
    },
    sendMessage(message: string | Object) {
      let strMessage: string;
      if (typeof message !== 'string') {
        strMessage = JSON.stringify(message);
      } else {
        strMessage = message;
      }
      ws.send(strMessage);
    },
    close() {
      ws.close();
    },
    askChartData(args: BaseChartData) {
      let message : any = {
        messageType: 4,
        currencyPair: args.currencyPair,
        priceType: args.priceType || 'Bid',
        granularity: args.granularity,
      };
      if (args.dates) {
        message.start = args.dates.start;
        message.end = args.dates.end;
      }
      ws.send(JSON.stringify(message));
    },
    askCurrencyData(args: any = {}) {
      let message : any = {
        messageType: 1,
        side: args.side || 1,
        action: 1,
        amount: args.amount || 10000,
        clientId: args.clientId || '543v36c43x',
        pair: args.pair || '',
      };
      if (!args.pair) {
        for (let v of ['EUR/USD', 'EUR/GBP', 'GBP/USD']) {
          message.pair = v;
          let msg = JSON.stringify(message);
          console.log(msg);
          ws.send(msg);
        };
      }
      else ws.send(JSON.stringify(message));  
      console.log(JSON.stringify(message));
      console.log(ws.CLOSED);
    }
  };
})();