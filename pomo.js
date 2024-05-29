let intervalId;
let second = 60;
let minute;
let click = false;
let timerInterval;
let stopped = false;
let selected = 30; // Default value
let popUp = false

let mousClick = new Audio('mousclick.mp3')
let digitalAlarm = new Audio('digital-clock.mp3')

document.addEventListener('DOMContentLoaded', function () {

    document.body.style.backgroundColor = '#545764'

    const colorOptions = document.querySelectorAll('.color-option');

    colorOptions.forEach(option => {
        option.addEventListener('click', function () {
            const color = option.getAttribute('data-color');
            document.body.style.backgroundColor = color;
        })
    })

    illustrateNumbers();
    let startButton = document.getElementById('start');
    let restartButton = document.getElementById('restart');

    let setTimeButton = document.getElementById('menu');
    let modal = document.getElementById("timeModal");
    let span = document.getElementsByClassName("close")[0];
    let saveTimeButton = document.getElementById('save-time');

    let titleContent = document.querySelector('.text')
    let titleInput = document.getElementById('title')

    let minutesInput = document.getElementById('minutes');
    minutesInput.addEventListener('click', function () {
        minutesInput.focus();
        minutesInput.select();
    });

    titleInput.addEventListener('click', function () {
        titleInput.select();
        titleInput.focus();
    })

    setTimeButton.addEventListener('click', function () {
        let startButton = document.getElementById('start');
        modal.style.display = "block";
        clearInterval(timerInterval);
        clearInterval(intervalId);
        if (minute === selected) {
            startButton.innerHTML = 'start';
        } else {
            startButton.innerHTML = 'continue';
        }
        click = true;
        console.log('click');
        popUp = true
        console.log('popUp true')
        minutesInput.value = selected
    });

    span.onclick = function () {
        modal.style.display = "none";
        popUp = false
        console.log('popUp false')
        click = false;
    };

    window.onclick = function (event) {
        let startButton = document.getElementById('start');
        if (event.target == modal) {
            modal.style.display = "none";
            popUp = false
            console.log('popUp false')
            if (minute === selected) {
                startButton.innerHTML = 'start';
            } else {
                startButton.innerHTML = 'continue';
            }
            click = false;
            console.log('!click');
        }
    };

    window.addEventListener('keydown', function (e) {
        let titleInput = document.getElementById('title').value
        let minutesInput = document.getElementById('minutes').value
        if (e.key === 'Enter' && !isNaN(minutesInput) && minutesInput > 0 && popUp && titleInput) {
            selected = parseInt(minutesInput);
            minute = selected;
            illustrateNumbers();
            modal.style.display = "none";
            click = false;
            console.log('!click');
            popUp = false
            console.log('popUp false')
            clearInterval(intervalId);
            clearInterval(timerInterval);
            titleContent.innerHTML = titleInput
            console.log('title changed')
        }
    });

    saveTimeButton.addEventListener('click', function () {
        let minutesInput = document.getElementById('minutes').value;
        let startButton = document.getElementById('start');
        let titleInput = document.getElementById('title').value
        modal.style.display = "none";
        if (minutesInput && minutesInput > 0) {
            if (!isNaN(minutesInput)) {
                selected = parseInt(minutesInput);
                minute = selected;
                illustrateNumbers();
                modal.style.display = "none";
                click = false;
                console.log('!click');
                popUp = false
                console.log('popUp false')
            }
        }
        if (titleInput) {
            titleContent.innerHTML = titleInput
            console.log('title geändert')
        }
        if (minute === selected) {
            startButton.innerHTML = 'start';
        } else {
            startButton.innerHTML = 'continue';
        }
    });

    startButton.addEventListener('click', function () {
        if (!click) {
            mousClick.play()
            console.log('click');
            click = true;
            stopped = false;
            startButton.innerHTML = "pause";
            intervalId = setInterval(timer, 1000 / 5);
        } else {
            mousClick.play()
            console.log('!click');
            clearInterval(intervalId);
            clearInterval(timerInterval);
            click = false;
            stopped = true;
            if (minute < selected) {
                startButton.innerHTML = "continue";
            }
            if (minute === selected) {
                startButton.innerHTML = "start";
            }
        }
    });

    restartButton.addEventListener('click', function () {
        mousClick.play()
        clearInterval(intervalId);
        clearInterval(timerInterval);
        minute = selected;
        second = 60;
        illustrateNumbers();
        click = false;
        stopped = false;
    });

    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space' && popUp === false) {
            mousClick.play()
            event.preventDefault(); // Prevent default action of Space key
            console.log('space clicked');
            if (!click) {
                console.log('click');
                click = true;
                stopped = false;
                startButton.innerHTML = "pause";
                intervalId = setInterval(timer, 1000 / 5);
            } else {
                console.log('!click');
                clearInterval(intervalId);
                clearInterval(timerInterval);
                click = false;
                stopped = true;
                if (minute < selected) {
                    startButton.innerHTML = "continue";
                }
                if (minute === selected) {
                    startButton.innerHTML = "start";
                }
            }
        }
    });
});

function illustrateNumbers() {
    let minutesInput = document.getElementById('minutes').value;
    minute = selected;
    second = 60;
    let startButton = document.getElementById('start');
    let time = document.querySelector('.timer');
    if (minute < 10) {
        time.innerHTML = `0${minute}:00`;
        document.title = `0${minute}:00 - Pomofocus`;
    } else {
        time.innerHTML = `${minute}:00`;
        document.title = `${minute}:00 - Pomofocus`;
    }
    if (minute < selected) {
        startButton.innerHTML = "continue";
    }
    if (minute === selected) {
        startButton.innerHTML = "start";
    }
    if (minutesInput === NaN) {
        click = false;
        console.log('!click');
        selected = ''
    }
}

function timer() {
    let time = document.querySelector('.timer');
    if (!click && stopped) {
        clearInterval(timerInterval);
        clearInterval(intervalId);
        return;
    }
    if (click && !stopped) {
        minute = selected;
        clearInterval(intervalId);
        minute--;
        timerInterval = setInterval(() => {
            let current = `${minute}:${second--}`;
            if (10 <= second && second < 60 && minute >= 10) {
                time.innerHTML = `${minute}:${second}`;
                document.title = `${minute}:${second} - Pomofocus`;
            }
            if (second < 10 && minute < 10) {
                time.innerHTML = `0${minute}:0${second}`;
                document.title = `0${minute}:0${second} - Pomofocus`;
            }
            if (minute < 10 && second >= 10) {
                time.innerHTML = `0${minute}:${second}`;
                document.title = `0${minute}:${second} - Pomofocus`;
            }
            if (minute === 0 && second === 0) {
                digitalAlarm.play()
                clearInterval(intervalId);
                clearInterval(timerInterval);
                click = false;
                illustrateNumbers();
            }
            if (second === 0) {
                second = 60;
                minute--;
            }
        }, 1000);
    }
}