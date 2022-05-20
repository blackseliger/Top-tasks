export default (arr, text) => {
  return [...arr].filter((element) => element.name.includes(text));
};

