// load Request Network library
const RequestNetwork = require('@requestnetwork/request-network.js');
// load the wallet library
import HDWalletProvider from 'truffle-hdwallet-provider';

// you need to have a mnemonic phrase
const MNEMONIC =
  'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat';

const provider = new HDWalletProvider(
  MNEMONIC,
  'https://rinkeby.infura.io/',
  1
);

let requestnetwork;
try {
  // here we're using provider 4 -> rinkeby a testnet
  requestnetwork = new RequestNetwork.default(provider, 4);
} catch (err) {
  console.error(err);
}

// init project
const express = require('express');
const app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

const requestData = {
  reason: 'Order #030890 from Just Another Shop',
  orderId: '030890',
};

async function signRequest() {
  console.log('waza from sign');
  const signedRequest = await requestnetwork.requestERC20Service.signRequestAsPayee(
    // token address
    '0x995d6a8c21f24be1dd04e105dd0d83758343e258',
    // payee address
    ['0xf17f52151ebef6c7334fad080c5704d77216b732'],
    // expected amount in wei
    ['175000000000000000'],
    // expiration date
    new Date().getTime() + 1000 * 60 * 60,
    // payee payment address
    ['0xf17f52151ebef6c7334fad080c5704d77216b732'],
    // meta_data
    JSON.stringify(requestData)
  );
  console.log(signedRequest);
  return signedRequest;
}

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/sign_request', (request, response) => {
  signRequest()
    .then(signedRequest => {
      response.json({ status: signedRequest });
    })
    .catch(error => {
      console.error(error);
      response.json({ status: 'error' });
    });
});

// listen for requests :)
const listener = app.listen(8080, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
