var PhotoPinboard = (function () {

  function PhotoPinboard (name) {
    this.name = name;
  }
  
  PhotoPinboard.prototype = {
    title: function () {
      return 'Mr. ' + this.name;
    }
  }
  
  return PhotoPinboard;
})();