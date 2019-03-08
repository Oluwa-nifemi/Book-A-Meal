const sendError = (message, res) => {
    res.status(409).send({
        status: 'failure',
        message,
    });
};

export default sendError;
