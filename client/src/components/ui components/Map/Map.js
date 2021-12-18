import { useEffect, useState, useContext } from 'react';
import Context from '../../../context';

import { YMaps, Map, SearchControl } from 'react-yandex-maps';
import { UserPlacemark } from './Placemark/UserPlacemark'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBoxesThunk } from '../../../store/boxes/actions';
import BoxModal from '../Modals/CustomerBoxesPage/BoxModal'
import { convertObjTimetoStrTime } from '../../../lib/formateTimeFunctions';
import { setUserLocation } from '../../../store/user/UserLocation/actions';
import compareBoxes from '../../../lib/compareBoxes';
import { ListPlacemarks } from './Placemark/ListPlacemarks';

export const RestMap = () => {
  
  const dispatch = useDispatch();
  const location = useSelector((store) => (store.auth?.location));
  const [clientOrderBoxAmount, setclientOrderBoxAmount] = useState() // для изменения количества оставшихся боксов в ресторане после оформления заказа клиента

  useEffect(() => {
    if (clientOrderBoxAmount === 0) dispatch(getAllBoxesThunk(location));
  }, [clientOrderBoxAmount]);
  
  return (
    <div className="rounded-xl">
      <YMaps 
        query={{apikey: 'fd56ec54-348d-47a6-8ba7-17e1dd585174', lang: 'en_US'}}
      >
        <Map 
          state={{ 
            center: [location?.lat, location?.lon], 
            zoom: 11,
          }} 
          width={'100%'}
          height={'600px'}
          options={{autoFitToViewport: 'always'}}
          modules={["geolocation", "geocode"]}
        >
          <ListPlacemarks />
          <SearchControl
            options={{ float: 'right', noPlacemark: true }}
            onResultSelect={async (e) => {
              const res = await e.originalEvent.target.getResult(0);
              const [lat, lon] = res.geometry.getCoordinates();
              
              dispatch(setUserLocation({
                address: res.getAddressLine(),
                lat,
                lon,
              }));
            }}
          />
        </Map>
      </YMaps>
    </div>
  )
}
