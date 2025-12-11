class ApiResponse {
  /**
   * Constructs a new ApiResponse object.
   * @param {number} statusCode - The HTTP status code.
   * @param {*} data - The response data.
   * @param {string} [message="Success"] - The response message.
   * @example
   * const apiResponse = new ApiResponse(200, { foo: "bar" }, "Success");
   */
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
