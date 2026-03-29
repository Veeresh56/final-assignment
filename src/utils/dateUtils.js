export const formatDate = (date) => {
  return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
};

export const getTodayRange = () => {
  const today = new Date();
  const formatted = formatDate(today);

  return {
    startDate: formatted,
    endDate: formatted,
  };
};