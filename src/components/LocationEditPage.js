import { useState, useRef, useEffect } from 'react';
import './css/LocationEditPage.css'
export default function LocationEditPage({setLoc}) {

    const [city, setCity] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [cityValid, setCityValid] = useState(null);
    const timeoutRef = useRef(null);



    useEffect(() => {
        validateCity(city, countryCode);
    }, [city, countryCode]);


    const validateCity = (cityName, countryName) =>{ 

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setTimeout(() => {
            if (cityName.trim() === '') {
                setCityValid(null);
                return;
            }
        
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}${(countryName !== '' ? ',' : '')}${countryName}&units=metric&appid=6149ab1a1e090372aa72915996763f72`)
                .then((response) => {
                    console.log(response);
                    if(response.ok) {
                        setCityValid(true);
                    } else {
                        setCityValid(false);
                    }
                }).catch(() => setCityValid(false)
            );
        }, 400)
    };




    return (
        <main className='loc-edit'>
            <div>
                <label>City</label>
                <div className='field'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M120-120v-560h240v-80l120-120 120 120v240h240v400H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm240 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm240 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z"/></svg>
                    <input id='city-inp' type='text' onChange={(e) => setCity(e.target.value)} />
                    {cityValid === true && (
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#40c746">
                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                        </svg>
                        
                    )}
                    {cityValid === false && (
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#c75640">
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    )}  
                </div>
            </div>
            <div>
                <label>Country Code (Optional)</label>
                <div className='field'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-7-.5-14.5T799-507q-5 29-27 48t-52 19h-80q-33 0-56.5-23.5T560-520v-40H400v-80q0-33 23.5-56.5T480-720h40q0-23 12.5-40.5T563-789q-20-5-40.5-8t-42.5-3q-134 0-227 93t-93 227h200q66 0 113 47t47 113v40H400v110q20 5 39.5 7.5T480-160Z"/></svg>
                    <input id='city-inp' type='text' onChange={(e) => setCountryCode(e.target.value)} />
                </div>
            </div>

            <div>
                <button enabled={cityValid ? cityValid.toString() : 'false'} onClick={() => { 
                    console.log('Set Loc: ' + `${city}${(countryCode !== '' ? ',' : '')}${countryCode}`);
                    setLoc({
                        city: city,
                        country: countryCode
                    });
                }}>Save</button>
                <p enabled={cityValid === true || cityValid === false ? (!cityValid).toString() : 'null'} className='errMsg'>Invalid City/Country</p>
            </div>
        </main>
    );
}