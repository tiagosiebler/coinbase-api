import { CBInternationalClient } from '../../src/CBInternationalClient.js';
// import { CBInternationalClient } from 'coinbase-api';

// Initialize the client, you can pass in api keys here if you have them but they are not required for public endpoints
const client = new CBInternationalClient();

async function publicInternationalCalls() {
  try {
    // List assets
    const assets = await client.getAssets();
    console.log('Assets: ', assets);

    // Get asset details
    const assetDetails = await client.getAssetDetails({ asset: 'BTC' });
    console.log('Asset Details (BTC): ', assetDetails);

    // Get supported networks per asset
    const supportedNetworks = await client.getSupportedNetworksPerAsset({
      asset: 'BTC',
    });
    console.log('Supported Networks (BTC): ', supportedNetworks);

    // List instruments
    const instruments = await client.getInstruments();
    console.log('Instruments: ', instruments);

    // Get instrument details
    const instrumentDetails = await client.getInstrumentDetails({
      instrument: 'BTC-PERP',
    });
    console.log('Instrument Details (BTC-PERP): ', instrumentDetails);

    // Get quote per instrument
    const quote = await client.getQuotePerInstrument({
      instrument: 'BTC-PERP',
    });
    console.log('Quote (BTC-PERP): ', quote);

    // Get daily trading volumes
    const dailyVolumes = await client.getDailyTradingVolumes({
      instruments: 'BTC-PERP',
    });
    console.log('Daily Trading Volumes (BTC-PERP): ', dailyVolumes);

    // Get aggregated candles data per instrument
    const candlesData = await client.getAggregatedCandlesData({
      instrument: 'BTC-PERP',
      granularity: 'ONE_HOUR',
      start: '2023-01-01T00:00:00Z',
      end: '2023-01-02T00:00:00Z',
    });
    console.log('Aggregated Candles Data (BTC-PERP): ', candlesData);

    // Get historical funding rates
    const fundingRates = await client.getHistoricalFundingRates({
      instrument: 'BTC-PERP',
    });
    console.log('Historical Funding Rates (BTC-PERP): ', fundingRates);

    // List position offsets
    const positionOffsets = await client.getPositionOffsets();
    console.log('Position Offsets: ', positionOffsets);
  } catch (e) {
    console.error('Error: ', e);
  }
}

publicInternationalCalls();
