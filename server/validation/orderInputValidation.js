export const orderInputValidate = (reqBody) => {
    const { orderPrice, address, paymentMode } = reqBody;
    return (
      typeof address === 'string' &&
      address.trim() !== '' &&
      typeof paymentMode === 'string' &&
      paymentMode.trim() !== ''
    );
  };
    