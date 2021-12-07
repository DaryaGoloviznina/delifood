import { useState } from "react";
import { Map, SearchControl, YMaps } from 'react-yandex-maps';
import { useSelector } from 'react-redux';
import { NoUserLinks } from "./modalLinks/noUserLinks";
import { UserLinks } from "./modalLinks/UserLinks";

export default function BoxModal({setShowModal, boxData}) {

  const user = useSelector((store) => (store.auth?.user));

  const [lon, SetLon] = useState(0);
  const [lat, SetLat] = useState(0);
  const [address, SetAddress] = useState(null);

  const modalImg = {
    height: '38rem'
  };

  return (
    <>
    <div
      className="flex justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-2xl relative flex w-full bg-white outline-none focus:outline-none flex items-start justify-between  border-b border-solid rounded-lg">

          <div className="h-full max-w-xs rounded-lg object-cover">
            <img 
            style={modalImg}
            className="object-cover rounded-lg"
            src={boxData.img}/>
          </div> 

          <div className="overflow-y-auto h-full w-2/3 p-4">
            <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-black text-sm z-50">
              <img src="https://img.icons8.com/ios/30/000000/delete-sign--v1.png"
              onClick={() => setShowModal(false)}/>
            </div>

            <div>
              <h1 className="text-gray-700 font-bold text-2xl">
                {boxData.boxName}
              </h1>

              <p className="text-m">
                By <span className="px-2 py-1 leading-none bg-yellow-200 text-yellow-800 rounded-full font-semibold uppercase tracking-wide text-xs">{boxData.restName}</span>
              </p>

              <div className="flex mt-1">
                <img src="https://img.icons8.com/fluency-systems-regular/15/000000/clock--v3.png"/>
                <p className="text-xs ml-1">
                  Today {boxData.startTime} - {boxData.endTime}
                </p>
              </div>

              <p className="mt-2 text-gray-600 text-sm">
                {boxData.descr}
              </p>
            </div>

            <div className="mt-2 border-t-2 border-b-2 border-grey-darkest">
              <h1 className="mt-2 text-gray-600 font-bold text-m">
                What's in the mystery box?
              </h1>

              <div className="mt-3 mb-3 flex">
                <img src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-lunch-bag-food-and-delivery-icongeek26-linear-colour-icongeek26.png"/>
                <p className="ml-1 mt-1 text-sm text-gray-600">
                  Mystery Box is, well, a mystery! {boxData.restName} will make sure to pack it up with delicious goodies that have been left at the end of the day.
                </p>
              </div>
            </div>

            <div className="mt-3">
              <YMaps 
              query={{apikey: 'a9e98eaf-d4c4-45e6-9ee4-5afad392d357'}}>
                <Map 
                  state={{ center: [lat, lon], zoom: 9 }} 
                  width={'100%'} height={'250px'} 
                  options={{autoFitToViewport: 'always'}} 
                  modules={["geolocation", "geocode"]}
                >
                  <SearchControl 
                    options={{ float: 'right' }} 
                    onResultSelect={async (e) => {
                      const index = e.get('index');
                      const res = await e.originalEvent.target.getResult(index);
                      
                      SetAddress(res.getAddressLine());
                      const coord = res.geometry.getCoordinates();
                      SetLat(coord[0]);
                      SetLon(coord[1]);    
                    }}
                  />
                </Map>
              </YMaps>
            </div>
            
            <div className="flex item-center justify-between mt-3">
              <h1 className="h-full mt-2 px-4 py-3 bg-green-800 text-white font-bold uppercase rounded">
                ${boxData.price}
              </h1>
              {/* { !user && 
                <NoUserLinks />
              } */}
              {/* { user && !user?.address && */}
                <UserLinks 
                boxData={boxData}/>
              {/* } */}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}