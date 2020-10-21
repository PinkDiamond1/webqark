# WebQARK

Web based QARK token management

## Freezing tokens

The primary purpose of this repo for now is to be able to easily freeze tokens of a given wallet accessed by a mnemonic phrase.
This gives easy freezability functions for wallets created by MEW mobile wallet for example.

## How to use

A live instance of this code is accessible at [https://freezer.qanplatform.com](https://freezer.qanplatform.com)

### Steps to follow:

1. Enter your 24 word mnemonic output by MEW (backup phrase)
2. The wallet address will be determined, check if it matches the one in MEW
3. Your wallet will be checked if it has enough ETH to perform a freeze
4. If it does, you will be prompted how much to freeze until when
5. After entering above values, you will be primpted for confirmation
6. If everything went well, you can choose to be redirected to etherscan.io to check the transaction

That's all (folks) for now!
