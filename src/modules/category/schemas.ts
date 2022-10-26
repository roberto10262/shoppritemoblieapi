import validator from "../../lib/validator";
 const newCategory = validator.object().shape({
    name: validator.string().required(),
  });
  
  interface INewCategory {
    name: string;
  }


  export { INewCategory, newCategory}