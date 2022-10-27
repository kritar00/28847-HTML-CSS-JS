const container = document.querySelector(".mgi_projects_container")
const clientsContainer = document.querySelector(".mgi_clients_container")
const projects = document.querySelector(".mgi_projects_wrapper")
const clients = document.querySelector(".mgi_clients_wrapper")
const item = document.querySelectorAll(".mgi_projects_item")
const clientItem = document.querySelectorAll(".mgi_clients_item")
const btnLeft = document.getElementById("btn-left--carousel")
const btnRight = document.getElementById("btn-right--carousel")

let radios = document.forms["form"].elements["screen_size"]
let body = document.getElementsByTagName("BODY")[0]

var media920 = window.matchMedia('(min-width: 920px)')
var media768 = window.matchMedia('(min-width: 768px)')

document.addEventListener('DOMContentLoaded', function () {
    for (radio in radios) {
        radios[radio].onclick = function () {
            body.removeAttribute("class")
            body.classList.add(`${this.value}-view`)
            if (this.value === "mobile") {
                slider(1)
            }
        }
    }
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 920 && body.offsetWidth >= 920) {
            slider(4);
        } else if (window.innerWidth > 768 && body.offsetWidth > 768) {
            slider(2);
            body.style.marginLeft = null
        } else {
            if (document.getElementById("navbar-menu").classList.contains("expand"))
                body.style.marginLeft = "400px"
            slider(1);
        }
    });

    // console.log(bodyWidth);
    if (media920.matches) {
        slider(4);
    } else if (media768.matches) {
        slider(2);
    } else {
        slider(1);
    }
    carousel()
})

let iterate4items = 0;
let iterate3items = 0;
function slider(itemDisplay) {
    let threeItemDisplay
    if (itemDisplay > 1 && itemDisplay <= 4) {
        threeItemDisplay = 3
    } else {
        threeItemDisplay = 1
    }
    const itemWidth = container.offsetWidth / itemDisplay
    const threeItemWidth = container.offsetWidth / threeItemDisplay
    let widthAllBox = itemWidth * item.length
    let widthAllItem = threeItemWidth * clientItem.length

    projects.style.width = `${widthAllBox}px`
    clients.style.width = `${widthAllItem}px`
    item.forEach(element => {
        element.style.marginRight = '20px'
        element.style.width = `${itemWidth - 20}px`
    })
    clientItem.forEach(element => {
        element.style.marginRight = '20px'
        element.style.width = `${threeItemWidth - 20}px`
    })
    let spacing = widthAllBox - itemWidth * itemDisplay
    projects.style.transform = `translateX(0px)`;
    clients.style.transform = `translateX(0px)`;
    btnLeft.addEventListener('click', function () {
        iterate4items -= itemWidth
        if (iterate4items < 0) {
            iterate4items = spacing
        }
        projects.style.transform = `translateX(${-iterate4items}px)`
    })
    btnRight.addEventListener('click', function () {
        iterate4items += itemWidth
        if (iterate4items > spacing) {
            iterate4items = 0
        }
        projects.style.transform = `translateX(${-iterate4items}px)`
    })
}
function carousel() {
    let displayItem;
    let clientDisplayItem;
    if (media920.matches && body.offsetWidth >= 920) {
        displayItem = 4
        clientDisplayItem = 3
    }
    else if (media768.matches && body.offsetWidth > 768) {
        displayItem = 2
        clientDisplayItem = 3
    }
    else {
        displayItem = 1
        clientDisplayItem = 1
    }
    const itemWidth = container.offsetWidth / displayItem
    const threeItemWidth = container.offsetWidth / clientDisplayItem
    iterate4items += itemWidth
    iterate3items += threeItemWidth
    let widthAllBox = itemWidth * item.length
    let widthAllItem = threeItemWidth * clientItem.length
    let spacing = widthAllBox - itemWidth * displayItem
    let clientSpacing = widthAllItem - threeItemWidth * clientDisplayItem
    if (iterate4items > spacing) {
        iterate4items = 0
    }
    if (iterate3items > clientSpacing) {
        iterate3items = 0
    }
    projects.style.transform = `translateX(${-iterate4items}px)`
    clients.style.transform = `translateX(${-iterate3items}px)`
    setTimeout(carousel, 3000)
}

let slideIndex = 1
showSlide(slideIndex);
function change(n) {
    slideIndex += n
    showSlide(slideIndex)
}
function currentDiv(n) {
    showSlide(slideIndex = n)
}
function showSlide(n) {
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
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" white", "");
    }
    x[slideIndex - 1].style.display = "flex"
    dots[slideIndex - 1].className += " white";
}

window.onscroll = function () {
    mouseScroll();
};
function mouseScroll() {
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
document.getElementById("hamburger").addEventListener("click", expand);
function expand() {
    document.getElementById("navbar-menu").classList.toggle("expand");
    body.style.marginLeft = "400px"
    body.style.position = "relative"
}
body.addEventListener('click', hideNavbar)
function hideNavbar(event) {
    event.stopPropagation();
    if (event.clientX > document.getElementById("navbar-menu").offsetWidth) {
        document.getElementById("navbar-menu").classList.remove("expand");
        body.style.marginLeft = null
    }
}

document.getElementById("slider").addEventListener("mouseover", btnAnimation)
document.getElementById("slider").addEventListener("mouseout", btnAnimation)

function btnAnimation(event) {
    let leftBtn = document.getElementById("btn-left")
    let rightBtn = document.getElementById("btn-right")

    leftBtn.classList.remove("btn--left")
    rightBtn.classList.remove("btn--right")
    if (event.type === "mouseover") {
        leftBtn.classList.add("btn--left")
        rightBtn.classList.add("btn--right")
    }
}