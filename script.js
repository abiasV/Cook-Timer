var formHandle = document.forms["boil-eggs"];
var counter;
var bar;
var setTime;
let isTimerRunning = false;
let valueSelected;

function startCountdown(duration) {
  var showTimer = document.querySelector(".countdown-value");
  var bell = document.querySelector("#timer-sound");

  setTime = parseInt(duration * 60);

  var displaySecond;
  var displayMinutes;
  counter = setInterval(function () {
    const minutes = Math.floor(setTime / 60);
    const seconds = setTime % 60;
    displayMinutes = minutes > 9 ? minutes : "0" + minutes.toString();
    displaySecond = seconds > 9 ? seconds : "0" + seconds.toString();
    showTimer.innerHTML = displayMinutes + ":" + displaySecond;
console.log(isTimerRunning);
    if (setTime <= 0) {
      clearInterval(counter);
      showTimer.innerHTML = "Complete!";
      $("#startTimer").text("Finish").attr("disabled", "disabled").css({
        color: "yellow",
        backgroundColor: "gray",
        cursor: "default",
      });
    } else if (isTimerRunning && setTime <= 3) {
      bell.play();
    } 
    else if (!isTimerRunning && setTime <= 3) {
      console.log(!isTimerRunning)
      bell.pause();
      bell.currentTime = 0;
    }
    console.log("before setTime" + setTime);
    setTime--;
    console.log("after setTime" + setTime);
  }, 1000);
  // showTimer.innerHTML = "00:00";
}

function progress(timeleft, timetotal, $element) {
  var progressBarWidth = (timeleft * $element.width()) / timetotal;
  $element.find("div").animate({ width: progressBarWidth }, 500);
  console.log("timeleft"+timeleft);
  if (timeleft > 0) {
    bar= setTimeout(function () {
      progress(timeleft - 1, timetotal, $element);
    }, 1000);
  }
}

function resetEverything() {
  $("#startTimer").hide();
  $("#progressBar").hide();
  clearInterval(counter);
  clearTimeout(bar);
  var showTimer = document.querySelector(".countdown-value");
  showTimer.innerHTML = "00:00";
  $("#time-select").val("X");
}

$(document).ready(function () {
  resetEverything();
  $("#time-select").change(function () {
    valueSelected = $("#time-select").val();
    if (valueSelected !== "X") {
      // console.log(valueSelected);
      $("#startTimer").show();
      $("#progressBar").show();
      var showTimer = document.querySelector(".countdown-value");
      setTime = valueSelected * 60;
      var displaySecond;
      var displayMinutes;
      const minutes = Math.floor(setTime / 60);
      const seconds = setTime % 60;
      displayMinutes = minutes > 9 ? minutes : "0" + minutes.toString();
      displaySecond = seconds > 9 ? seconds : "0" + seconds.toString();
      showTimer.innerHTML = displayMinutes + ":" + displaySecond;
    } else {
      resetEverything();
      $("#startTimer").text("Start").css("background-color", "#0f0");
      isTimerRunning = false;
    }
  });
  $("#startTimer").on("click", function (e) {
    e.preventDefault();
    if (valueSelected !== "X") {
      if (!isTimerRunning) {
        // console.log(valueSelected*60);
        // console.log(setTime);
        startCountdown(valueSelected);
        progress(setTime, setTime, $("#progressBar"));
        $(this).text("Stop").css("background-color", "red");
        isTimerRunning = true;
      } else {
        resetEverything();
        $(this).text("Start").css("background-color", "#0f0");
        isTimerRunning = false;
      }
    }
  });
});
