import React from "react";
import $ from 'jquery';
import {Placemark, withYMaps} from "react-yandex-maps";
import {UserPlacemarkBalloon} from './Baloons';

function UserPlacemark(props) {
  const {boxData, myClick} = props;
  const UserPlacemarkCore = React.memo(({ymaps}) => {
    const makeLayout = (layoutFactory) => {
      const Layout = layoutFactory.createClass(
          UserPlacemarkBalloon(boxData),
          {
            build: function() {
              Layout.superclass.build.call(this);

              Array.isArray(boxData) 
                ? 
                  boxData.map((el, ind) => {
                    this.element = $('.map__placemark-balloon_' + el.id, this.getParentElement());

                    this.element
                      .find('#placemark-balloon__btn_box-id_' + el.id)
                      .on('click', {boxData: el}, this.myClick);
                  })
                :
                  this.element = $('.map__placemark-balloon', this.getParentElement());
                  this.element
                      .find('#placemark-balloon__btn_box-id_' + boxData.id)
                      .on('click', {boxData: this.boxData}, this.myClick);
            },

            clear: function() {
              Array.isArray(boxData) 
              ? 
              boxData.forEach((el) => {
                this.element
                    .find('#placemark-balloon__btn_box-id_' + el.id)
                    .off('click');
              })
              :
              this.element
                  .find('#placemark-balloon__btn_box-id_' + boxData.id)
                  .off('click');

              Layout.superclass.clear.call(this);
            },

            boxData,
            myClick,
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
  return <UserPlacemark/>;
}

export {UserPlacemark}