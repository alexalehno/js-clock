"use strict";

start();


function start() {
  createClockFace(160);

  let requestId = null;

  const dateBlock = createNumText(250, 490, 35, null, "rgba(255, 255, 255, 0.6)");

  const arrowH = createArrow(250, 260, 250, 150, 10, "black");
  const arrowM = createArrow(250, 260, 250, 110, 6, "white");
  const arrowS = createArrow(250, 260, 250, 85, 3, "red")

  const hourCircle = createCircle(clock, 35, 150, 550, "transparent", "black", 10, -90, "150px 550px");
  const minutCircle = createCircle(clock, 35, 250, 550, "transparent", "white", 10, -90, "250px 550px");
  const secondCircle = createCircle(clock, 35, 350, 550, "transparent", "red", 10, -90, "350px 550px");

  const hourText = createNumText(150, 560, 35, null, "rgba(255, 255, 255, 0.8)");
  const minutText = createNumText(250, 560, 35, null, "rgba(255, 255, 255, 0.8)");
  const secondText = createNumText(350, 560, 35, null, "rgba(255, 255, 255, 0.8)");

  if (requestId) {
    cancelAnimationFrame(requestId);
    requestId = 0;
  }

  requestId = requestAnimationFrame(showTime);

  function showTime() {
    let date = new Date();
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let dayWeek = date.getDay();
    let dayMonth = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    dateBlock.textContent = `${getNamekDay(dayWeek)}, ${dayMonth} ${getNameMonth(month)} ${year}`;

    arrowS.style.transform = `rotate(${seconds * 6}deg)`;
    arrowM.style.transform = `rotate(${minutes * 6}deg)`;
    arrowH.style.transform = `rotate(${hours * 30 + minutes / 2}deg)`;

    hourText.textContent = formatTime(hours, 2);
    minutText.textContent = formatTime(minutes, 2);
    secondText.textContent = formatTime(seconds, 2);

    setProgress((hours * 100) / 24, hourCircle);
    setProgress((minutes * 100) / 60, minutCircle);
    setProgress((seconds * 100) / 60, secondCircle);

    requestId = requestAnimationFrame(showTime);
  }
}

function setProgress(percent, circle) {
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;

  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

function createClockFace(numRadius) {
  let clock = document.querySelector("#clock");

  createCircle(clock, 200, 250, 240, "rgba(255, 255, 255, 0.3)", "white", 15);

  for (let i = 1; i <= 12; i++) {
    let x = Math.cos(30 * i * (Math.PI / 180) - 1.57) * numRadius;
    let y = Math.sin(30 * i * (Math.PI / 180) - 1.57) * numRadius;

    x = x + clock.clientWidth / 2;
    y = y + clock.clientHeight / 2;

    createNumText(x, y - 49, 30, i, "black");
  }
}

function createCircle(parent, r, cx, cy, bg, color, strokeSize, deg, trnOrigin) {
  let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("fill", bg);
  circle.setAttribute("r", r);
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("stroke", color);
  circle.setAttribute("stroke-width", strokeSize);
  circle.style.transformOrigin = trnOrigin;
  circle.style.transform = `rotate(${deg}deg)`;
  parent.appendChild(circle);
  return circle;
}

function createNumText(x, y, fontSize, content, fill) {
  let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y);
  text.setAttribute("font-size", fontSize);
  text.setAttribute("fill", fill);
  text.setAttribute("font-family", "Arial, Helvetica, sans-serif");
  text.setAttribute("text-anchor", "middle");
  text.textContent = content;
  clock.appendChild(text);
  return text;
}

function createArrow(x1, y1, x2, y2, width, color) {
  let arrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
  arrow.setAttribute("x1", x1);
  arrow.setAttribute("y1", y1);
  arrow.setAttribute("x2", x2);
  arrow.setAttribute("y2", y2);
  arrow.setAttribute("stroke", color);
  arrow.setAttribute("stroke-linecap", "round");
  arrow.setAttribute("stroke-width", width);
  arrow.style.transformOrigin = "center 240px";
  clock.appendChild(arrow);
  return arrow;
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

function formatTime(value, size) {
  let strValue = value.toString();
  while (strValue.length < size) strValue = "0" + strValue;
  return strValue;
}
