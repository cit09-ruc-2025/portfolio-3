export const getFormattedDate = (createdAt) => {
  return new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
};

export const groupByDate = (array, dateKey) => {
  return array.reduce((acc, item) => {
    const date = new Date(item[dateKey])
      .toISOString()
      .split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(item);
    return acc;
  }, {});
}

export const getFormattedTime = (dateString, isHour12 = true) => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: isHour12,
  });
}