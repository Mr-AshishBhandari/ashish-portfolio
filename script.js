/*==================================================
                DOM ELEMENTS
==================================================*/

const header = document.getElementById("header");

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

const navItems = document.querySelectorAll(".nav-links a");

const sections = document.querySelectorAll("section");

const backToTop = document.getElementById("backToTop");

/*==================================================
                STICKY NAVBAR
==================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

/*==================================================
            MOBILE MENU
==================================================*/

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuBtn.classList.toggle("active");

});

/*==================================================
        CLOSE MENU AFTER CLICK
==================================================*/

navItems.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuBtn.classList.remove("active");

    });

});

/*==================================================
        ACTIVE NAV LINK
==================================================*/

function activeNavigation() {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (

            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight

        ) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (

            link.getAttribute("href") === "#" + current

        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener(

    "scroll",

    activeNavigation

);

/*==================================================
            BACK TO TOP
==================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    }

    else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/*==================================================
            SMOOTH SCROLL
==================================================*/

document

.querySelectorAll('a[href^="#"]')

.forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(

            this.getAttribute("href")

        );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

/*==================================================
        NAVBAR SHADOW OPTIMIZATION
==================================================*/

let lastScroll = 0;

window.addEventListener("scroll", () => {

    const current = window.pageYOffset;

    if (

        current > lastScroll &&

        current > 120

    ) {

        header.style.transform =

            "translateY(-100%)";

    }

    else {

        header.style.transform =

            "translateY(0)";

    }

    lastScroll = current;

});

/*==================================================
        INITIAL ACTIVE LINK
==================================================*/

activeNavigation();

/*==================================================
                TYPING EFFECT
==================================================*/

const typingElement = document.getElementById("typing");

const typingWords = [

    "Backend Developer",

    "AI Engineer",

    "Machine Learning Enthusiast",

    "LangChain Developer",

    "Python Developer"

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typingAnimation() {

    const currentWord = typingWords[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex++);

        if (charIndex > currentWord.length) {

            deleting = true;

            setTimeout(
                typingAnimation,
                1800
            );

            return;
        }

    }

    else {

        typingElement.textContent =
            currentWord.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= typingWords.length)
                wordIndex = 0;

        }

    }

    setTimeout(

        typingAnimation,

        deleting ? 45 : 90

    );

}

typingAnimation();

/*==================================================
            CURSOR BLINK
==================================================*/

const cursor = document.createElement("span");

cursor.className = "typing-cursor";

cursor.textContent = "|";

typingElement.after(cursor);

setInterval(() => {

    cursor.classList.toggle("hide");

}, 500);

/*==================================================
        INTERSECTION OBSERVER
==================================================*/

const revealElements = document.querySelectorAll(

    ".reveal, .reveal-left, .reveal-right, .reveal-scale"

);

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

observer.unobserve(entry.target);

}

});

},

{

threshold:.18,

rootMargin:"0px 0px -60px 0px"

}

);

revealElements.forEach(el=>{

observer.observe(el);

});

/*==================================================
        STAGGER CARD ANIMATION
==================================================*/

const staggerGroups = document.querySelectorAll(

    ".projects-grid, .skills-grid, .about-stats"

);

staggerGroups.forEach(group=>{

const children = [...group.children];

children.forEach((item,index)=>{

item.style.transitionDelay =

`${index * 120}ms`;

});

});

/*==================================================
            FLOATING EFFECT
==================================================*/

const floatingCards = document.querySelectorAll(

".project-card, .stat-card"

);

floatingCards.forEach((card,index)=>{

card.style.animation=

`floatingCard ${6+index*.3}s ease-in-out infinite`;

});

/*==================================================
            PARALLAX HERO
==================================================*/

const heroImage = document.querySelector(".hero-image");

window.addEventListener(

"scroll",

()=>{

const offset = window.pageYOffset;

if(heroImage){

heroImage.style.transform=

`translateY(${offset*.12}px)`;

}

}

);

/*==================================================
        HERO CONTENT PARALLAX
==================================================*/

const heroContent=document.querySelector(".hero-content");

