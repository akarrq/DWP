const btnSchedule = document.querySelector('[data-id="btnSchedule"]');
const btnAvailability = document.querySelector('[data-id="btnAvailability"]');
const boardSchedule = document.querySelector('[data-id="boardSchedule"]');
const boardAvailability = document.querySelector(
  '[data-id="boardAvailability"]'
);
const switchBoardClass = "board-grid-wrapper--nonactive";
const switchBtnClass = "board--small-active";

boardAvailability.classList.add(switchBoardClass);

const changeTab = () => {
  boardAvailability.classList.toggle(switchBoardClass);
  boardSchedule.classList.toggle(switchBoardClass);
  btnAvailability.classList.toggle(switchBtnClass);
  btnSchedule.classList.toggle(switchBtnClass);
};

btnSchedule.addEventListener("click", changeTab);
btnAvailability.addEventListener("click", changeTab);
