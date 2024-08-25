const REQUEST_VIEWER = (req, res, next) => {
    console.log(`Method ${req.method} on  ${req.url}  url`)
    next()
  }

export default REQUEST_VIEWER