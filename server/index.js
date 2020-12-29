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
        const results = await pool.query("SELECT * FROM srd_creature")
        let ret = []
        let rows = results.rows
        rows.forEach(entry => {
            let tmpCreature = {
                name: entry.name,
                size: entry.size,
                type: entry.type,
                hit_points: entry.hit_point_max,
                challenge_rating: entry.challenge_rating
            }

            ret.push(tmpCreature)
        })
        res.json(ret)
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000")
})