//qr card component to show the qr code and details of the qr code
function QrCard({
  title,
  merchantName,
  vpaId,
  imageSrc,
  amount,
  validityText,
  showAmount = false,
}) {
  return (
    <div className="flex flex-col items-center">
      {showAmount ? (
        <div className="mb-4 text-center">
          <p className="text-[14px] font-bold text-[#4a4a4a]">
            Amount to be Collected
          </p>
          <p className="mt-1 text-[26px] font-bold text-[#e11d48]">
            ₹ {amount}
          </p>
        </div>
      ) : null}

      <div className="w-[230px] rounded-[18px] border border-[#d9d9d9] bg-white px-4 py-4 text-center shadow-sm">
        <div className="mx-auto mb-2 w-fit rounded bg-[#f7f7f7] px-2 py-1">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#333]">
            {merchantName}
          </p>
        </div>

        <p className="mb-2 text-[18px] font-bold text-[#222]">{title}</p>

        {imageSrc ? (
          <img
            src={imageSrc}
            alt="QR Code"
            className="mx-auto h-[180px] w-[180px] object-contain"
          />
        ) : (
          <div className="mx-auto flex h-[180px] w-[180px] items-center justify-center rounded border border-dashed border-[#d9d9d9] text-[12px] text-[#999]">
            QR Preview
          </div>
        )}

        <p className="mt-3 break-all text-[10px] font-semibold text-[#444]">
          UPI ID: {vpaId}
        </p>

        <div className="mt-3 text-[18px] font-bold tracking-wide text-[#666]">
          BHIM UPI
        </div>

        <div className="mt-2 flex flex-wrap justify-center gap-2 text-[10px] font-medium text-[#666]">
          <span>CRED</span>
          <span>PhonePe</span>
          <span>GPay</span>
          <span>Paytm</span>
        </div>
      </div>

      {validityText ? (
        <p className="mt-3 text-[12px] font-semibold text-[#e11d48]">
          {validityText}
        </p>
      ) : null}
    </div>
  );
}

export default QrCard;