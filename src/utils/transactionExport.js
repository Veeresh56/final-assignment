import * as XLSX from "xlsx";
import { formatDisplayDateTime } from "./transactionDates";

export const exportTransactionsToExcel = (rows, fileName = "transactions.xlsx") => {
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("No transaction data available to export.");
  }

  const formattedRows = rows.map((item, index) => ({
    "S. No.": index + 1,
    "Transaction ID": item?.Transaction_Id || "-",
    Amount: item?.Transaction_Amount ?? "-",
    Date: formatDisplayDateTime(item?.["Date_&_Time"]),
    Status: "Received",
    "VPA ID": item?.VPA_ID || "-",
    "Account Number": item?.Account_Number || "-",
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedRows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
  XLSX.writeFile(workbook, fileName);
};