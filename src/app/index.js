import '../style/app.scss';

$(document).ready(function() {
  var menu = $("#nav-bar-filter");
  var parent = $(".filter-wrapper");
  var compileDescMenu = false;

  //кнопка меню на мобиле
  function chooseBtnIcon() {
    if ($("#mobail-menu").hasClass("show")) {
      $("#mobile-menu").attr("class", "icons icons--menu");
      $("#mobile-menu use").attr("xlink:href", "./images/sprite.svg#icon-menu");
      $(".header_monitor").css("backgroundColor", "#FFEDBF");
    } else {
      $("#mobile-menu").attr("class", "icons icons--close");
      $("#mobile-menu use").attr("xlink:href", "./images/sprite.svg#icon-close");
      $(".header_monitor").css("backgroundColor", "#ffffff");
    }
  }

//скрывающиеся элементы меню
function checkWidthMenu(){
    if (parent.height() > 61){
      menu.css('justify-content', 'center');
    } else {
      menu.css('justify-content', 'flex-start');
    }
  }


  function checkWidth() {
    var windowWidth = $('body').innerWidth(),
        btnSocial = $(".btn-footer");


    if(windowWidth >= 768){ // перемещние блока с соц.сетями в навигатор
      if (!compileDescMenu) {
        compileDescMenu = true;
      }

      $('#social-mob>div').appendTo( $('#social-desc') );
      $('#list-monitoring_mob>ul').appendTo( $('#list-monitoring_desc') );
      $('#more-social_drpdwn').css('display','block');
      $('#btn-zen').appendTo($('#btn-zen__item'));
      $('#btn-zen>span').css('display','inline');
      $('#btn-inst').appendTo($('#btn-inst__item'));
      $('#btn-inst>span').css('display','inline');
      $('#btn-youtube').appendTo($('#btn-youtube__item'));
      $('#btn-youtube>span').css('display','inline');
      $('#btn-rss').appendTo($('#btn-rss__item'));
      $('#btn-rss>span').css('display','inline');

    } else {
      $('#social-desc>div').appendTo( $('#social-mob') );
      $('#list-monitoring_desc>ul').appendTo( $('#list-monitoring_mob') );
      $('#more-social_drpdwn').css('display','none');
      $('#btn-zen').appendTo($('#btn-social-group'));
      $('#btn-zen>span').css('display','none');
      $('#btn-inst').appendTo($('#btn-social-group'));
      $('#btn-inst>span').css('display','none');
      $('#btn-youtube').appendTo($('#btn-social-group'));
      $('#btn-youtube>span').css('display','none');
      $('#btn-rss').appendTo($('#btn-social-group'));
      $('#btn-rss>span').css('display','none');
    }


}

  checkWidthMenu() // меню плнашет и десктоп
  checkWidth(); // проверит при загрузке страницы

  $(window).on("resize", function (e) {
    checkWidth(); // проверит при изменении размера окна клиента
    checkWidthMenu() //меню плнашет и десктоп
  });
  $('#mobile-menu').on("click", function () {
    chooseBtnIcon()
  })
  $(".container-fluid").on("click", function () {
    $("#mobile-menu").attr("class", "icons icons--menu");
    $("#mobile-menu use").attr("xlink:href", "./images/sprite.svg#icon-menu");
  });

});
