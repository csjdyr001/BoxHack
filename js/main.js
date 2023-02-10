window.onload = function() {
  dr = parseFloat( ds.offsetWidth/2 );
  tr = parseFloat( ts.offsetWidth/2 );
  
  spx = ts.offsetLeft + tr;
  spy = ts.offsetTop + tr;
  
  as();
  
  var icons;
  
  setTimeout(
    function() {
      document.querySelector( "audio" ).play();
      var i = 0;
      icons = setInterval(
        function() {
          if( i < 1 ) {
            i = i + 0.01;
            document.querySelector( ".icon" ).style.opacity = i;
            document.querySelector( ".name" ).style.opacity = i;
          }
          else {
            clearTimeout( icons );
            
            setTimeout(
              function() {
                document.querySelector( ".bg0" ).style.display = "none";
                document.querySelector( ".bg1" ).style.display = "block";
              }, 800
            );
          }
        }, 17
      );
    }, 800
  );
  
};

// 手指触摸屏幕
document.querySelector( ".playGame" ).addEventListener( 'touchstart', function( m ) {
  m.preventDefault(); // 阻止屏幕滚动的默认行为
  
  document.querySelector( ".plays" ).style.display = "block";
});

// 手指触摸屏幕
document.querySelector( ".plays" ).addEventListener( 'touchstart', function( m ) {
  m.preventDefault(); // 阻止屏幕滚动的默认行为
  
  document.querySelector( ".plays" ).style.backgroundColor = "#00ffff";
  document.querySelector( "#bg" ).style.display = "none";
  document.querySelector( "audio" ).src = "audio/bg.mp3";
  
  setTimeout( function() { document.querySelector( "audio" ).play(); }, 3000 ); // 开启背景音乐
});