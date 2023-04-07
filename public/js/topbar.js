let topVisible = true;

function renderTooltip(msg) {
    let tooltip = document.querySelector('#tooltip');
    if (msg == "") 
        tooltip.classList.add("hide")
    else {
        tooltip.classList.remove("hide");
        tooltip.querySelector("p").innerHTML = msg;
    }
}

function renderTopBar(t) {
    const topbar = document.getElementById("topbar");
    const close = document.getElementById("close");
    const info = document.getElementById("info"); 
    const background = document.getElementById("information")
    topVisible = t
    if (t == true) {
        topbar.classList.remove("hide");
        close.classList.remove("hide");
        info.classList.add("hide");
        background.style.background = "rgba(255, 117, 108 , 1)";
    } else {
        topbar.classList.add("hide");
        info.classList.remove("hide");
        close.classList.add("hide");
        background.style.background = "rgba(255, 220, 108 , 1)";
    }
}

function toggleTopBar() {
    topVisible = !topVisible
    renderTopBar(topVisible)
}
document.getElementById("information").addEventListener("click", toggleTopBar)

export {renderTooltip, renderTopBar}