import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const getLocation = () => {
    const [errorMsg, setErrorMsg] = useState(""); //useState allows a state variable for componetns ie. if component was age and useState(28) would set age to 28 by default
    const [longitude, setLongitude] = useState(""); //creating use states that will take the longitude and latitude from later methods to store 
    const [latitude, setLatitude] = useState("");
    const [cityName, setCity] = useState("");

    const getDeviceLocation = async () => { //async helps with handling fetch and data operations 
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            setErrorMsg("Location permissions not granted. Please allow access to Location."); //Error handling 
            return;
        }

        let { coords } = await Location.getCurrentPositionAsync(); // Requests devices current position. uses await to excute when requested data is recieved 

        if (coords) {
            const { latitude, longitude } = coords; // takes the coordinates from device 
            console.log("latitude and longitude is", latitude, longitude);
            setLatitude(latitude); //used to set our state variables with the recieved coords
            setLongitude(longitude);
            let response = await Location.reverseGeocodeAsync({ latitude, longitude }); // expo api to turn coords into things such as city state country etc. 

            console.log("Location is", response);
            if (response.length > 0) {
                const cityName = response[0].city;
                setCity(cityName);
            }
        }

    };

    useEffect(() => {
        getDeviceLocation();
    }, []);
    return { latitude, longitude, cityName, errorMsg };
};

export default getLocation;
const styles = StyleSheet.create({});
