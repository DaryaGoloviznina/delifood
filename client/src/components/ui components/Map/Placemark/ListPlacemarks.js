import { UserPlacemark } from "./UserPlacemark"
import compareBoxes from '../../../../lib/compareBoxes';
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const ListPlacemarks = () => {
  const boxes = useSelector((store) => (store.boxes?.boxes));

  useEffect(() => {
    console.log('ballons rerender');
  }, [boxes])

  return compareBoxes(boxes).map((el) => 
    <UserPlacemark
      key={el.id}
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
      boxData={el}
    />
  )
}