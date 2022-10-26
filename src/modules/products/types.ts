interface InewProduct{
    name: string,
    price: number
    categoryId:number
}


interface IupdateProduct{
 name: string |undefined,
 price: number | undefined,
 active: boolean|undefined
}


export {InewProduct, IupdateProduct}