console.log("Script loaded");
console.log("THREE:", window.THREE);
// ===============================
// HERO CTA SCROLL
// ===============================

document.querySelector('.hero-cta')?.addEventListener('click', () => {
    document.querySelector('#web-design')?.scrollIntoView({
        behavior: 'smooth'
    });
});

// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.style.background = 'rgba(0, 16, 7, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';

    } else {

        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';

    }

});

// ===============================
// SCROLL REVEAL
// ===============================

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition =
                "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll('[data-scroll]').forEach((el, i) => {

    el.style.transitionDelay = `${i * 80}ms`;

    revealObserver.observe(el);

});

// ===============================
// STACKING COVER EFFECT
// ===============================

const stackSections = document.querySelectorAll('.stack-section');

function updateStackCards() {

    stackSections.forEach(section => {

        const rect = section.getBoundingClientRect();

        const progress =
            Math.min(
                Math.max(
                    (window.innerHeight - rect.top) /
                    window.innerHeight,
                    0
                ),
                1
            );

        const scale = 1 - (progress * 0.06);

        section.style.transform =
            `scale(${Math.max(scale, 0.94)})`;

    });

}

window.addEventListener('scroll', updateStackCards);

window.addEventListener('load', updateStackCards);

window.addEventListener('resize', updateStackCards);

// ===============================
// OPTIONAL PARALLAX TITLE EFFECT
// ===============================

const sectionTitles =
    document.querySelectorAll('.section-title');

window.addEventListener('scroll', () => {

    sectionTitles.forEach(title => {

        const rect = title.getBoundingClientRect();

        const speed = rect.top * 0.03;

        title.style.transform =
            `translateY(${speed}px)`;

    });

});
// ====================================
// LIQUID INK SHADER HERO
// ====================================

window.addEventListener('load', () => {

    const canvas = document.getElementById('fluid-canvas');

    if (!canvas || typeof THREE === "undefined") {
        console.error("Three.js or canvas missing");
        return;
    }


    const heroRight = document.querySelector('.hero-right');


    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });


    renderer.setPixelRatio(window.devicePixelRatio);


    const scene = new THREE.Scene();


    const camera = new THREE.Camera();


    // ===============================
    // MOUSE
    // ===============================

    const mouse = new THREE.Vector2(0.5,0.5);


    window.addEventListener("mousemove",(event)=>{

        const rect = canvas.getBoundingClientRect();

        mouse.x =
            (event.clientX - rect.left) /
            rect.width;

        mouse.y =
            1 -
            ((event.clientY - rect.top) /
            rect.height);

    });



    // ===============================
    // SHADER
    // ===============================


    const vertexShader = `

    varying vec2 vUv;

    void main(){

        vUv = uv;

        gl_Position =
            vec4(position,1.0);

    }

    `;



    const fragmentShader = `

    uniform float uTime;
    uniform vec2 uMouse;

    varying vec2 vUv;



    float random(vec2 st){

        return fract(
            sin(dot(st.xy,
            vec2(12.9898,78.233)))
            *
            43758.5453123
        );

    }



    float noise(vec2 st){

        vec2 i=floor(st);
        vec2 f=fract(st);


        float a=random(i);
        float b=random(i+vec2(1.,0.));
        float c=random(i+vec2(0.,1.));
        float d=random(i+vec2(1.,1.));


        vec2 u =
        f*f*(3.0-2.0*f);


        return mix(a,b,u.x)
        +(c-a)*u.y*(1.-u.x)
        +(d-b)*u.x*u.y;

    }



    void main(){

        vec2 uv=vUv;


        float t=uTime*0.15;


        float n =
        noise(
            uv*3.0+t
        );


        uv +=
        (n-.5)*0.25;



        // cursor distortion

        float mouseDist =
        distance(
            uv,
            uMouse
        );


        float cursor =
        smoothstep(
            .5,
            0.,
            mouseDist
        );


        uv += cursor*
        sin(mouseDist*25.0-uTime)
        *.05;



        // COLORS


        vec3 white =
        vec3(1.0,.95,.9);


        vec3 blue =
        vec3(.1,.7,1.0);


        vec3 pink =
        vec3(1.0,.15,.6);


        vec3 purple =
        vec3(.45,.1,1.0);


        vec3 orange =
        vec3(1.0,.55,.05);



        float c1 =
        sin(
        uv.x*5.0+n*5.0+t
        )
        *.5+.5;


        float c2 =
        sin(
        uv.y*6.0-n*4.0+t
        )
        *.5+.5;



        vec3 color =
        mix(
            white,
            blue,
            c1
        );


        color =
        mix(
            color,
            pink,
            c2
        );


        color =
        mix(
            color,
            purple,
            n
        );


        color =
        mix(
            color,
            orange,
            cursor
        );



        gl_FragColor =
        vec4(
            color,
            1.0
        );

    }

    `;



    const material =
    new THREE.ShaderMaterial({

        vertexShader,
        fragmentShader,

        uniforms:{

            uTime:{
                value:0
            },

            uMouse:{
                value:mouse
            }

        }

    });



    const geometry =
    new THREE.PlaneGeometry(2,2);



    const plane =
    new THREE.Mesh(
        geometry,
        material
    );


    scene.add(plane);



    // ===============================
    // RESIZE
    // ===============================

    function resize(){

        renderer.setSize(
            heroRight.clientWidth,
            heroRight.clientHeight
        );

    }


    resize();

    window.addEventListener(
        "resize",
        resize
    );



    // ===============================
    // ANIMATION
    // ===============================


    function animate(time){

        material.uniforms.uTime.value =
        time * .001;


        material.uniforms.uMouse.value =
        mouse;


        renderer.render(
            scene,
            camera
        );


        requestAnimationFrame(
            animate
        );

    }


    animate();


});