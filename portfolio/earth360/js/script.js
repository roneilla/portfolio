var scene, camera, renderer, dae, arcWater, arcWaves, iceberg, cloud, particleCount, particles, snowGround, smoke1, smoke2, smoke3;

var mouse = new THREE.Vector2(),
    INTERSECTED;

var textureLoader = new THREE.TextureLoader;

// screen with start button
var logo = document.getElementById("logo");
var overlayImg = document.getElementById("overlay");

// scene text
var sceneText = document.getElementById("sceneText");
var sceneTitle = document.getElementById("sceneTitle");
var sceneBody = document.getElementById("sceneBody");
var navText = document.getElementById("navText");

// slider
var slider = document.getElementById("timeline");
var startButton = document.getElementById("startButton");
var left = document.getElementById("arrowLeft");
var right = document.getElementById("arrowRight");
var sliderVal = slider.value;


// scene buttons
var arcticButton = document.getElementById("startArctic");
var snowButton = document.getElementById("startSnowstorm");
var climateButton = document.getElementById("startClimate");
var jetButton = document.getElementById("learnMoreJet");


// function for preloader
preloader();

function init() {

    if (!Detector.webgl) Detector.addGetWebGLMessage();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(renderer.domElement);

    // LIGHT

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(3, 1, 1).normalize();
    scene.add(light);


    // OBJECTS and MODELS

    var loader = new THREE.ColladaLoader();

    loader.options.convertUpAxis = true;
    loader.load('models/model4.dae', function (collada) {

        var dae = collada.scene;

        dae.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        dae.scale.x = dae.scale.y = dae.scale.z = 0.25;

        iceberg = dae.getObjectByName("Iceberg", true);

        arcWater = dae.getObjectByName("Water.2", true);

        arcWaves = dae.getObjectByName("Waves.2", true);

        snowGround = dae.getObjectByName("Snow", true);

        smoke1 = dae.getObjectByName("Smoke.1", true);
        smoke2 = dae.getObjectByName("Smoke.2", true);
        smoke3 = dae.getObjectByName("Smoke.3", true);


        dae.updateMatrix();
        scene.add(dae);


        render();
    });


    // PARTICLES

    particleCount = 1000;
    particles = new THREE.Geometry();

    var pMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 2,
        map: textureLoader.load("images/snowflake.png"),
        alphaTest: 0.3,
        opacity: 0.9,
        transparent: true
    });

    for (var i = 0; i < particleCount; i++) {
        var pX = Math.random() * 300 - 150,
            pY = 200,
            pZ = Math.random() * 300 - 150;
        var particle = new THREE.Vector3(pX, pY, pZ);
        particle.velocity = new THREE.Vector3(0, -(Math.random() * 0.9), 0);

        particles.vertices.push(particle);
    }

    particleSystem = new THREE.Points(particles, pMaterial);
    particleSystem.sortParticles = true;
    scene.add(particleSystem);

    particleSystem.visible = false;


    // ORIGINAL POSITION
    camera.position.set(225, 200, 100);
    camera.rotation.y = 1.185;

}

// PRELOADER LOADING SCREEN WITH TIMEOUT

function preloader() {
    setTimeout(function () {
        document.getElementById("preloader").style.display = "none";

    }, 5000);
}

// SCREEN WITH START BUTTON

