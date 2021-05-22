
const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const generateRandomColors = (total) => {
  var r = [];
  for (var x = 0; x < total; x++) {
      r.push(generateRandomColor());
  }
  return r;
};

const getRandomColors = (total) => {
  const TotalNumberOfColors = 12;
  var arr = [];
  while(arr.length < total){
      var r = Math.floor(Math.random() * TotalNumberOfColors);
      if(arr.indexOf(r) === -1) arr.push(r);
  }
  console.log(arr);
  var r = [];
  for (var x = 0; x < total; x++) {
      r.push(randomColors(TotalNumberOfColors)[arr[x]]);
  }
  return r;
};

const randomColors = (total) => {
    var i = 360 / (total - 1); // distribute the colors evenly on the hue range
    var r = []; // hold the generated colors
    for (var x = 0; x < total; x++) {
        r.push(hsvToRgb(i * x, 100, 100)); // you can also alternate the saturation and value for even more contrast between the colors
    }
    return r;
}

export default {
  generateRandomColor,
  generateRandomColors,

  randomColors,
  getRandomColors
};

/**
 * HSV to RGB color conversion
 *
 * H runs from 0 to 360 degrees
 * S and V run from 0 to 100
 *
 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
 * http://www.cs.rit.edu/~ncs/color/t_convert.html
 */
var hsvToRgb = function(h, s, v) {
  var r, g, b;
  var i;
  var f, p, q, t;

  // Make sure our arguments stay in-range
  h = Math.max(0, Math.min(360, h));
  s = Math.max(0, Math.min(100, s));
  v = Math.max(0, Math.min(100, v));

  // We accept saturation and value arguments from 0 to 100 because that's
  // how Photoshop represents those values. Internally, however, the
  // saturation and value are calculated from a range of 0 to 1. We make
  // That conversion here.
  s /= 100;
  v /= 100;

  if (s == 0) {
    // Achromatic (grey)
    r = g = b = v;
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  h /= 60; // sector 0 to 5
  i = Math.floor(h);
  f = h - i; // factorial part of h
  p = v * (1 - s);
  q = v * (1 - s * f);
  t = v * (1 - s * (1 - f));

  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;

    case 1:
      r = q;
      g = v;
      b = p;
      break;

    case 2:
      r = p;
      g = v;
      b = t;
      break;

    case 3:
      r = p;
      g = q;
      b = v;
      break;

    case 4:
      r = t;
      g = p;
      b = v;
      break;

    default: // case 5:
      r = v;
      g = p;
      b = q;
  }

  const darker = 0.3;

  r = r - darker >= 0 ? r-darker : r;
  g = g - darker >= 0 ? g-darker : g;
  b = b - darker >= 0 ? b-darker : b;

  const color = Math.round(r * 255)*16*16*16*16 +  Math.round(g * 255)*16*16 + Math.round(b * 255);

  if (r === 0) {
    if (g === 0) {
      return '#0000' + color.toString(16);
    }
    return '#00' + color.toString(16);
  }
  return '#' + color.toString(16);
};
