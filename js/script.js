document.addEventListener('DOMContentLoaded', () => {
    const tickerContent = document.getElementById('ticker-content');

    // جلب كريبتو من CoinGecko
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            let tickerText = 'كريبتو: BTC $' + data.bitcoin.usd + ' | ETH $' + data.ethereum.usd + ' | SOL $' + data.solana.usd + '   ';
            
            // جلب أسهم/فوركس من Alpha Vantage (استبدل YOUR_ALPHA_KEY)
            fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TSLA&apikey=YOUR_ALPHA_KEY')
                .then(res => res.json())
                .then(stockData => {
                    tickerText += 'أسهم: TSLA $' + stockData['Global Quote']['05. price'] + '   ';
                    fetch('https://www.alphavantage.co/query?function=FX_REAL_TIME_QUOTE&from_symbol=EUR&to_symbol=USD&apikey=YOUR_ALPHA_KEY')
                        .then(res => res.json())
                        .then(forexData => {
                            tickerText += 'فوركس: EUR/USD ' + forexData['Realtime Currency Exchange Rate']['5. Exchange Rate'] + '   ';
                            tickerContent.innerText = tickerText.repeat(3);  // للتكرار
                        });
                });
        })
        .catch(error => {
            tickerContent.innerText = 'خطأ في جلب البيانات...';
        });
});
