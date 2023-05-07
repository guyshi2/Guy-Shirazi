import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1';
import {toHex} from 'ethereum-cryptography/utils';
function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = toHex(secp.getPublicKey(privateKey));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Enter your wallet here:</h1>

      <label>
        Private Key
        <input placeholder="Enter private key, dont do it in real application!" value={privateKey} onChange={onChange}></input>
      </label>

      <div>
      address: {address.slice(0,10)} this is the ten first characters of your address
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
