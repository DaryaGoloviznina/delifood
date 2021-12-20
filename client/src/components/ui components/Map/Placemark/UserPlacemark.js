import React, { useContext, useEffect, useState } from "react";
import $ from 'jquery';
import Context from '../../../../context';
import { Placemark, withYMaps } from "react-yandex-maps";
import { UserPlacemarkBalloon } from './Baloons';
import { convertObjTimetoStrTime } from "../../../../lib/formateTimeFunctions";
import { getBoxAmount } from "../../../../lib/getBoxAmount";

export const UserPlacemark = (props) => {
  const { boxData } = props;
  const { modalBoxHandler } = useContext(Context);

  const [boxAmountMap, SetBoxAmount] = useState(0)
  const [curBoxId, SetCurBoxId] = useState(0);

  const balloonHandler = (box) => {
    //-------converting time data into string
    const startTime = convertObjTimetoStrTime(box.start_date);
    const endTime = convertObjTimetoStrTime(box.end_date);

    const box_amount = getBoxAmount(box);
    
    SetCurBoxId(box.id)
    SetBoxAmount(box_amount)
    modalBoxHandler(
      {...box, 
        startTime, 
        endTime, 
        boxAmount: box_amount, 
        SetBoxAmount
      })
  }

  const UserPlacemarkCore = React.memo(({ymaps}) => {
    const makeLayout = (layoutFactory) => {
      const Layout = layoutFactory.createClass(
          UserPlacemarkBalloon(boxData, boxAmountMap, curBoxId),
          {
            build: function() {
              Layout.superclass.build.call(this);

              if (Array.isArray(boxData)) {
                boxData.map((el) => {
                  this.element = $('.map__placemark-balloon_' + el.id, this.getParentElement());

                  this.element
                    .find('#placemark-balloon__btn_box-id_' + el.id)
                    .click(() => balloonHandler(el));
                })
              }
              else {
                this.element = $('.map__placemark-balloon_' + boxData.id, this.getParentElement());

                this.element
                  .find('#placemark-balloon__btn_box-id_' + boxData.id)
                  .click(() => balloonHandler(boxData));
              }   
            },
            clear: function() {
              if (Array.isArray(boxData)) {
                boxData.forEach((el) => {
                  this.element
                      .find('#placemark-balloon__btn_box-id_' + el.id)
                      .off('click');
                })
              }
              else {
                this.element
                  .find('#placemark-balloon__btn_box-id_' + boxData.id)
                  .off('click');
              }

              Layout.superclass.clear.call(this);
            },
          },
      );
      return Layout;
    };

    return (
      <Placemark
        {...props}
        options={{
          balloonContentLayout: makeLayout(ymaps.templateLayoutFactory),
          balloonPanelMaxMapArea: 0,
          ...props.options,
        }}
      />
    );
  });

  const UserPlacemark = React.useMemo(() => {
    return withYMaps(
      UserPlacemarkCore,
      true,
      ["geoObject.addon.balloon", "templateLayoutFactory"]);
  }, [UserPlacemarkCore]);

  return (
    Array.isArray(boxData)
      ? 
        boxData.reduce((acc, cur) => acc + getBoxAmount(cur), 0)
          ?
            <UserPlacemark/>
          : null
      :
        getBoxAmount(boxData)
          ?
            <UserPlacemark/>
          : null 
  )

}

