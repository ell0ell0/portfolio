$( document ).ready(function() {     

  //Random background pick
  var rand = Math.floor((Math.random()*$(".menu-setting-container .menu-button-wrapper").length));
  var currentThemeTxt = "theme-txt-orange";
  var currentThemeBg = "theme-bg-orange";
  var newThemeTxt;
  var newThemeBg;
  var count = 0;

  $(".menu-setting-container .menu-button-wrapper").each(function() {
    if(count == rand && count > 0 && count < $(".menu-setting-container .menu-button-wrapper").length) {
      newThemeTxt = "theme-txt-" + $(this).attr("data-color");
      newThemeBg = "theme-bg-" + $(this).attr("data-color"); 
      setTheme();
    }
    count++;
  });


  /*--------------------------------
  Evenets
  --------------------------------*/

  $("#settings").click(function(){
    $("#settings").toggleClass("menu-setting-active");
    $(".menu-setting-container").toggleClass("menu-setting-open");
  });

    
  $(".menu-setting-container .menu-button-wrapper").click(function(){
    newThemeTxt = "theme-txt-" + $(this).attr("data-color");
    newThemeBg = "theme-bg-" + $(this).attr("data-color");

    setTheme();
  });

  $(".filter-button-container").click(function() {
      var selected_id = $(this).attr('id');
      var tag = $(this).data("tag");

      if( !$("#" + selected_id).hasClass("filter-text-wrapper-active")) {
        $("#" + selected_id + " .filter-text-wrapper").addClass("filter-text-wrapper-active");
        $("#" + selected_id + " .filter-hightlight").addClass("filter-hightlight-active");
        $("#" + selected_id + " .filter-bg").addClass("filter-bg-active");
      }

      if(tag == "all") {
        $(".sample-wrapper").each(function() {          
          $(this).css("display",  "auto");    
        });
      } else {

        $(".sample-wrapper").each(function() {          
          if($(this).data("tag") != tag) {
            $(this).css("display",  "none");
          } else {
            $(this).css("display",  "auto");
          }
        });
      }

      $(".filter-button-container").each(function() {
        var id = $(this).attr('id');

        if(id != selected_id) {
          $("#" + id + " .filter-text-wrapper").removeClass("filter-text-wrapper-active");
          $("#" + id + " .filter-hightlight").removeClass("filter-hightlight-active");
          $("#" + id + " .filter-bg").removeClass("filter-bg-active");
        }
      });

  });


  function setTheme() {
    $( "." +  currentThemeTxt ).each(function() {
      $(this).removeClass(currentThemeTxt);
      $(this).addClass(newThemeTxt);
    });
    $( "." + currentThemeBg ).each(function() {
      $(this).removeClass(currentThemeBg);
      $(this).addClass(newThemeBg);
    });

    currentThemeTxt = newThemeTxt;
    currentThemeBg = newThemeBg;
  }


  function listeningTo() {
   
    var request = $.ajax({
      type: 'GET',
      url: 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=2&user=LeeW3&api_key=649a83146bdf9ebb77c778ced8d75d53&format=json',
      dataType: 'json'
    })
   
    request.done(function(msg){
      var artist = msg.recenttracks.track[0].artist['#text'];
      var track = msg.recenttracks.track[0]['name'];
      var url = msg.recenttracks.track[0]['url'];
      $(".listening-wrapper a").remove();
      $(".listening-wrapper").append("<a class='" + currentThemeTxt + "' href='" + url + "'>" + artist + " - " + track + "</a>");
    });
   
    request.fail(function(err){
      console.log('The request failed!');
    });
   
  }
   
  listeningTo();
   
  setInterval(listeningTo, 60000);


  //smooth scroll
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
    || location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
       $('html,body').animate({
        scrollTop: target.offset().top
        }, 1000);
        return false;
        }
      }
    });

    // ------------------------------------------------
    // utilitits
    // ------------------------------------------------
    function map(value, inputMin, inputMax, outputMin, outputMax, clamp){
      var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
      if( clamp ){
        if(outputMax < outputMin){
          if( outVal < outputMax )outVal = outputMax;
          else if( outVal > outputMin )outVal = outputMin;
        }else{
          if( outVal > outputMax )outVal = outputMax;
          else if( outVal < outputMin )outVal = outputMin;
        }
      }
      return outVal;
    }

    function getDist(x1, y1, x2, y2) {
      return Math.round( Math.sqrt((x1-x2) * (x1-x2) + (y1-y2) * (y1-y2)) );
    }

    function clamp(value, min, max) {
      return value < min ? min : value > max ? max : value;
    }

    //wait for timer
    var waitForFinalEvent = (function () {
      var timers = {};
      return function (callback, ms, uniqueId) {
        if (!uniqueId) {
          uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
          clearTimeout (timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
      };
    })();

});