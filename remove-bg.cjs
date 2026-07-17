const { Jimp } = require('jimp');

Jimp.read('public/venom-accurate.png').then(image => {
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // Threshold for black (very dark colors)
    if (r < 25 && g < 25 && b < 25) {
      this.bitmap.data[idx + 3] = 0; // Alpha channel
    }
  });
  
  image.write('public/venom-accurate-transparent.png');
  console.log('Background removed successfully!');
}).catch(err => {
  console.error(err);
});
