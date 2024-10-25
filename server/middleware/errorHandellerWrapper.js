import { set500Err } from "../controllers/controllerHelpers/controllerHelper.js";

export const errorHandlerWrapper = (handlerFunction) => {
    return async (req, res, next) => {
        try {
            await handlerFunction(req, res, next);  
        } catch (err) {
            set500Err(err, req, res); 
            return {
                success: false,
                status: 500,
                message: "Internal server error. Please try again later.",
              };
        }
    };
};
