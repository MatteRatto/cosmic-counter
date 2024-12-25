function createElement(tagName, className, innerHTML = "") {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}

function createStars() {
  const universe = document.querySelector(".universe");
  for (let i = 0; i < 200; i++) {
    const star = createElement("div", "star");
    star.style.setProperty("--duration", `${Math.random() * 3 + 2}s`);
    star.style.setProperty("--opacity", Math.random());
    star.style.width = star.style.height = `${Math.random() * 2}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    universe.appendChild(star);
  }
}

function createRings() {
  const ringsContainer = createElement("div", "rings");
  document.querySelector(".counter-container").appendChild(ringsContainer);

  for (let i = 0; i < 5; i++) {
    const ring = createElement("div", "ring");
    const size = 150 + i * 50;
    ring.style.width = ring.style.height = `${size}px`;
    ring.style.transform = `translate(-50%, -50%) rotateX(${i * 10}deg)`;
    ringsContainer.appendChild(ring);
  }
}

function createCounter() {
  const container = document.querySelector(".counter-container");

  const counterElement = createElement("div", "counter-value");
  counterElement.id = "counter";
  counterElement.setAttribute("data-value", "0");
  counterElement.textContent = "0";

  const buttonContainer = createElement("div", "button-container");
  const decreaseBtn = createElement("button", "btn", "-");
  const increaseBtn = createElement("button", "btn", "+");

  buttonContainer.appendChild(decreaseBtn);
  buttonContainer.appendChild(increaseBtn);

  container.appendChild(counterElement);
  container.appendChild(buttonContainer);

  return counterElement;
}

function initializeApp() {
  let count = 0;
  const counterElement = createCounter();

  function updateDisplay() {
    counterElement.textContent = count;
    counterElement.setAttribute("data-value", count);
    counterElement.classList.remove("change");
    void counterElement.offsetWidth;
    counterElement.classList.add("change");
  }

  document.querySelector(".button-container").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      if (e.target.textContent === "+") {
        count++;
      } else if (e.target.textContent === "-") {
        count--;
      }
      updateDisplay();
    }
  });

  document.addEventListener("mousemove", (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    const wrapper = document.querySelector(".counter-wrapper");
    wrapper.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  createStars();
  createRings();
}

document.addEventListener("DOMContentLoaded", initializeApp);
