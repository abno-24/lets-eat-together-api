import { asyncHandler } from "../utils/helpers/asyncHandler.js";
import { ApiResponse } from "../utils/api/ApiResponse.js";
import { ApiError } from "../utils/api/ApiError.js";
import { searchTopRestaurantsByDish } from "../services/dish.service.js";

const searchDishes = asyncHandler(async (req, res) => {
  const { name, minPrice, maxPrice } = req.query;

  if (!name || !minPrice || !maxPrice) {
    throw new ApiError(
      400,
      "Missing required query parameters: name, minPrice, and maxPrice are mandatory."
    );
  }

  const parsedMinPrice = parseFloat(minPrice);
  const parsedMaxPrice = parseFloat(maxPrice);

  if (
    isNaN(parsedMinPrice) ||
    isNaN(parsedMaxPrice) ||
    parsedMinPrice < 0 ||
    parsedMaxPrice < parsedMinPrice
  ) {
    throw new ApiError(400, "Invalid price range provided.");
  }

  const restaurants = await searchTopRestaurantsByDish(
    name,
    parsedMinPrice,
    parsedMaxPrice
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { restaurants },
        "Top restaurants retrieved successfully"
      )
    );
});

export { searchDishes };
