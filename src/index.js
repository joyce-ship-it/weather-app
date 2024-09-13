import "./styles.css";

const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const images = document.querySelectorAll(".slider > img");
const imgArr = Array.from(images);
const size = imgArr.length;
const optionsDiv = document.querySelector(".options");
const optionsArr = Array.from(document.querySelectorAll(".options > button"));

imgArr.forEach((img, index) => {
  img.dataset.index = index;
});

const makeAllImgHidden = function (imgArr) {
  imgArr.forEach((img) => {
    img.classList.add("hidden");
  });
};

const toggleUnselectedOptions = function (optionsArr) {
  const [currOption, ...discard] = optionsArr.filter((option) =>
    option.classList.contains("selected"),
  );
  const currOptionIndex = Number(currOption.dataset.index);
  optionsArr[currOptionIndex].classList.toggle("selected");
};

makeAllImgHidden(imgArr);

imgArr[0].classList.toggle("hidden");
optionsArr[0].classList.toggle("selected");

const moveLeft = function () {
  const [currImg, ...discard] = imgArr.filter(
    (img) => !img.classList.contains("hidden"),
  );
  const currImgIndex = Number(currImg.dataset.index);
  const nextImgIndex = currImgIndex === 0 ? size - 1 : currImgIndex - 1;
  makeAllImgHidden(imgArr);
  imgArr[nextImgIndex].classList.toggle("hidden");
  toggleUnselectedOptions(optionsArr);
  optionsArr[nextImgIndex].classList.toggle("selected");
};

leftArrow.addEventListener("click", moveLeft);

const moveRight = function () {
  const [currImg, ...discard] = imgArr.filter(
    (img) => !img.classList.contains("hidden"),
  );
  const currImgIndex = Number(currImg.dataset.index);
  const nextImgIndex = currImgIndex === size - 1 ? 0 : currImgIndex + 1;
  makeAllImgHidden(imgArr);
  imgArr[nextImgIndex].classList.toggle("hidden");
  toggleUnselectedOptions(optionsArr);
  optionsArr[nextImgIndex].classList.toggle("selected");
};

rightArrow.addEventListener("click", moveRight);

optionsDiv.addEventListener("click", (e) => {
  // You will get an error if you click on the div instead of the button
  // fix : check it the event comes from a button or not
  if (e.target.matches("button")) {
    const selectedIndex = Number(e.target.dataset.index);
    makeAllImgHidden(imgArr);
    imgArr[selectedIndex].classList.toggle("hidden");
    toggleUnselectedOptions(optionsArr);
    optionsArr[selectedIndex].classList.toggle("selected");
  }
});

setInterval(moveRight, 5000);
