/* -----------------------------------------------
/* How to use? : Check the GitHub README -- https://github.com/VincentGarreau/particles.js
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */
const config_1 = {
  "particles": {
    "number": {
      "value": 60, // 粒子的数量
      "density": { // 粒子的稀密程度
        "enable": true, // 启用粒子的稀密程度 (true 或 false)
        "value_area": 900 //  每一个粒子占据的空间(启用粒子密度,才可用)
      }
    },
    "color": {
      "value": "#ffffff" //  粒子的颜色 (支持16进制”#b61924”,rgb”{r:182, g:25, b:36}”,hsl,以及random)
    },
    "shape": {
      "type": 'circle', // 粒子的形状 "circle" "edge" "triangle" "polygon" "star" "image" ["circle", "triangle", "image"]
      "stroke": {
        "width": 0, // 边框
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 6
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": { // 粒子的透明度
      "value": 0.3,
      "random": true,
      "anim": { // 开启透明的变动动画
        "enable": false,
        "speed": 2,
        "opacity_min": 0.1,
        "sync": true
      }
    },
    "size": {
      "value": 4,
      "random": true,
      "anim": { // 是否启用粒子宽度动画(true/false)
        "enable": true,
        "speed": 1, // 粒子动画频率
        "size_min": 0.1,
        "sync": true // 粒子运行速度与动画是否同步
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": { // 粒子移动速度
      "enable": true,
      "speed": 3,
      "direction": "none", // "none","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left"
      "random": true, // 随机方向
      "straight": false, // 直接移动 直接锁定就有
      "out_mode": "out",
      "attract": { // 原子之间的吸引
        "enable": true,
        "rotateX": 3000,
        "rotateY": 1500
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab" // "grab"  抓取临近的  "bubble"  泡沫球效果 "repulse"  击退效果 ["grab", "bubble"]
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 200,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true,
  "config_demo": {
    "hide_card": true,
    "background_color": "#b61924",
    "background_image": "",
    "background_position": "50% 50%",
    "background_repeat": "no-repeat",
    "background_size": "cover"
  }
}

const config_2 = {
  "particles": {
    "number":
    {
      "value": 160,
      "density":
        { "enable": true, "value_area": 800 }
    },
    "color": { "value": "#ffffff" },
    "shape": {
      "type": "circle",
      "stroke": { "width": 0, "color": "#000000" },
      "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 }
    },
    "opacity": {
      "value": .6, "random": true,
      "anim": { "enable": true, "speed": 1, "opacity_min": 0, "sync": true }
    },
    "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 4, "size_min": 0.3, "sync": false } }, 
    "line_linked": { "enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, 
    "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 600 } }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "grab" },
      "onclick": { "enable": true, "mode": "repulse" }, "resize": true
    },
    "modes": { 
      "grab": { "distance": 300, "line_linked": { "opacity": .3} }, 
      "bubble": { "distance": 250, "size": 0, "duration": 2, "opacity": 0, "speed": 3 }, "repulse": { "distance": 400, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
  }, "retina_detect": true
}

const config_3 = ''

particlesJS('particles-js', config_1);