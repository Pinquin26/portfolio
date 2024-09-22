function quintendt (fase) {
    console.log("quintendt.js: fase =" + fase);
    let section = document.getElementById("quintendt");

    if( !section.init){
        section.init= true;
        console.log("quintendt.js: init");
        section.tl = gsap.timeline({

        scrollTrigger : {

        trigger: section,

        scrub: 1,

        start: "top 50%",

        end: "bottom 50%",

        toggleActions: "play none none reverse",




      }});
      section.tl
        //add1------------------------------
        .add ("football")
        .to("#quintendt .box", {
            borderRadius:"50%",
            backgroundColor: "rgb(112, 90, 61)",
            width:"10rem",
            height:"5rem",
            rotation: 360,
            borderTop: "solid white 4px",
            center: 0,
            x:"45vw",
            y:"45vh"
        }, "football")
        .to("#quintendt .football-texture",{
            opacity:0.7,
            rotation:180
        }, "football")        


        //add2------------------------------
        .add ("catch")
        .to("#quintendt .box", {
            x:"-50vw",
            y:"80vh",
            scale:.3,
        },"catch")


        .to ("#quintendt .gif", {
            x:1200,
            ease:"none"
        },"catch")
        
        .from ("#quintendt .history", {
            x:-800
        },"catch")

        .from ("#quintendt .facts", {
            x:800
        },"catch")


        //add3------------------------------
        .add("superbowl")
        .to("#quintendt .box", {
            scale:1
        },"superbowl")


        //add4------------------------------
        .add("vs")
        .from("#quintendt .img1", {
            y:"-200vh",
            opacity:0,
            ease:"easeOut",
        },"vs")

        .from("#quintendt .img2", {
            y:"200vh",
            opacity:0,
            ease:"easeOut",
        },"vs")

        .from ("#quintendt .AFC", {
            x:"90vw",
            y:"-80vh",
            rotation:720
        },"vs")

        .from ("#quintendt .NFL", {
            x:"-90vw",
            y:"-80vh",
            rotation:720
        },"vs")


        //add5------------------------------
        .add("goal")
        .to("#quintendt .box", {
            x:"0vw",
            y:"25vh",
            scale:.4
        }, "goal")


        //add6------------------------------
        .add("score")
        .to("#quintendt .score", {
            opacity:1
        }, "score")
        .to("#quintendt .box", {
            rotation:90
        }, "score")


        //add7------------------------------
        .add("rugbybalText")
        .from("#quintendt .rugbybal",{
            x:1000,
        }, "rugbybalText")
        .to("#quintendt .box", {
            x:"40vw",
            rotation:180
        }, "rugbybalText")

        //add8------------------------------
        .add("name")
        .from("#quintendt .name",{
            x:1000,
        }, "name")

        .to("#quintendt .box", {
            borderRadius:"0",
            backgroundColor: "white",
            width:"20vw",
            height:"20vw",
            scale:1,
            rotation: 360,
            border:"none",
            center: 0,
            x:"0vw"
        }, "name")
        .to("#quintendt .football-texture", {
            opacity:0
        },"name")

        //add9------------------------------
        .add("end")
        .to("#quintendt .box",{
            top:"0vh",
            left:"40vw"
        },"end")
    }
}