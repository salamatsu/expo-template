import { BOOKCASESSAMPLE } from "../constants/staticData";

export const sortArrayObjects = (arr, key, type = "desc") => {
  return arr.sort((a, b) => {
    if (type == "desc") {
      if (a[key] > b[key]) return 1;
      if (a[key] < b[key]) return -1;
    } else {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
    }
    return 0;
  });
};

export const objectToQueryParams = (object) => {
  return Object.keys(object)
    .map((key) => `${key}=${encodeURIComponent(object[key])}`)
    .join("&");
};

export const shortenNumber = (value) => {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(1).replace(/\.0$/, "") + "B"; // Billion
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(1).replace(/\.0$/, "") + "M"; // Million
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(1).replace(/\.0$/, "") + "k"; // Thousand
  } else {
    return value.toString(); // Less than 1000, show as is
  }
};

export const boocaseFormat = (bookcases = []) => {
  // "subId", // bookcase ID
  // "subBookcaseId",   // PARENT ID

  // Create a map to hold bookcases by their ID and add a subCases property to each.
  const bookcaseMap = new Map();

  // Step 1: Populate the map with bookcase objects, initializing subCases as an empty array.
  bookcases.forEach((bookcase) => {
    bookcaseMap.set(bookcase.subId, { ...bookcase, subCases: [] });
  });

  // Array to hold the top-level bookcases (those with subBookcaseId === null).
  const rootCases = [];

  // Step 2: Build the hierarchy by linking subcases to their parent bookcases.
  bookcases.forEach((bookcase) => {

    if (bookcase.subBookcaseId === null) {
      // If subBookcaseId is null, this is a top-level bookcase; add it to the rootCases array.
      rootCases.push(bookcaseMap.get(bookcase.subId));
    } else {
      // Otherwise, find the parent bookcase using subBookcaseId and add the current bookcase to its subCases.
      const parent = bookcaseMap.get(bookcase.subBookcaseId);

      if (parent) {
        parent.subCases.push(bookcaseMap.get(bookcase.subId));
      }
    }
  });


  console.log("ROOT CASES", rootCases);

  // Step 3: Return the rootCases array, which now contains the fully nested structure.
  return rootCases;
}