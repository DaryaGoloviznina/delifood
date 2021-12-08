import { useEffect, useState } from 'react';
import { YMaps, Map, SearchControl} from 'react-yandex-maps';
import { useNavigate } from 'react-router-dom';
import {UserPlacemark} from './PlaceMark'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBoxesThunk } from '../../store/boxes/actions';
import { getUserLocationThunk } from '../../store/user/clientLocation/actions';
import BoxModal from '../BoxesPage/boxModal/BoxModal';

export const RestMap = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boxes = useSelector((store) => (store.boxes?.boxes));
  const user = useSelector((store) => (store.auth?.user));

  const [showModal, setShowModal] = useState(false);
  const [boxData, setBoxdata] = useState({});

  function buttonHandler(box) {
    setBoxdata(box);
    setShowModal(true);
  }

  useEffect(() => {
    dispatch(getAllBoxesThunk());
    if (user && !user.location) dispatch(getUserLocationThunk());
  }, []);

  return (
    <div className="container mx-auto">
      <BoxModal
        showModal={showModal}
        setShowModal={setShowModal}
        boxData={boxData} 
      />
      <YMaps 
        query={{apikey: 'a9e98eaf-d4c4-45e6-9ee4-5afad392d357'}}
      >
        <Map state={{ center: [user?.location?.lat, user?.location?.lon], zoom: 9 }} width={'100%'} height={'600px'} options={{autoFitToViewport: 'always'}} modules={["geolocation", "geocode"]} >
          {boxes.map((el) => {
            <UserPlacemark 
              geometry={[el.store_lat, el.store_lon]}
              options={{
                iconColor: '#ff0000',
                hideIconOnBalloonOpen: false,
                balloonMaxWidth: 200,
              }}
              myClick={() => buttonHandler(el)} 
              user={{id: 0}}
            />
          })}
          <SearchControl options={{ float: 'right' }} onResultSelect={async (e) => {
            // const index = e.get('index');
            // e.originalEvent.target.getResult(index)
            //   .then((res) => console.log(res.geometry.getCoordinates()));
            // SetAddres(e.originalEvent.target.getRequestString());
          }}/>
        </Map>
      </YMaps>
    </div>
  )
}
