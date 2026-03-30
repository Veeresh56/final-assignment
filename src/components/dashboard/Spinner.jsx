// This component displays a loading spinner, typically used to indicate that data is being fetched or processed in the background.
function Spinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#dbeafe] border-t-[#00836C]" />
    </div>
  );
}

export default Spinner;