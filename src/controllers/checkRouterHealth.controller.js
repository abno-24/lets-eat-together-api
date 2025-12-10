export const checkRouterHealth = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Router is healthy",
  });
}