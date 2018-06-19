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
        name: "Milk",
        quantity: 1
    },
    {
        id: 2,
        name: "Bread",
        quantity: 2,
        notes: "Need a loaf of white and a loaf of wheat to satisfy the picky eaters."
    },
    {
        id: 3,
        name: "Hand Soap",
        notes: "The master bath and kitchen are both out."
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
        if (item.id === parseInt(req.query.id)) acc = data.splice(i, 1);
        return acc;
    }, [])
    if (itemDeleted[0]) {
        res.send({
            error: false,
            itemDeleted: itemDeleted[0]
        })
    } else {
        res.status(404);
        res.send({
            error: true,
            itemDeleted: null
        })
    }
})

app.listen(port, () => console.log(`App started on port ${port}`))