const express = require("express");
const ResturantList = require("./RestaurentData");

const app = express();

app.get("/api/restaurents", (req, res) => {
  console.log("ResturantList :", ResturantList);
  return res.status(200).json({
    status: "success",
    message: "restaurents fetched successfully",
    data: ResturantList,
  });
});

app.get("/api/restaurent/:id", (req, res) => {
  const restroId = req.params.id;
  const restaurant = ResturantList.filter(
    (restro) => restro.data.id === restroId
  );

  if (restaurant.length > 0) {
    return res.status(200).json({
      status: "success",
      message: "Restaurent details fetched successfully",
      data: restaurant,
    });
  } else {
    return res.status(404).json({
      status: "failed",
      message: "Invalid restro id, try again...",
    });
  }
});

app.listen(3001, () => {
  console.log("App is listening on port 3001...");
});
