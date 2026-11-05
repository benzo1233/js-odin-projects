const doc = document.querySelector(".container");
const currentHour = new Date().getHours();

async function getWeather(location) {
  try {
    const res = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}`,
    );
    const data = await res.json();
    // console.log(data.days[0].hours[currentHour]);
    // console.log(data.resolvedAddress);
    return {
      address: data.resolvedAddress,
      temp: data.days[0].hours[currentHour].temp,
    };
  } catch (error) {
    // console.log(error);
    throw error;
  }
}

const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = input.value.trim();

  getWeather(city).then((res) => {
    // console.log(res);
    const data = res;
    const container = createWeatherDiv(data);
    doc.append(container);
  });
});

// Make View
function createWeatherDiv(res) {
  const container = document.createElement("div");

  const p = document.createElement("p");
  p.textContent = `${res.address}`;

  const f = document.createElement("p");
  f.textContent = `${res.temp}°F`;
  f.className = "active";

  const c = document.createElement("p");
  c.className = "hidden";
  c.textContent = `${(((res.temp - 32) * 5) / 9).toFixed(1)}°C`;

  const btn = document.createElement("button");
  btn.className = "btnToggle";
  btn.textContent = "Toggle °F / °C";

  btn.addEventListener("click", () => {
    if (f.classList.contains("active")) {
      f.classList.remove("active");
      f.classList.add("hidden");
      c.classList.remove("hidden");
      c.classList.add("active");
    } else if (c.classList.contains("active")) {
      c.classList.remove("active");
      c.classList.add("hidden");
      f.classList.remove("hidden");
      f.classList.add("active");
    }
  });

  container.append(p, c, f, btn);
  return container;
}
