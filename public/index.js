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
  const starCount = window.innerWidth < 768 ? 150 : 200;

  for (let i = 0; i < starCount; i++) {
    const star = createElement("div", "star");
    star.style.setProperty("--duration", `${Math.random() * 5 + 3}s`);
    star.style.setProperty("--opacity", Math.random() * 0.8 + 0.2);

    const size = Math.random() * 3 + 1;
    star.style.width = star.style.height = `${size}px`;

    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;

    star.style.animationDelay = `${Math.random() * 5}s`;

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

    const randomX = Math.random() * 20 - 10;
    const randomZ = i * 10;

    ring.style.transform = `translate(-50%, -50%) rotateX(${randomX}deg) rotateZ(${randomZ}deg)`;

    ring.style.opacity = 0.7 - i * 0.1;
    ring.style.animationDuration = `${20 + i * 5}s`;

    ring.style.animationDelay = `${-i * 2}s`;

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
  let lastUpdateTime = 0;
  const updateThreshold = 50;

  function updateDisplay() {
    counterElement.textContent = count;
    counterElement.setAttribute("data-value", count);
    counterElement.classList.remove("change");
    void counterElement.offsetWidth;
    counterElement.classList.add("change");
  }

  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;
  const inertiaFactor = 0.08;

  function animateRotation() {
    currentRotationX += (targetRotationX - currentRotationX) * inertiaFactor;
    currentRotationY += (targetRotationY - currentRotationY) * inertiaFactor;

    wrapper.style.transform = `rotateY(${currentRotationX}deg) rotateX(${currentRotationY}deg)`;

    requestAnimationFrame(animateRotation);
  }

  animateRotation();

  document.addEventListener("mousemove", (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

    targetRotationX = xAxis;
    targetRotationY = yAxis;
  });

  function handleButtonClick(e) {
    const target = e.target;
    if (!target.classList.contains("btn")) return;

    const now = Date.now();
    if (now - lastUpdateTime < updateThreshold) return;
    lastUpdateTime = now;

    target.classList.add("active");
    setTimeout(() => target.classList.remove("active"), 200);

    count += target.dataset.action === "increase" ? 1 : -1;
    updateDisplay();

    const randomX = (Math.random() - 0.5) * 5;
    const randomY = (Math.random() - 0.5) * 5;
    targetRotationX += randomX;
    targetRotationY += randomY;
  }

  document.addEventListener("click", handleButtonClick);

  document.addEventListener("mousemove", (e) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const rings = document.querySelectorAll(".ring");
        const xPercent = e.clientX / window.innerWidth;
        const yPercent = e.clientY / window.innerHeight;

        rings.forEach((ring, index) => {
          const depth = (index + 1) * 2;
          const moveX = (xPercent - 0.5) * depth;
          const moveY = (yPercent - 0.5) * depth;

          const currentTransform = ring.style.transform;
          const baseTransform = currentTransform.split("rotateX")[0];
          const rotation = currentTransform.match(/rotateX\(([^)]+)\)/)[0];

          ring.style.transform = `${baseTransform} translateX(${moveX}px) translateY(${moveY}px) ${rotation}`;
        });

        ticking = false;
      });

      ticking = true;
    }
  });

  document.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const xAxis = (window.innerWidth / 2 - touch.clientX) / 15;
      const yAxis = (window.innerHeight / 2 - touch.clientY) / 15;

      targetRotationX = xAxis;
      targetRotationY = yAxis;
    }
  });

  document.addEventListener("touchstart", handleButtonClick);

  window.addEventListener("resize", () => {
    const universe = document.querySelector(".universe");
    while (universe.firstChild) {
      universe.removeChild(universe.firstChild);
    }
    createStars();
  });

  createStars();
  createRings();
}

document.addEventListener("DOMContentLoaded", initializeApp);
