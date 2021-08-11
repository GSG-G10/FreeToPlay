const firstPopularPhoto = document.querySelector('.first-pop');
const secondePopularPhoto = document.querySelector('.seconde-pop');
const thirdPopularPhoto = document.querySelector('.third-pop');
const fourthPopularPhoto = document.querySelector('.fourth-pop');
const gameListContainer = document.querySelector('.games-list-container');
const filterSection = document.querySelector('.filter-section');
const platformArray = ['All Platforms', 'pc', 'browser'];
const genreArray = [' All Genres', 'mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts'];
const sortArray = ['relevance', 'popularity', 'release Date', 'alphabetical'];

const createNode = (tag, className, parentNode) => {
  const tagName = document.createElement(tag);
  tagName.classList.add(className);
  parentNode.appendChild(tagName);
  return tagName;
};

const createSelectContainer = (labelContent, optionsArray) => {
  const selectContainer = createNode('section', 'selectContainer', filterSection);
  const filterLabel = createNode('label', 'filter-label', selectContainer);
  filterLabel.textContent = `${labelContent} :`;
  filterLabel.setAttribute('for', labelContent);
  const filterSelect = createNode('select', 'filter-select', selectContainer);
  filterSelect.id = labelContent;
  filterSelect.name = labelContent;
  optionsArray.forEach((element) => {
    const filterOption = createNode('option', 'filter-option', filterSelect);
    filterOption.value = element;
    filterOption.textContent = element;
  });
};

createSelectContainer('platform', platformArray);
createSelectContainer('genre', genreArray);
createSelectContainer('sort-by', sortArray);

// eslint-disable-next-line no-unused-vars
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

const a = (id) => {
  window.location.href = `/game.html?id=${id}`;
};

const cb = (data) => {
  data.forEach((e, index) => {
    const createStick = document.createElement('div');
    createStick.classList.add('games-list-card');
    gameListContainer.appendChild(createStick);
    createStick.onclick = () => {
      a(data[index].id);
    };
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

const removeChild = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
