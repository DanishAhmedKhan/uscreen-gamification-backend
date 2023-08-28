const API_STATUS = {
    API_SUCCESS: 200, // Successful api call
    UNAUTHORIZED: 401, // Login required
    BAD_REQUEST: 400, // Token expired
    SERVER_ERROR: 500, // Server issue
    UNPROCESSABLE_ENTITY: 422, // Validation failed
    FORBIDDEN: 403, // User is blocked
    NOT_FOUND: 404, // File or api not found
};

const success = (req, res, responseData = {}, responseCode = 200) => {
    if (typeof responseData === 'string') {
        responseData = {
            msg: responseData,
        }
    }

    res.status(responseCode).send({
        code: responseCode,
        data: responseData,
    });
};

const error = (req, res, message, code = 500, error) => {
    res.status(code).send({
        message,
        code,
        error,
    });
};

module.exports = {
    API_STATUS,
    success,
    error,
};
