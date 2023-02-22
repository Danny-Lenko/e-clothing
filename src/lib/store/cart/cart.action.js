import { createAction } from "../../utils/createAction.utils";
import { cartActionTypes } from "./cart.types";

export const updatePayload = (payload) => 
   createAction(cartActionTypes.updatePayload, payload)