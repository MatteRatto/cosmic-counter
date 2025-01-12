function createElement(tagName, className, options = {}) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (options.id) element.id = options.id;
  if (options.innerHTML) element.innerHTML = options.innerHTML;
  return element;
}

function createStars() {
  const universe = document.querySelector(".universe");
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 200; i++) {
    const star = createElement("div", "star");
    star.style.setProperty("--duration", `${Math.random() * 3 + 2}s`);
    star.style.setProperty("--opacity", Math.random());
    star.style.width = star.style.height = `${Math.random() * 2}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    fragment.appendChild(star);
  }

  universe.appendChild(fragment);
}

function createRings() {
  const ringsContainer = createElement("div", "rings");
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 5; i++) {
    const ring = createElement("div", "ring");
    const size = 150 + i * 50;
    ring.style.width = ring.style.height = `${size}px`;
    ring.style.transform = `translate(-50%, -50%) rotateX(${i * 10}deg)`;
    fragment.appendChild(ring);
  }

  ringsContainer.appendChild(fragment);
  document.querySelector(".counter-container").appendChild(ringsContainer);
}

function createCounter() {
  const container = document.querySelector(".counter-container");
  const counterElement = createElement("div", "counter-value", {
    id: "counter",
  });
  counterElement.setAttribute("data-value", "0");
  counterElement.textContent = "0";

  const buttonContainer = createElement("div", "button-container");
  const decreaseBtn = createElement("button", "btn", {
    innerHTML: "-",
    id: "decrease",
  });
  const increaseBtn = createElement("button", "btn", {
    innerHTML: "+",
    id: "increase",
  });

  buttonContainer.appendChild(decreaseBtn);
  buttonContainer.appendChild(increaseBtn);

  container.appendChild(counterElement);
  container.appendChild(buttonContainer);

  return counterElement;
}

function initializeApp() {
  let count = 0;
  const counterElement = createCounter();
  const wrapper = document.querySelector(".counter-wrapper");

  function updateDisplay() {
    counterElement.textContent = count;
    counterElement.setAttribute("data-value", count);
    counterElement.classList.remove("change");
    void counterElement.offsetWidth;
    counterElement.classList.add("change");
  }

  document.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("btn")) {
      count += target.id === "increase" ? 1 : -1;
      updateDisplay();
    }
  });

  let ticking = false;
  document.addEventListener("mousemove", (e) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        wrapper.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        ticking = false;
      });
      ticking = true;
    }
  });

  createStars();
  createRings();
}

document.addEventListener("DOMContentLoaded", initializeApp);
