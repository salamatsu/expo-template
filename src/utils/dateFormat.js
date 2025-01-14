import moment from "moment";

export const localizeDate = (date) => {
  const oneYearAgo = moment().subtract(1, "year"); // Date one year ago from today
  const dateMoment = moment(date);

  // Check if the date is within the past year
  if (dateMoment.isSameOrAfter(oneYearAgo)) {
    return dateMoment.format("ll").split(",")[0]; // Example: Jan 9
  } else {
    return dateMoment.format("ll"); // Example: Jan 9, 2023
  }
};
