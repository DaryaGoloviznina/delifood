import { ACTypes } from "../../types";

export const setUserLocation = (locationData) => ({type: ACTypes.SET_USER_LOCATION, payload: locationData});

export const getUserLocationThunk = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude: lat, longitude: lon } = position.coords;
    let req = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&lang=en_US&apikey=fd56ec54-348d-47a6-8ba7-17e1dd585174&geocode=${lon}, ${lat}`)
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