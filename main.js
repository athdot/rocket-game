var speedMs = 20;

var style = document.createElement("style");
style.innerHTML = "@font-face { \n font-family: 'spaceFont'; \n src: url(https://athdot.github.io/files/trench100free.otf); \n }";
document.head.appendChild(style);
//now for the back arrow.
var imss = document.createElement("img");
imss.src="images/arrow.png";
imss.style="display:none";
document.body.appendChild(imss);
var obstaclez = [
"obstacles/dstar.png",
"obstacles/hal.png",
"obstacles/ast.png",
"obstacles/earth.png",
];
var skin = [
"ships/sputnik.png",
"ships/soyuz.png",
"ships/spaceShuttle.png",
"ships/sat.png",
"ships/redScare.png",
"ships/arrowShip.png",
"ships/police.png",
"ships/box.png",
"ships/xwing.png",
"ships/plunger.png",
];
var deathImages = [
"death/death1.png",
]
var gameField = document.createElement("canvas");
gameField.width = window.innerWidth;
gameField.height = window.innerHeight;
gameField.id = "gameField";
gameField.style = "background-color: rgb(0,26,51); position:absolute; top: 0; left: 0;";
document.body.appendChild(gameField);
var ctx = gameField.getContext("2d");
var place = 0;
var currentShip = 0;
var cleverLosePhrases = ["Missed it by thaaaaat much...","Aaaaah! Missed it by that much!","Sooooo Close","One more time please","As my Grandmother used to say, watch out for the astroid!","Come on, try harder!","I believe in you","Oooops...","NooooOOooOooo...","Impossible!","And he was never heard from again...","Whelp! That one failed, might as well do another one...","[Player] left the game...","Test Subject 1032 is now MIA","Staaaaaaars...","Is the glass half full? Or is it empty?","What came first, The Chicken or the Egg?","Yeeeeeeeeeeeeee","Yeet","I think I saw a Yeti over there somewhere...","Did you know that 100% of human beings die from death?","Glad I wasn't him...","That was NASTY","SPLAT!","Ahh Dang... There goes another one...","We have limited pilots, you know...","Watching that was funnier than pretending to be a carrot!"];
var obs = new Array(0);
newObj();
updateArray();
function updateArray(){
	var n = 50-Math.floor(gameField.width/40);
	if(n < 0){
		n = 0;	
	}
	if(distance*3 < 20){
	var newArray = randInt(1,100-distance*12);
  }else{
  var newArray = randInt(1,100-20*4);
  }

  if(newArray == 1 || obs.length < 3){
  	newObj();
  }
  var len = obs.length;
  var i = 0;
  while(i < len){
  	if(obs[i] != null && obs[i] != ""){
    	var current = obs[i].split(",");
      if((parseInt(current[3]) < ypos+65) && (parseInt(current[3]) > ypos-65) && (current[3]*current[1]+parseInt(current[4])) < xpos+65 && (current[3]* current[1]+parseInt(current[4])) > xpos-65 && (current[3]* current[1]+parseInt(current[4])) > 0 && (current[3]* current[1]+parseInt(current[4])) < gameField.width){
      	place = 3;
      }
      if((current[3]*current[1]+parseInt(current[4])) < -100 || (current[3]*current[1]+parseInt(current[4])) > gameField.width+100 || current[3] > gameField.height){
      	obs[i] = obs[obs.length-1];
        var ys = new Array(obs.length-1);
        for(var j = 0; j < obs.length-1; j++){
        	ys[j] = obs[j];
        }
        obs = ys;
        len--;
      }else{
      current[3] = (parseInt(current[2]) + parseInt(current[3]))*speedMs/20 + "";
      current[5] = (parseInt(current[5]) + parseInt(current[6]))*speedMs/20 + "";
      obs[i] = current[0] + "," + current[1] + "," + current[2] + "," + current[3] + "," + current[4]  + "," + current[5]  + "," + current[6];   
      }
		}
    i++;
  }
}

function newObj(){
	var string = "";
  if(currentShip == 8){
  string += randInt(0,obstaclez.length-1) + ",";
  }else{
  string += randInt(1,obstaclez.length-1) + ",";
  }
  string += (randInt(-10,10)/20) + ",";
  string += randInt(6,8) + ",";
  string += "-200";
  string += "," + randInt(1,(gameField.width-101));
  string += "," + randInt(0,360);
  string += "," + randInt(-40,40)/10;
  obs[obs.length] = string;
}

function getObj(num){
	return obs[num].split(",");
}

//mousePositions
var mousePos = {
x: 0,
y: 0
}

var mouseDown = false;
var runner;

function randLose(){
	var i = randInt(0,cleverLosePhrases.length-1);
  return cleverLosePhrases[i];
}

//mousePosition is gotten by this...
function getMousePos(evt) {
    var rect = gameField.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  gameField.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(evt);
  }, false);

//if mouse down
document.body.onmousedown = function() { 
  mouseDown = true;
}
document.body.onmouseup = function() {
  mouseDown = false;
}

gameField.oncontextmenu = function (e) {
    e.preventDefault();
};

var starSpeed = 0;
var stars = new Array(100);
for(var i = 0; i < stars.length; i++){
		if(randInt(0,gameField.height) == 1){
    	var ret = 1;
    }else{
    	var ret = 0;
    }
  	stars[i] = randInt(0,gameField.width) + ",0," + ret;
}

function renderStars(){
	for(var i = 0; i < stars.length; i++){
  	if(stars[i].split(",")[2] === "1"){
  		var x = stars[i].split(",")[0];
  		var y = stars[i].split(",")[1];
  		ctx.fillStyle = "white";
  		ctx.fillRect(x,y,1,1);
    	stars[i] = x + "," + (parseInt(y)+starSpeed) + ",1";
  	}
    
    if(randInt(0,gameField.height) == 1){
    	stars[i] = stars[i].split(",")[0] + "," + stars[i].split(",")[1] + ",1";
    }
    
    if(parseInt(stars[i].split(",")[1]) >= gameField.height){
    	if(randInt(0,gameField.height) == 1){
    		var ret = 1;
    	}else{
    		var ret = 0;
   	 }
  		stars[i] = randInt(0,gameField.width) + ",0," + ret;
    }
  }
}

window.onresize = function(){
	document.getElementById("gameField").width = window.innerWidth
  document.getElementById("gameField").height = window.innerHeight;
}

function randInt(min,max){
	return Math.floor((Math.random()*(max-min+1))+min);
}

function clear(){
	ctx.clearRect(0,0,gameField.width,gameField.height);
}

function drawCylander(text,x,y,width,height){
width = width/3;
//left side
			ctx.beginPath();
      ctx.arc(x-width/2, y, height/2, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'white';
      ctx.stroke();
      //right side
			ctx.beginPath();
      ctx.arc(x+width/2, y, height/2, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'white';
      ctx.stroke();
      //middle
      ctx.fillRect(x-width/2,y-height/2-3,width,height+6);
      drawFont(text,40,x,y-20,'rgb(0,26,51)');
}

function drawFont(text,size,x,y,color){
	var txt = [text];
	var str = size+"px spaceFont";
	ctx.font = str; 
	ctx.fillStyle = color;
	ctx.textBaseline = 'top';
  lines = 1;
  for(var j = 0; j < lines; j++){
  var width = ctx.measureText(txt[j]).width;
  	if(width > gameField.width-60 && txt[j].split(" ").length != 1){
  		var linst = "";
    	var ys = txt[j].split(" ");
    	var len = 0;
  		for(var i = 0; len != 1 && ctx.measureText(linst).width <= gameField.width-60; i++){
    		widths = ctx.measureText(txt[j]).width;
      	if(ctx.measureText(linst + ys[i]).width <= gameField.width-60){
      		linst += " " + ys[i];
      	}else{
      		len = 1;
          lines++;
        	txt[j+1] = txt[j].substring(linst.length,txt[j].length);
      	}
    	}
  		txt[j] = linst;
  	}
  }
  var lineplus = 0;
  for(var i = 0; i < txt.length; i++){
  	width = ctx.measureText(txt[i]).width;
		ctx.fillText(txt[i], x-width/2, y+lineplus);
    lineplus += size;
  }
}

function locationClicked(x,y,width,height){
	if(((mousePos.x >= x && mousePos.x <= x+width) && (mousePos.y >= y && mousePos.y <= y+height)) && mouseDown){
  	return true;
  }	
  return false;
}

function titleScreen(){
		drawFont('Rocket',gameField.width/5,gameField.width/2+5,100,'white');
    drawFont(Math.floor(highscore),50,gameField.width-10*(Math.floor(highscore) + "").length-20,20,"white");
    drawCylander('Play',gameField.width/2,120+gameField.width/5,300,35);
    if(locationClicked(gameField.width/2-75,120+gameField.width/5-20,150,41)){
    	place = 1;
    }
  	drawCylander('Skins',gameField.width/2,180+gameField.width/5,300,35);
    if(locationClicked(gameField.width/2-75,180+gameField.width/5-20,150,41)){
    	place = 2;
    }
}

var keyDown = null;

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        keyDown = "left";
    }else if(event.keyCode == 38) {
        keyDown = "up";
    }else if(event.keyCode == 39) {
        keyDown = "right";
    }else if(event.keyCode == 40) {
        keyDown = "down";
    }
});

