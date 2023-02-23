class Car {
  constructor() {
    this.cars = null;
    this.car = null;
    this.confirmBtn = null;
    this.odometer = null;
    this.confirmMessage = null;

    this.isEventsSite = null;
  }
  checkWhichSite(site) {
    console.log(site);
    if (site === "events") {
      this.isEventsSite = true;
    } else {
      this.isEventsSite = false;
    }
    this.addCarClickEvent();
  }
  addCarClickEvent() {
    this.cars = document.querySelectorAll('[data-id="car"]');
    for (const car of this.cars) {
      car.onclick = this.createCarCard.bind(this);
      car.style = "cursor:pointer";
      console.log("dodano klik");
    }
  }
  createCarCard(car) {
    console.log("!! kliknęło w samochód");
    if (car.target.closest('[data-id="car"]')) this.car = car.currentTarget;
    this.removeCarClickEvent();
    this.car.classList.add("carEdit");
    this.switchCardVisible();
    this.switchDots();
    if (!this.isEventsSite) {
      console.log("dodano licznik");
      this.createConfirmBtn();
      this.createOdometer();
    } else {
      console.log("dodano wiadomość");
      this.createConfirmBtn();
      this.showNothingHereMessage();
    }
  }
  createOdometer() {
    this.odometer = document.createElement("input");
    this.odometer.type = "number";
    this.odometer.inputMode = "numeric";
    this.odometer.placeholder = "Wprowadź przebieg";
    this.car.appendChild(this.odometer).classList.add("carEdit__odometer");
  }
  createConfirmBtn() {
    this.confirmBtn = document.createElement("h4");
    this.confirmBtn.textContent = "Gotowe";
    this.confirmBtn.classList.add("carEdit__confirmBtn");
    this.car.prepend(this.confirmBtn);
    console.log("dodano przycisk");
    if (!this.isEventsSite) {
      this.confirmBtn.onclick = this.showConfirmMessage.bind(this);
      console.log("pokaże wprowadzono zmiany");
    } else {
      this.confirmBtn.onclick = this.closeCarCard.bind(this);
    }
  }
  removeCarClickEvent() {
    for (const car of this.cars) {
      car.onclick = "";
      car.style = "cursor:default";
      console.log("usunięto klik");
    }
  }
  showConfirmMessage() {
    this.confirmMessage = document.createElement("p");
    this.confirmMessage.classList.add("carEdit__confirmMessage");
    this.confirmMessage.textContent = "Wprowadzono zmiany";
    this.odometer.replaceWith(this.confirmMessage);
    setTimeout(this.closeCarCard.bind(this), 0.6 * 1000);
  }
  showNothingHereMessage() {
    this.confirmMessage = document.createElement("p");
    this.confirmMessage.classList.add("carEdit__confirmMessage");
    this.confirmMessage.textContent = "Nic tu nie ma. Uff!";
    this.car.append(this.confirmMessage);
  }
  closeCarCard() {
    this.confirmBtn.remove();
    console.log("usunięto przycisk");
    if (!this.isEventsSite) {
      this.odometer.remove();
      console.log("usunięto licznik");
    }
    this.confirmMessage.remove();
    this.switchCardVisible();
    console.log("usunięto wiadomość");
    this.switchDots();
    this.car.classList.remove("carEdit");
    this.confirmBtn.onclick = "";
    this.addCarClickEvent();
  }
  switchCardVisible() {
    console.log("zmieniono widoczność");
    for (const car of this.cars) {
      if (!car.classList.contains("carEdit")) {
        car.classList.toggle("carEdit__inactive");
      }
    }
  }
  switchDots() {
    console.log("zmieniono kropki");
    const dots = document.querySelectorAll('[data-id="dot"]');
    for (const dot of dots) {
      dot.classList.toggle("board__dot");
      dot.classList.toggle("board__dot--inactive-dot");
    }
  }
}
