
var num = 0;

var s_x=[];
var s_y=[];

var star = 50;

var a = 6378137;
var b = 6356752.314;

function getR(lati) {
  lati = radians(lati);
  var f1 = Math.pow((Math.pow(a, 2) * cos(lati)), 2);
  var f2 = Math.pow((Math.pow(b, 2) * sin(lati)), 2);
  var f3 = Math.pow((a * cos(lati)), 2);
  var f4 = Math.pow((b * sin(lati)), 2);

  var radius =  Math.sqrt((f1 + f2) / (f3 + f4));

  return radius;
}

function setup() {
  createCanvas(960, 570);
  stroke(2);
  textSize(30);
  fill(0);

  for(var i = 0; i < 1000;i ++) {
    s_x[i] = random(width);
    s_y[i] = random(height);
  }
  var UserAgent = navigator.userAgent;
  if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
  {
    num=5;
  }
}

function draw() {
  background(0, 0, 30);


  if(keyIsDown(UP_ARROW)) {
      star += 40;
  }
  if(keyIsDown(DOWN_ARROW)) {
      star -= 40;
  }
  if(star > 1000) {
    star = 999;
  }
  if(star < 0) {
    star = 0;
  }
  for(var i = 0; i < star;i ++) {
    fill(255);
    strokeWeight(1);
    stroke(255, 255, 0);
    ellipse(s_x[i], s_y[i], 1, 1);
    stroke(255, 255, 0, 50);
    strokeWeight(5);
    ellipse(s_x[i], s_y[i], 3, 3);
  }

  //It's Earth
  noStroke();
  fill(146, 183, 254, 50);
  ellipse(0, height, 930, 930);

  strokeWeight(3);
  fill(5, 120, 51);
  ellipse(0, height, 900, 900);

  var m_x = mouseX;
  var m_y = mouseY;

  if(m_y > height) {
    m_y = height;

  }
  //What latitude am I?
  var lat = 90
  if(height-m_y <= 450) {
    lat = degrees( asin( (height-m_y)/ 450 ));
  }
  var x = 450*cos(radians(lat));
  var y = height- 450*sin(radians(lat))

  //Gravity
  if(num > 3) {
    var g = 9.78049 * (1+0.0052884*sin(radians(lat))*sin(radians(lat)) - 0.0000059*sin(2*radians(lat))*sin(2*radians(lat)))
    noStroke();
    fill(255, 50 , 50);
    textSize(50);
    text("G: "+ g.toPrecision(5) +"m/s²", 630, 60);
  }
  if(num > 4) {
    //kilogram
    stroke(255, 255, 0);
    fill(255, 255, 0);
    text("kg: "+ (g/9.7805 * 200).toPrecision(5) +"kg", 605, 120);
  }
  if(num > 1) {
    //Universal Gravity
    strokeWeight(10);
    //Adjoint Line
    stroke(200, 50, 50, 50);
    line(0, height, x, y);
    //Universal Gravity
    stroke(200, 50, 50);
    line(x, y, (Math.pow(6378137,2)*100/2 / Math.pow(getR(lat), 2))* cos(radians(lat)),  height-(Math.pow(6378137,2)*100/2 / Math.pow(getR(lat), 2))* sin(radians(lat)));


    //Centrifugal Force
    //Adjoint Line
    stroke(50, 200, 50, 50);
    line(0, y, x, y);
    //Centrifugal Force
    strokeWeight(10);
    stroke(50, 200, 50);
    line(x, y, x+cos(radians(lat))*100, y);
    //Display Latitude
    fill(255);
    noStroke();
    textSize(35);
    text("Lat: "+ lat.toPrecision(4) +"˚", m_x, m_y-50);
  }
  if(num>0) {
    //Where am I?
    noStroke();
    fill(155, 155, 255, 130);
    ellipse(x, y, 50, 50);

    fill(255);
    textSize(35);
  }
  //It's Pointer. But Moon
  noStroke();
  fill(255, 255, 150, 130);
  ellipse(m_x, m_y, 50, 50);

  //Display Universal
  if(num > 2) {
    stroke(50, 50, 200);
    strokeWeight(10);
    line(x, y, (Math.pow(6378137,2)*100/2 / Math.pow(getR(lat), 2))* cos(radians(lat))+cos(radians(lat))*100,  height-(Math.pow(6378137,2)*100/2 / Math.pow(getR(lat), 2))* sin(radians(lat)));

  }
}

function keyPressed() {
  if(key == '1') {
    num--;
  }
  if(key == '2') {
    num ++;
  }
  if(num < 0) {
    num = 0;
  }
  if(num > 5) {
    num = 5
  }
}
