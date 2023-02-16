import { createAction } from "../../utils/createAction.utils";
import { categoriesActionTypes } from "./categories.types";

export const setCategories = (categories) => 
   createAction(categoriesActionTypes.setCategory, categories)