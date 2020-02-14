"use strict";

var App = {
  options: {},
  init: function init() {
    this.select(), this.rangeSlider(), this.navMobile(), this.animateScroll();
  },
  select: function select() {
    var e = 0;

    for (var t = 0; t < $(".select__list li").length; t++) {
      var l = $(".select__list li")[t];
      $(l).hasClass("active") && (e = 1, $(".input_hidden").val(Number($(l).html())), console.log($(".input_hidden").val()), $(".select__title").html($(l).html()).css("color", "#000").addClass("check"));
    }

    $(".select").click(function () {
      $(".select__list").toggle(), $(".select__title").toggleClass("select__title--open"), $(document).mouseup(function (e) {
        $(".select").is(e.target) || 0 !== $(".select").has(e.target).length || ($(".select__list").hide(), $(".select__title").removeClass("select__title--open"));
      });
    }), $(".select__list li").click(function (t) {
      var l = $(t.target);
      $(".input_hidden").val(Number($(t.target).html())), $(".select__title").html(l[0].dataset.age).css("color", "#000").addClass("check"), 0 === e ? (e = 1, $(t.target).addClass("active")) : ($(".simplebar-content").children().removeClass("active"), $(t.target).addClass("active"));
    });
  },
  rangeSlider: function rangeSlider() {
    new RangeSlider({
      tiks: 4,
      tiksName: ["Не владею", "Использую готовые решения", "Использую готовые решения и умею их переделывать", "Пишу сложный JS с нуля"],
      element: document.getElementById("range-slider")
    });
  },
  navMobile: function navMobile() {
    $(".header__btn").click(function () {
      $(".nav").toggle(), $(".header__btn").toggleClass("header__btn--open"), console.log($("document").scrollTop());
    }), $(window).width() <= 768 && ($(".nav a").click(function () {
      $(".nav").hide(), $(".header__btn").removeClass("header__btn--open");
    }), $(document).mouseup(function (e) {
      $(".header").is(e.target) || 0 !== $(".header").has(e.target).length || ($(".nav").hide(), $(".header__btn").removeClass("select__title--open"));
    }));
  },
  animateScroll: function animateScroll() {
    $(".nav a").on("click", function (e) {
      e.preventDefault();
      var t = $(this).attr("href"),
          l = $(t).offset().top;
      window.matchMedia("(max-width: 768px)").matches && (l = $(t).offset().top - 51), $("body,html").animate({
        scrollTop: l
      }, 1500);
    });
  }
};
$(document).ready(function () {
  App.init();
});