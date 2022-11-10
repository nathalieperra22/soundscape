let sound, amplitude, ftt;
var ampHistory = [];
var freqLength = 1024.

function preload() {
  soundFormats('mp3', 'ogg');
  sound = loadSound("Chopin.mp3");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(canvasPressed);
  text('tap here to play', 10, 20);
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
  background(150,150,400); 
}

function canvasPressed() {
  if (sound.isPlaying() ){
    sound.stop();
  } else {
    sound.play();
  }
}

function draw(){
  colorMode(HSB, 360, 100, 100,100);
  let amp = amplitude.getLevel();
  stroke(255);
  fill(255);
  text('tap screen to play', 10, 20);
  
  let frequency = fft.analyze();
  ampHistory.push(amp);

  for (let i = 0; i < frequency.length; i++){
    let x = map(i, 0, frequency.length, 0, width);
    let h1 = -height + map(frequency[i], 0, 255, height, 0);
    var h = map(amp, 0, 0.35, 360, 0);
    var s = map(amp, 0, 0.5, 50, 100);
    var b = map(amp, 0, 0.5, 80, 100);
    var a = map(windowHeight, 0, 0.5, 60, 100);
    
    var radius = map(amp,0,0.5,2,10)
    var height1 = map(frequency[i],0,255,height,0);
    fill(h,s,b,a);
    stroke(h,s,b,a);
    ellipse(x,height1,radius,radius);
    //rect(x, height, width/freqLength, h1);
  }
}
