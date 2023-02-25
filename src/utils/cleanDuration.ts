export const cleanDuration = (
  duration: "7" | "14" | "30" | ">30" | undefined
) => {
  switch (duration) {
    case "7":
      return { min: 0, max: 7 };
    case "14":
      return { min: 8, max: 14 };
    case "30":
      return { min: 15, max: 30 };
    case ">30":
      return { min: 31, max: undefined };
    default: {
      return { min: undefined, max: undefined };
    }
  }
};

export const convertDuration = (
  duration: number,
  dateCount = { day: 0, week: 0, month: 0, year: 0 }
) => {
  while (duration) {
    if (duration >= 365) {
      duration -= 365;
      dateCount.year++;
    } else if (duration >= 30) {
      duration -= 30;
      dateCount.month++;
    } else if (duration >= 7) {
      duration -= 7;
      dateCount.week++;
    } else if (duration < 7 && duration !== 0) {
      dateCount.day += duration;
      duration = 0;
    }
  }
  return `
  ${
    dateCount.year
      ? ` ${dateCount.year > 1 ? `${dateCount.year} años` : "1 año"}`
      : ""
  }
  ${
    dateCount.month
      ? ` ${dateCount.month > 1 ? `${dateCount.month} meses` : "1 mes"}`
      : ""
  }
  ${
    dateCount.week
      ? ` ${dateCount.week > 1 ? `${dateCount.week} semanas` : "1 semana"}`
      : ""
  } ${
    dateCount.day
      ? ` ${dateCount.day > 1 ? `${dateCount.day} días` : "1 día"}`
      : ""
  }`
    .replace(/\s+/g, " ")
    .trim();
};
