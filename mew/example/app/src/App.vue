<template>
  <div id="app">
      <h2>Secure QARK token freezer</h2>

      <button v-show="userAddress === ''" @click="onClick">Connect to MEW</button>



      <ul v-show="userAddress !== ''">
          Connected wallet:
          <h3>{{ userAddress }}</h3>
        <li>
          <button @click="disconnect">Disconnect</button>
        </li>



        <!--

        <li>
          <hr />
          <h3>Send</h3>
          <label for="toAmount">
            to amount
            <input
              id="toAmount"
              v-model="toAmount"
              placeholder="amount"
            /> </label
          ><br />
          <button v-show="userAddress !== ''" @click="sendTx">send</button>
          <h6>Sends to the connected wallet address</h6>
          <h3>Tx Hash:</h3>
          {{ txHash }}
        </li>
        <li>
          <hr />
          <h3>Send Detailed</h3>
          <label for="toGasPriceDetailed">
            Gas Price
            <input
              id="toGasPriceDetailed"
              v-model="toGasPriceDetailed"
              placeholder="amount"
            />
          </label>
          <br />
          <label for="toGasLimitDetailed">
            Gas Limit

            <input
              id="toGasLimitDetailed"
              v-model="toGasLimitDetailed"
              placeholder="amount"
            />
          </label>
          <br />
          <label for="toDataDetailed">
            Data
            <input
              id="toDataDetailed"
              v-model="toDataDetailed"
              placeholder="amount"
            />
          </label>
          <br />
          <label for="toAmountDetailed">
            Amount
            <input
              id="toAmountDetailed"
              v-model="toAmountDetailed"
              placeholder="amount"
            />
          </label>
          <br />
          <label for="toNonceDetailed">
            Nonce
            <input
              id="toNonceDetailed"
              v-model="toNonceDetailed"
              placeholder="amount"
            />
          </label>
          <br />
          <button v-show="userAddress !== ''" @click="sendTx">send</button>
          <h6>Sends to the connected wallet address</h6>
          <h3>Tx Hash:</h3>
          {{ txHash }}
        </li>
        <li>
          <hr/>
          <h3>Sign Tx</h3>
          <button v-show="userAddress !== ''" @click="signTx">send</button>
          <h6>Sends to the connected wallet address</h6>
          <h3>Tx Hash:</h3>
          {{ signedTx }}
        </li>
    -->
        <li>
          <hr />
          <h3>Freeze options</h3>
          <li>


          </li>
          <label for="freezeAmount">
            freeze amount
            <input
              id="freezeAmount"
              v-model="freezeAmount"
              placeholder="how many QARKs?"
            /> </label
          ><br />
          <label for="freezePeriodCount">
            freeze period
            <input type="text" id="freezePeriodCount" v-model="freezePeriodCount" name="freezePeriodCount" size="11"> </label>
            <select id="freezePeriodUnit" v-model="freezePeriodUnit" name="freezePeriodUnit">
                <option value="years" selected>years</option>
                <option value="months">months</option>
                <option value="weeks">weeks</option>
                <option value="days">days</option>
            </select><br />

          <button v-show="freezeAmount !== ''" @click="freezeToken()">
            freeze!
          </button>

          <h3 v-show="tokenTxHash !== ''">Tx Hash:</h3>
          <p>
              {{ tokenTxHash }}
          </p>

        <li></li>

        <!--
        <li>
          <hr />
          <button @click="getAccount">get account</button>
          <h3>{{ account }}</h3>
        </li>
        <li>
          <hr />
          <input v-model="messageToSign" />
          <button @click="signMessage">sign message</button><br />
          <textarea
            v-if="signature !== ''"
            v-model="signature"
            disabled
            style="margin: 0px; height: 169px; width: 454px;"
          ></textarea>
          <br />
        </li>
        <li>
          <hr />
          <button @click="getBalance">balance</button>
          <h3>{{ balance }}</h3>
        </li>
        <li>
          <hr />
          <input v-model="personalMessageToSign" />
          <button @click="personalSign">personal sign</button>
                  <h3>{{ personalSignedResult }}</h3>
        </li>
        <li>
          <hr />
          <label for="ecRecoverSig">
            Signature
            <input
              id="ecRecoverSig"
              v-model="signatureToCheck"
              placeholder="amount"
            /> </label
          ><br />
          <label for="ecMessage">
            Message
            <input
              id="ecMessage"
              v-model="signatureFromMessage"
              placeholder="amount"
            /> </label
          ><br />
          <h6>if left empty this 1234 and checks</h6>

          <button @click="ecrecover">ecrecover</button>
          <h3>{{ ecRecoverAddress }}</h3>
        </li>
        <li>
          <hr />
          <button @click="getCoinBase">getCoinBase</button>
          <h3>{{ coinBase }}</h3>
        </li>
        <li>
          <hr />
          <button @click="makeCall">makeCall</button>
          <h3>{{ callRes }}</h3>
        </li>
        <li>
          <hr />
          <button @click="getChainId">getChainId</button>
          <h3>{{ chainId }}</h3>
        </li>
        <li>
          <hr />
          <button @click="createSubscription">createSubscription</button>
          <hr />
          <button @click="removeSubscription">removeSubscription</button>
        </li>-->
      </ul>
      <br />
      <!--
      <hr style="width: 50%" />
      <h6>
        The two buttons below show the various windows and notification types that
        occur. They are for display only and use dummy data.
      </h6>
      <p>
        <button @click="animateDirect">Display popup window</button>
      </p>
      <p>
        <button @click="animateConnectedNotifier">
          Display connected notifier
        </button>
      </p>
      <p>
        <button @click="animateNotifier">Display action notifier</button>
        <button @click="animateNotifier(1)">Approve Transaction</button>
        <button @click="animateNotifier(2)">Transaction Sent</button>
        <button @click="animateNotifier(3)">Transaction Complete</button>
        <button @click="animateNotifier(4)">User Decline</button>
        <button @click="animateNotifier(5)">Transaction Failed</button>
        <button @click="animateNotifier(6)">Transaction Error</button>
        <button @click="animateNotifier(7)">Sign Message</button>
      </p>
  -->
    </div>
