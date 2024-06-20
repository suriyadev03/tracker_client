import baseReducer from "./reducers/baseReducer";
import baseService from "../service/baseService";


const rootReducer = {
    [baseService.reducerPath]: baseService.reducer,
    application: baseReducer
};

export default rootReducer;