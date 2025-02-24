import { type Doc, type APISpaceXResponse } from "../types/api";


export const getLaunchById = async (id: string) => {
    const res = await fetch(`https://api.spacexdata.com/v5/launches/${id}`)

    const launch = (await res.json()) as Doc
    return launch;
}

export const getLatestLaunches = async () => {

    const res2 = await fetch("https://api.spacexdata.com/v4/launches/latest")
    const latestLaunch = await res2.json() as Doc
    //console.log(latestLaunch)
    
    const res = await fetch("https://api.spacexdata.com/v5/launches/query", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: {},
            options: {
                sort: {
                    date_unix: "asc",
                },
                limit: 12,
            },
        }),
    });
    const {docs: launches} = await res.json() as APISpaceXResponse

    return launches
}
