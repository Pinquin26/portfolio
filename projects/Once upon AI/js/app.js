//binnenkomend en buitengaand effect van de tekst
let articles = gsap.utils.toArray('article');
let body = document.querySelector("body");
console.log (articles);
articles.forEach(article => {

    gsap.from(article, {
        scrollTrigger: {
            horizontal: true,
            markers:false,
            scroller:"body",
            trigger: article,
            toggleActions: "play reverse play reset",
            start: "left 80%",
            end: "right 35%",
        },
        duration: .5, 
        y: -120, 
        opacity: 0});
});

//horizontaal scrollen
const scrollContainer = document.querySelector("html");

scrollContainer.addEventListener("wheel", (evt) => {
    scrollContainer.scrollLeft += evt.deltaY;
});
//smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
//progress-bar


window.onscroll = function () {
  let horizontal_position = 0;
  const pageWidth = document.body.clientWidth;
  if (scrollX){//usual
    horizontal_position = -scrollX;
    console.log(scrollX);}
  const bush = document.getElementById('bush');
  console.log((horizontal_position / pageWidth) * 100);
  bush.style.right = -(((horizontal_position / pageWidth)) * 100)-4 + 'vw';
}