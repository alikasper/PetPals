let noPhotoAvail = "images/no_image.png";
let imageSrc = function (array) {
  if (array.length === 0) {
    return noPhotoAvail;
  } else {
    return array[0].full;
  }
};
