function UserPlacemarkBalloon(boxData) {

  return (
    `
      ${Array.isArray(boxData) 
        ? 
        boxData.map((el) => (
        `
          <div class="map__placemark-balloon_${el.id}">
            <div class="placemark-balloon__buttons flex flex-col justify-center">
              <h3 class="text-gray-700 font-bold text-xl text-center">
                ${el.name}
              </h3>
              <button 
                class="placemark-balloon__btn bg-green-600 text-white px-3 py-4 rounded-md text-sm font-medium mx-auto my-4"
                id="placemark-balloon__btn_box-id_${el.id}"
              >
                SHOW MORE
              </button>
            </div>
          </div>
        `
      ))
    :
      `
        <div class="map__placemark-balloon">
          <div class="placemark-balloon__buttons flex flex-col justify-center">
            <h3 class="text-gray-700 font-bold text-xl text-center">
              ${boxData.name}
            </h3>
            <button 
              class="placemark-balloon__btn bg-green-600 text-white px-3 py-4 rounded-md text-sm font-medium mx-auto my-4"
              id="placemark-balloon__btn_box-id_${boxData.id}"
            >
              SHOW MORE
            </button>
          </div>
        </div>
      `
    }
    `
  )
    
}

export {UserPlacemarkBalloon}