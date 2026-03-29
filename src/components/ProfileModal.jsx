function ProfileModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      
      <div className="bg-white w-[400px] p-6 rounded shadow">
        
        <h2 className="text-lg font-semibold mb-4">
          View Profile Details
        </h2>

        {/* Basic Info */}
        <div className="border p-4 mb-4">
          <p className="font-medium mb-2">Basic Information</p>
          <p>Name: Stebin Ben</p>
          <p>Phone: +91 9398239231</p>
        </div>

        {/* Device Info */}
        <div className="border p-4 mb-4">
          <p className="font-medium mb-2">Device Information</p>
          <p>Device Serial: 456954659876857</p>
          <p>UPI ID: rudransh.panigrahi@cbin</p>
          <p>Status: Active</p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProfileModal;