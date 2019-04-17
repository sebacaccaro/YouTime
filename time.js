function insertAfter(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

function outFormatter(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  console.log(hours + " " + minutes);
  const hourToShow = hours > 10 ? hours : "0" + hours;
  const minuteToShow = minutes > 10 ? minutes : "0" + minutes;
  return " " + hourToShow + ":" + minuteToShow;
}

function durationToSeconds(duration) {
  const splitted = duration.split(":");
  const splittedNum = splitted.map(strVal => parseInt(strVal));
  return splittedNum[0] * 60 + splittedNum[1];
}

function endTime(currentDate, videoDurationSec) {
  currentDate.setSeconds(currentDate.getSeconds() + videoDurationSec);
  return outFormatter(currentDate);
}

function updateTime(duration, watched, end) {
  const secondsLeft = durationToSeconds(duration.innerHTML) - durationToSeconds(watched.innerHTML);
  end.innerHTML = endTime(new Date(), secondsLeft);
}

const timeDurationSpan = document.querySelector("span.ytp-time-duration");
const watchednSpan = document.querySelector("span.ytp-time-current");

const secondsLeft = durationToSeconds(timeDurationSpan.innerHTML) - durationToSeconds(watchednSpan.innerHTML);

const endTimeSpan = document.createElement("span");
endTimeSpan.innerHTML = endTime(new Date(), secondsLeft);
endTimeSpan.className = "ytp-end-time";

insertAfter(endTimeSpan, timeDurationSpan);

watchednSpan.addEventListener("DOMSubtreeModified", updateTime(timeDurationSpan, watchednSpan, endTimeSpan));

var config = { attributes: true, childList: true, subtree: true };
var observer = new MutationObserver(() => updateTime(timeDurationSpan, watchednSpan, endTimeSpan));
observer.observe(watchednSpan, config);
setInterval(updateTime(timeDurationSpan, watchednSpan, endTimeSpan), 5000);
