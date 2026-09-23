import { page } from "./info.js"

export function createHomePage() {
    const container = document.createElement("div");
    
    const obj = page.homepage;
    const { hours, location, img } = obj;

    const openTimes = document.createElement("p");
    openTimes.textContent = hours;

    const loc = document.createElement("p");
    loc.textContent = location;

    const heroImg = document.createElement("img");
    heroImg.src = img;

    container.append(heroImg, openTimes, loc);
    return container;
}