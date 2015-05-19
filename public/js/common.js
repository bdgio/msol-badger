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
})(jQuery);