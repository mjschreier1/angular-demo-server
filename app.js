const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const data = [
    {
        id: 1,
        item: "Milk",
        quantity: 1
    },
    {
        id: 2,
        item: "Bread",
        quantity: 2,
        notes: "Need a loaf of white and a loaf of wheat to satisfy the picky eaters."
    }
]

app.get("/list", (_, res) => {
    res.json(data);
})

app.post("/list", (req, res) => {
    data.push(req.body);
    res.send({
        error: false,
        itemAdded: data[data.length - 1]
    })
})

app.delete("/list", (req, res) => {
    let itemDeleted = data.reduce((acc, item, i) => {
        if (item.id === req.body.id) acc.push(data.splice(i, 1));
        return acc;
    }, [])
    res.send({
        error: false,
        itemDeleted: itemDeleted[0]
    })
})

app.listen(port, () => console.log(`App started on port ${port}`))