function QrDetailsForm({
  qrType,
  amount,
  onTypeChange,
  onAmountChange,
  onSubmit,
  isGenerating,
}) {
  return (
    <div className="rounded border border-[#e8e8e8] bg-white p-5">
      <p className="mb-4 text-[14px] font-bold text-[#777]">
        Select The Type of QR
      </p>

      <div className="mb-5 flex items-center gap-6 text-[14px] text-[#444]">
        <label className="flex items-center gap-3 font-bold">
          <input
            type="radio"
            name="qr_type"
            checked={qrType === "static"}
            onChange={() => onTypeChange("static")}
            className="h-4 w-4"
          />
          Static
        </label>

        <label className="flex items-center gap-3 font-bold">
          <input
            type="radio"
            name="qr_type"
            checked={qrType === "dynamic"}
            onChange={() => onTypeChange("dynamic")}
            className="h-4 w-4"
          />
          Dynamic
        </label>
      </div>

      {qrType === "static" ? (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isGenerating}
            className="rounded bg-[#00836C] px-5 py-2 text-[13px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGenerating ? "Loading..." : "Submit"}
          </button>
        </div>
      ) : (
        <>
          <p className="mb-3 text-[14px] text-[#777] font-medium">
            Enter an amount to instantly generate your dynamic QR code
          </p>

          <label className="mb-3 block text-[14px] font-medium text-[#6a6a6a]">
            Amount to be collected
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              value={amount}
              onChange={(e) =>
                onAmountChange(e.target.value.replace(/[^0-9.]/g, ""))
              }
              placeholder="Enter the amount to be collected"
              className="h-[40px] w-full max-w-[280px] rounded border border-[#dddddd] bg-white px-3 text-[14px] text-[#444] outline-none focus:border-[#00836C] font-medium"
            />

            <button
              type="button"
              onClick={onSubmit}
              disabled={isGenerating}
              className="rounded bg-[#00836C] px-5 py-2 text-[13px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGenerating ? "Generating..." : "Generate QR"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default QrDetailsForm;