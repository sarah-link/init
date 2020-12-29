const express = require("express")
const cors = require("cors")
const app = express()
const pool = require("./db")

// MIDDLEWARE //
app.use(cors())
app.use(express.json())

// ROUTES //

// -- get all entries
app.get("/test_table/", async(req, res) => {
    console.log("request received!")

    try {
        const results = await pool.query("SELECT * FROM srd_creature")

        res.json(results.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000")
})