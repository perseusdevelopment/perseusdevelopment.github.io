let noiseZ;
let size;
let columns;
let rows;
let w;
let h;
let field;

/*!
    * Start Bootstrap - Freelancer v6.0.4 (https://startbootstrap.com/themes/freelancer)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
    */
(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 71)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Scroll to top button appear
    $(document).scroll(function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 80
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    // Floating label headings for the contact form
    $(function () {
        $("body").on("input propertychange", ".floating-label-form-group", function (e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function () {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function () {
            $(this).removeClass("floating-label-form-group-with-focus");
        });
    });

})(jQuery); // End of use strict


function setup(container) {
    size = 16;
    noiseZ = 0;
    reset(container);
}

function initField() {
    field = new Array(columns);
    for (let x = 0; x < columns; x++) {
        field[x] = new Array(columns);
        for (let y = 0; y < rows; y++) {
            field[x][y] = [0, 0];
        }
    }
}

function calculateField() {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            let angle = noise.perlin3(x / 50, y / 50, noiseZ) * Math.PI * 2;
            let length = noise.perlin3(x / 100 + 40000, y / 100 + 40000, noiseZ);
            field[x][y][0] = angle;
            field[x][y][1] = length;
        }
    }
}

function reset(container) {
    w = container.canvas.size.width;
    h = container.canvas.size.height;
    noise.seed(Math.random());
    columns = Math.floor(w / size) + 1;
    rows = Math.floor(h / size) + 1;
    initField();
}

tsParticles
    .load("tsparticles", {
        background: {
            color: {
                value: "#000"
            }
        },
        fpsLimit: 120,
        particles: {
            number: {
                value: 100,
                density: {
                    enable: false,
                    value_area: 800
                }
            },
            color: {
                value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"]
            },
            shape: {
                image: {
                    height: 128,
                    src: "https://cdn.matteobruni.it/images/particles/plane_alt.png",
                    width: 128
                },
                type: "image"
            },
            opacity: {
                value: 1
            },
            size: {
                value: 32,
                random: {
                    enable: true,
                    minimumValue: 16
                }
            },
            line_linked: {
                enable: false,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            rotate: {
                value: 45,
                path: true
            },
            move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                outMode: "out",
                bounce: false,
                warp: false,
                noise: {
                    enable: true,
                    delay: {
                        value: 0
                    }
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onHover: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            }
        },
        detectRetina: true,
        pauseOnBlur: true
    })
    .then((container) => {
        container.setNoise({
            init: function () {
                setup(container);
            },
            update: function () {
                calculateField();

                noiseZ += 0.004;
            },
            generate: function (p) {
                const pos = p.getPosition();

                const px = Math.max(Math.floor(pos.x / size), 0);
                const py = Math.max(Math.floor(pos.y / size), 0);

                if (!field || !field[px] || !field[px][py]) {
                    return { angle: 0, length: 0 };
                }

                return {
                    angle: field[px][py][0],
                    length: field[px][py][1]
                };
            }
        });

        container.refresh();
    });
