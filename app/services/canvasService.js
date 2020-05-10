
export const drawGrid = (context, cellSizeFactor) => {
  const imageWidth = context.canvas.width;
  const imageHeight = context.canvas.height;
  //cell windth and height
  const cellWidth = 4 * cellSizeFactor;
  const cellHeight = 4 * cellSizeFactor;
  //padding around grid
  var p = 0;
  //size of canvas
  var cw = imageWidth + (p*2) + 1;
  var ch = imageHeight + (p*2) + 1;

  for(var row = 0; row < imageHeight / cellHeight; row++){
    for(var column = 0; column < imageWidth / cellWidth; column++){
      var topLeftX = column * cellWidth;
      var topLeftY = row * cellHeight;
      var bottomRightX = topLeftX + cellWidth;
      var bottonRightY = topLeftY + cellHeight;
      var rgb = averageColorInRegion(context.getImageData(topLeftX, topLeftY, cellWidth, cellHeight));
      context.rect(topLeftX, topLeftY, bottomRightX, bottonRightY);
      context.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
      context.fillRect(topLeftX, topLeftY, cellWidth, cellHeight);
    }
  }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

export const averageColorInRegion = (imageData) => {
    var rgb = {r:0,g:0,b:0,a:0};
    var length = imageData.data.length;
    var i = 0;
    var blockSize = 5;
    var count = 0;
    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += imageData.data[i];
        rgb.g += imageData.data[i+1];
        rgb.b += imageData.data[i+2];
        rgb.a += imageData.data[i+3];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    rgb.a = ~~(rgb.a/count);
    return rgb;
  }
