const messageContainer = document.querySelector('#d-day-message');
const container = document.querySelector("#d-day-container");
const savedDate = localStorage.getItem('saved-date');
const intervalIdArr = [];

container.style.display = 'none';
messageContainer.innerHTML = '<h3>D-Day를 입력해주세요.</h3>';

const dateFormMaker = function () {
    const inputYear = document.querySelector("#target-year-input").value;
    const inputMonth = document.querySelector("#target-month-input").value;
    const inputDate = document.querySelector("#target-date-input").value;

    const dateFormat = inputYear + "-" + inputMonth + "-" + inputDate;
    return dateFormat;
}

const counterMaker = function (data) {
    if (data !== savedDate) {
        localStorage.setItem('saved-date', data);
    }
    const nowDate = new Date();
    const targetDate = new Date(data).setHours(0, 0, 0, 0);
    const remaining = (targetDate - nowDate) / 1000;

    if (remaining <= 0) {
        container.style.display = 'none';
        messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
        messageContainer.style.display = 'flex';
        setClearInterval();
        return;
    }

    if (isNaN(remaining)) {
        container.style.display = 'none';
        messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
        messageContainer.style.display = 'flex';
        setClearInterval();
        return;
    }

    const remainingObj = {
        remainingDate: Math.floor(remaining / 3600 / 24),
        remainingHours: Math.floor(remaining / 3600 % 24),
        remainingMin: Math.floor(remaining / 60) % 60,
        remainingSec: Math.floor(remaining) % 60,
    }

    const documentArr = ['days', 'hours', 'min', 'sec'];
    const timeKeys = Object.keys(remainingObj);

    const format = function (time) {
        return time < 10 ? '0' + time : time;
    }

    let i = 0;
    for (let tag of documentArr) {
        const remainingTime = format(remainingObj[timeKeys[i++]]);
        document.getElementById(tag).textContent = remainingTime;
    }
}

const starter = function (targetDateInput) {
    setClearInterval();
    if (!targetDateInput) {
        targetDateInput = dateFormMaker();
    }
    container.style.display = 'flex';
    messageContainer.style.display = "none";
    counterMaker(targetDateInput);
    const intervalId = setInterval(() => { counterMaker(targetDateInput) }, 1000);
    intervalIdArr.push(intervalId);
}

const setClearInterval = function () {
    localStorage.removeItem('saved-date')
    for (let i = 0; i < intervalIdArr.length; i++) {
        clearInterval(intervalIdArr[i]);
    }
}

const resetTimer = function () {
    container.style.display = 'none';
    messageContainer.style.display = 'flex';
    messageContainer.innerHTML = '<h3>D-Day를 입력해주세요.</h3>';
    setClearInterval();
}

if (savedDate) {
    starter(savedDate);
} else {
    console.log('data is null')
}