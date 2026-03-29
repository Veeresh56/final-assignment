import CryptoJS from "crypto-js";

const AES_KEY = "a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU=";

export const decryptResponse = (encryptedString) => {
  try {
    const byteCipherText = CryptoJS.enc.Base64.parse(encryptedString);

    const iv = CryptoJS.lib.WordArray.create(
      byteCipherText.words.slice(0, 4),
      16
    );

    const cipherText = CryptoJS.lib.WordArray.create(
      byteCipherText.words.slice(4),
      byteCipherText.sigBytes - 16
    );

    const decodedKey = CryptoJS.enc.Base64.parse(AES_KEY);

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: cipherText },
      decodedKey,
      {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
      }
    );

    const result = decrypted.toString(CryptoJS.enc.Utf8);

    return JSON.parse(result); // 🔥 IMPORTANT
  } catch (err) {
    console.error("Decryption failed:", err);
    return null;
  }
};