class Car {
  constructor() {
    this.cars = null;
    this.car = null;
    this.confirmBtn = null;
    this.odometer = null;
    this.confirmMessage = null;
  }
  addCarClickEvent() {
    this.cars = document.querySelectorAll('[data-id="car"]');
    for (const car of this.cars) {
      car.onclick = this.createCarCard.bind(this);
      car.style = "cursor:pointer";
    }
  }
  createCarCard(car) {
    if (car.target.closest('[data-id="car"]')) this.car = car.currentTarget;
    this.removeCarClickEvent();
    this.car.classList.add("carEdit");
    this.switchCardVisible();
    this.switchDots();

    this.odometer = document.createElement("input");
    this.odometer.type = "number";
    this.odometer.inputMode = "numeric";
    this.odometer.placeholder = "Wprowadź przebieg";
    this.car.appendChild(this.odometer).classList.add("carEdit__odometer");

    this.confirmBtn = document.createElement("h4");
    this.confirmBtn.textContent = "Gotowe";
    this.confirmBtn.classList.add("carEdit__confirmBtn");
    this.car.prepend(this.confirmBtn);
    this.confirmBtn.onclick = this.showConfirmMessage.bind(this);
  }
  removeCarClickEvent() {
    for (const car of this.cars) {
      car.onclick = "";
      car.style = "cursor:default";
    }
  }
  showConfirmMessage() {
    this.confirmMessage = document.createElement("p");
    this.confirmMessage.classList.add("carEdit__confirmMessage");
    this.confirmMessage.textContent = "Wprowadzono zmiany";
    this.odometer.replaceWith(this.confirmMessage);
    setTimeout(this.closeCarCard.bind(this), 0.6 * 1000);
  }
  closeCarCard() {
    this.confirmBtn.remove();
    this.odometer.remove();
    this.confirmMessage.remove();
    this.switchCardVisible();
    this.switchDots();
    this.car.classList.remove("carEdit");
    this.addCarClickEvent();
  }
  switchCardVisible() {
    for (const car of this.cars) {
      if (!car.classList.contains("carEdit")) {
        car.classList.toggle("carEdit__inactive");
      }
    }
  }
  switchDots() {
    const dots = document.querySelectorAll('[data-id="dot"]');
    for (const dot of dots) {
      dot.classList.toggle("board__dot");
      dot.classList.toggle("board__dot--inactive-dot");
    }
  }
}

let initialCar = new Car();
initialCar.addCarClickEvent();