document.addEventListener('keyup', function(event) {
    keyDown = null;
});

var dg = 0;
var cssd = 0;
function play(){
	distance += speedMs/2000;
  
  if(distance > highscore){
  	highscore = distance;
  }
	//here is da place. remember place = 3 is death screen.
  drawFont(Math.floor(distance),50,gameField.width-10*(Math.floor(distance) + "").length-20,20,"white");
  var im = shipImages(currentShip,dg);
		ctx.drawImage(im,xpos,ypos,150,150);
  for(var i = 0; i < obs.length; i++){
  	var vs = getObj(i);
    var ims = objImagesn(vs[0],vs[5]); 
    var num = vs[3]*vs[1];
    num += parseInt(vs[4]);
  	ctx.drawImage(ims,num,vs[3],100,100);
  }
  updateArray();
  if(starSpeed > 12*speedMs/20){
  	starSpeed -= speedMs/1000;
  }else if(starSpeed < 12*speedMs/20){
  	starSpeed += speedMs/1000;
  }
  if((keyDown === "left" || mouseDown && xpos+75 > mousePos.x+15) && xpos > 60){
    cssd = -30;
  }else if((keyDown === "right" || mouseDown && xpos+75 < mousePos.x-15) && xpos < gameField.width-(50+150)){
    cssd = 30;
  }else{
  	cssd =  randInt(-0.1,0.1);
  }
  
  if(ypos > gameField.height-(15+150)){
  	ypos -= (ypos-(gameField.height-(15+150)))/15;
  }else if(ypos < gameField.height-(15+150)){
  	ypos += ((gameField.height-(15+150))-ypos)/15;
  }
  
  xpos = xpos + dg/(5/(speedMs/10));
  
  if(dg > cssd){
  	dg -= (dg-cssd)/(30/(speedMs/10));
  }else if(dg < cssd){
  	dg += (cssd-dg)/(30/(speedMs/10));
  }
  
  //end bounds if statements
  if(xpos <= 150 && keyDown === "left"){
  	cssd = 0;
  }else if(xpos >= gameField.width-350 && keyDown === "right"){
  	cssd = 0;
  }
  if(dg > cssd){
  	dg -= 0.2;
  }else if(dg < cssd){
  	dg += 0.2;
  }
}

var skinPage = 0;
var line = 0;
function skinScreen(){
	var across = Math.floor(gameField.width/100);
  var up = Math.floor(gameField.height/100);
  var isa = 0;
  var linewidth = Math.floor(gameField.width/140);
  var l = 0;
  for(var i = 0; i < skin.length; i++){
  	var im = shipImage(isa);
    
  	ctx.drawImage(im,(gameField.width/2-((linewidth+0.63)/2)*110)+110*l,70+line*110,75,75);
    ctx.beginPath();
    ctx.rect((gameField.width/2-((linewidth+0.63)/2)*110)+110*l-5,70+line*110-5,85,85);
	  ctx.strokeStyle = "white";
    if(currentShip == isa){
   	 ctx.lineWidth = 4;
    }else{
    	ctx.lineWidth = 2;
    }
    ctx.stroke();
    isa = isa + 1;
    if(locationClicked((gameField.width/2-((linewidth+0.63)/2)*110)+110*l-5,70+line*110-5,85,85)){
  		currentShip = i;
  	}
    l++;
		if(l > linewidth){
    	l = 0;
      line += 1;
    }
  }
  //So everything is now rendered.
  if(currentShip >= skin.length){
  	currentShip = skin.length;
  }
  
  //we got the buttons, now for the menu button
  ctx.drawImage(imss,0,0,60,60);
  drawFont("Skins",50,gameField.width/2,8,"white");
    if(locationClicked(0,0,60,60)){
    	place = 0;
    }
}

