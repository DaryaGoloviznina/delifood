import { ACTypes } from "../../types";

export const setUserLocation = (locationData) => ({type: ACTypes.SET_USER_LOCATION, payload: locationData});

export const getUserLocationThunk = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude: lat, longitude: lon } = position.coords;
    let req = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&lang=en_US&apikey=c38ad5e0-1cb4-4183-8cf7-415924edffc6&geocode=${lon}, ${lat}`)
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