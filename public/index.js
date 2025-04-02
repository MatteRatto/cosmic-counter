function createRings() {
  const ringsContainer = createElement("div", "rings");
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 5; i++) {
    const ring = createElement("div", "ring");
    const size = 150 + i * 50;
    ring.style.width = ring.style.height = `${size}px`;

    ring.style.transform = `translate(-50%, -50%) rotateX(0deg) rotateZ(${
      i * 10
    }deg)`;
    ring.style.opacity = 0.7 - i * 0.1;

    fragment.appendChild(ring);
  }

  ringsContainer.appendChild(fragment);
  document.querySelector(".counter-container").appendChild(ringsContainer);
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

  function handleMouseMoveForRings(e) {
    if (!ticking) {
      requestAnimationFrame(() => {
        const rings = document.querySelectorAll(".ring");
        const container = document.querySelector(".counter-container");

        const containerRect = container.getBoundingClientRect();

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const containerCenterX = containerRect.left + containerRect.width / 2;
        const containerCenterY = containerRect.top + containerRect.height / 2;

        const moveFactorX = (mouseX - containerCenterX) / 15;
        const moveFactorY = (mouseY - containerCenterY) / 15;

        rings.forEach((ring, index) => {
          const sizeFactor = 1.5 - index * 0.2;

          const moveX = moveFactorX * sizeFactor;
          const moveY = moveFactorY * sizeFactor;

          ring.style.transform = `translate(${moveX}px, ${moveY}px) translate(-50%, -50%) rotateX(${
            Math.random() * 10
          }deg) rotateZ(${index * 10}deg)`;
        });

        ticking = false;
      });

      ticking = true;
    }
  }

  document.addEventListener("mousemove", handleMouseMoveForRings);

  document.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];

      handleMouseMoveForRings({
        clientX: touch.clientX,
        clientY: touch.clientY,
      });

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
