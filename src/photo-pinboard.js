// NOTES
// The File api at http://www.w3.org/TR/FileAPI/ 

var LocalReader = (function () {
  
  function LocalReader () {
    this.keys = [];
  }
  
  LocalReader.prototype = {
    forEach: function (iterator) {
      console.log("reading local storage")
      for(i=0; i < localStorage.length; i++){
        var key = localStorage.key(i);
        var item = localStorage.getItem(key);
        iterator(key, item)
      }
    }
  }
  
  return LocalReader;
})();

function addImage($container, image_data) {
  var image = new Image();
  image.onload = function () {
    var $self = $(this);
    $(this).attr('width', 200).appendTo($container);          
  }
  image.src = image_data;
}

window.addEventListener("load", function(evt){
  
  var storageReader = new LocalReader();
  socket = new WebSocket("ws://eyas.local:8080");
  
  storageReader.forEach(function (key, image_data) {
    console.log(key)
    addImage($('#images'), image_data)
  })
  
  socket.onmessage = function(evt){
    var image = JSON.parse(evt.data)
    addImage($('#images'), image.data)
    localStorage.setItem(image.name, image.data)
  };
  
  
  //
  // Need to turn off default dragover behaviour to get
  // filedropping to work
  //
  document.addEventListener('dragover', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }, false);

  document.addEventListener('drop', function (evt) {
    var fileReader = new FileReader();
    
    fileReader.onloadend = function(evt){
      if (!evt.target.error) {
        // addImage($('#images'), evt.target.result)
        image = {
          name: file.fileName,
          data: evt.target.result
        }
        socket.send(JSON.stringify(image))
        // localStorage.setItem(file.fileName, evt.target.result)
      }
    };
    
    fileReader.onerror = function(evt){
      console.log("Error", evt)
    }
    
    var file = evt.dataTransfer.files[0];
    fileReader.readAsDataURL(file);
    
    evt.stopPropagation();
    evt.preventDefault();
  }, false)
  
 
})