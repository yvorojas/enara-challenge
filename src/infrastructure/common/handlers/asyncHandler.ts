const asyncHandler = callback => (req, res, next) =>
  Promise.resolve(callback(req, res, next).then(next)).catch(next);

export default asyncHandler;
