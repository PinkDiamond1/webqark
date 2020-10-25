import MEWconnect from '@myetherwallet/mewconnect-web-client'
import Web3 from 'web3';

export function ConnectToMewConnect(opts) {
  return new Promise(async (resolve, reject) => {

    if (!MEWconnect.Provider.isConnected) {
      const mewConnect = new MEWconnect.Provider({
      infuraId: opts.infuraId,
      chainId: 1,
      noUrlCheck: true,
      rpcUrl: opts.rpcUrl,
      });
      const provider = mewConnect.makeWeb3Provider()

      mewConnect.on('disconnected', () => {
      alert('MEWconnect Disconnected')
      })
      try {
        await mewConnect.enable();
        resolve(new Web3(provider));
      } catch (e) {
        reject(e);
      }
    }

  });
};

faszom = ConnectToMewConnect({infuraId: '690402f68fae43b6a8637913a50b2831'})
console.log(faszom);