window.addEventListener("scroll",()=>{

const y=window.scrollY;

if(heroContent){

heroContent.style.transform=

`translateY(${y*.05}px)`;

}

});

/*==================================================
            FADE HEADER ELEMENTS
==================================================*/

window.addEventListener("scroll",()=>{

const hero=document.querySelector(".hero");

if(!hero)return;

const opacity=Math.max(

1-window.scrollY/700,

0

);

hero.style.opacity=opacity;

});

/*==================================================
        SECTION TITLE ANIMATION
==================================================*/

const headers=document.querySelectorAll(".section-header");

headers.forEach(header=>{

observer.observe(header);

});

/*==================================================
            PERFORMANCE
==================================================*/

let ticking=false;

function updateAnimation(){

ticking=false;

}

window.addEventListener("scroll",()=>{

if(!ticking){

window.requestAnimationFrame(updateAnimation);

ticking=true;

}

});

/*==================================================
        OPTIONAL COUNT-UP SUPPORT
==================================================*/

const counters=document.querySelectorAll("[data-count]");

const counterObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting)return;

const el=entry.target;

const target=+el.dataset.count;

let current=0;

const increment=target/60;

function update(){

current+=increment;

if(current<target){

el.textContent=Math.floor(current);

requestAnimationFrame(update);

}else{

el.textContent=target;

}

}

update();

counterObserver.unobserve(el);

});

},{threshold:.5});

counters.forEach(counter=>{

counterObserver.observe(counter);

});

/*==================================================
        IMAGE FADE-IN
==================================================*/

document.querySelectorAll("img").forEach(img=>{

img.onload=()=>{

img.classList.add("loaded");

};

});

/*==================================================
                CUSTOM CURSOR
==================================================*/

const cursorDot = document.querySelector(".cursor-dot");

const cursorOutline = document.querySelector(".cursor-outline");

let mouseX = 0;
let mouseY = 0;

let outlineX = 0;
let outlineY = 0;

window.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";

});

/*==================================================
        SMOOTH CURSOR FOLLOW
==================================================*/

function animateCursor() {

    outlineX += (mouseX - outlineX) * 0.15;

    outlineY += (mouseY - outlineY) * 0.15;

    cursorOutline.style.left = outlineX + "px";

    cursorOutline.style.top = outlineY + "px";

    requestAnimationFrame(animateCursor);

}

animateCursor();

/*==================================================
            CURSOR HOVER
==================================================*/

const hoverItems = document.querySelectorAll(

    "a, button, .project-card, .skill-chip"

);

hoverItems.forEach(item => {

    item.addEventListener("mouseenter", () => {

        cursorOutline.classList.add("hover");

        cursorDot.classList.add("hover");

    });

    item.addEventListener("mouseleave", () => {

        cursorOutline.classList.remove("hover");

        cursorDot.classList.remove("hover");

    });

});

/*==================================================
            MOUSE SPOTLIGHT
==================================================*/

const spotlight = document.querySelector(".mouse-light");

window.addEventListener("mousemove", (e) => {

    spotlight.style.left = e.clientX + "px";

    spotlight.style.top = e.clientY + "px";

});

/*==================================================
            MAGNETIC BUTTONS
==================================================*/

const magneticButtons = document.querySelectorAll(".magnetic");

magneticButtons.forEach(button => {

    button.addEventListener("mousemove", e => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const moveX = (x - rect.width / 2) / 5;

        const moveY = (y - rect.height / 2) / 5;

        button.style.transform =

            `translate(${moveX}px, ${moveY}px)`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translate(0,0)";

    });

});

/*==================================================
                RIPPLE EFFECT
==================================================*/

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = this.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        ripple.style.width = size + "px";

        ripple.style.height = size + "px";

        ripple.style.left =

            e.clientX - rect.left - size / 2 + "px";

        ripple.style.top =

            e.clientY - rect.top - size / 2 + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/*==================================================
            3D PROJECT TILT
==================================================*/

const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateX =

            -((y - rect.height / 2) / 18);

        const rotateY =

            ((x - rect.width / 2) / 18);

        card.style.transform =

            `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)
            `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =

            `
            perspective(1200px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0)
            `;

    });

});

