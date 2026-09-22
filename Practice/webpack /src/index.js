//Index
import { greeting } from "./greeting.js"
import "./styles.css"
import image from "./imgs/image1.jpeg"

const image1 = document.createElement("img");
image1.src = image;

document.body.appendChild(image1);

console.log(greeting);