export default function serverResponse(response, statusCode, message, options) {
  return response.status(statusCode).json({
    message,
    statusCode,
    ...options,
  });
}
