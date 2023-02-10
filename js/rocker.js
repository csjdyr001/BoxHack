var scr = document.querySelector( "#bgAs" ); // 第一人称

var ds = document.querySelector( ".ds" ); // 摇杆外圆
var ts = document.querySelector( ".ts" ); // 摇杆内圆
var dr, tr, spx, spy;

var sex = 0, sey = 0;
var angleX = 0, angleY = 0;
var hx = 0, hy = 0, hz = 0;

var angle = 0;
var myDemo1;
var Ox = 0, Oy = 2, Oz = 0;
var Px = 0, Py = 2, Pz = 4;

// 手指触摸屏幕
scr.addEventListener( 'touchstart', function( m ) {
  m.preventDefault(); // 阻止屏幕滚动的默认行为
  
  sex = m.targetTouches[0].pageX;
  sey = m.targetTouches[0].pageY;
});

// 手指滑动屏幕
scr.addEventListener( 'touchmove', function( m ) {
  m.preventDefault(); // 阻止屏幕滚动的默认行为
  
  var lx = (sex - m.targetTouches[0].pageX)/100;
  var ly = (sey - m.targetTouches[0].pageY)/100;
  
  if( angleY < 1.4 && angleY > -1.4 ) {
    angleX = angleX + lx;
    angleY = angleY + ly;
  }
  else if( angleY > 1.4 && ly < 0 ) {
    angleX = angleX + lx;
    angleY = angleY + ly;
  }
  else if( angleY < -1.4 && ly > 0 ) {
    angleX = angleX + lx;
    angleY = angleY + ly;
  }
  else {
    angleX = angleX + lx;
  }
  
  var ix = Math.sin( angleX );
  var iy = Math.sin( angleY );
  var iz = Math.cos( angleX );
  
  var L = Math.sqrt( 1-iy*iy );
  
  hx = ix*L;
  hy = iy;
  hz = iz*L;
  
  Px = hx*4 + Ox;
  Py = hy*4 + Oy;
  Pz = hz*4 + Oz;
  
  sex = m.targetTouches[0].pageX;
  sey = m.targetTouches[0].pageY;
  
  camera.lookAt( Px, Py, Pz ); // 相机焦点
  //sphere.position.set( Px, Py, Pz );
});



// 手指触摸屏幕
ts.addEventListener( "touchstart", function( m ) {
  m.preventDefault(); // 阻止屏幕滚动的默认行为
  
  myDemo1 = setInterval( myDemo, 20 );
  
  var enx = m.targetTouches[0].pageX - tr;
  var eny = m.targetTouches[0].pageY - tr;
  
  ts.style.left = enx + "px";
  ts.style.top = eny + "px";
});

// 手指滑动屏幕
ts.addEventListener( "touchmove", function( m ) {
  m.preventDefault(); // 阻止屏幕滚动的默认行为
  
  // 向量坐标
  var scx = m.targetTouches[0].pageX - spx;
  var scy = m.targetTouches[0].pageY - spy;
  
  var mod = Math.sqrt( scx*scx + scy*scy ); // 模
  var ex = scx / mod;
  var ey = scy / mod;
  
  var l = Math.acos( -ey ); // 通过摇杆获取模型需要计算的弧度
  
  // 判断是向左旋转还是向右旋转
  if( scx < 0 ) {
    angle = angleX + l; // 通过摇杆获取弧度
  }
  else {
    angle = angleX - l; // 通过摇杆获取弧度
  }
  
  // 若手指在摇杆内滑动
  if( mod < dr ) {
    var enx = m.targetTouches[0].pageX - tr;
    var eny = m.targetTouches[0].pageY - tr;
    
    ts.style.left = enx + "px";
    ts.style.top = eny + "px";
  }
  else {
    var enx = dr * ex + spx - tr;
    var eny = dr * ey + spy - tr;
    
    ts.style.left = enx + "px";
    ts.style.top = eny + "px";
  }
});

// 手指离开屏幕
ts.addEventListener( "touchend", function( m ) {
  m.preventDefault(); // 阻止屏幕滚动的默认行为
  
  clearTimeout( myDemo1 );
  
  var enx = spx - tr;
  var eny = spy - tr;
  
  ts.style.left = enx + "px";
  ts.style.top = eny + "px";
});



// 移动
function myDemo() {
  var ex = Math.sin( angle );
  var ez = Math.cos( angle );
  
  if( Oz < 6 && Oz > -6 ) {
    Oz = ez*0.08 + Oz;
  }
  else if( Oz > 0 && ez > 0 ) {
    Oz = 6;
  }
  else if( Oz < 0 && ez < 0 ) {
    Oz = -6;
  }
  else {
    Oz = ez*0.08 + Oz;
  }
  
  if( Ox < 6 && Ox > -6 ) {
    Ox = ex*0.08 + Ox;
  }
  else if( Ox > 0 && ex > 0 ) {
    Ox = 6;
  }
  else if( Ox < 0 && ex < 0 ) {
    Ox = -6;
  }
  else {
    Ox = ex*0.08 + Ox;
  }
  
  camera.position.set( Ox, Oy, Oz );
}