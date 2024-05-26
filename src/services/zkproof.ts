import { ec as EC } from 'elliptic';
import BN from 'bn.js';
import { customAlphabet } from 'nanoid';
import CryptoJS from 'crypto-js';

// Initialize the elliptic curve
const ec = new EC('secp256k1');

function randomBytes(size: number): Uint8Array {
    const nanoid = customAlphabet('0123456789abcdef', size * 2);
    const hex = nanoid();
    const bytes = new Uint8Array(size);
    for (let i = 0; i < size; i++) {
      bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return bytes;
  }
  
  // Function to create a hash
  function createHash(input: string): string {
    return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
  }

const ZKProofService = {
// randomBytes(size: number): Uint8Array {
//         const nanoid = customAlphabet('0123456789abcdef', size * 2);
//         const hex = nanoid();
//         const bytes = new Uint8Array(size);
//         for (let i = 0; i < size; i++) {
//           bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
//         }
//         return bytes;
//       },
//     createHash(input: string): string {
//         return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
//       },
  generateKeys: (message: string) =>{
    if (parseInt(message) <= 18) {
        throw new Error("Message must be greater than 18");
      }
    
      const G = ec.genKeyPair();
      const secret = new BN(message).sub(new BN(18));
      const publicKey = ec.curve.g.mul(secret);
    
      return { secret, publicKey };
},


 createProof: (G: EC, secret: BN) => {
    const order = G.curve.n;

  const k = new BN(randomBytes(32)).umod(order);
  const R = G.g.mul(k);

  const c = new BN(createHash(R.encode('hex')), 16);
  const s = k.sub(c.mul(secret)).umod(order);

  return { R, s };
    },

  verifyProof: (G: EC, publicKey: any, R: any, s: BN)=> {
    const c = new BN(createHash(R.encode('hex')), 16);
  const leftSide = G.g.mul(s).add(publicKey.mul(c));

  return leftSide.eq(R);
 }
};

export default ZKProofService;

// Example usage with message "19"
// const message1 = "19";
// const { secret: secret1, publicKey: publicKey1 } = generateKeys(message1);
// const G = ec;
// const { R: R1, s: s1 } = createProof(G, secret1);
// const isValid1 = verifyProof(G, publicKey1, R1, s1);
// console.log(`Proof valid for message ${message1}:`, isValid1);

// // Example usage with message "20"
// const message2 = "20";
// const { secret: secret2, publicKey: publicKey2 } = generateKeys(message2);
// const { R: R2, s: s2 } = createProof(G, secret2);
// const isValid2 = verifyProof(G, publicKey2, R2, s2);
// console.log(`Proof valid for message ${message2}:`, isValid2);
