import { getBoxAmount } from "../../../../lib/getBoxAmount";

function UserPlacemarkBalloon(boxData) {

  const baloonRender = (box) => {
    const baloonTemplate = `
      <div class="map__placemark-balloon_${box.id}">
        <div class="placemark-balloon__buttons flex flex-col justify-center">
          <h3 class="text-gray-700 font-bold text-xl text-center">
            ${box.name}
          </h3>
          <button 
            class="placemark-balloon__btn bg-green-600 text-white px-3 py-4 rounded-md text-sm font-medium mx-auto my-4"
            id="placemark-balloon__btn_box-id_${box.id}"
          >
            SHOW MORE
          </button>
        </div>
      </div>
    `;
    if (getBoxAmount(box)) return baloonTemplate;

    else return;
  }

  return (
    `
      ${Array.isArray(boxData) 
        ? boxData.map((el) => baloonRender(el))
        : baloonRender(boxData) 
      }
    `
  )
    
}

export {UserPlacemarkBalloon}