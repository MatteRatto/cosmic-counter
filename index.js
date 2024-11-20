const universe = document.querySelector(".universe");
for (let i = 0; i < 200; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.setProperty("--duration", `${Math.random() * 3 + 2}s`);
  star.style.setProperty("--opacity", Math.random());
  star.style.width = star.style.height = `${Math.random() * 2}px`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;
  universe.appendChild(star);
}

const ringsContainer = document.querySelector(".rings");
for (let i = 0; i < 5; i++) {
  const ring = document.createElement("div");
  ring.className = "ring";
  const size = 150 + i * 50;
  ring.style.width = ring.style.height = `${size}px`;
  ring.style.transform = `translate(-50%, -50%) rotateX(${i * 10}deg)`;
  ringsContainer.appendChild(ring);
}

let count = 0;
const counterElement = document.getElementById("counter");

function updateDisplay() {
  counterElement.textContent = count;
  counterElement.setAttribute("data-value", count);
  counterElement.classList.remove("change");
  void counterElement.offsetWidth;
  counterElement.classList.add("change");
}

function increase() {
  count++;
  updateDisplay();
}

function decrease() {
  count--;
  updateDisplay();
}

document.addEventListener("mousemove", (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  const wrapper = document.querySelector(".counter-wrapper");
  wrapper.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
