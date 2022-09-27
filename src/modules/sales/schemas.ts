import validator from "../../lib/validator";

const sellSChema = validator
  .object()
  .shape({
    productId: validator.number().required(),
    quantity: validator.number().required().min(1),
    totalPrice: validator.number().required(),
  })
  .noUnknown(true);

export { sellSChema };
/*
model Sales {
    id         Int      @id @default(autoincrement())
    product    Product  @relation(fields: [productId], references: [id])
    productId  Int      @unique
    quantity   Int
    totalPrice Float
    soldAt     DateTime @default(now())
  }

 */
