const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const ResturantList = require("./RestaurentData");
const UserData = require("./UserData");
const MenuItems = require("./MenuItems");

app.use(bodyParser.json());

app.get("/api/restaurents", (req, res) => {
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
      data: { restaurant, MenuItems },
    });
  } else {
    return res.status(404).json({
      status: "failed",
      message: "Invalid restro id, try again...",
    });
  }
});

app.get("/api/users", (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Users fetched successfully",
    data: UserData,
  });
});

app.get("/api/user", (req, res) => {
  const { id, useremail, password } = req.body;
  const user = UserData.filter((user) => user.id === id);

  if (user.length > 0) {
    if (user[0]?.email === useremail && user[0]?.password === password) {
      return res.status(200).json({
        status: "success",
        message: "User details fetched successfully",
        data: { ...user, password: "" },
      });
    } else {
      return res.status(404).json({
        status: "failed",
        message: "Invalid user credential, try again...",
      });
    }
  } else {
    return res.status(404).json({
      status: "failed",
      message: "Invalid user id, try again...",
    });
  }
  return res.status(200).json({});
});

app.listen(3001, () => {
  console.log("App is listening on port 3001...");
});
