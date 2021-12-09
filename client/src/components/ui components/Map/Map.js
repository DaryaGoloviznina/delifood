import { useEffect, useState } from 'react';
import { YMaps, Map, SearchControl, Placemark} from 'react-yandex-maps';
import {UserPlacemark} from './PlaceMark'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBoxesThunk } from '../../../store/boxes/actions';
import { getUserLocationThunk } from '../../../store/user/UserLocation/actions';
import BoxModal from '../Modals/CustomerBoxesPage/BoxModal'

export const RestMap = () => {
  
  const dispatch = useDispatch();
  const boxes = useSelector((store) => (store.boxes?.boxes));
  const user = useSelector((store) => (store.auth?.user));
  const [showModal, setShowModal] = useState(false);
  const [boxData, setBoxdata] = useState({});

  function compareBox (boxes) {
    const formatedBoxArr = [];

    boxes.forEach((box) => {
      const index = formatedBoxArr.findIndex((formatedBox) => 
        formatedBox.store_name === box.store_name
        || formatedBox[0]?.store_name === box.store_name
      );

      if (index !== -1) formatedBoxArr[index] = 
        formatedBoxArr[index].length 
          ? [...formatedBoxArr[index], box]
          : [formatedBoxArr[index], box];
      else formatedBoxArr.push(box);
    })

    return formatedBoxArr;
  }

  function buttonHandler(event) {
    setBoxdata(event.data.boxData);
    setShowModal(true);
  }

  useEffect(() => {
    if (user && !user.location) dispatch(getUserLocationThunk());
  }, [user]);

  useEffect(() => {
    dispatch(getAllBoxesThunk());
  }, []);
  
  // console.log(compareBox(boxes));
  return (
    <div className="container mx-auto">
      {showModal 
        ? 
          <BoxModal
            showModal={showModal}
            setShowModal={setShowModal}
            boxData={boxData} 
          />
        : 
        null
      }
      <YMaps 
        query={{apikey: 'a9e98eaf-d4c4-45e6-9ee4-5afad392d357'}}
      >
        <Map 
          state={{ 
            center: [user?.location?.lat, user?.location?.lon], 
            zoom: 9 
          }} 
          width={'100%'} 
          height={'600px'} 
          options={{autoFitToViewport: 'always'}} 
          modules={["geolocation", "geocode"]} 
        >
          {compareBox(boxes).map((el) => {
            return <UserPlacemark 
              geometry={
                Array.isArray(el) 
                ? [el[0].store_lat, el[0].store_lon]
                : [el.store_lat, el.store_lon]
              }
              options={{
                iconColor: '#ff0000',
                hideIconOnBalloonOpen: false,
                balloonMaxWidth: 200,
              }}
              myClick={buttonHandler} 
              boxData={el}
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
