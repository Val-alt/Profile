var App = {
  options: {},

  init: function() {
    this.select();
    this.rangeSlider();
    this.navMobile();
    this.animateScroll();
  },

  select: function() {
    let check = 0;

    for (let i = 0; i < $(".select__list li").length; i++) {
      //если заранее выбран год, то подстановка года в titile
      let elem = $(".select__list li")[i];
      if ($(elem).hasClass("active")) {
        check = 1;
        $(".input_hidden").val(Number($(elem).html()));
        console.log($(".input_hidden").val());
        $(".select__title")
          .html($(elem).html())
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
      $(".input_hidden").val(Number($(e.target).html()));
      $(".select__title")
        .html(newTitle[0].dataset.age)
        .css("color", "#000")
        .addClass("check");
      if (check === 0) {
        check = 1;
        $(e.target).addClass("active");
      } else {
        $(".simplebar-content")
          // $(".select__list")
          .children()
          .removeClass("active");
        $(e.target).addClass("active");
      }
    });
  },

  rangeSlider: () => {
    let MyRangeSlider = new RangeSlider({
      tiks: 4,
      tiksName: [
        "Не владею",
        "Использую готовые решения",
        "Использую готовые решения и умею их переделывать",
        "Пишу сложный JS с нуля"
      ],
      element: document.getElementById("range-slider")
    });
  },

  navMobile: () => {
    $(".header__btn").click(() => {
      $(".nav").toggle();
      $(".header__btn").toggleClass("header__btn--open");
      console.log($("document").scrollTop());
    });

    if ($(window).width() <= 768) {
      $(".nav a").click(() => {
        $(".nav").hide();
        $(".header__btn").removeClass("header__btn--open");
      });

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
  },

  animateScroll: () => {
    $(".nav a").on("click", function(event) {
      event.preventDefault();
      let id = $(this).attr("href");
      let position = $(id).offset().top;
      if (window.matchMedia("(max-width: 768px)").matches) {
        position = $(id).offset().top - 51;
      }
      $("body,html").animate({ scrollTop: position }, 1500);
    });
  }
};

$(document).ready(function() {
  App.init();
});
