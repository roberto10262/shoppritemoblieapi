import { Handler } from "express";
import { request } from "http";
import { newCategory } from "./schemas";
import * as categoryServices from "./services"


const create: Handler = async(request, response, next)=>{
 try {
     const category = await categoryServices.createCategory(newCategory.validateSync(request.body)) 

     response.status(201).json(category)
    } catch (error) {
     next(error)
 }   
} 

const getAll: Handler = async(request, response, next)=>{
    try {
        const categories = await categoryServices.getCategories()
        response.status(200).json(categories)
    } catch (error) {
        next(error)
    }
}


export {create, getAll}