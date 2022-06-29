if (document.querySelector(".video")) {
  let tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  let player;
  $(".video-button").click(function (e) {
    e.preventDefault();
    let btn = $(this),
      videoID = btn.data("video"),
      playerID = btn.data("id");
    player = new YT.Player(playerID, {
      playerVars: {
        controls: 0,
        showinfo: 0,
        disablekb: 1,
        rel: 0,
        playsinline: 1,
      },
      videoId: videoID,
      events: {
        onReady: onPlayerReady,
      },
    });
  });
  $("#pauseYoutube").click(function () {
    player.stopVideo();
    const iframe = videoID;
    console.log(iframe);
  });
  function onPlayerReady(event) {
    let video = event.target.h;
    $(video).siblings(".video-button").addClass("removed");
    event.target.playVideo();
  }
}
// // Слайдер цены начало
if (document.querySelector(".calculator")) {
  const rangeSlider = document.getElementById("range");
  if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
      start: 1200,
      connect: "lower",
      snap: true,
      step: 1,
      range: {
        min: 700,
        "20%": 1000,
        "40%": 1200,
        "60%": 1500,
        "80%": 1800,
        max: 2000,
      },
      pips: {
        values: [700, 1000, 1200, 1500, 1800, 2000],
        mode: "range",
        stepped: true,
        density: 4,
      },
    });
    var snapValues = [document.querySelector(".cost")];
    var sizeValues = [document.querySelector(".size-range")];
    const normalPrice = (str) => {
      return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    };
    rangeSlider.noUiSlider.on("update", function (values, handle) {
      // Цены для размеров камина
      const price = {
        700: 70000,
        1000: 95000,
        1200: 125000,
        1500: 200000,
        1800: 250000,
        2000: 300000,
      };
      // Цены для размеров камина
      let checkboxesValue = 0;
      $(".product-page__info .add-option .checkbox input").each(
        (index, item) => {
          if (item.checked) {
            checkboxesValue += +item.value;
          }
        }
      );
      snapValues[handle].innerHTML = normalPrice(
        price[+values[0]] + checkboxesValue
      );
      sizeValues[handle].innerHTML = [+values[0]];
    });
    $(".noUi-value").on("click", (e) => {
      rangeSlider.noUiSlider.set(e.target.innerHTML);
    });
    $(".noUi-value").css("cursor", "pointer");
    $(".product-page__info .add-option .checkbox input").on("change", (e) => {
      let value = $(".product-page__cost .cost").html();
      let imgName = $(".product-page__img img")
        .attr("src")
        .split("/")
        .slice(-1)[0];
      if (e.target.checked) {
        value = normalPrice(+value.split(" ").join("") + +e.target.value);
      } else {
        value = normalPrice(+value.split(" ").join("") - +e.target.value);
      }
      $(".product-page__cost .cost").html(value);
      let checkboxesImgPath = "";
      $(".product-page__info .add-option .checkbox input").each(
        (index, item) => {
          if (item.checked) {
            checkboxesImgPath += item.name;
          }
        }
      );
      checkboxesImgPath += checkboxesImgPath.length ? "/" : "";
      $(".product-page__img img").attr(
        "src",
        `img/${checkboxesImgPath}${imgName}`
      );
    });
  }
}
// // Слайдер цены конец
// Слайдер swiper начало
if (document.querySelector(".swiper-wrapper")) {
  const contentSlider = new Swiper(".swiper-1", {
    slidesPerView: 1,
    spaceBetween: 30,
    slidesPerGroup: 3,
    effect: "fade",
    loop: true,
    loopedSlides: 4,
    fadeEffect: {
      crossFade: true,
    },
  });
  const gallereySlider = new Swiper(".swiper-container.gallerey", {
    centeredSlides: false,
    slidesPerView: 1.5,
    spaceBetween: 15,
    loop: true,
    loopedSlides: 4,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      1200: {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      900: {
        slidesPerView: 1,
      },
      612: {
        slidesPerView: 1,
      },
      200: {
        slidesPerView: 1,
      },
    },
  });
  gallereySlider.controller.control = contentSlider;
  contentSlider.controller.control = gallereySlider;
  const swiperInit = new Swiper(".swiper-init", {
    centeredSlides: false,
    slidesPerView: 4,
    spaceBetween: 30,
    loopedSlides: 4,
    loop: true,
    breakpoints: {
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      900: {
        slidesPerView: 3,
      },
      650: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      200: {
        spaceBetween: 10,
        slidesPerView: 1,
      },
    },
  });
  const preview = new Swiper(".swiper-preview", {
    slidesPerView: 1,
    spaceBetween: 30,
    effect: "fade",
    lazy: true,
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
// Swiper slider конец
// Табы начало
if (document.querySelector(".tabs")) {
  const tabsBtn = document.querySelectorAll(".tab-item");
  const tabsItems = document.querySelectorAll(".content");
  tabsBtn.forEach(onTabClick);
  function onTabClick(item) {
    item.addEventListener("click", function () {
      let currentBtn = item;
      let tabId = currentBtn.getAttribute("data-tab");
      let currentTab = document.querySelector(tabId);
      if (!currentBtn.classList.contains("tab-item__active")) {
        tabsBtn.forEach(function (item) {
          item.classList.remove("tab-item__active");
        });
        tabsItems.forEach(function (item) {
          item.classList.remove("show");
        });
        currentBtn.classList.add("tab-item__active");
        currentTab.classList.add("show");
      }
    });
  }
}
// Табы конец
// Videoplay начало
if (document.querySelector(".video")) {
  let tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  let player;
  $(".video-button").click(function (e) {
    e.preventDefault();
    let btn = $(this),
      videoID = btn.data("video"),
      playerID = btn.data("id");
    player = new YT.Player(playerID, {
      playerVars: {
        controls: 0,
        showinfo: 0,
        disablekb: 1,
        rel: 0,
        playsinline: 1,
      },
      videoId: videoID,
      events: {
        onReady: onPlayerReady,
      },
    });
  });
  $("#pauseYoutube").click(function () {
    player.stopVideo();
    const iframe = videoID;
    console.log(iframe);
  });
  function onPlayerReady(event) {
    let video = event.target.h;
    $(video).siblings(".video-button").addClass("removed");
    event.target.playVideo();
  }
}
// Videoplay конец
// Yandex карта начало
if (document.getElementById(".mapOne")) {
  ymaps.ready(function () {
    var myMap = new ymaps.Map(
        "mapOne",
        {
          center: [55.705919, 37.160424],
          zoom: 17,
          controls: [],
        },
        {
          searchControlProvider: "yandex#search",
        }
      ),
      myPlacemark = new ymaps.Placemark(
        myMap.getCenter(),
        {
          hintContent: "Наша метка",
          balloonContent: "Мы здесь",
        },
        {
          iconLayout: "default#image",
          iconImageHref:
            "https://abc-fireplace.com/wp-content/themes/THEME/img/icon/points.svg",
          iconImageSize: [30, 42],
          iconImageOffset: [-5, -38],
        }
      );
    myMap.geoObjects.add(myPlacemark);
  });
}
if (document.getElementById("maptwo")) {
  ymaps.ready(function () {
    var myMap = new ymaps.Map(
        "maptwo",
        {
          center: [55.705919, 37.160424],
          zoom: 17,
          controls: ["zoomControl"],
        },
        {
          searchControlProvider: "yandex#search",
        }
      ),
      myPlacemark = new ymaps.Placemark(
        myMap.getCenter(),
        {
          hintContent: "Наша метка",
          balloonContent: "Мы здесь",
        },
        {
          iconLayout: "default#image",
          iconImageHref:
            "https://abc-fireplace.com/wp-content/themes/THEME/img/icon/points.svg",
          iconImageSize: [30, 42],
          iconImageOffset: [-5, -38],
        }
      );
    myMap.geoObjects.add(myPlacemark);
  });
}
// // Yandex карта конец
// Загрузка файлов с форм начало
let dropArea;
let file;
let dragText;
let button;
let input;

if (document.querySelector(".upload-area")) {
  dropArea = document.querySelectorAll(".upload-area");
  dropArea.forEach((area) => {
    dragText = area.querySelector(".upload-text");
    button = area.querySelector(".button");
    input = area.querySelector("input");
    button.onclick = () => {
      input.click();
    };
    input.addEventListener("change", function () {
      file = this.files[0];
      area.classList.add("active");
      showFile();
    });
    area.addEventListener("dragover", (event) => {
      event.preventDefault();
      area.classList.add("active");
      dragText.textContent = "отпустите чтобы загрузить";
    });
    area.addEventListener("dragleave", () => {
      area.classList.remove("active");
      dragText.textContent = "Перетащите чтобы загрузить";
    });
    area.addEventListener("drop", (event) => {
      event.preventDefault();
      file = event.dataTransfer.files[0];
      showFile();
    });
    function showFile() {
      let fileType = file.type;
      let fileReader = new FileReader();
      let fileName = (fileReader.fileName = file.name);
      let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
      if (validExtensions.includes(fileType)) {
        fileReader.onload = () => {
          let fileURL = fileReader.result;
		  let = tag_node = document.createElement('div');		  
		  
          let Tag = `
			<div class="upload-area m-auto d-flex fl-direction a-center j-center active">
                <div class="uploda-content">
                    <div class="upload-img upload">
                      <img src="${fileURL}" alt="image">
                    </div>
                    <div class="file-name upload">
                      
                    </div>
                </div>
			</div>
              `;
		tag_node.innerHTML = Tag;
		area.style.display = 'none';
		area.parentElement.appendChild(tag_node);
          //area.innerHTML = Tag;
		  
        };
        fileReader.readAsDataURL(file);
      } else {
        dragText.textContent = "Загрузите или выберите файл";
		let = tag_node = document.createElement('div');	
        let Tag = `
			<div class="upload-area m-auto d-flex fl-direction a-center j-center active">
            ${fileName}
			</div>
          `;
		tag_node.innerHTML = Tag;
		area.style.display = 'none';
		area.parentElement.appendChild(tag_node);
          //area.innerHTML = Tag;

      }
    }
  });
}
// Загрузка файлов с форм конец
// Отправка формы на почту начало
const form = document.querySelectorAll("form"),
  inputs = document.querySelectorAll("input"),
  phoneInputs = document.querySelectorAll('input[name="user_phone"]');

const message = {
  loading: "Загрузка...",
  success: "Спасибо! Скоро мы с вами свяжемся",
  failure: "Что-то пошло не так...",
};

const postData = async (url, data) => {
  document.querySelector(".status").textContent = message.loading;
  let res = await fetch(url, {
    method: "POST",
    body: data,
  });

  return await res.text();
};

const clearInputs = () => {
  inputs.forEach((item) => {
    item.value = "";
  });
};

form.forEach((item) => {
  item.addEventListener("submit", (e) => {
    e.preventDefault();
    let statusMessage = document.createElement("div");
    statusMessage.classList.add("status");
    item.appendChild(statusMessage);

    const formData = new FormData(e.target);
    formData.append("file", file);

    postData(
      "https://abc-fireplace.com/wp-content/themes/THEME/php/send.php",
      formData
    )
      .then((res) => {
        console.log(res);
        statusMessage.textContent = message.success;
      })
      .catch(() => (statusMessage.textContent = message.failure))
      .finally(() => {
        clearInputs();
        setTimeout(() => {
          statusMessage.remove();
        }, 5000);
      });
  });
});
// const form = document.getElementById("sendform3");
// form.addEventListener("submit", formSend);
// async function formSend(e) {
//   const input = area.querySelector("input");
//   e.preventDefault();
//   let formData = new FormData();
//   formData.append("image", input.files[0]);
//   let response = await fetch(
//     "https://abc-fireplace.com/wp-content/themes/THEME/php/send.php",
//     {
//       method: "POST",
//       body: formData,
//     }
//   );
//   if (response.ok) {
//     let result = await response.json();
//     alert(result.message);
//     form.innerHTML = "Данные отправлены";
//   } else {
//     form.innerHTML = "ошибка отправки fetch";
//   }
// }
// $(document).ready(function () {
//   // Как только страничка загрузилась
//   window.onload = function () {
//     // проверяем поддерживает ли браузер FormData
//     if (!window.FormData) {
//       alert("Браузер не поддерживает загрузку файлов на этом сайте");
//     }
//   };
//   function sendForm(name) {
//     let form = document.forms[name],
//       formData = new FormData(form),
//       xhr = new XMLHttpRequest();
//     xhr.open(
//       "POST",
//       "https://abc-fireplace.com/wp-content/themes/THEME/php/send.php"
//     );
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState == 4) {
//         if (xhr.status == 200) {
//           $(`#${name}`).html('<p class="thank">Данные отправлены!<p>');
//         }
//       }
//     };
//     console.log(form);
//     xhr.send(formData);
//   }

//   $("#sendform").validate({
//     submitHandler: sendForm("sendform"),
//   });

//   $("#sendform2").validate({
//     submitHandler: sendForm("sendform2"),
//   });

//   $("#sendform3").validate({
//     submitHandler: sendForm("sendform3"),
//   });

//   $("#sendform4").validate({
//     submitHandler: sendForm("sendform4"),
//   });

//   $("#sendform5").validate({
//     submitHandler: sendForm("sendform5"),
//   });

//   $("#sendform6").validate({
//     submitHandler: sendForm("sendform6"),
//   });

//   $("#sendform7").validate({
//     submitHandler: sendForm("sendform7"),
//   });
// });

window.onload = function () {
  if (!window.FormData) {
    alert("Браузер не поддерживает загрузку файлов на этом сайте");
  }
};
$(document).ready(function () {
  $("#sendform").validate({
    submitHandler: function (form) {
      var form = document.forms.sendform,
        formData = new FormData(form),
        xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://abc-fireplace.com/wp-content/themes/THEME/php/send.php"
      );
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            $("#sendform").html('<p class="thank">Данные отправлены!<p>');
          }
        }
      };
      xhr.send(formData);
    },
  });
  $("#sendform2").validate({
    submitHandler: function (form2) {
      var form2 = document.forms.sendform2,
        formData = new FormData(form2),
        xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://abc-fireplace.com/wp-content/themes/THEME/php/send.php"
      );
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            $("#sendform2").html('<p class="thank">Данные отправлены!<p>');
          }
        }
      };
      xhr.send(formData);
    },
  });
  $("#sendform3").validate({
    submitHandler: function (form3) {
      var form3 = document.forms.sendform3,
        formData = new FormData(form3),
        xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://abc-fireplace.com/wp-content/themes/THEME/php/send.php"
      );
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            $("#sendform3").html('<p class="thank">Данные отправлены!<p>');
          }
        }
      };
      xhr.send(formData);
    },
  });
  $("#sendform4").validate({
    submitHandler: function (form4) {
      var form4 = document.forms.sendform4,
        formData = new FormData(form4),
        xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://abc-fireplace.com/wp-content/themes/THEME/php/send.php"
      );
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            $("#sendform4").html('<p class="thank">Данные отправлены!<p>');
          }
        }
      };
      xhr.send(formData);
    },
  });
  $("#sendform5").validate({
    submitHandler: function (form5) {
      var form5 = document.forms.sendform,
        formData = new FormData(form5),
        xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://abc-fireplace.com/wp-content/themes/THEME/php/send.php"
      );
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            $("#sendform5").html('<p class="thank">Данные отправлены!<p>');
          }
        }
      };
      xhr.send(formData);
    },
  });
  $("#sendform6").validate({
    submitHandler: function (form6) {
      var form6 = document.forms.sendform,
        formData = new FormData(form6),
        xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://abc-fireplace.com/wp-content/themes/THEME/php/send.php"
      );
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            $("#sendform6").html('<p class="thank">Данные отправлены!<p>');
          }
        }
      };
      xhr.send(formData);
    },
  });
  $("#sendform7").validate({
    submitHandler: function (form7) {
      var form7 = document.forms.sendform,
        formData = new FormData(form7),
        xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://abc-fireplace.com/wp-content/themes/THEME/php/send.php"
      );
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            $("#sendform7").html('<p class="thank">Данные отправлены!<p>');
          }
        }
      };
      xhr.send(formData);
    },
  });
});
// Отправка формы на почту конец
// Превью изображений начало
if (document.querySelector(".portfolio")) {
  const portfolioItem = document.querySelectorAll(".list-item__content");
  const modalSlier = document.querySelector(".image-preview");
  const swiperSlide = document.querySelector(".swiper-slide");
  const randomId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };
  const deleteSlide = (productParent) => {
    productParent.forEach((elem) => {
      elem.remove();
    });
  };
  portfolioItem.forEach((el) => {
    el.setAttribute("data-id", randomId());
    el.addEventListener("click", (e) => {
      let img = el.querySelector(".img-item").getAttribute("src");
      swiperSlide.innerHTML = `<img src="${img}" alt="img">`;
      modalSlier.classList.add("popup-active");
    });
  });
  modalSlier.addEventListener("click", (e) => {
    if (e.target.contains(modalSlier)) {
      modalSlier.classList.remove("popup-active");
      deleteSlide(modalSlier.querySelectorAll(".item-view"));
    }
  });
}
// // Превью изображений конец
if (document.querySelector(".overlay")) {
  function bindModal(triggerSelector, modalSelector) {
    const triger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector);
    triger.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }
        modal.classList.add("popup-active"),
          (document.body.style.overflow = "hidden");
      });
    });
    modal.addEventListener("click", (e) => {
      if (e.target.contains(modal)) {
        modal.classList.remove("popup-active"),
          (document.body.style.overflow = "visible");
        if (document.querySelector(".print-info")) {
          deleteProcucts(modal.querySelectorAll(".print-info"));
        }
      }
    });
  }
  const cartContent = document.querySelector(".cart-content");
  const sizeContent = document.querySelector(".size-content");
  const title = document.querySelector(".t-p").textContent;
  const generateCart = (title, price, size) => {
    return `
        <li class="print-info contact-input d-flex a-center j-between">
            Название <span>${title}</span>
            <input name="title" value="${title}" hidden />
        </li>
        <li class="print-info contact-input d-flex a-center j-between">
          Цена <span>${normalPrice(price)} руб.</span>
          <input name="price" value="${normalPrice(price)}" hidden />
        </li>
        <li class="print-info contact-input d-flex a-center j-between">
          Размер <span>${size}</span>
          <input name="size" value="${size}" hidden />
        </li>  
    `;
  };
  const generateSize = (title) => {
    return `
        <li class="print-info contact-input d-flex a-center j-between">
          Название <span>${title}</span>
          <input name="title" value="${title}" hidden />
        </li> 
    `;
  };
  const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  };
  const deleteProcucts = (productParent) => {
    productParent.forEach((elem) => {
      elem.remove();
    });
  };
  function printCart() {
    const price = document.querySelector(".cost").textContent;
    const size = document.querySelector(".size-range").textContent;
    cartContent
      .querySelector(".cart-list")
      .insertAdjacentHTML("afterbegin", generateCart(title, price, size));
  }
  function printSize() {
    sizeContent
      .querySelector(".size-list")
      .insertAdjacentHTML("afterbegin", generateSize(title));
  }
  bindModal(".button-order", ".orders");
  bindModal(".button-order__two", ".orders__two");
  bindModal(".button-size", ".size-order");
  bindModal(".button-cart", ".cart");
  bindModal(".button-consultation", ".consultation");
  bindModal(".video-button", ".video-overlay");
}
