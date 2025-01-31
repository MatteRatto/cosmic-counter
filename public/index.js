function createElement(tagName, className, options = {}) {
  const element = document.createElement(tagName);
  if (className) element.className = className;

  Object.entries(options).forEach(([key, value]) => {
    if (key === "innerHTML") {
      element.innerHTML = value;
    } else if (key === "id") {
      element.id = value;
    } else {
      element.setAttribute(key, value);
    }
  });

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
    "data-value": "0",
  });
  counterElement.textContent = "0";

  const buttonContainer = createElement("div", "button-container");
  const decreaseBtn = createElement("button", "btn", {
    innerHTML: "-",
    id: "decrease",
    "data-action": "decrease",
  });
  const increaseBtn = createElement("button", "btn", {
    innerHTML: "+",
    id: "increase",
    "data-action": "increase",
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
  let ticking = false;

  function updateDisplay() {
    counterElement.textContent = count;
    counterElement.setAttribute("data-value", count);
    counterElement.classList.remove("change");
    void counterElement.offsetWidth;
    counterElement.classList.add("change");
  }

  document.addEventListener("mousemove", (e) => {
    const target = e.target;

    if (e.type === "click" && target.classList.contains("btn")) {
      count += target.dataset.action === "increase" ? 1 : -1;
      updateDisplay();
      return;
    }

    if (e.type === "mousemove") {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
          const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
          wrapper.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
          ticking = false;
        });
        ticking = true;
      }
    }
  });

  document.addEventListener("click", (e) => {
    document.dispatchEvent(
      new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
        view: window,
        ...e,
      })
    );
  });

  createStars();
  createRings();
}

document.addEventListener("DOMContentLoaded", initializeApp);