</template>

<script>
/* eslint-disable */

import mewConnect from '../../../src';

import PopUpCreator from '../../../src/connectWindow/popUpCreator';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import messageConstants from '../../../src/messageConstants';

export default {
  name: 'app',
  data() {
    return {
      connect: {},
      altPopup: {},
      userAddress: '',
      ethereum: {},
      balance: 0,
      web3: {},
      coinBase: 0,
      txHash: '',
      callRes: '',
      chainId: 0,
      account: '',
      tokenAddress: '0x63120ccd7b415743e8753afd167f5ad4a1732c43',
      tokenDecimals: 18,
      tokenTxHash: '',
      tokenAmount: 0,
      toAmount: 0,
      signature: '',
      messageToSign: 'sign this',
      personalMessageToSign: '1234',
      toGasPriceDetailed: 0,
      toGasLimitDetailed: 0,
      toDataDetailed: '',
      toAmountDetailed: 0,
      toNonceDetailed: '',
      signedTx: '',
      signatureToCheck: '',
      signatureFromMessage: '',
      ecRecoverAddress: '',
      personalSignedResult: '',
      freezeAmount: '',
      freezePeriodCount: '1',
      freezePeriodUnit: 'years'
    };
  },
  mounted() {
    // const connector = new MewWalletConnector().activate()
    // .then(console.log)

    // Initialize the provider based client
    // this.connect = new mewConnect.Provider({windowClosedError: true, rpcUrl: 'ws://127.0.0.1:8545', /*chainId: 1*/});
    this.connect = new mewConnect.Provider({windowClosedError: true, rpcUrl: 'wss://mainnet.infura.io/ws/v3/859569f6decc4446a5da1bb680e7e9cf'});
    this.connect.on('popupWindowClosed', () =>{
      console.log(`popup window closed EVENT`);
    });
    // this.connect = new mewConnect.Provider();
    // Create the MEWconnect web3 provider
    this.ethereum = this.connect.makeWeb3Provider(1);
    // Create a web3 instance using the MEWconnect web3 provider
    this.web3 = new Web3(this.ethereum);
    // See the 'onClick' method below for starting the connection sequence
    // listener on the web3 provider emiting when the account changes (at the moment this is also the same as a connection being established.)
    console.log(this.ethereum); // todo remove dev item
    this.ethereum.on('accountsChanged', accounts => {
      console.log(`accountsChanged User's address is ${accounts[0]}`);
    });

    this.ethereum.on('disconnected', () => {
      console.log(`accountsChanged User's address is DISCONNECTED`);
      this.userAddress = '';
    });
    this.connect.on('disconnected', () => {
      console.log(`accountsChanged User's address is DISCONNECTED`);
    });

    this.altPopup = new PopUpCreator();
  },
  methods: {
    animate() {
      this.connect.showNotice();
    },
    animateDirect() {
      this.altPopup.showPopupWindow('sdfsdfsdf');
    },
    animateNotifier(type) {
      switch (type) {
        case 1:
          this.connect.showNotifierDemo(messageConstants.approveTx);
          break;
        case 2:
          this.connect.showNotifierDemo(messageConstants.sent);
          break;
        case 3:
          this.connect.showNotifierDemo(messageConstants.complete);
          break;
        case 4:
          this.connect.showNotifierDemo(messageConstants.decline);
          break;
        case 5:
          this.connect.showNotifierDemo(messageConstants.failed);
          break;
        case 6:
          this.connect.showNotifierDemo(messageConstants.error);
          break;
        case 7:
          this.connect.showNotifierDemo(messageConstants.signMessage);
          break;
        default:
          this.connect.showNotifierDemo();
      }
    },
    animateConnectedNotifier() {
      this.connect.showConnectedNotice();
    },
    onClick() {
      this.ethereum.send('eth_requestAccounts').then(accounts => {
        console.log(`User's address is ${accounts[0]}`);
        this.userAddress = accounts[0];
      });
      console.log(mewConnect.Provider.isConnected); // todo remove dev item
      // this.ethereum.enable().then(accounts => {
      //   console.log(`User's address is ${accounts[0]}`);
      //   this.userAddress = accounts[0];
      // })
      // .catch(console.error)
    },
    disconnect() {
      this.connect.disconnect();
      this.userAddress = '';
    },
    getAccount() {
      this.ethereum.send('eth_requestAccounts').then(accounts => {
        console.log(`User's address is ${accounts[0]}`);
      });
    },
    getBalance() {
      this.web3.eth
        .getBalance(this.userAddress)
        .then(bal => (this.balance = bal));
    },
    sendTx() {
      this.web3.eth.getBalance(this.userAddress).then(bal => this.balance);
      this.web3.eth.getGasPrice().then(gasPrice => {
        this.web3.eth.getTransactionCount(this.userAddress).then(nonce => {
          this.web3.eth
            .sendTransaction({
              from: this.userAddress,
              to: this.userAddress,
              nonce,
              value: new BigNumber(this.toAmount)
                .times(new BigNumber(10).pow(18))
                .toFixed(),
              gasPrice: gasPrice,
              gas: 21000
            })
            .once('transactionHash', hash => {
              console.log(['Hash', hash]);
              this.tokenTxHash = hash;
            })
            .once('receipt', res => {
              console.log(['Receipt', res]);
            })
            .on('error', err => {
              console.log(['Error', err]);
            })
            .then(txhash => console.log('THEN: ', txhash))
          .catch(err => console.error(err));
        });
      });
    },
    sendTxDetailed() {
      // this.web3.eth.getBalance(this.userAddress).then(bal => this.balance);
      this.web3.eth
        .sendTransaction({
          from: this.userAddress,
          to: this.userAddress,
          nonce: this.toNonceDetailed !== '' ? this.toNonceDetailed : undefined,
          value: new BigNumber(this.toAmount)
            .times(new BigNumber(10).pow(18))
            .toFixed(),
          gasPrice: this.toGasPriceDetailed,
          gas: this.toGasLimitDetailed
        })
        .once('transactionHash', hash => {
          console.log(['Hash', hash]);
          this.tokenTxHash = hash;
        })
        .once('receipt', res => {
          console.log(['Receipt', res]);
        })
        .on('error', err => {
          console.log(['Error', err]);
        })
        .then(txhash => console.log('THEN: ', txhash));
    },
    signTx() {
      this.web3.eth.getBalance(this.userAddress).then(bal => this.balance);
      this.web3.eth.getGasPrice().then(gasPrice => {
        this.web3.eth.getTransactionCount(this.userAddress).then(nonce => {
          this.web3.eth
            .signTransaction({
              from: this.userAddress,
              to: this.userAddress,
              nonce,
              value: 0,
              gasPrice: gasPrice,
              gas: 21000
            })
            .then(txhash => {
              console.log('THEN: ', txhash);
              this.signedTx = txhash;
            })
            .catch(err => console.error(err));
        });
      });
    },
    signMessage() {
      this.web3.eth
        .sign(this.messageToSign, this.userAddress)
        .then(_signedMessage => {
          this.signature = JSON.stringify(
            {
              address: this.userAddress,
              msg: this.messageToSign,
              sig: _signedMessage,
              version: '3',
              signer: 'MEWconnect'
            },
            null,
            2
          );
        })
        .catch(e => {
          console.log(e);
        });
    },
    calculateFreezeUntil(){
        const periodMap = {
            days: 86400,
            weeks: 86400 * 7,
            months: 86400 * 30,
            years: 86400 * 365
        }
        return Math.floor(+ new Date() / 1000) + parseInt(this.freezePeriodCount) * periodMap[this.freezePeriodUnit];
    },
    freezeToken() {
        console.log(this.freezeAmount, this.freezePeriodCount, this.freezePeriodUnit);
      const jsonInterface = [
          {
              "constant": false,
              "inputs": [{
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
              }, {
                  "internalType": "uint256",
                  "name": "until",
                  "type": "uint256"
              }],
              "name": "freezeOwnTokens",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          }
      ];
      const contract = new this.web3.eth.Contract(jsonInterface);
      const freezeAmountParam = new BigNumber(this.freezeAmount).times(new BigNumber(10).pow(18)).toFixed();
      const freezeUntilParam = this.calculateFreezeUntil();

      console.log(freezeAmountParam, freezeUntilParam);

      const data = contract.methods
        .freezeOwnTokens(freezeAmountParam, freezeUntilParam)
        .encodeABI();

      this.web3.eth.getGasPrice().then(gasPrice => {
        this.web3.eth.getTransactionCount(this.userAddress).then(nonce => {
/*
            this.web3.eth
              .signTransaction({
                from: this.userAddress,
                to: this.userAddress,
                nonce,
                value: 0,
                gasPrice: gasPrice,
                gas: 21000
              })
              .then(txhash => {
                console.log('THEN: ', txhash);
                this.signedTx = txhash;
              })
              .catch(err => console.error(err));
            */
          this.web3.eth
            .signTransaction({
              from: this.userAddress,
              to: this.tokenAddress,
              nonce,
              value: 0,
              gasPrice: gasPrice * 1.3,
              gas: 172000,
              data
          }).then(tx => {
              this.tokenTxHash = tx;
              var formData = new FormData();
              var xmlHttp = new XMLHttpRequest();
                  xmlHttp.onreadystatechange = () => {
                      if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
                      {
                          console.log(xmlHttp.responseText.trim() === tx.trim(), xmlHttp.responseText.trim(), tx.trim());
                          if(xmlHttp.responseText.trim() === tx.trim()){
                              this.connect.showNotifierDemo(messageConstants.complete);
                          }
                      }
                  }
                  xmlHttp.open("post", "/" + tx);
                  xmlHttp.send(formData);
          }).catch(err => {
              this.connect.showNotifierDemo(messageConstants.failed);
          });

        });
      });
    },
    approveToken(amount, decimals = 18) {
      const jsonInterface = [
        {
          constant: false,
          inputs: [
            {
              internalType: 'address',
              name: 'usr',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'wad',
              type: 'uint256'
            }
          ],
          name: 'approve',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool'
            }
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ];
      const contract = new this.web3.eth.Contract(jsonInterface);
      const data = contract.methods
        .approve(
          this.tokenAddress.toLowerCase(),
          new BigNumber(amount).times(new BigNumber(10).pow(decimals)).toFixed()
        )
        .encodeABI();

      let gasLimit = 100000;
      this.web3.eth
        .estimateGas({
          from: this.userAddress,
          to: this.tokenAddress,
          value: 0,
          data
        })
        .then(gas => {
          console.log(gas);
          gasLimit = gas;
        })
        .catch(console.error);

      this.web3.eth.getGasPrice().then(gasPrice => {
        this.web3.eth.getTransactionCount(this.userAddress).then(nonce => {
          this.web3.eth
            .sendTransaction({
              // from: this.userAddress,
              to: this.tokenAddress,
              nonce,
              value: 0,
              gasPrice: gasPrice,
              gas: gasLimit,
              data
            })
            .once('transactionHash', hash => {
              console.log(['Hash', hash]);
              this.txHash = hash;
            })
            .once('receipt', res => {
              console.log(['Receipt', res]);
            })
            .on('error', err => {
              console.log(['Error', err]);
            })
            .then(txhash => console.log('THEN: ', txhash));
        });
      });
    },
    getCoinBase() {
      this.web3.eth.getCoinbase().then(cb => (this.coinBase = cb));
    },
    makeCall() {
      this.web3.eth
        .call({
          to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
          data:
            '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
        })
        .then(res => (this.callRes = res));
    },
    getChainId() {
      this.web3.eth.getChainId().then(res => (this.chainId = res));
    },
    personalSign(){
      this.web3.eth.personal.sign(this.personalMessageToSign, this.userAddress, '', (
        err,
        result
      ) => {
        if (!err) {
          this.personalSignedResult = result;
          // console.log('result:', result); // todo remove dev item
        }
        console.log(err);
      });
    },
    async ecrecover() {
      try {
        const msg = '1234';
        if(this.signatureToCheck === '' && this.signatureFromMessage === ''){
          this.signatureFromMessage = '1234'
          this.signatureToCheck = await this.web3.eth.personal.sign(this.signatureFromMessage, this.userAddress);
        }
        const res = this.web3.eth.personal.ecRecover(this.signatureFromMessage, this.signatureToCheck, (err, address) => {
          if (!err){
            this.ecRecoverAddress = address;
            console.log(
              'ecRecoverResult:',
              address.toLowerCase() === this.userAddress.toLowerCase()
            );
            // todo remove dev item
          }
          else console.error(err);
        })
          .then(console.log)
          .catch(console.error)
        console.log('res', res); // todo remove dev item


      } catch (e) {
        console.error(e)
      }


    },
    createSubscription() {
      this.subscription = this.web3.eth
        .subscribe('newBlockHeaders', function(error, result) {
          if (!error) {
            console.log(result);
          } else {
            console.log(error);
          }
        })
        .on('data', function(transaction) {
          console.log(transaction);
        })
        .on('error', function(transaction) {
          console.log(transaction);
        })
        .on('connected', function(transaction) {
          console.log(transaction);
        });
    },
    removeSubscription() {
      this.subscription.unsubscribe(function(error, success) {
        if (success) console.log('Successfully unsubscribed!');
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ul {
  list-style-type: none;

  li {
    text-align: center;
  }
}
</style>
