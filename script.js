const dateFormMaker = function () {
    const inputYear = document.querySelector("#target-year-input").value;
    const inputMonth = document.querySelector("#target-month-input").value;
    const inputDate = document.querySelector("#target-date-input").value;

    const dateFormat = inputYear + "-" + inputMonth + "-" + inputDate;
    return new Date(dateFormat);
}

const counterMaker = function () {
    const nowDate = new Date();
    const targetDate = dateFormMaker();
    const remaining = (targetDate - nowDate) / 1000;
    if (remaining <= 0) {
        // 만약 reamaining 이 0 이하이면 타이머가 종료되었습니다. 출력
        console.log("타이머가 종료되었습니다.");
    } else if (isNaN(remaining)) {
        // 만약 잘못되 날짜가 들어옸다면 유효한 시간대가 아닙니다. 출력
        console.log("유효한 시간대가 아닙니다.")
    }
    const remainingDate = Math.floor(remaining / 3600 / 24);
    const remainingHours = Math.floor(remaining / 3600 % 24);
    const remainingMin = Math.floor(remaining / 60) % 60;
    const remainingSec = Math.floor(remaining) % 60;

    console.log(remainingDate, remainingHours, remainingMin, remainingSec); // Date는 연산이 가능, 결과값은 밀리세컨드
}