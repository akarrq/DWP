class Calendar {
  constructor() {
    this.now = new Date();
    this.day = this.now.getDate();
    this.month = this.now.getMonth();
    this.year = this.now.getFullYear();

    this.daysNames = ["Nd", "Po", "Wt", "Śr", "Cz", "Pt", "So"];

    this.calendarWrapper = document.querySelector(
      '[data-id="calendarWrapper"]'
    );
    this.calendarDay = null;
    this.calendarDayName = null;
    this.calendarDayNumber = null;
  }
  init() {
    this.createCalendarDay();
  }
  createCalendarDay() {
    for (let day = 0; day < this.daysNames.length; day++) {
      this.calendarDay = document.createElement("div");
      this.calendarDayName = document.createElement("h4");
      this.calendarDay.classList.add("board", "board--vsmall");
      this.calendarDayName.classList.add(
        "board__element",
        "board__element--vsmall"
      );
      this.calendarWrapper.appendChild(this.calendarDay);
      this.calendarDay.appendChild(this.calendarDayName);
      this.createDayOfWeeksText();
    }
  }
  createDayOfWeeksText() {
    this.calendarDayName.textContent = this.daysNames[this.day];
    if (this.day < this.daysNames.length - 1) {
      this.day++;
    } else {
      this.day = 0;
    }
  }
}

let cal = new Calendar();
cal.init();
