
var App = {
  options: {},

  init: function() {
    this.select();
    this.rangeSlider();
  },

  select: function() {
    $(".select").click(() => {
      $(".select__list").toggle();
      $(".select__title").toggleClass("select__title--open");

      $(document).mouseup(e => {
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
      for (let value of $(".select__list li")) {
        if ($(value).hasClass("active")) {
          if ($(e.target) !== $(value)) {
            $(value).removeClass("active");
          }
        }
      }
      $(e.target).addClass("active");

      $(document).mouseup(e => {
        if (
          !$(".select").is(e.target) &&
          $(".select").has(e.target).length === 0
        ) {
          $(".select__list").hide();
          $(".select__title").removeClass("select__title--open");
        }
      });
    });
  },

  rangeSlider: () => {
    $(() => {
      $("#slider").slider();
      $("#slider").slider("option", "value", 70);
      let bandColor = $(".range-slider__band-color");
      let selection = $("#slider").slider("value");
      // console.log(selection + 10);
      let position = selection + "%";
      let opt = [0, 26, 51, 77];
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

      $(".ui-slider-handle").mousedown(() => {
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

  link: function() {
    // Cache selectors
    var lastId,
      topMenu = $(".nav"),
      topMenuHeight = topMenu.outerHeight() + 15,
      // All list items
      menuItems = topMenu.find("a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function() {
        var item = $($(this).attr("href"));
        if (item.length) {
          return item;
        }
      });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e) {
      var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: offsetTop
          },
          400
        );
      e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function() {
      // Get container scroll position
      var fromTop = $(this).scrollTop() + topMenuHeight;

      // Get id of current scroll item
      var cur = scrollItems.map(function() {
        if ($(this).offset().top < fromTop) return this;
      });
      // Get the id of the current element
      cur = cur[cur.length - 1];
      var id = cur && cur.length ? cur[0].id : "";

      if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
          //   .parent()
          .removeClass("active")
          .end()
          .filter("[href='#" + id + "']")
          //   .parent()
          .addClass("active");
      }
    });
  }
};

$(document).ready(function() {
  App.init();
});