/*==================================================
        IMAGE PARALLAX
==================================================*/

document.querySelectorAll(".project-image").forEach(image => {

    image.addEventListener("mousemove", e => {

        const rect = image.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;

        const y = (e.clientY - rect.top) / rect.height;

        const img = image.querySelector("img");

        img.style.transform =

            `
            scale(1.08)
            translate(${(x - .5) * 12}px,
                      ${(y - .5) * 12}px)
            `;

    });

    image.addEventListener("mouseleave", () => {

        image.querySelector("img").style.transform =

            "scale(1)";

    });

});

/*==================================================
            BUTTON GLOW
==================================================*/

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.classList.add("glow");

    });

    button.addEventListener("mouseleave", () => {

        button.classList.remove("glow");

    });

});

/*==================================================
        HERO TECH ICON FLOAT
==================================================*/

document.querySelectorAll(".tech-icons i")

.forEach((icon, index) => {

    icon.style.animation =

        `floatingSoft ${4 + index}s ease-in-out infinite`;

});

/*==================================================
        PERFORMANCE LOOP
==================================================*/

let mouse = {

    x: 0,

    y: 0

};

window.addEventListener("mousemove", e => {

    mouse.x = e.clientX;

    mouse.y = e.clientY;

});

function animationLoop() {

    requestAnimationFrame(animationLoop);

}

animationLoop();

/*==================================================
        PARTICLE BACKGROUND
==================================================*/

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

const mouseParticle = {

    x: null,

    y: null,

    radius: 150

};

/*==================================================
        CANVAS SIZE
==================================================*/

function resizeCanvas() {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

/*==================================================
        MOUSE
==================================================*/

window.addEventListener("mousemove", e => {

    mouseParticle.x = e.clientX;

    mouseParticle.y = e.clientY;

});

/*==================================================
        PARTICLE CLASS
==================================================*/

class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;

        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 1;

        this.speedX = (Math.random() - 0.5) * 0.6;

        this.speedY = (Math.random() - 0.5) * 0.6;

    }

    update() {

        this.x += this.speedX;

        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width)

            this.speedX *= -1;

        if (this.y < 0 || this.y > canvas.height)

            this.speedY *= -1;

    }

    draw() {

        ctx.beginPath();

        ctx.arc(

            this.x,

            this.y,

            this.size,

            0,

            Math.PI * 2

        );

        ctx.fillStyle = "#4F9DFF";

        ctx.fill();

    }

}

/*==================================================
        CREATE PARTICLES
==================================================*/

function initParticles() {

    particles = [];

    const amount =

        Math.floor(

            (canvas.width * canvas.height) / 18000

        );

    for (let i = 0; i < amount; i++) {

        particles.push(new Particle());

    }

}

initParticles();

window.addEventListener("resize", initParticles);

/*==================================================
        CONNECT LINES
==================================================*/

function connectParticles() {

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const dx = particles[i].x - particles[j].x;

            const dy = particles[i].y - particles[j].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {

                ctx.strokeStyle =

                    `rgba(79,157,255,${1 - distance / 120})`;

                ctx.lineWidth = 0.7;

                ctx.beginPath();

                ctx.moveTo(

                    particles[i].x,

                    particles[i].y

                );

                ctx.lineTo(

                    particles[j].x,

                    particles[j].y

                );

                ctx.stroke();

            }

        }

    }

}

/*==================================================
        MOUSE CONNECTION
==================================================*/

function mouseConnections() {

    if (mouseParticle.x === null) return;

    particles.forEach(p => {

        const dx = p.x - mouseParticle.x;

        const dy = p.y - mouseParticle.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseParticle.radius) {

            ctx.beginPath();

            ctx.strokeStyle =

                `rgba(34,211,238,${1 - dist / mouseParticle.radius})`;

            ctx.lineWidth = 1;

            ctx.moveTo(

                p.x,

                p.y

            );

            ctx.lineTo(

                mouseParticle.x,

                mouseParticle.y

            );

            ctx.stroke();

        }

    });

}

/*==================================================
        GLOW EFFECT
==================================================*/

function glowBackground() {

    const gradient = ctx.createRadialGradient(

        canvas.width / 2,

        canvas.height / 2,

        100,

        canvas.width / 2,

        canvas.height / 2,

        canvas.width

    );

    gradient.addColorStop(

        0,

        "rgba(79,157,255,.04)"

    );

    gradient.addColorStop(

        1,

        "transparent"

    );

    ctx.fillStyle = gradient;

    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

}

/*==================================================
        ANIMATION LOOP
==================================================*/

function animateParticles() {

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

    glowBackground();

    particles.forEach(p => {

        p.update();

        p.draw();

    });

    connectParticles();

    mouseConnections();

    requestAnimationFrame(animateParticles);

}

animateParticles();

/*==================================================
            FORMSPREE CONTACT FORM
==================================================*/

const contactForm = document.getElementById("contactForm");

const submitButton = contactForm?.querySelector("button[type='submit']");

const spinner = submitButton?.querySelector(".spinner");

const toast = document.getElementById("toast");

const FORMSPREE_ENDPOINT =
    "https://formspree.io/f/xykqqqyl";

/*==================================================
                TOAST
==================================================*/

function showToast(message, success = true) {

    if (!toast) return;

    toast.textContent = message;

    toast.style.borderColor = success
        ? "#22D3EE"
        : "#EF4444";

    toast.style.color = success
        ? "#22D3EE"
        : "#EF4444";

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}

/*==================================================
            VALIDATION
==================================================*/

function validateForm(formData) {

    const name = formData.get("name").trim();

    const email = formData.get("email").trim();

    const subject = formData.get("subject").trim();

    const message = formData.get("message").trim();

    const emailRegex =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 2) {

        showToast(

            "Please enter your name.",

            false

        );

        return false;

    }

    if (!emailRegex.test(email)) {

        showToast(

            "Please enter a valid email.",

            false

        );

        return false;

    }

    if (subject.length < 3) {

        showToast(

            "Please enter a subject.",

            false

        );

        return false;

    }

    if (message.length < 10) {

        showToast(

            "Message is too short.",

            false

        );

        return false;

    }

    return true;

}

/*==================================================
            FORM SUBMIT
==================================================*/

if (contactForm) {

contactForm.addEventListener(

"submit",

async function(e){

e.preventDefault();

const formData=new FormData(contactForm);

if(!validateForm(formData)) return;

submitButton.disabled=true;

if(spinner){

spinner.style.display="inline-block";

}

try{

const response=await fetch(

FORMSPREE_ENDPOINT,

{

method:"POST",

body:formData,

headers:{

Accept:"application/json"

}

}

);

if(response.ok){

showToast(

"Message sent successfully!"

);

contactForm.reset();

}else{

throw new Error();

}

}catch(error){

showToast(

"Unable to send message.",

false

);

}

submitButton.disabled=false;

if(spinner){

spinner.style.display="none";

}

}

);

}

/*==================================================
            LAZY IMAGE LOADING
==================================================*/

const lazyImages =

document.querySelectorAll("img[loading='lazy']");

const imageObserver =

new IntersectionObserver(

entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting)return;

const img=entry.target;

img.src=img.dataset.src || img.src;

imageObserver.unobserve(img);

});

},

{

rootMargin:"200px"

}

);

lazyImages.forEach(img=>{

imageObserver.observe(img);

});

/*==================================================
        KEYBOARD ACCESSIBILITY
==================================================*/

document.addEventListener("keydown",e=>{

if(e.key==="Escape"){

navLinks?.classList.remove("active");

menuBtn?.classList.remove("active");

}

});

/*==================================================
            PRELOADER
==================================================*/

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});

/*==================================================
        PAGE VISIBILITY
==================================================*/

document.addEventListener(

"visibilitychange",

()=>{

if(document.hidden){

document.title="Come back 👋";

}else{

document.title="Ashish Bhandari | ML Engineer";

}

});

/*==================================================
        PERFORMANCE
==================================================*/

if("scrollRestoration" in history){

history.scrollRestoration="manual";

}

window.scrollTo({

top:0

});

/*==================================================
            INIT
==================================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

console.log(

"%cPortfolio Loaded",

"color:#4F9DFF;font-size:18px;font-weight:bold;"

);

});