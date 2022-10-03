btn = document.querySelector(".btn-more");
mytest = document.querySelector(".container")
overlay = document.querySelector(".overlay");
closeButton = document.querySelector(".btn-close")

overlay.addEventListener("click", function () {
    mytest.style.visibility = "hidden";
})

closeButton.addEventListener("click", function () {
    mytest.style.visibility = "hidden";
})
btn.addEventListener("click", function () {
    mytest.style.visibility = "visible";
})