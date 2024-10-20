export default function formatDate(data: Date) {
  const now = new Date();
  const createdAt = new Date(data);

  const durationInMs = Math.floor(now.getTime() - createdAt.getTime());

  const miliSecond = 1000;
  const secondsInHour = 3600;
  const secondInDay = 86400;
  const dayInMonth = 30;

  const durationTimeInHours = Math.floor(
    durationInMs / (miliSecond * secondsInHour)
  );
  const durationTimeInDay = Math.floor(
    durationInMs / (miliSecond * secondInDay)
  );
  const durationTimeInMonth = Math.floor(
    durationInMs / (miliSecond * secondInDay * dayInMonth)
  );

  if (durationTimeInDay < 1) {
    const hoursAgo = durationTimeInHours;
    return `${hoursAgo} h`;
  }

  if (durationTimeInMonth < 1) {
    return createdAt.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  return createdAt.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
