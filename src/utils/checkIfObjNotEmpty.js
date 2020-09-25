export const isNotEmpty = (data) => {
  if(data) {
    return Object.keys(data).length >= 1;
  } else {
    return false;
  }
};