import { useEffect, useState } from "react";
import axios from "axios";
const http = require('https');
// import { RAPID_API_KEY } from '@env';

// const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        hostname: 'jsearch.p.rapidapi.com',
        port: null,
        path: `/${endpoint}`,
        headers: {
            // 'x-rapidapi-key': rapidApiKey,
            'x-rapidapi-key': "ebfb9e03b5mshf8150bb796c200ep13cf13jsnce868bff9f4b",
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query },

        // OR
        // method: 'GET',
        // path: `https://jsearch.p.rapidapi.com/${endpoint}`,
        // headers: {
        //     'x-rapidapi-key': rapidApiKey,
        //     'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        // },
        // params: { ...query },
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);

            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert('Something went wrong while requesting data from RAPID_API')
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };



    // TODO: best way to handle Data comming from the API
    // const req = http.request(options, function (res) {
    //     const chunks = [];

    //     res.on('data', function (chunk) {
    //         chunks.push(chunk);
    //     });

    //     res.on('end', function () {
    //         const body = Buffer.concat(chunks);
    //         console.log(body.toString());
    //     });
    // });

    // req.end();
}

export default useFetch;