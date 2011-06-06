// NOTES
// The File api at http://www.w3.org/TR/FileAPI/ 

window.addEventListener("load", function(evt){
  
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
    var x = evt.clientX;
    var y = evt.clientY;
    
    fileReader.onloadend = function(evt){
      if (!evt.target.error) {
        var image = new Image();
        image.onload = function () {
          var $self = $(this);
          $(this).attr('width', 200).appendTo('#images');          
        }
        image.src = evt.target.result;
      }
    };
    
    fileReader.onerror = function(evt){
      console.log("Error", evt)
    }
    
    fileReader.readAsDataURL(evt.dataTransfer.files[0]);
    
    evt.stopPropagation();
    evt.preventDefault();
  }, false)
  
 
})