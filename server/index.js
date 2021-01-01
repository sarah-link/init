const express = require("express")
const cors = require("cors")
const app = express()
const pool = require("./db")

// MIDDLEWARE //
app.use(cors())
app.use(express.json())

// ROUTES //

// -- get list of creatures with only basic info for use in encounter creature list
app.get("/creatureList/", async(req, res) => {
    console.log("/creatureList/ request received!")

    try {
        let cmd = "SELECT id, name, size, type, hit_point_max, challenge_rating FROM srd_creature"
        const results = await pool.query(cmd)
        res.json(results.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000")
})