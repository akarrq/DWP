class Calendar {
  constructor() {
    this.now = new Date();
    this.day = this.now.getDate();
    this.dayName = this.now.getDay();
    this.month = this.now.getMonth() + 1;
    this.year = this.now.getFullYear();
    this.currentWeekNumber = 1;

    this.daysNames = ["Nd", "Po", "Wt", "Śr", "Cz", "Pt", "So"];

    this.calendarWrapper = document.querySelector(
      '[data-id="calendarWrapper"]'
    );
    this.calendarDay = null;
    this.calendarDayName = null;
    this.calendarDayNumberWrapper = null;
    this.calendarDayNumber = null;
    this.calendarNavBtnWrapper = null;
    this.calendarNavBtn = null;
    this.calendarNextBtn = null;
    this.calendarPreviousBtn = null;
  }
  renderCalendar() {
    this.createCalendarNavigation("left");
    this.createCalendarDays();
    this.createCalendarNavigation("right");
  }
  createCalendarDays() {
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
      this.createDayOfWeeksNames();
      this.decorateTodayDay();
      this.createDayOfWeeksNumbers();
    }
  }
  createCalendarNavigation(direction) {
    this.calendarNavBtnWrapper = document.createElement("div");
    this.calendarNavBtnWrapper.classList.add("calendar__nav-btn");
    this.calendarNavBtn = document.createElement("i");
    this.calendarNavBtn.classList.add("fa-solid", `fa-caret-${direction}`);
    this.calendarWrapper.appendChild(this.calendarNavBtnWrapper);
    this.calendarNavBtnWrapper.appendChild(this.calendarNavBtn);
    this.addNavigationSupport(direction);
  }
  addNavigationSupport(direction) {
    if (direction === "left") {
      this.calendarPreviousBtn = this.calendarNavBtn;
      if (this.currentWeekNumber <= 0) {
        this.calendarNavBtnWrapper.classList.add("calendar__nav-btn--inactive");
        return;
      }
      this.calendarPreviousBtn.addEventListener(
        "click",
        this.showPreviousWeek.bind(this)
      );
    } else {
      this.calendarNextBtn = this.calendarNavBtn;
      if (this.currentWeekNumber >= 3) {
        this.calendarNavBtnWrapper.classList.add("calendar__nav-btn--inactive");
        return;
      }
      this.calendarNextBtn.addEventListener(
        "click",
        this.showNextWeek.bind(this)
      );
    }
  }
  showPreviousWeek() {
    this.calendarWrapper.innerHTML = "";
    if (this.day - 14 > 0) {
      this.day = this.day - 14;
    } else {
      const daysInPreviousMonth = new Date(
        this.year,
        this.month - 1,
        0
      ).getDate();
      this.day = this.day - 14 + daysInPreviousMonth;
      this.month--;
    }
    this.currentWeekNumber--;
    this.renderCalendar();
  }
  showNextWeek() {
    this.calendarWrapper.innerHTML = "";
    this.currentWeekNumber++;
    this.renderCalendar();
  }

  createDayOfWeeksNames() {
    this.calendarDayName.textContent = this.daysNames[this.dayName];
    if (this.dayName < this.daysNames.length - 1) {
      this.dayName++;
    } else {
      this.dayName = 0;
    }
  }
  createDayOfWeeksNumbers() {
    this.calendarDayNumberWrapper = document.createElement("div");
    this.calendarDayNumberWrapper.classList.add(
      "board__element",
      "board__element--vsmall"
    );
    this.calendarDay.appendChild(this.calendarDayNumberWrapper);
    this.calendarDayNumber = document.createElement("h4");
    this.calendarDayNumber.classList.add("calendar__date");
    this.calendarDayNumber.textContent = this.day;
    const daysInMonth = new Date(this.year, this.month, 0).getDate();
    if (this.day < daysInMonth) {
      this.day++;
    } else {
      this.month++;
      this.day = 1;
    }
    this.calendarDayNumberWrapper.appendChild(this.calendarDayNumber);
  }
  decorateTodayDay() {
    if (this.day === this.now.getDate()) {
      this.calendarDay.classList.add("board--vsmall-active");
    }
  }
}

let cal = new Calendar();
cal.renderCalendar();
