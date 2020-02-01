var App = {
  options: {},

  init: function() {
    this.select();
    this.rangeSlider();
    this.navMobile();
  },

  select: function() {
    for (let value of $(".select__list li")) {
      //если заранее выбран год, то подстановка года в titile
      if ($(value).hasClass("active")) {
        $(".select__title")
          .html($(value).html())
          .css("color", "#000")
          .addClass("check");
      }
    }

    $(".select").click(() => {
      // открывать скрывать список
      $(".select__list").toggle();
      $(".select__title").toggleClass("select__title--open");

      $(document).mouseup(e => {
        // скрывать если клик вне элемента
        if (
          !$(".select").is(e.target) &&
          $(".select").has(e.target).length === 0
        ) {
          $(".select__list").hide();
          $(".select__title").removeClass("select__title--open");
        }
      });
    });

    $(".select__list li").click(e => {
      let newTitle = $(e.target); // присвоить titile выбранный год
      $(".select__title")
        .html(newTitle[0].dataset.age)
        .css("color", "#000")
        .addClass("check");

      for (let value of $(".select__list li")) {
        if ($(value).hasClass("active")) {
          if ($(e.target) !== $(value)) {
            $(value).removeClass("active");
          }
        }
      }
      $(e.target).addClass("active");
    });
  },

  rangeSlider: () => {
    $(() => {
      $("#slider").slider(); // инициализация
      $("#slider").slider("option", "value", 79);
      let bandColor = $(".range-slider__band-color");
      let selection = $("#slider").slider("value");
      let position = selection + "%";
      let opt = [0, 26, 51, 77];
      bandColor.css("width", position);

      for (let value of opt) {
        // подсветка текста если заранее задано положение ползунка
        if (selection >= value) {
          let elem = $("[data-value=" + value + "]")[0];

          for (let value1 of $(".range-slider__option p")) {
            if ($(value1).hasClass("active")) {
              if ($(value) !== $(value1)) {
                $(value1).removeClass("active");
              }
            }
          }
          $(elem).addClass("active");
        }
      }

      $(".ui-slider-handle").mousedown(() => {
        // подсветка текста при движении, закрашивание полосы
        this.onmousemove = e => {
          selection = $("#slider").slider("value");
          position = selection + "%";
          bandColor.css("width", position);

          for (let value of opt) {
            if (selection >= value) {
              let elem = $("[data-value=" + value + "]")[0];

              for (let value1 of $(".range-slider__option p")) {
                if ($(value1).hasClass("active")) {
                  if ($(value) !== $(value1)) {
                    $(value1).removeClass("active");
                  }
                }
              }
              $(elem).addClass("active");
            }
          }
        };
      });

      $(".range-slider__option p").click(e => {
        // выставление ползунка при нажатии на текст
        let value = $(e.target)[0].dataset.value;
        if (value == 77) {
          value = 100;
        }
        position = value + "%";
        $("#slider").slider("option", "value", value);
        bandColor.css("width", position);

        for (let value of $(".range-slider__option p")) {
          if ($(value).hasClass("active")) {
            if ($(e.target) !== $(value)) {
              $(value).removeClass("active");
            }
          }
        }
        $(e.target).addClass("active");
      });
    });
  },

  navMobile: () => {
    $(".header__btn").click(() => {
      $(".nav").toggle();
      $(".header__btn").toggleClass("header__btn--open");
      console.log($("document").scrollTop());
    });

    $(".nav a").click(() => {
      $(".nav").hide();
      $(".header__btn").removeClass("header__btn--open");
    });

    if ($(window).width() <= 576) {
      $(document).mouseup(e => {
        if (
          !$(".header").is(e.target) &&
          $(".header").has(e.target).length === 0
        ) {
          $(".nav").hide();
          $(".header__btn").removeClass("select__title--open");
        }
      });
    }
  }
};

$(document).ready(function() {
  App.init();
});
