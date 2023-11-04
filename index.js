import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/Programming";

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/more", async (req, res) => {
    try {
        const result = await axios.get(API_URL);
        if (result.data.type === "single") {
            res.render("index.ejs", {
                type: result.data.type,
                joke: result.data.joke
            });
        } else if (result.data.type === "twopart") {
            res.render("index.ejs", {
                type: result.data.type,
                setup: result.data.setup,
                delivery: result.data.delivery
            });
        }
    } catch (error) {
        console.log(error.response.data);
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});