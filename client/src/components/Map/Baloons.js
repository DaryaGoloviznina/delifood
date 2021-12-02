function UserPlacemarkBalloon(props) {
  return `
    <div class="map__placemark-balloon">
      <div class="placemark-balloon__buttons">
        <button class="placemark-balloon__profile-btn"
                id="placemark-balloon__profile-btn_user-id_${props.user.id}">
          My button
        </button>
      </div>
    </div>
  `;
}

export {UserPlacemarkBalloon}