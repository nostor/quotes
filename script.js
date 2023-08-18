import quotes from "./quotes.json" assert { type: "json" };

const btnGetQuote = document.querySelector(".btnGetQuote");
const btnDeleteCookie = document.querySelector(".btnDeleteCookie");
const modal = document.getElementById("myModal");
const modalCookie = document.getElementById("myModalCookie");
const span = document.getElementsByClassName("close")[0];
const spanCookie = document.getElementsByClassName("close-cookie")[0];

function setupCookie(name, value, path) {
  let expires = "";
  let date = new Date();
  let utcDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 0)
  );
  expires = "; expires=" + utcDate.toUTCString();
  if (!path) {
    path = "/";
  }
  document.cookie = name + "=" + value + expires + "; path=" + path;
}

btnGetQuote.addEventListener("click", function () {
  if (document.cookie.includes("quoteExpire")) {
    modalCookie.style.display = "block";
    btnDeleteCookie.addEventListener("click", function () {
      document.cookie =
        "quoteExpire=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      modalCookie.style.display = "none";
    });
  } else {
    modal.style.display = "block";
    const keys = Object.keys(quotes);
    const randIndex = Math.floor(Math.random() * keys.length);
    const randKey = keys[randIndex];
    const quote = quotes[randKey];
    document.getElementsByClassName("quotePlaceholder")[0].innerHTML = quote;
    setupCookie("quoteExpire", "expires", "/");
  }
});

span.addEventListener("click", function () {
  modal.style.display = "none";
});

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

spanCookie.addEventListener("click", function () {
  modalCookie.style.display = "none";
});

window.onclick = function (event) {
  if (event.target == modalCookie) {
    modalCookie.style.display = "none";
  }
};
