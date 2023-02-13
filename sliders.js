class Sliders {
  constructor() {
    this.fromSliders = document.querySelectorAll('[data-id="fromSlider"]');
    this.toSliders = document.querySelectorAll('[data-id="toSlider"]');
    this.fromInputs = document.querySelectorAll('[data-id="fromInput"]');
    this.toInputs = document.querySelectorAll('[data-id="toInput"]');
    this.fillAreas = document.querySelectorAll('[data-id="fillArea"]');

    this.rangeColor = "#e19654";
    this.sliderColor = "transparent";
    this.drawDirection = null;
  }
  init() {
    this.fromSliders.forEach((fromSlider) => {
      if (fromSlider.classList.contains("range__slider--horizontal")) {
        this.drawDirection = "right";
      } else {
        this.drawDirection = "bottom";
      }
      fromSlider.oninput = () => {
        this.controlFromSlider(
          fromSlider,
          fromSlider.nextElementSibling,
          fromSlider.parentElement.children[2]
        );
      };
      this.fillSlider(
        fromSlider,
        fromSlider.nextElementSibling,
        fromSlider.offsetParent
      );
    });

    this.toSliders.forEach((toSlider) => {
      toSlider.oninput = () =>
        this.controlToSlider(
          toSlider.previousElementSibling,
          toSlider,
          toSlider.parentElement.children[3]
        );
    });

    this.fromInputs.forEach((fromInput) => {
      fromInput.oninput = () =>
        this.controlFromInput(
          fromInput.parentElement.children[0],
          fromInput,
          fromInput.nextElementSibling,
          fromInput.offsetParent
        );
    });

    this.toInputs.forEach((toInput) => {
      toInput.oninput = () =>
        this.controlToInput(
          toInput.parentElement.children[1],
          toInput.previousElementSibling,
          toInput,
          toInput.offsetParent
        );
    });
  }
  controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = this.getParsed(fromInput, toInput);
    this.fillSlider(fromInput, toInput, controlSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromSlider.value = from;
    }
  }

  controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = this.getParsed(fromInput, toInput);
    this.fillSlider(fromInput, toInput, controlSlider);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
    }
  }

  controlFromSlider(fromSlider, toSlider, fromInput) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, toSlider.offsetParent);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromInput.value = from;
    }
  }

  controlToSlider(fromSlider, toSlider, toInput) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, toSlider.offsetParent);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
      toSlider.value = from;
    }
  }

  getParsed(currentFrom, currentTo) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  fillSlider(from, to, fillArea) {
    const rangeDistance = to.max - to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    fillArea.style.background = `linear-gradient(
    to ${this.drawDirection},
    ${this.sliderColor} 0%,
    ${this.sliderColor} ${(fromPosition / rangeDistance) * 100}%,
    ${this.rangeColor} ${(fromPosition / rangeDistance) * 100}%,
    ${this.rangeColor} ${(toPosition / rangeDistance) * 100}%, 
    ${this.sliderColor} ${(toPosition / rangeDistance) * 100}%, 
    ${this.sliderColor} 100%)`;
  }
}

let sl = new Sliders();
sl.init();
