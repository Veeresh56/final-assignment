import Button from "../dashboard/Button";
import InputField from "../dashboard/InputField";
import SelectField from "../dashboard/SelectField";

// This component is responsible for rendering the form to update the language of a device. It receives the following props:
function LanguageForm({
  vpaId,
  serialNumber,
  currentLanguage,
  selectedLanguage,
  languages,
  error,
  isUpdating,
  isUpdateDisabled,
  onSelectLanguage,
  onCancel,
  onUpdate,
}) {
  return (
    <div className="rounded-[2px] border border-[#e6e6e6] bg-white px-3 py-4 sm:px-5 font-bold text-[#333]">
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
        <InputField label="VPA ID" value={vpaId} readOnly />
        <InputField label="Device Serial Number" value={serialNumber} readOnly />
        <InputField
          label="Current Language"
          value={currentLanguage?.label}
          readOnly
        />

        <SelectField
          label="Language Update"
          value={selectedLanguage}
          onChange={(e) => onSelectLanguage(e.target.value)}
          options={languages}
          placeholder="Select Language Update"
        />
      </div>

      {error ? (
        <div className="mt-4 rounded-[3px] border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-600">
          {error}
        </div>
      ) : null}

      <div className="mt-5 flex items-center justify-end gap-3">
        <Button variant="dangerGhost" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onUpdate} disabled={isUpdateDisabled}>
          {isUpdating ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
}

export default LanguageForm;