const fromSliders = document.querySelectorAll('[data-id="fromSlider"]');
const toSliders = document.querySelectorAll('[data-id="toSlider"]');
const fromInputs = document.querySelectorAll('[data-id="fromInput"]');
const toInputs = document.querySelectorAll('[data-id="toInput"]');
const rangeColor = "#e19654";
const sliderColor = "transparent";
const fillAreas = document.querySelectorAll('[data-id="fillArea"]');

function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, sliderColor, rangeColor, controlSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromSlider.value = from;
  }
}

function controlToInput(toSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, sliderColor, rangeColor, controlSlider);
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
  }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(
    fromSlider,
    toSlider,
    sliderColor,
    rangeColor,
    toSlider.offsetParent
  );
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromInput.value = from;
  }
}

function controlToSlider(fromSlider, toSlider, toInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(
    fromSlider,
    toSlider,
    sliderColor,
    rangeColor,
    toSlider.offsetParent
  );
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
    toSlider.value = from;
  }
}

function getParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, fillArea) {
  const rangeDistance = to.max - to.min;
  const fromPosition = from.value - to.min;
  const toPosition = to.value - to.min;
  fillArea.style.background = `linear-gradient(
    to bottom,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
    ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
    ${sliderColor} 100%)`;
}

// fillAreas.forEach((fillSlider) => {
//   fillSlider.oninput = () => {
//     fromSlider,
//     fromSlider.nextElementSibling,
//     sliderColor,
//     rangeColor,
//     fromSlider.offsetParent
//   }
// })

fromSliders.forEach((fromSlider) => {
  fromSlider.oninput = () => {
    controlFromSlider(
      fromSlider,
      fromSlider.nextElementSibling,
      fromSlider.parentElement.children[2]
    );
  };
  fillSlider(
    fromSlider,
    fromSlider.nextElementSibling,
    sliderColor,
    rangeColor,
    fromSlider.offsetParent
  );
});

toSliders.forEach((toSlider) => {
  toSlider.oninput = () =>
    controlToSlider(
      toSlider.previousElementSibling,
      toSlider,
      toSlider.parentElement.children[3]
    );
});

fromInputs.forEach((fromInput) => {
  fromInput.oninput = () =>
    controlFromInput(
      fromInput.parentElement.children[0],
      fromInput,
      fromInput.nextElementSibling,
      fromInput.offsetParent
    );
});

toInputs.forEach((toInput) => {
  toInput.oninput = () =>
    controlToInput(
      toInput.parentElement.children[1],
      toInput.previousElementSibling,
      toInput,
      toInput.offsetParent
    );
});