function startScene() {

    overlayImg.style.visibility = "hidden";
    slider.style.visibility = "visible";
    startButton.style.display = "none";

    logo.style.height = "10vh";

    navText.style.visibility = "visible";

    var startPos = new TWEEN.Tween(camera.position).to({
        x: 150,
        y: 100,
        z: -175
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);
    var startRot = new TWEEN.Tween(camera.rotation).to({
        x: 0,
        y: 1.27,
        z: 0
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    startPos.start();
    startRot.start();

    arcticButton.style.display = "none";
    snowButton.style.display = "none";
    climateButton.style.display = "none";
    jetButton.style.display = "none";
    particleSystem.visible = false;
}

// SLIDER

function showVal(val) {
    slider.addEventListener("click",
        function () {
            sliderVal = slider.value;

            if (sliderVal == 0) {
                scene1();
            } else if (sliderVal == 1) {
                climateChange();
            } else if (sliderVal == 2) {
                snowStorms();
            } else if (sliderVal == 3) {
                arctic();
            } else if (sliderVal == 4) {
                jetStream();
            } else if (sliderVal == 5) {
                learnMore();
            }
        });

}

// RENDER

function render() {

    requestAnimationFrame(render);

    var timer = Date.now() * 0.0001;

    TWEEN.update();


    for (var i = 0; i < particleCount; i++) {
        var ptcl = particles.vertices[i];
        // check if it's below the ground and reset
        if (ptcl.y < -10) {
            ptcl.y = 200;
            ptcl.velocity.y = -(Math.random() * 0.9);
        }

        ptcl.velocity.y -= Math.random() * 0.001;
        ptcl.add(ptcl.velocity);
    }

    particles.verticesNeedUpdate = true;


    renderer.render(scene, camera);
}

// ANIMATIONS FOR THE SCENES


function scene1() {

    // change camera position
    var pos1 = new TWEEN.Tween(camera.position).to({
        x: 150,
        y: 100,
        z: -175
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);
    var rot1 = new TWEEN.Tween(camera.rotation).to({
        x: 0,
        y: 1.27,
        z: 0
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    pos1.start();
    rot1.start();


    // original position of the arctic model
    new TWEEN.Tween(arcWater.position).to({
        x: 0,
        y: -600,
        z: 0
    }, 1000).easing(TWEEN.Easing.Quadratic.Out).start();

    new TWEEN.Tween(arcWaves.position).to({
        x: 0,
        y: -600,
        z: 0
    }, 1000).easing(TWEEN.Easing.Quadratic.Out).start();

    new TWEEN.Tween(iceberg.position).to({
        x: 0,
        y: -600,
        z: 0
    }, 1000).easing(TWEEN.Easing.Quadratic.Out).start();

    new TWEEN.Tween(snowGround.position).to({
        x: 0,
        y: 0,
        z: 0
    }, 2000).easing(TWEEN.Easing.Quadratic.Out).start();


    // display style for buttons
    sceneText.style.display = "none";
    arcticButton.style.display = "none";
    snowButton.style.display = "none";
    jetButton.style.display = "none";

    // particle system style. not visible. will be visible in the snowstorm scene.
    particleSystem.visible = false;

}

function climateChange() {

    var pos2 = new TWEEN.Tween(camera.position).to({
        x: -80,
        y: 120,
        z: -60
    }, 3000).easing(TWEEN.Easing.Quadratic.InOut);

    var rot2 = new TWEEN.Tween(camera.rotation).to({
        x: 0,
        y: 1.57 + 0.785,
        z: 0
    }, 3000).easing(TWEEN.Easing.Quadratic.InOut);

    pos2.start();
    rot2.start();

    new TWEEN.Tween(arcWater.position).to({
        x: 0,
        y: -600,
        z: 0
    }, 1000).easing(TWEEN.Easing.Quadratic.Out).start();

    new TWEEN.Tween(arcWaves.position).to({
        x: 0,
        y: -600,
        z: 0
    }, 1000).easing(TWEEN.Easing.Quadratic.Out).start();

    new TWEEN.Tween(iceberg.position).to({
        x: 0,
        y: -600,
        z: 0
    }, 1000).easing(TWEEN.Easing.Quadratic.Out).start();
    new TWEEN.Tween(snowGround.position).to({
        x: 0,
        y: 0,
        z: 0
    }, 2000).easing(TWEEN.Easing.Quadratic.Out).start();

    // Text in scene
    sceneText.style.display = "inline-block";
    sceneTitle.innerHTML = "WHAT IS CLIMATE CHANGE?";
    sceneBody.innerHTML = "During the past few decades the Arctic has warmed approximately twice as rapidly as has the entire northern hemisphere, a phenomenon called Arctic Amplification (AA). The widespread warming is due to a combination of increased greenhouse gases and positive feedbacks involving sea ice, snow, water vapor, and clouds.";

    // display style for buttons
    arcticButton.style.display = "none";
    snowButton.style.display = "none";
    climateButton.style.display = "inline-block";
    jetButton.style.display = "none";

    // particle visibility
    particleSystem.visible = false;


}

function climateChan() {

    //function for the climate change button to move smoke

    new TWEEN.Tween(smoke1.position).to({
        y: 5000
    }, 10000).easing(TWEEN.Easing.Quadratic.Out).start();

    new TWEEN.Tween(smoke2.position).to({
        y: 5000
    }, 15000).easing(TWEEN.Easing.Quadratic.Out).start();

    new TWEEN.Tween(smoke3.position).to({
        y: 5000
    }, 20000).easing(TWEEN.Easing.Quadratic.Out).start();
}

function snowStorms() {
    var pos3 = new TWEEN.Tween(camera.position).to({
        x: -30,
        y: 80,
        z: -100
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);
    var rot3 = new TWEEN.Tween(camera.rotation).to({
        x: 0,
        y: 0.785,
        z: 0
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);
    pos3.start();
    rot3.start();

    // object animations
    new TWEEN.Tween(arcWater.position).to({
        x: 0,
        y: -600,
        z: 0
    }, 3000).easing(TWEEN.Easing.Quadratic.Out).start();

    new TWEEN.Tween(arcWaves.position).to({
        x: 0,
        y: -600,
        z: 0
    }, 3000).easing(TWEEN.Easing.Quadratic.Out).start();


    new TWEEN.Tween(iceberg.position).to({
        x: 0,
        y: -600,
        z: 0
    }, 2000).easing(TWEEN.Easing.Quadratic.Out).start();

    // particle system is made visible
    particleSystem.visible = true;


    // Text in scene
    sceneText.style.display = "inline-block";
    sceneTitle.innerHTML = "WARMER ATMOSPHERES CAUSE HEAVIER SNOWSTORMS";
    sceneBody.innerHTML = "Although it seems counter-intuitive, a warmer atmosphere causes heavier snowstorms. This is because hotter air holds more moisture, which is then released in heavier precipitation in the form of more intense rain or snow. As a result, more of a region’s precipitation is likely to fall in heavy storms, and less in light storms.";

    // button display style
    arcticButton.style.display = "none";
    snowButton.style.display = "inline-block";
    climateButton.style.display = "none";
    jetButton.style.display = "none";


}

function snowStormMove() {

    // function for the button in the snowstorm scene. moves the snow plane higher to give the effect of snow piling on the ground.
    new TWEEN.Tween(snowGround.position).to({
        x: 0,
        y: 230,
        z: 0
    }, 3000).easing(TWEEN.Easing.Quadratic.Out).start();

}

function arctic() {

    var pos4 = new TWEEN.Tween(camera.position).to({
        x: 600,
        y: 500,
        z: 0
    }, 3000).easing(TWEEN.Easing.Quadratic.InOut);

    var rot4 = new TWEEN.Tween(camera.rotation).to({
        x: 0,
        y: 1.4,
        z: 0
    }, 3000).easing(TWEEN.Easing.Quadratic.InOut);

    pos4.start();
    rot4.start();

    new TWEEN.Tween(arcWater.position).to({
        x: 0,
        y: 850,
        z: 0
    }, 3000).easing(TWEEN.Easing.Quadratic.Out).start();

    new TWEEN.Tween(arcWaves.position).to({
        x: 0,
        y: 900,
        z: 0
    }, 3000).easing(TWEEN.Easing.Quadratic.Out).start();

    new TWEEN.Tween(iceberg.position).to({
        x: 0,
        y: 850,
        z: 0
    }, 3000).easing(TWEEN.Easing.Quadratic.Out).start();

    // Text in scene
    sceneText.style.display = "inline-block";
    sceneTitle.innerHTML = "THE ARCTIC IS MELTING AT A RAPID RATE";
    sceneBody.innerHTML = "Since satellite records began 37 years ago, the Arctic’s sea ice has been in dramatic decline, losing on average 3.7% of its mass each decade. The entire Arctic region is undergoing drastic changes, threatening vital habitat for countless species (yes, including polar bears) and the livelihoods of many Indigenous communities.";

    // button display style
    arcticButton.style.display = "inline-block";
    snowButton.style.display = "none";
    climateButton.style.display = "none";
    jetButton.style.display = "none";

    // particle visibility
    particleSystem.visible = false;

}


function arcticChange() {

    // function for the button in the Arctic scene

    new TWEEN.Tween(iceberg.scale).to({
        x: 0.5,
        y: 0.5,
        z: 0.5
    }, 3000).easing(TWEEN.Easing.Quadratic.Out).start();

    new TWEEN.Tween(iceberg.position).to({
        x: 0,
        y: 950,
        z: 0
    }, 3000).easing(TWEEN.Easing.Quadratic.Out).start();

}

function jetStream() {
    var pos5 = new TWEEN.Tween(camera.position).to({
        x: 225,
        y: 200,
        z: 100
    }, 4000).easing(TWEEN.Easing.Quadratic.InOut);

    var rot5 = new TWEEN.Tween(camera.rotation).to({
        x: 0,
        y: 1.185,
        z: 0
    }, 3000).easing(TWEEN.Easing.Quadratic.InOut);

    pos5.start();
    rot5.start();

    new TWEEN.Tween(arcWater.position).to({
        x: 0,
        y: -600,
        z: 0
    }, 2000).easing(TWEEN.Easing.Quadratic.Out).start();

    new TWEEN.Tween(arcWaves.position).to({
        x: 0,
        y: -600,
        z: 0
    }, 2000).easing(TWEEN.Easing.Quadratic.Out).start();

    new TWEEN.Tween(iceberg.position).to({
        x: 0,
        y: -600,
        z: 0
    }, 2000).easing(TWEEN.Easing.Quadratic.Out).start();

    new TWEEN.Tween(snowGround.position).to({
        x: 0,
        y: 0,
        z: 0
    }, 2000).easing(TWEEN.Easing.Quadratic.Out).start();


    // Text in scene
    sceneText.style.display = "inline-block";
    sceneTitle.innerHTML = "THE JETSTREAM IS CHANGING";
    sceneBody.innerHTML = "The rapid melting of the Arctic is causing a slowing down and resulting meandering (in a wave-like form) of the jet stream, bringing extreme cold further south as it does so. This will increasingly affect the northern hemisphere countries as the jet stream slows and becomes wavier, bringing more intense cold spells and snow storms. All the meanwhile, the Arctic region is continuing to melt and warm at unprecedented pace.";

    // button display style

    arcticButton.style.display = "none";
    snowButton.style.display = "none";
    climateButton.style.display = "none";
    jetButton.style.display = "inline-block";


    //particle visibility
    particleSystem.visible = false;

}

init();
