const firstPopularPhoto = document.querySelector('.first-pop');
const secondePopularPhoto = document.querySelector('.seconde-pop');
const thirdPopularPhoto = document.querySelector('.third-pop');
const fourthPopularPhoto = document.querySelector('.fourth-pop');
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
  changePopularImages();
})();
