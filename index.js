const container = document.querySelector(".mgi_projects_container")
const projects = document.querySelector(".mgi_projects_wrapper")
const item = document.querySelectorAll(".mgi_projects_item")
const btnLeft = document.getElementById("btn-left--carousel")
const btnRight = document.getElementById("btn-right--carousel")

var radios = document.forms["form"].elements["screen_size"]
for (radio in radios) {
    radios[radio].onclick = function () {
        if (this.value === "mobile") {
            document.getElementsByTagName("BODY")[0].style.width = "767px"
        }
    }
}
const media = [
    window.matchMedia('(min-width: 920px)'),
    window.matchMedia('(min-width: 768px)'),
];
document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 920) {
            slider(4);
        } else if (window.innerWidth >= 768) {
            slider(2);
        } else {
            slider(1);
        }
    });

    if (media[0].matches) {
        slider(4);
    } else if (media[1].matches) {
        slider(2);
    } else {
        slider(1);
    }
    carousel()
})

let count = 0;
function slider(n) {
    const itemWidth = container.offsetWidth / n
    let widthAllBox = itemWidth * item.length
    projects.style.width = `${widthAllBox}px`
    item.forEach(element => {
        // element.style.marginLeft = '15px'
        element.style.marginRight = '20px'
        element.style.width = `${itemWidth - 20}px`
    })
    let spacing = widthAllBox - itemWidth * n
    // console.log(spacing);
    projects.style.transform = `translateX(0px)`;
    btnLeft.addEventListener('click', function () {
        count -= itemWidth
        if (count < 0) {
            count = spacing
        }
        // console.log(count);
        projects.style.transform = `translateX(${-count}px)`
    })
    btnRight.addEventListener('click', function () {
        count += itemWidth
        if (count > spacing) {
            count = 0
        }
        projects.style.transform = `translateX(${-count}px)`
    })
}
function carousel() {
    let n = 0;
    if (media[0].matches) {
        n = 4
    }
    else if (media[1].matches) {
        n = 2
    }
    else {
        n = 1
    }
    const itemWidth = container.offsetWidth / n
    count += itemWidth
    let widthAllBox = itemWidth * item.length
    let spacing = widthAllBox - itemWidth * n
    if (count > spacing) {
        count = 0
    }
    projects.style.transform = `translateX(${-count}px)`
    setTimeout(carousel, 3000)
}

let slideIndex = 1
showSlide(slideIndex);
function change(n) {
    slideIndex += n
    // slideOut(slideIndex, n)
    showSlide(slideIndex)
}
function currentDiv(n) {
    slideIndex = n
    // slideOut(slideIndex, n)
    showSlide(slideIndex)
}
// function slideOut(n, m) {
//     let x = document.getElementsByClassName("mgi_slider_wrapper")
//     if (n > x.length) {
//         x[x.length - 1].classList.add('slide-out-left')
//         // slideIndex = 1
//     }
//     else if (n < 1) {
//         x[0].classList.add('slide-out-left')
//         // slideIndex = x.length
//     } else if (m > 0) {
//         x[slideIndex - 2].classList.add('slide-out-left')
//     }
//     else {
//         x[slideIndex].classList.add('slide-out-left')
//     }
// }
function showSlide(n) {
    console.log(n);
    let x = document.getElementsByClassName("mgi_slider_wrapper")
    var dots = document.getElementsByClassName("dot");
    if (n > x.length) {
        slideIndex = 1
    }
    else if (n < 1) {
        slideIndex = x.length
    }
    for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none"
        // x[i].classList.remove('slide-out-left', 'slide-out-right')
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" white", "");
    }
    x[slideIndex - 1].style.display = "flex"
    dots[slideIndex - 1].className += " white";
}

window.onscroll = function () {
    navScroll();
};
function navScroll() {
    if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
    ) {
        document.getElementById("navbar").classList.add("navbar--scrolled");
    } else {
        document
            .getElementById("navbar")
            .classList.remove("navbar--scrolled");
    }
}
document.getElementById("open").addEventListener("click", expand);
function expand() {
    document.getElementById("navbar-menu").classList.toggle("expand");
    document.getElementById("open").classList.toggle("moved");
}

document.getElementById("slider").addEventListener("mouseover", fadeIn)
document.getElementById("slider").addEventListener("mouseout", fadeOut)

function fadeIn() {
    document.getElementById("btn-left").classList.add("btn--left")
    document.getElementById("btn-right").classList.add("btn--right")
    document.getElementById("btn-left").classList.remove("btn--left-hidden")
    document.getElementById("btn-right").classList.remove("btn--right-hidden")
}
function fadeOut() {
    document.getElementById("btn-left").classList.add("btn--left-hidden")
    document.getElementById("btn-right").classList.add("btn--right-hidden")
    document.getElementById("btn-left").classList.remove("btn--left")
    document.getElementById("btn-right").classList.remove("btn--right")
}