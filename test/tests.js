module('General');

test('it should pass test', function () {
  var obj = new PhotoPinboard('John Doe');
  equal('Mr. John Doe', obj.title())
});