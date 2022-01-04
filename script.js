"use strict";

let clock = document.querySelector(".clock");
let arrowH = document.createElement("div");
let arrowM = document.createElement("div");
let arrowS = document.createElement("div");
let requestId = null;

function createCircleSvg(r, cx, cy, color) {
  let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("r", r);
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("stroke", color);
  circle.setAttribute("stroke-width", 10);
  circle.setAttribute("fill", "transparent");
  circle.style.transformOrigin = "center center";
  circle.style.transform = "rotate(-90deg)";
  document.querySelector(".time").append(circle);
  return circle;
}

function createNumText(x, y, fontSize, bg) {
  let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y);
  text.setAttribute("font-size", fontSize);
  text.setAttribute("fill", bg);
  text.setAttribute("font-family", "Arial, Helvetica, sans-serif");
  document.querySelector(".time").appendChild(text);
  return text;
}

function createClockNum(radius) {
  for (let i = 1; i <= 12; i++) {
    let num = document.createElement("div");
    clock.appendChild(num);
    num.className = "num";
    num.innerText = i;

    let x = Math.cos(30 * i * (Math.PI / 180) - 1.57) * radius;
    let y = Math.sin(30 * i * (Math.PI / 180) - 1.57) * radius;

    num.style.left = `${x + clock.offsetWidth / 2 - num.offsetWidth / 2}px`;
    num.style.top = `${y + clock.offsetWidth / 2 - num.offsetWidth / 2}px`;
  }
}

function createArrow(arrow, classN, arrowOffset) {
  clock.appendChild(arrow);
  arrow.className = classN;
  arrow.style.transformOrigin = `50% ${arrow.offsetHeight - arrowOffset}px`;
  arrow.style.left = `${clock.offsetWidth / 2 - arrow.offsetWidth / 2}px`;
  arrow.style.bottom = `${clock.offsetHeight / 2 - arrowOffset}px`;
}

function start() {
  function formatTime(value, size) {
    let strValue = value.toString();
    while (strValue.length < size) strValue = "0" + strValue;
    return strValue;
  }

  function getNamekDay(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date];
  }

  function getNameMonth(month) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month];
  }

  function setProgress(percent, circle) {
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  function showTime() {
    let date = new Date();
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let dayWeek = date.getDay();
    let dayMonth = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    hourText.innerHTML = formatTime(hours, 2);
    minutText.innerHTML = formatTime(minutes, 2);
    secondText.innerHTML = formatTime(seconds, 2);

    setProgress((hours * 100) / 24, hourCircle);
    setProgress((minutes * 100) / 60, minutCircle);
    setProgress((seconds * 100) / 60, secondCircle);

    dateBlock.innerHTML = `${getNamekDay(dayWeek)}, ${dayMonth} ${getNameMonth(
      month
    )} ${year}`;

    arrowS.style.transform = `rotate(${seconds * 6}deg)`;
    arrowM.style.transform = `rotate(${minutes * 6}deg)`;
    arrowH.style.transform = `rotate(${hours * 30 + minutes / 2}deg)`;

    requestId = requestAnimationFrame(showTime);
  }

  let dateBlock = document.querySelector(".date");

  let hourCircle = createCircleSvg(35, 160, -60, "black");
  let minutCircle = createCircleSvg(35, 160, 40, "white");
  let secondCircle = createCircleSvg(35, 160, 140, "red");

  let hourText = createNumText(40, 52, 36, "white");
  let minutText = createNumText(140, 52, 36, "white");
  let secondText = createNumText(240, 52, 36, "white");

  if (requestId) {
    cancelAnimationFrame(requestId);
    requestId = 0;
  }

  requestId = requestAnimationFrame(showTime);
}

createClockNum(130);
createArrow(arrowH, "h_arrow", 20);
createArrow(arrowM, "m_arrow", 20);
createArrow(arrowS, "s_arrow", 20);

start();

console.log(
  "Score: 30/30 \n 1) Механические часы с движущимися стрелками на JavaScript - 10 \n 2) Обязательный дополнительный функционал: электронные часы которые показывают точное время, название дня недели, дату, год - 10 \n 3) Дополнительный функционал на выбор: добавлены круговые диаграммы для часов, минут и секунд -  10"
);
