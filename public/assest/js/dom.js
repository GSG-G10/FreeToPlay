const firstPopularPhoto = document.querySelector('.first-pop');
const secondePopularPhoto = document.querySelector('.seconde-pop');
const thirdPopularPhoto = document.querySelector('.third-pop');
const fourthPopularPhoto = document.querySelector('.fourth-pop');
const gameListContainer = document.querySelector('.games-list-container');

const onLoadPage = (() => {
  const changePopularImages = () => {
    fetch('/popImages')
      .then((response) => response.json())
      .then((data) => {
        firstPopularPhoto.src = data[0].thumbnail;
        secondePopularPhoto.src = data[1].thumbnail;
        thirdPopularPhoto.src = data[2].thumbnail;
        fourthPopularPhoto.src = data[3].thumbnail;
      })
      .catch((err) => err);
  };
  const loadGamesList = () => {
    fetch('/game-list')
      .then((response) => response.json())
      .then((data) => cb(data))
      .catch((err) => err);
  };

  changePopularImages();
  loadGamesList();
})();

const cb = (data) => {
  data.forEach((e) => {
    const createStick = document.createElement('div');
    createStick.classList.add('games-list-card');
    gameListContainer.appendChild(createStick);
    const cardImgBox = document.createElement('div');
    createStick.appendChild(cardImgBox);
    cardImgBox.classList.add('games-list-card-image');
    const cardImg = document.createElement('img');
    cardImg.classList.add('games-list-card-img');
    cardImgBox.appendChild(cardImg);
    cardImg.src = e.thumbnail;
    cardImg.alt = e.title;
    const cardDetails = document.createElement('div');
    createStick.appendChild(cardDetails);
    cardDetails.classList.add('games-list-card-details');

    const detailsContent = document.createElement('div');
    cardDetails.appendChild(detailsContent);
    detailsContent.classList.add('games-list-card-details-content');

    const contentTitle = document.createElement('h2');
    detailsContent.appendChild(contentTitle);
    contentTitle.classList.add('games-list-card-details-title');
    contentTitle.textContent = e.title;

    const contentDescriptin = document.createElement('p');
    detailsContent.appendChild(contentDescriptin);
    contentDescriptin.classList.add('games-list-card-details-description');
    contentDescriptin.textContent = e.short_description;

    const detailsInfo = document.createElement('div');
    cardDetails.appendChild(detailsInfo);
    detailsInfo.classList.add('games-list-card-details-info');

    const favroiteIcon = document.createElement('div');
    detailsInfo.appendChild(favroiteIcon);
    detailsInfo.classList.add('games-list-card-details-info-favroite-icon');

    const iconFav = document.createElement('li');
    favroiteIcon.appendChild(iconFav);
    iconFav.classList.add('far', 'fa-bookmark');

    const infoType = document.createElement('div');
    detailsInfo.appendChild(infoType);
    infoType.classList.add('games-list-card-details-info-type');

    const gameType = document.createElement('span');
    infoType.appendChild(gameType);
    gameType.classList.add('game-type');
    gameType.textContent = e.genre;

    const gamePlatform = document.createElement('span');
    infoType.appendChild(gamePlatform);
    gameType.classList.add('game-platform');

    const platformIcon = document.createElement('li');
    gamePlatform.appendChild(platformIcon);
    if (e.platform === 'Web Browser') {
      platformIcon.classList.add('far', 'fa-window-maximize');
    } else {
      platformIcon.classList.add('fab', 'fa-windows');
    }
  });
};
