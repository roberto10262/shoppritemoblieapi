interface IcreateStock {
  availableQuantity: number;
  productId: number;
}

interface IupdateStock {
  availableQuantity: number;
}

export { IcreateStock, IupdateStock}