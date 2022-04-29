const express = require("express");
const gplay = require("google-play-scraper");

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/views/index.html")
});

app.post("/apps", async (request, response) => {
    let payload = request.body.payload.trim();
    let search = await gplay.search({ term: `${payload}`, throttle: 10 })
    console.log(search)
    response.send({payload : search})
})

app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
})