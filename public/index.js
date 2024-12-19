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

const ringsContainer = document.createElement("div");
ringsContainer.className = "rings";
document.querySelector(".counter-container").appendChild(ringsContainer);

for (let i = 0; i < 5; i++) {
  const ring = document.createElement("div");
  ring.className = "ring";
  const size = 150 + i * 50;
  ring.style.width = ring.style.height = `${size}px`;
  ring.style.transform = `translate(-50%, -50%) rotateX(${i * 10}deg)`;
  ringsContainer.appendChild(ring);
}

let count = 0;

const counterElement = document.createElement("div");
counterElement.id = "counter";
counterElement.className = "counter-value";
counterElement.setAttribute("data-value", "0");
counterElement.textContent = "0";

const buttonContainer = document.createElement("div");
buttonContainer.className = "button-container";

const decreaseBtn = document.createElement("button");
decreaseBtn.className = "btn";
decreaseBtn.textContent = "-";

const increaseBtn = document.createElement("button");
increaseBtn.className = "btn";
increaseBtn.textContent = "+";

const container = document.querySelector(".counter-container");
container.appendChild(counterElement);
buttonContainer.appendChild(decreaseBtn);
buttonContainer.appendChild(increaseBtn);
container.appendChild(buttonContainer);

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

increaseBtn.addEventListener("click", increase);
decreaseBtn.addEventListener("click", decrease);

document.addEventListener("mousemove", (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  const wrapper = document.querySelector(".counter-wrapper");
  wrapper.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
