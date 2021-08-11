const firstPopularPhoto = document.querySelector('.first-pop');
const secondePopularPhoto = document.querySelector('.seconde-pop');
const thirdPopularPhoto = document.querySelector('.third-pop');
const fourthPopularPhoto = document.querySelector('.fourth-pop');
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
