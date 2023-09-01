function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reverseDate(date: string): string {
  const dateArr = date.split("-");
  dateArr.reverse();
  return dateArr.join("-");
}

export { getRandomInt, reverseDate };
