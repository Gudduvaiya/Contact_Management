import {constant} from "../constants.js";
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ?? 500;
  switch (statusCode) {
    case constant.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: error.message,
        stackTrace: error.stackTrace,
      });
      break;

    case constant.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: error.message,
        stackTrace: error.stackTrace,
      });
      break;

    case constant.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: error.message,
        stackTrace: error.stackTrace,
      });
      break;

    case constant.UNAUTHORIZED:
      res.json({
        title: "Unauthorised user",
        message: error.message,
        stackTrace: error.stackTrace,
      });
      break;
    case constant.SERVER_ERROR:
      res.json({
        title: "Server not Found",
        message: error.message,
        stackTrace: error.stackTrace,
      });
      break;
    default:
        console.log("No errors!");
      break;
  }
};

export { errorHandler };
