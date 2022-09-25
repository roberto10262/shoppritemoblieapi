import { PrismaClient } from "@prisma/client"
import { AppError } from "../../error/AppError"
import { validateData } from "../../lib/validator"
import { newProductSchema } from "./schema"
import { InewProduct } from "./types"



const createProduct = async (data: any)=>{
    
    const validData = await validateData<InewProduct>(newProductSchema, data)
    if(!validData)
        return
    const prisma = new PrismaClient()
    const exists = await prisma.product.findUnique({where:{name:validData.name}})
    
    if(exists) throw new AppError("Record already exists");
     
    const newProduct = await prisma.product.create({data:validData})
    
    return newProduct

}

export {createProduct}