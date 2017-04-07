$(function(){

    var $locationItem = $('.location-item')

    var $sectionBody = $('.section')
    var $body = $('body')
    $sectionBody.each(function( index ) {
            var $this = $(this)
            var $height = $(this).find('.section-copy').css('height')
            $this.css('height', $height)
            console.log( $height );
    })



    $locationItem.on('click', function(e){
        e.preventDefault();
        $(this).siblings('.location-item').removeClass('active')
        $(this).addClass('active')
        codeAddress()
        var text = $(this).find('.location-title').text()

        $('#address-location').html(text)
    })
    var text = $('.location-item.active').find('.location-title').text()

    $('#address-location').html(text)

    $body.hide(function(){
        $(this).css('visibility', 'visible')

    }).fadeIn('fast')
})


var geocoder;
var map;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 18,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
    codeAddress()
}

function codeAddress() {
  var address = $(".location-item.active").find('.address').text();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

var $serviceMenu = $('.service')

$serviceMenu.on('click', function(e){
    e.preventDefault()
    var $ele = '#'+$(this).attr('data-id')

    scrollMenu($ele)
})

function scrollMenu (ele) {
    $('html, body').animate({
     scrollTop: $(ele).offset().top - 80
}, 800);

}
