import { useEffect, useState } from 'react';
import { YMaps, Map, SearchControl} from 'react-yandex-maps';
import { useNavigate } from 'react-router-dom';
import {UserPlacemark} from './PlaceMark'

export const RestMap = () => {
  
  const navigate = useNavigate();

  function buttonHandler () {
    navigate('/');
  }

  const [lon, SetLon] = useState(0);
  const [lat, SetLat] = useState(0);
  const [address, SetAddres] = useState(0);

  useEffect(async () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      SetLon(longitude);
      SetLat(latitude);
    });

    let req = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=51d9c7fc-7e81-4f44-a747-14323b05f7a6&geocode=${lon}, ${lat}`)
    let res = await req.json();
    SetAddres(res.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted);
  }, [])

  return (
    <div
      className='container lg'
    >
      <p>Address: <b>{address}</b></p>
      <YMaps 
        query={{apikey: 'a9e98eaf-d4c4-45e6-9ee4-5afad392d357'}}
      >
        <Map defaultState={{ center: [lat, lon], zoom: 9 }} width={'100%'} height={'600px'} options={{autoFitToViewport: 'always'}} modules={["geolocation", "geocode"]} >
          <UserPlacemark 
            geometry={[lat, lon]}
            options={{
              iconColor: '#ff0000',
              hideIconOnBalloonOpen: false,
              balloonMaxWidth: 200,
            }}
            myClick={() => buttonHandler()} 
            user={{id: 0}}
          />
          <SearchControl options={{ float: 'right' }} onResultSelect={async (e) => {
            const index = e.get('index');
            e.originalEvent.target.getResult(index)
              .then((res) => console.log(res.geometry.getCoordinates()));
            SetAddres(e.originalEvent.target.getRequestString());
          }}/>
        {/* {rests.map((el, ind) => <Placemark key={ind} geometry={el} />)} */}
        </Map>
      </YMaps>
    </div>
  )
}
