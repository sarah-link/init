import React, {Fragment, useEffect, useState} from "react";
import MainButtons from "./MainButtons";

function Home (props) {
    const [data, setData] = useState([])

    const fetchData = async () => {
        const result = await fetch("/test_table/")
        const jsonData = await result.json()

        setData(jsonData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="App-body" id="home-body">
            <div className="App-header">
                <h1>
                    <b>Roll Initiative!</b>
                </h1>

                <h4>
                    A better way to roll initiative or something idk
                </h4>
            </div>

            <MainButtons/>

            <Fragment>
                {data.map(entry => (
                    <div>
                        <b>{entry.name}</b>: {entry.description}
                    </div>
                ))}
            </Fragment>
        </div>
    )


}

export default Home;