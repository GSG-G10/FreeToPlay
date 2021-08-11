// const filterSelect = document.querySelectorAll('.filter-select');
// const requestFilteredGame = (i) => {
//   let optionValue = filterSelect[i].value;
//   let labelValue = '';
//   if (i === 0) {
//     labelValue = 'platform';
//   } else if (i === 1) {
//     labelValue = 'category';
//   } else {
//     labelValue = 'sort-by';
//   }
//   if (optionValue === 'All Platforms' || optionValue === 'All Genres') {
//     optionValue = 'sort-by';
//     labelValue = 'popularity';
//   }
//   fetch(`/filterGame/${labelValue}/${optionValue}`)
//     .then((respond) => respond.json())
//     .then((data) => displayFilteredData(data));
// };
// filterSelect[0].onchange = () => {
//   requestFilteredGame(0);
// };
// filterSelect[1].onchange = () => {
//   requestFilteredGame(1);
// };
// filterSelect[2].onchange = () => {
//   requestFilteredGame(2);
// };
