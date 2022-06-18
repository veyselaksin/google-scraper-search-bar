const express = require("express");
const gplay = require("google-play-scraper");
const AppModel = require("./liveSearch");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));




app.get("/", (request, response) => {
    response.sendFile(__dirname + "/views/index.html")
});

app.get("/all-apps", async (request, response) => {
    let free_game = await gplay.list({
        category: gplay.category.GAME,
        collection: gplay.collection.TOP_FREE,
    });
    let paid_game = await gplay.list({
        category: gplay.category.GAME,
        collection: gplay.collection.TOP_PAID,
    })
    
    let m_search = await AppModel.find({}).exec();    
    let search = m_search.concat(free_game, paid_game);
    console.log(search.length)

    response.send(search);
})

app.post("/all-apps", async (request, response) => {
    let payload = request.body.payload.trim();
    let g_search = await gplay.search({ term: `${payload}`, throttle: 10 });
    let m_search = await AppModel.find({ gameName: { $regex: new RegExp('^' + payload + '.*', 'i') } }).exec();
    m_search = m_search.slice(0, 10);
    let search = g_search.concat(m_search)
    response.send({ payload: search })
})

app.listen(PORT, async () => {
    console.log(`Server has started on PORT ${PORT}`)
    mongoose.connect("mongodb://mongodb:27017/apps", { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on("error", error => console.log(error));
    db.once("open", () => { console.log("Connected to Mongo") })
})