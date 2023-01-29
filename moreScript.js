const moreBtns = document.querySelectorAll('[data-id="moreBtn"]');

const showMore = (e) => {
  e.target.previousElementSibling.classList.toggle("login__help--active");
  e.target.childNodes[1].classList.toggle("board__btn-arrowActive");
};

for (const moreBtn of moreBtns) {
  moreBtn.addEventListener("click", showMore);
}
