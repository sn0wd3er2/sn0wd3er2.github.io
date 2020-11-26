const div = document.querySelector(".js-clock");


function getTime() {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    let day = time.getDay();
    const hour = time.getHours();
    const min = time.getMinutes();
    const sec = time.getSeconds();

    switch (day) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday"
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
    }

    div.innerText = `${month < 10 ? `0${month}`:`${month}`} / ${date < 10 ? `0${date}` : `${date}`} / ${day}
    ${hour < 10 ? `0${hour}`:`${hour}`} : ${min < 10 ? `0${min}` : `${min}`} : ${sec < 10 ? `0${sec}` : `${sec}`}`;

}

function init() {
    setInterval(getTime,1000);   
}
init();