const bookInputValidate = (reqBody) => {
  const trimmedName = reqBody.bookName.trim();
  const trimmedCategory = reqBody.bookCategory.trim();
  const trimmedAuthor = reqBody.bookAuthor.trim();
  const trimmedPrice = reqBody.bookPrice.trim();
  const trimmedBookDescription = reqBody.bookDescription.trim();
  const float = parseFloat(trimmedPrice);
  const ceilPrice = Math.ceil(float);

  if (
    trimmedName !== "" &&
    trimmedCategory !== "" &&
    trimmedAuthor !== "" &&
    trimmedBookDescription !== "" &&
    ceilPrice >= 1
  ) {
    return true;
  } else {
    return false;
  }
};

export default bookInputValidate;
