{/*utils, short for "utilities", refers to a directory or module containing reusable helper functions and classes that perform common, often low-level, tasks within a project
    
errorHandler - A utility to create standardized error objects,can use multiple times, Keeps your code DRY (Don't Repeat Yourself)*/}

export const errorHandler = (statusCode, message) => {       
    const error = new Error();                              {/*creating error object*/}
    error.statusCode = statusCode;
    error.message = message;
    return error;
}   