export const errorHandler = (err, req, res, next) => {
    // console.log(err.message)
    res.status(err.statusCode || 500).send(err.message || 'Server Error')
}