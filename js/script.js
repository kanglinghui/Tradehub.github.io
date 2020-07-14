(function($){
  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    mobile=false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } 
    // else {
    //   var html = [
    //     '<div id="' + id + '" class="article-share-box">',
    //       '<input class="article-share-input" value="' + url + '">',
    //       '<div class="article-share-links">',
    //         '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
    //         '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
    //         '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
    //         '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
    //       '</div>',
    //     '</div>'
    //   ].join('');

    //   var box = $(html);

    //   $('body').append(box);
    // }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }
  if(sessionStorage.getItem('idx')){
    $('.main-nav-link').eq(Number(sessionStorage.getItem('idx'))).addClass('active_header').siblings('.active_header').removeClass('active_header');
  }
  $('.main-nav-link').click(function(e){
    var index_header = $('.main-nav-link').index(this)
    sessionStorage.setItem("idx",index_header)
    if(mobile){
      return;
    }
  })
  $(document).click(function(event){
    if(event.target.id != "main-nav-toggle"){
      mobile = false;
      $(".nav_mobile").slideUp(600,function(){
        $('.nav_mobile').removeClass('nav_mobile').addClass('nav_box');
        $('.main-nav-link').css({"display":"none"})
        $('#main-nav-toggle').css({"border-bottom-color":"rgba(0,0,0,0)"});
        $('body').css({
          　　"overflow-x":"auto",
          　　"overflow-y":"auto"
          });
      });
    }
  })
  $('#main-nav-toggle').on('click', function(){
    // if (isMobileNavAnim) return;

    // startMobileNavAnim();
    // $container.toggleClass('mobile-nav-on');
    // stopMobileNavAnim();
    if(!mobile){
      mobile = true;
      $('.nav_box').addClass('nav_mobile').removeClass('nav_box')
      let height =  $('.main-nav-link').length * 51;
      $('.nav_mobile').innerHeight(height + 'px')
      $(".nav_mobile").slideDown(600);
      $('#main-nav-toggle').css({"border-bottom-color":"rgba(255,255,255,1)"});
      $('.main-nav-link').css({"display":"block","color":"#000","margin-top":0})
      $('body').css({
        "overflow-x":"hidden",
        "overflow-y":"hidden"
        });
    }else{
      mobile = false;
      $(".nav_mobile").slideUp(600,function(){
        $('.nav_mobile').removeClass('nav_mobile').addClass('nav_box');
        $('.main-nav-link').css({"display":"none"})
        $('#main-nav-toggle').css({"border-bottom-color":"rgba(0,0,0,0)"});
        $('body').css({
          　　"overflow-x":"auto",
          　　"overflow-y":"auto"
          });
      });
    }
  });
  $('.main-nav-link').on('click', function(){
    $(this).addClass("active_nav_link").siblings('.active_nav_link').removeClass('active_nav_link');
  })
  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });
  // setTimeout(()=>{
  //   $('.-mob-share-list li').css({left:'0px'})
  // },1000)
  $('.-mob-share-ui-button').click(function(){
    var time = setTimeout(()=>{
      $('.-mob-share-list .-mob-share-weibo').css({left:'10px',top:'20px',width:'50px',height:'50px'});
      $('.-mob-share-list .-mob-share-weixin').css({left:'70px',top:'20px',width:'50px',height:'50px'});
      $('.-mob-share-list .-mob-share-qq').css({left:'130px',top:'20px',width:'50px',height:'50px'});
      $('.-mob-share-list .-mob-share-douban').css({left:'190px',top:'20px',width:'50px',height:'50px'});
      $('.-mob-share-list .-mob-share-facebook').css({left:'250px',top:'20px',width:'50px',height:'50px'});
      $('.-mob-share-list .-mob-share-twitter').css({left:'310px',top:'20px',width:'50px',height:'50px'});
      $('.-mob-share-list li').fadeIn();
      clearTimeout(time);
    },500)
  })
  $('.-mob-share-close').click(function(){
    $('.-mob-share-list li').fadeOut();
  })
  var up = $("<div></div>").text("置顶");
  $(up).addClass('up')
  $("body").append(up)
  $(window).scroll(function(){//开始监听滚动条
    var topp = $(document).scrollTop();
    if(topp > 1000){
      $('.up').fadeIn()
    }else{
      $('.up').fadeOut()
    }
  })
  $('.up').click(function(){
    $("html,body").animate({scrollTop:0},500);
  })
  // console.log($('.-mob-share-list li').css)
})(jQuery);