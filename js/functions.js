$(document).ready(function()
{
  /* global vars */
  let mainSlide = 0;

  /* reading json file */
  $.getJSON( "data/slider.json", function( data ) 
  {
    var oButtons = $(document).find('#slider-buttons');
    for(var i = 0; i < data.dataImages.length; i++)
    {
      var oSlider = $(document).find('#slider-container[name="slide-' + i + '"]');
      $(oSlider).find('#slide-' + i + '-title').text(data.dataImages[i].subtitle);
      $(oSlider).find('#slide-' + i + '-hashtags').text(data.dataImages[i].hash);
      $(oSlider).css('background-image', 'url(' + data.dataImages[i].bgImage + ')')
      $(oSlider).find('#main-' + i).css('background-image', 'url(' + data.dataImages[i].rockImage + ')')
      $(oSlider).find('#main-logo-' + i).prepend($('<img src="' + data.dataImages[i].logo + '" alt="Visa to the Moon"></img>'));
      $(oSlider).find('#rocket-icon-' + i).prepend($('<img src="' + data.dataImages[i].iconTrip + '" alt="Your trip starts here"></img>'));
      $(oSlider).find('#rocket-img-' + i).css('background-image', 'url(' + data.dataImages[i].imageRocket + ')')
    }
    $(oButtons).find('button').eq(0).text(data.dataImages[0].linkprev)
    $(oButtons).find('button').eq(1).text(data.dataImages[0].easeView)
    $(oButtons).find('button').eq(2).text(data.dataImages[0].linknext)
  });

  /* progress bar */
  var data = [];
  for (var i = 0; i < $('body section, body div').length; i++) 
  {
      data[i] = $('body section, body div').eq(i);
  };
  
  $.ajax(
  {
    xhr: function () 
    {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener("progress", function (e) 
      {
        if (e.lengthComputable) 
        {
          var percentComplete = e.loaded / e.total;
          $('.progress-bar').css({ width: percentComplete * 100 + '%' });
          if (percentComplete === 1)
            $('.progress').addClass('hide');
        }
      }, false);
      xhr.addEventListener("progress", function (evt) 
      {
        if (evt.lengthComputable) 
        {
          var percentComplete = evt.loaded / evt.total;
          $('.progress-bar').css({ width: percentComplete * 100 + '%' });
        }
      }, false);
      return xhr;
    },
    type: 'POST',
    url: "index.html",
    data: data,
    success: function (data) { $('.progress-bar').fadeOut('slow'); }
  });

  /* slide event */
  $(document).find('#slider-buttons button').off('click').on('click',function(e)
  {
    var oItem = e.currentTarget;
    var oItemIdx = $(oItem).index();

    if(mainSlide !== oItemIdx && oItemIdx !== 1)
    {
      switch(oItemIdx)
      {
        case 0:
          $(document).find('.sliders-container').animate({left:"70px"},500,'swing',function(){ mainSlide = 0; });
          break;
        case 2:
          $(document).find('.sliders-container').animate({left:"-1140px"},500,'swing',function(){ mainSlide = 1; });
          break;
      }
    }
  })
});