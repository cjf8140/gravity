
var kgon = 0;

var s_x=[];
var s_y=[];

var star = 50;

function setup() {
  createCanvas(960, 570);
  stroke(2);
  textSize(30);
  fill(0);

  for(var i = 0; i < 1000;i ++) {
    s_x[i] = random(width);
    s_y[i] = random(height);

  }
}

function draw() {
  background(0, 0, 30);


  if(keyIsDown(UP_ARROW)) {
      star += 10;
  }
  if(keyIsDown(DOWN_ARROW)) {
      star -= 10;
  }
  if(star > 1000) {
    star = 999;
  }
  if(star < 0) {
    star = 0;
  }
  strokeWeight(1);
  stroke(255, 255, 0);
  for(var i = 0; i < star;i ++) {
    ellipse(s_x[i], s_y[i], 1, 1);
  }

  //It's Eartj
  stroke(146, 183, 254);
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
  var g = 9.78049 * (1+0.0052884*sin(radians(lat))*sin(radians(lat)) - 0.0000059*sin(2*radians(lat))*sin(2*radians(lat)))
  noStroke();
  fill(255, 50 , 50);
  textSize(50);
  text("g: "+ g.toPrecision(5) +"m/s²", 630, 60);
  //kg
  if(kgon) {
    stroke(255, 255, 0);
    strokeWeight(3);
    fill(255, 255, 0);
    text("kg: "+ (g/9.7805 * 200).toPrecision(5) +"kg", 605, 120);
  }

  //Universal Gravity
  strokeWeight(10);
  stroke(200, 50, 50);
  line(0, height, x, y);
  //cover up
  noStroke();
  fill(5, 120, 51);
  ellipse(0, height, 400, 400);
  //Adjoint Line
  stroke(200, 50, 50, 50);
  line(0, height, x, y);

  //Adjoint Line
  stroke(50, 50, 200, 50);
  line(0, y, x, y);
  //Centrifugal Force
  strokeWeight(10);
  stroke(50, 50, 200);
  line(x, y, x+cos(radians(lat))*100, y);

  //Where am I?
  noStroke();
  fill(155, 155, 255, 130);
  ellipse(x, y, 50, 50);
  //It's Pointer. But Moon
  noStroke();
  fill(255, 255, 150, 130);
  ellipse(m_x, m_y, 50, 50);
  //Display Latitude
  fill(255);
  textSize(35);
  text("Lat: "+ lat.toPrecision(4) +"˚", m_x, m_y-50);
}

function keyPressed() {
  if(key == '1') {
    kgon = 1;
  }
  if(key == '2') {
    kgon = 0;
  }
}
