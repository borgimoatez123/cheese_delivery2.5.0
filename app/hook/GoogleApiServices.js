import axios from "axios"

const apiKey = "AIzaSyAYgK10l_C_HG-pSeVBVUxChyGSm6wa78Q"; // Replace with your API Key

const calculateDistanceAndTime = async (startLat, startLng, destinationLat, destinationLng, mode = 'bicycling') => {
    const baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?";
    const ratePerKm = 1; 

    const requestUrl = `${baseUrl}origins=${startLat},${startLng}&destinations=${destinationLat},${destinationLng}&mode=${mode}&key=${apiKey}`;

    try {
        const response = await fetch(requestUrl);
        const data = await response.json();


        // Ensure the request was successful and there are results
        if (data.status === "OK" && data.rows[0].elements[0].status === "OK") {
            const distance = data.rows[0].elements[0].distance.text;
            const duration = data.rows[0].elements[0].duration.text;

            const distanceInKm = parseFloat(distance.replace(' km', ''));
            const price = distanceInKm * ratePerKm;
            const finalPrice = `$${price.toFixed(2)}`

            return {
                distance,
                duration,
                finalPrice
            };
        } else {
            console.error("Error calculating distance and duration:", data.status);
            return null;
        }
    } catch (error) {
        console.error("Failed to calculate distance and duration:", error);
        return null;
    }
}


const extractNumbers = (inputStr) =>{
    if (typeof inputStr !== 'string') {
        return [];
    }
    const matched = inputStr.match(/\d+/g);
    return matched ? matched.map(num => parseInt(num, 10)) : [];
}


export default {
    calculateDistanceAndTime,
    extractNumbers,
    apiKey
}
