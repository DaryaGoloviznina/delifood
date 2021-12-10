import { useEffect, useState } from 'react';
import { YMaps, Map, SearchControl } from 'react-yandex-maps';
import  {UserPlacemark } from './PlaceMark'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBoxesThunk } from '../../../store/boxes/actions';
import BoxModal from '../Modals/CustomerBoxesPage/BoxModal'
import { convertObjTimetoStrTime } from '../../../lib/formateTimeFunctions';
import { setUserLocation } from '../../../store/user/UserLocation/actions';

export const RestMap = ({setEndOrderModal, boxes}) => {
  
  const dispatch = useDispatch();
  const location = useSelector((store) => (store.auth?.location));

  const [showModal, setShowModal] = useState(false);
  const [boxData, setBoxdata] = useState({});
  const [clientOrderBoxAmount, setclientOrderBoxAmount] = useState() // для изменения количества оставшихся боксов в ресторане после оформления заказа клиента

  useEffect(() => {
    if (clientOrderBoxAmount === 0) dispatch(getAllBoxesThunk(location));
  }, [clientOrderBoxAmount]);

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
    const {boxData: newBoxData} = event.data;

    const startTime = convertObjTimetoStrTime(newBoxData.start_date);
    const endTime = convertObjTimetoStrTime(newBoxData.end_date);
    const box_amount = newBoxData.count - newBoxData.count_reserved - newBoxData.count_bought;

    setBoxdata(
      {...newBoxData,
        startTime,
        endTime,
        box_amount,
      }
    );
    setclientOrderBoxAmount(box_amount);
    setShowModal(true);
  }
  
  return (
    <div className="rounded-xl">
      {showModal 
        ? 
          <BoxModal
            showModal={showModal}
            setShowModal={setShowModal}
            boxData={boxData}
            clientOrderBoxAmount={clientOrderBoxAmount}
            setclientOrderBoxAmount={setclientOrderBoxAmount}
            setEndOrderModal={setEndOrderModal}
          />
        : 
        null
      }
      <YMaps 
        query={{apikey: 'fd56ec54-348d-47a6-8ba7-17e1dd585174', lang: 'en_US'}}
      >
        <Map 
          state={{ 
            center: [location?.lat, location?.lon], 
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
          <SearchControl 
            options={{ float: 'right', noPlacemark: true }} 
            onResultSelect={async (e) => {
              const res = await e.originalEvent.target.getResult(0);
              const [lat, lon] = res.geometry.getCoordinates();
              console.log(res.getAdministrativeAreas());
              console.log(res.getLocalities());
              
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
