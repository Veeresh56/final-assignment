import { decryptResponse } from "../utils/crypto";

export const fetchTransactions = async (body) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    "https://api-dev-stage.iserveu.online/idbi/sb/reports/querysubmit_user",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        passkey: "QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA",
      },
      body: JSON.stringify(body),
    }
  );

  const encryptedText = await res.text(); // 🔥 NOT json()

  console.log("RAW ENCRYPTED:", encryptedText);

  const decrypted = decryptResponse(encryptedText);

  console.log("DECRYPTED:", decrypted);

  return decrypted;
};