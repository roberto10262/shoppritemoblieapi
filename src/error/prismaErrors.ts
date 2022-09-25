import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const PRISMA_ERROR_CODES = {
  uniqueConstraintError: "P2002",recordNotFound:"P2025", foreignKeyConstraintError:"P2003"
};



const handleUniqueConstraintError=(error: PrismaClientKnownRequestError)=>{
    return `Unique field already exists`
} 


export {PRISMA_ERROR_CODES, handleUniqueConstraintError}
