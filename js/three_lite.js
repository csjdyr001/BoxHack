var camera;

function as() {
  // 场景
  var scene = new THREE.Scene();
  
  // 摄像机
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set( 0, 2, 0 ); // 设置透视摄像机的坐标
  camera.lookAt( 0, 2, 4 ); // 设置透视摄像机对准场景中心点
  
  // 渲染器
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true; // 开启渲染器渲染阴影
  document.querySelector( "#bgAs" ).appendChild( renderer.domElement ); // 将div作为渲染元素
  // 渲染器 end
  
  // 光源
  //全局光源
  var ambientLight = new THREE.AmbientLight( 0xffffff );
  scene.add( ambientLight );
  
  var light = new THREE.DirectionalLight( 0xffffff, 0.8 );
  light.shadow.camera.left = -10;
  light.shadow.camera.right = 10;
  light.shadow.camera.top = -10;
  light.shadow.camera.bottom = 10;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 30;
  light.position.set( 0, 2, 10 );
  light.castShadow = true;
  scene.add( light );
  /*
  var lightHelper = new THREE.DirectionalLightHelper( light, 5 );
  scene.add( lightHelper );
  
  var lightCameraHelper = new THREE.CameraHelper( light.shadow.camera );
  scene.add( lightCameraHelper );
  */
  var pointLight = new THREE.PointLight(0x0000ff); // 创建点光源
  //pointLight.color = new THREE.Color(0xffffff); // 给点光源修改颜色
  // 点光源强度设置为2
  pointLight.intensity = 2.5;
  // 点光源距离设置为20
  pointLight.distance = 2.5;
  pointLight.position.set( 0, 0.5, 0 );
  scene.add( pointLight ); // 将点光源添加到场景
  // 光源 end
  
  // 地面
  var planeGeometry = new THREE.PlaneGeometry( 12, 12 );
  var planeTexture = new THREE.TextureLoader().load( "./image/checker.png" );
  planeTexture.wrapS = planeTexture.wrapT = THREE.RepeatWrapping; // 地面平面重复
  planeTexture.repeat.set( 6, 6 ); // 设置重复次数
  var planeMaterial = new THREE.MeshPhongMaterial( { map: planeTexture } );
  var plane = new THREE.Mesh( planeGeometry, planeMaterial );
  
  plane.rotation.x = -0.5 * Math.PI; // 地面沿x轴往里旋转90度
  scene.add( plane );
  // 地面 end
  
  // 水面
  var waterGeometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
  
  var water = new THREE.Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load( './image/waternormals.jpg', function ( texture ) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
      alpha: 1.0,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 13.7,
      fog: scene.fog !== undefined
    }
  );
  water.rotation.x = -0.5 * Math.PI;
  water.position.y = -20;
  scene.add( water );
  // 水面 end
  
  // 天空
  var sky = new THREE.Sky();
  sky.scale.setScalar( 10000 );
  scene.add( sky );
  
  var skyUniforms = sky.material.uniforms;
  
  skyUniforms[ 'turbidity' ].value = 1;
  skyUniforms[ 'rayleigh' ].value = 4;
  skyUniforms[ 'mieCoefficient' ].value = 0.005;
  skyUniforms[ 'mieDirectionalG' ].value = 0.8;
  
  var parameters = {
    elevation: 2,
    azimuth: 0
  };
  
  var pmremGenerator = new THREE.PMREMGenerator( renderer );
  
  function updateSun() {
    var sun = new THREE.Vector3();
    
    var phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
    var theta = THREE.MathUtils.degToRad( parameters.azimuth );
    
    sun.setFromSphericalCoords( 1, phi, theta );
    
    sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
    water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();
    
    scene.environment = pmremGenerator.fromScene( sky ).texture;
  }
  updateSun();
  // 天空 end
  
  // 球体
  var sphereGeometry = new THREE.SphereGeometry( 0.5 );
  var sphereMaterial = new THREE.MeshBasicMaterial( { color: 0x0063ff } );
  sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
  sphere.position.set( 0, 0.5, 0 );
  scene.add( sphere );
  // 球体 end
  
  // 动画
  function animate() {
    renderer.render( scene, camera ); // 将场景和对象传入渲染器中
    
    water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
    
    requestAnimationFrame( animate );
  }
  animate();
}