import './css/WeatherPage.css';
import Header from './Header';
import MainContent from './MainContent';
import Forecast from './Forecast';
import { useEffect, useState } from 'react';
import LocationEditPage from './LocationEditPage';
import InfoPage from './InfoPage';

export default function WeatherPage() {

    const apiUrlTemplate = 'https://api.openweathermap.org/data/2.5/weather?q=####&units=metric&appid=6149ab1a1e090372aa72915996763f72';
    const geoTemplateUrl = 'https://nominatim.openstreetmap.org/reverse?format=geojson&lat=1111&lon=2222';
    let [todayApiUrl, setUrl] = useState('https://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=6149ab1a1e090372aa72915996763f72');
    let [canLocate, setCanLocate] = useState(false);
    let [weather, setWeather] = useState(null);
    let [isInLocEditMode, setIsInLocEditMode] = useState(false);
    let [location, setLocation] = useState({city: 'Toronto', country: 'CA'});
    let [isInfoMode, setIsInfoMode] = useState(false);

    useEffect(() => {
        if ("geolocation" in navigator) {
            console.log("Yes");
            navigator.geolocation.getCurrentPosition( async (position) => {
                console.log(position.coords.latitude + ' , '+ position.coords.longitude);
                const geoUrl = geoTemplateUrl.replace('1111', position.coords.latitude).replace('2222', position.coords.longitude);
                try{
                    const response = await fetch(geoUrl);
                    const data = await response.json();
                    let city = data?.features[0]?.properties?.address?.city;
                    let country = data?.features[0]?.properties?.address?.country_code;
                    if (city && country) {
                        console.log("Setting Location to " + city + ", "+ country);
                        setLocation({city: city, country: country.toUpperCase()});
                        setCanLocate(true);
                    }
                } catch (err) {
                    console.log(err);
                    setCanLocate(false);
                }
              }, (err) => {
                console.log(err);
                setCanLocate(false);
              });
        } else {
            console.log('Not available!');
            setCanLocate(false);
        }
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(todayApiUrl);
                const data = await response.json();
                setWeather(data);
                console.log(data);
            } catch (error) {
                console.error('Failed to fetch weather data:', error);
            }
        };
        
        fetchWeather();
    }, [todayApiUrl]);

    useEffect(() => {
        setUrl(apiUrlTemplate.replace('####',  `${location.city}${(location.country !== '' ? ',' : '')}${location.country}`));
        setIsInLocEditMode(false);
    }, [location]);

    useEffect(() => {
        setIsInLocEditMode(false);
    }, [isInfoMode]);

    useEffect(() => {
        setIsInfoMode(false);
    }, [isInLocEditMode]);

    

    if(isInLocEditMode) {
        return (
            <>
                <Header canLocate={canLocate} iconUrl={weather ? ('https://openweathermap.org/img/wn/'+ weather.weather[0].icon +'.png') : null} currentLocation={location} setEditMode={setIsInLocEditMode} editMode={isInLocEditMode} setInfoMode={setIsInfoMode} infoMode={isInfoMode} />
                <LocationEditPage setLoc={setLocation} />
            </>
        );
    } else if(isInfoMode) {
        return (
            <>
                <Header canLocate={canLocate} iconUrl={weather ? ('https://openweathermap.org/img/wn/'+ weather.weather[0].icon +'.png') : null} currentLocation={location} setEditMode={setIsInLocEditMode} editMode={isInLocEditMode} setInfoMode={setIsInfoMode} infoMode={isInfoMode} />
                <InfoPage />
            </>
        );
    }

    return (
        <>
            <Header canLocate={canLocate} iconUrl={weather ? ('https://openweathermap.org/img/wn/'+ weather.weather[0].icon +'.png') : null} currentLocation={location} setEditMode={setIsInLocEditMode} editMode={isInLocEditMode} setInfoMode={setIsInfoMode} infoMode={isInfoMode} />
            { weather ? (
                    <MainContent 
                        temp={Math.round(weather.main.temp)}
                        unit={'C'} 
                        condition={weather.weather[0].main}
                        visibility={weather.visibility > 1000 ? Math.round(weather.visibility / 1000) : weather.visibility}
                        visibilityUnit={weather.visibility > 1000 ? 'km' : 'm'}
                        humidity={weather.main.humidity}
                        feelsLike={Math.round(weather.main.feels_like)}
                    />
                ) : (
                    <p>Loading....</p>
                )}
            <Forecast />
        </>
    );
}