const validate = (req, res, next) => {
  if (req.validationErrors && req.validationErrors().length > 0) {
    return res.status(400).json({ errors: req.validationErrors() });
  }
  next();
};

export default validate;
