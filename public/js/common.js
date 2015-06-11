(function($) {
  var csrfToken = $('meta[name="csrf"]').attr('content');
  var link = $('.js-logout-link');
  var form = $('.js-logout-form');

  link.on('click', function (e) {
    form.submit();
    e.preventDefault();
    return false;
  });

  $(document.body).on('click', '.js-delete-item', function(e) {
    var $this = $(this);
    $.ajax({
      url: this.href,
      type: 'DELETE',
      data: {csrf: csrfToken},
      success: function() { window.location.reload(); },
      error: function() { alert('Alas, an error occurred.'); }
    });
    return (e.preventDefault(), false);    
  });
  
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
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
  });
  
  $(".dropdown-menu li a").click(function(){

    $(this).parents(".btn-group").find('.selection').text($(this).text());
    $(this).parents(".btn-group").find('.selection').val($(this).text());

  });
  
  $('#pw-edit-success').delay(3000).fadeOut();
  
  $(".faq-ans").hide();
  $(".faq-ques").click(function(evt){
    $(this).addClass("active");
    $(".faq-ans").hide();
    $(this).next(".faq-ans").show();
  });
  
  
})(jQuery);