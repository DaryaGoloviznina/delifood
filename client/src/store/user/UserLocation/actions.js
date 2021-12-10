import { ACTypes } from "../../types";

export const setUserLocation = (locationData) => ({type: ACTypes.SET_USER_LOCATION, payload: locationData});

export const getUserLocationThunk = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude: lat, longitude: lon } = position.coords;
    let req = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&lang=en_US&apikey=4321dfba-081c-44a9-8f75-0b7384c8952d&geocode=${lon}, ${lat}`)
    let res = await req.json();
    
    const address = res.response.GeoObjectCollection.featureMember[0]
      .GeoObject.metaDataProperty.GeocoderMetaData
      .Address.formatted;
    const country_code = res.response.GeoObjectCollection.featureMember[0]
      .GeoObject.metaDataProperty.GeocoderMetaData
      .Address.country_code;
   
    dispatch(setUserLocation({address, lat, lon, country_code}));
  });
}