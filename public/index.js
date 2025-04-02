function createRings() {
  const ringsContainer = createElement("div", "rings");
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 5; i++) {
    const ring = createElement("div", "ring");
    const size = 150 + i * 50;
    ring.style.width = ring.style.height = `${size}px`;

    ring.style.transform = `translate(-50%, -50%) rotateX(${
      Math.random() * 20 - 10
    }deg) rotateZ(${i * 10}deg)`;
    ring.style.opacity = 0.7 - i * 0.1;
    ring.style.animationDuration = `${20 + i * 5}s`;
    ring.style.animationDelay = `${-i * 2}s`;

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

        const mouseX = e.clientX - containerRect.left;
        const mouseY = e.clientY - containerRect.top;

        const isInsideContainer =
          mouseX >= 0 &&
          mouseX <= containerRect.width &&
          mouseY >= 0 &&
          mouseY <= containerRect.height;

        const xPercent = isInsideContainer ? mouseX / containerRect.width : 0.5;

        const yPercent = isInsideContainer
          ? mouseY / containerRect.height
          : 0.5;

        const maxMovement = containerRect.width * 0.15;

        rings.forEach((ring, index) => {
          const sizeFactor = 1 - index / 5;
          const depth = (index + 1) * 2 * sizeFactor;

          const moveX = (xPercent - 0.5) * maxMovement * depth;
          const moveY = (yPercent - 0.5) * maxMovement * depth;

          ring.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) rotateX(${
            Math.random() * 20 - 10
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
