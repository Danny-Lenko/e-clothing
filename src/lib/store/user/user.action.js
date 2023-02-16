import { createAction } from "../../utils/createAction.utils"
import { userActionTypes } from "./user.types"

export const setUser = (user) => 
   createAction(userActionTypes.setUser, user)