var highscore = 0;

function shipImage(num){
  var coolIm = document.getElementById(""+num);
  if(coolIm == null){
  	var im = document.createElement("img");
    im.id = ""+num;
    im.style = "display:none;";
    im.src = skin[num];
    document.body.appendChild(im);
  }
  coolIm.src = skin[num];
  
  return document.getElementById(""+num);
}

function shipImages(num,rotation){
  var im = shipImage(num);
  var c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  var ctx = c.getContext("2d");
  ctx.save();
	ctx.translate(128, 128);
	ctx.rotate(rotation*Math.PI/180);
	ctx.translate(-128,-128);
	ctx.drawImage(im,0,0);
	ctx.restore();
  return c;
}

function objImagen(num){
  var coolIm = document.getElementById("o"+num);
  if(coolIm == null){
  	var im = document.createElement("img");
    im.id = "o"+num;
    im.style = "display:none;";
    im.src = obstaclez[num];
    document.body.appendChild(im);
  }
  coolIm.src = obstaclez[num];
  
  return document.getElementById("o"+num);
}

function objImagesn(num,rotation){
  var imr = objImagen(num);
  var c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  var ctx = c.getContext("2d");
  ctx.save();
	ctx.translate(128, 128);
	ctx.rotate(rotation*Math.PI/180);
	ctx.translate(-128,-128);
	ctx.drawImage(imr,0,0);
	ctx.restore();
  return c;
}

function randLoseImg(){
	var rand = randInt(0,deathImages.length-1);
  var deathIm = document.getElementById("death");
  if(deathIm == null){
  	var im = document.createElement("img");
    im.id = "death";
    im.style = "display:none";
    im.src = deathImages[rand];
    document.body.appendChild(im);
    im = null;
  }
  deathIm.src = deathImages[rand];
}
function loseScreen(){
	if(runner == null || runner === ""){
  	runner = randLose();
  }
    //draw  top rectangle
  ctx.fillStyle = "white";
  ctx.fillRect(20,20,gameField.width-40,300);
  drawFont("You died",30,gameField.width/2,25,"black");
  drawFont("Score: " + Math.floor(distance),20,gameField.width/2,50,"black");
  drawFont("Highscore: " + Math.floor(highscore),20,gameField.width/2,67,"black");
  	randLoseImg();
    var deathImageCont = document.getElementById("death");
  	ctx.drawImage(deathImageCont,gameField.width/2-50,90,100,125);
    drawFont(runner,20,gameField.width/2,250,"black");
    drawCylander('Replay',gameField.width/2,350,300,35);
    drawCylander('Menu',gameField.width/2,400,300,35);
    if(locationClicked(gameField.width/2-75,330,150,41)){
    	place = 1;
    }
    if(locationClicked(gameField.width/2-75,380,150,41)){
    	setTimeout(function(){
    		place = 0;
      },210);
    }
}
var xpos = gameField.width/2-75;
var ypos = gameField.height+100;
var distance;
var ratioMs;
function run(){
	starSpeed = 2;
  setInterval(function(){
	d = new Date();
	currentMs = d.getMilliseconds();
	ratioMs = currentMs-(previousMs+20);
	speedMs-ratioMs;
  	clear();
    renderStars();
	if(place == 0){
  	titleScreen();
  }else if(place == 1){
  	xpos = gameField.width/2-75;
    ypos = gameField.height+300;
    distance = 1;
    place = 6;
  }else if(place == 2){
  	skinPlace = 0;
    place = 5;
  }else if(place == 3){
  	runner = "";
    obs = new Array(0);
    place = 4;
    line = 0;
  }else if(place == 4){
  	loseScreen();
  }else if(place == 5){
  	line = 0;
  	skinScreen();
  }else if(place == 6){
   play();
  }
	  previousMs = currentMs;
  },speedMs);
	//average speed is 20ms
}
var d = new Date();
var beginMs = d.getMilliseconds();
var previousMs = beginMs-20;
if(previousMs < 0){
	previousMs = 1000-previousMs;
}
var currentMs = beginMs;
run();

//Version 1.7.0
