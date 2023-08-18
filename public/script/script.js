import Typewriter from "typewriter-effect";

var text = document.getElementById("typewriter");
console.log(text);

var typewriter = new Typewriter(text, {
  loop: true,
  delay: 0,
});

typewriter
  .pauseFor(2500)
  .typeString("A simple yet powerful native javascript")
  .pauseFor(300)
  .deleteChars(10)
  .typeString("<strong>JS</strong> plugin for a cool typewriter effect and ")
  .typeString(
    '<strong>only <span style="color: #27ae60;">5kb</span> Gzipped!</strong>'
  )
  .pauseFor(1000)
  .start();
