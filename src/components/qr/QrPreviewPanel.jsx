import QrCard from "./QrCard";

function QrPreviewPanel({
  qrType,
  imageSrc,
  merchantName,
  vpaId,
  amount,
  onDownload,
  showDownloadButton,
}) {
  return (
    <div className="rounded border border-[#e8e8e8] bg-white p-5">
      <div className="flex min-h-[360px] flex-col items-center justify-center">
        {qrType === "static" ? (
          <>
            <p className="mb-5 text-[14px] font-bold text-[#333]">
              Select The Type of QR
            </p>

            <QrCard
              title="Scan & Pay"
              merchantName={merchantName}
              vpaId={vpaId}
              imageSrc={imageSrc}
            />

            {showDownloadButton ? (
              <button
                type="button"
                onClick={onDownload}
                className="mt-6 rounded bg-[#00836C] px-5 py-2 text-[13px] font-medium text-white"
              >
                Download QR
              </button>
            ) : null}
          </>
        ) : (
          <QrCard
            title="Scan & Pay"
            merchantName={merchantName}
            vpaId={vpaId}
            imageSrc={imageSrc}
            amount={amount}
            showAmount
            // validityText="Valid till 1:29"
          />
        )}
      </div>
    </div>
  );
}

export default QrPreviewPanel;