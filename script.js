let image = null;
let grayimage = null;
let redimage = null;
let rainbowimage = null;
let sepiaimage = null;
let negativeimage = null;
let blurimage = null;

let imgfile = document.getElementById("imgfile");
let imgcanvas = document.getElementById("can1");

function imageIsLoaded(img) {
  if (img != null || img.complete()) {
    return true;
  } else {
    return false;
  }
}
//Load image onto canvas
function loadImage() {
  image = new SimpleImage(imgfile);
  grayimage = new SimpleImage(imgfile);
  redimage = new SimpleImage(imgfile);
  rainbowimage = new SimpleImage(imgfile);
  sepiaimage = new SimpleImage(imgfile);
  negativeimage = new SimpleImage(imgfile);
  blurimage = new SimpleImage(imgfile);

  image.drawTo(imgcanvas);

  if (imageIsLoaded(image)) {
    alert("SUCCESS: Image Loaded Successfully");
  } else if (!imageIsLoaded(image)) {
    alert("ERROR: Image Load Failure")
  }
}

//gray filter
function makeGray() {
  if (imageIsLoaded(grayimage)) {
    for (let pixel of grayimage.values()) {
      let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
      pixel.setRed(avg);
      pixel.setGreen(avg);
      pixel.setBlue(avg);
    }
    grayimage.drawTo(imgcanvas);
    //alert("Grayscale filter added");
  } else {
    alert("Error:: Failed to load image");
  }
}

//red filter
function makeRed() {
  if (imageIsLoaded(redimage)) {
    for (let pixel_red of redimage.values()) {
      let avg =
        (pixel_red.getRed() + pixel_red.getGreen() + pixel_red.getBlue()) / 3;
      if (avg < 128) {
        pixel_red.setRed(2 * avg);
        pixel_red.setGreen(0);
        pixel_red.setBlue(0);
      } else {
        pixel_red.setRed(255);
        pixel_red.setGreen(2 * avg - 255);
        pixel_red.setBlue(2 * avg - 255);
      }
    }
    redimage.drawTo(imgcanvas);
    //alert("Red filter added");
  }
}

//RAINBOW filter
function makeRainbow() {
  if (imageIsLoaded(rainbowimage)) {
    let height = rainbowimage.getHeight();

    for (let pixel of rainbowimage.values()) {
      let r = pixel.getRed();
      let g = pixel.getGreen();
      let b = pixel.getBlue();
      //let x = pixel.getX();
      let y = pixel.getY();

      let avg = (r + g + b) / 3;

      if (y < height / 7) {
        //first section for RED

        if (avg < 128) {
          pixel.setRed(2 * avg);
          pixel.setGreen(0);
          pixel.setBlue(0);
        } else {
          pixel.setRed(255);
          pixel.setGreen(2 * avg - 255);
          pixel.setBlue(2 * avg - 255);
        }
      }
      if (y >= height / 7 && y < (2 * height) / 7) {
        //2nd section for ORANGE

        if (avg < 128) {
          pixel.setRed(2 * avg);
          pixel.setGreen(0.8 * avg);
          pixel.setBlue(0);
        } else {
          pixel.setRed(255);
          pixel.setGreen(1.2 * avg - 51);
          pixel.setBlue(2 * avg - 255);
        }
      }
      if (y >= (2 * height) / 7 && y < (3 * height) / 7) {
        //3rd section for YELLOW

        if (avg < 128) {
          pixel.setRed(2 * avg);
          pixel.setGreen(2 * avg);
          pixel.setBlue(0);
        } else {
          pixel.setRed(255);
          pixel.setGreen(255);
          pixel.setBlue(2 * avg - 255);
        }
      }
      if (y >= (3 * height) / 7 && y < (4 * height) / 7) {
        //4th section for GREEN

        if (avg < 128) {
          pixel.setRed(0);
          pixel.setGreen(2 * avg);
          pixel.setBlue(0);
        } else {
          pixel.setRed(2 * avg - 255);
          pixel.setGreen(255);
          pixel.setBlue(2 * avg - 255);
        }
      }
      if (y >= (4 * height) / 7 && y < (5 * height) / 7) {
        //5th section for BLUE

        if (avg < 128) {
          pixel.setRed(0);
          pixel.setGreen(0);
          pixel.setBlue(2 * avg);
        } else {
          pixel.setRed(2 * avg - 255);
          pixel.setGreen(2 * avg - 255);
          pixel.setBlue(255);
        }
      }
      if (y >= (5 * height) / 7 && y < (6 * height) / 7) {
        //6th section for INDIGO

        if (avg < 128) {
          pixel.setRed(0.8 * avg);
          pixel.setGreen(0);
          pixel.setBlue(2 * avg);
        } else {
          pixel.setRed(1.2 * avg - 51);
          pixel.setGreen(2 * avg - 255);
          pixel.setBlue(255);
        }
      }
      if (y >= (6 * height) / 7) {
        //last section for VIOLET

        if (avg < 128) {
          pixel.setRed(1.6 * avg);
          pixel.setGreen(0);
          pixel.setBlue(1.6 * avg);
        } else {
          pixel.setRed(0.4 * avg + 153);
          pixel.setGreen(2 * avg - 255);
          pixel.setBlue(0.4 * avg + 153);
        }
      }
    }
    rainbowimage.drawTo(imgcanvas);
  }
}

//sepia filter
function makeSepia() {
  if (imageIsLoaded(sepiaimage)) {
    for (let pixel of sepiaimage.values()) {
      let r = pixel.getRed();
      let g = pixel.getGreen();
      let b = pixel.getBlue();

      let tr = r * 0.393 + g * 0.769 + b * 0.189;

      let tg = r * 0.349 + g * 0.686 + b * 0.168;

      let tb = r * 0.272 + g * 0.534 + b * 0.131;

      pixel.setRed(tr);
      pixel.setGreen(tg);
      pixel.setBlue(tb);
    }

    sepiaimage.drawTo(imgcanvas);
  }
}

//NEGATIVE FILTER
function makeNegative() {
  if (imageIsLoaded(negativeimage)) {
    for (let pixel of negativeimage.values()) {
      let r = pixel.getRed();
      let g = pixel.getGreen();
      let b = pixel.getBlue();

      pixel.setRed(255 - r);
      pixel.setGreen(255 - g);
      pixel.setBlue(255 - b);
    }
    negativeimage.drawTo(imgcanvas);
  }
}

//BLUR FILTER
function makeBlur() {
  if (imageIsLoaded(blurimage)) {
    alert("Filter Not Available");
  }
}

//clear image
function resetImage() {
  image.drawTo(imgcanvas);
  alert("Resetting Image to Original");
}