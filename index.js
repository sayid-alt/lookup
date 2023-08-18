import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// --------------------- Initialazing ---------------------------
// initialize the port server
const app = express();
const port = 3000;

// API
const API_URL = "https://randomuser.me/api/";

// middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// ------------- routing --------------------------------
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// result page
app.post("/result", async (req, res) => {
  // make a request to the API endpoint
  const dataRes = [];

  try {
    const response = await axios.get(API_URL, {
      params: {
        gender: req.body.gender,
      },
    });
    const result = response.data.results;

    // push the result to dataRes array and filterring based on age
    result.forEach((data) => {
      if (req.body.age !== "") {
        data.dob.age < req.body.age && dataRes.push(data);
      } else {
        dataRes.push(data);
      }
    });

    res.render("result.ejs", {
      data: dataRes[Math.floor(Math.random() * dataRes.length)],
    });
  } catch (err) {
    console.error(err);
  }
});
12;
// explore page
app.get("/explore", async (req, res) => {
  const response = await axios.get(API_URL, {
    params: {
      results: 500,
    },
  });

  const result = response.data.results;

  // listing an array of countries and remove the duplicated results
  let countries = [];
  result.forEach((data) => {
    countries.push(data.location.country);
  });
  countries = [...new Set(countries)];

  res.render("explore.ejs", { data: result, countries: countries });
});

// -----------------listen to the server----------------
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
