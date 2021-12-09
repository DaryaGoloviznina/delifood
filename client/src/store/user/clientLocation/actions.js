import { ACTypes } from "../../types";

export const setUserLocation = (locationData) => ({type: ACTypes.SET_USER_LOCATION, payload: locationData});

export const getUserLocationThunk = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude: lat, longitude: lon } = position.coords;
    let req = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=51d9c7fc-7e81-4f44-a747-14323b05f7a6&geocode=${lon}, ${lat}`)
    let res = await req.json();
    const address = res.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted;

    dispatch(setUserLocation({address, lat, lon}));
  });
}