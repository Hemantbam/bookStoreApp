const bookInputValidate = (name, category, author, price) => {
  if (
    price.trim() !== "" &&
    name.trim() !== "" &&
    category.trim() !== "" &&
    author.trim() !== ""
  ) {
    return true;
  }  {
    return false;
  }
};

export default bookInputValidate;
