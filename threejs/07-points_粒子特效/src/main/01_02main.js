import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

////////////////////////////////////////////////////////////////////////// 目标：认识pointes

// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 3、创建球几何体（warn：修改！！！！）
// 点材质会落在sphereGeometry的每个顶点上
// const sphereGeometry = new THREE.SphereBufferGeometry(3, 100, 100); // 100会比30有更多的顶点，从而有更多的点材质
const sphereGeometry = new THREE.SphereBufferGeometry(3, 30, 30); // 半径为3
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//   wireframe: true,
// });
// const mesh = new THREE.Mesh(sphereGeometry, material);
// scene.add(mesh);

// 设置点材质（warn：新增！！！！）
const pointsMaterial = new THREE.PointsMaterial();
pointsMaterial.size = 0.1;
pointsMaterial.color.set(0xfff000);
// （warn：新增！！！！）
// 点的大小是否因相机深度而衰减（仅限透视摄像头）
pointsMaterial.sizeAttenuation = true; // 默认为true，如果设置为false，那么前面的点和后面的点一样大

// （warn：新增！！！！）
// 载入纹理
const textureLoader = new THREE.TextureLoader();
// 前面有讲过透明贴图，黑色是透明，白色是不透明
const texture = textureLoader.load("./textures/particles/1.png");
// 设置点材质纹理
pointsMaterial.map = texture;
pointsMaterial.alphaMap = texture;
pointsMaterial.transparent = true;
// 渲染此材质是否对深度缓冲有影响，默认为true，有影响。没太懂？
pointsMaterial.depthWrite = false;
// 叠加方式（如正片叠底等，这里是黄色片状叠加越多则越亮）
pointsMaterial.blending = THREE.AdditiveBlending;

const points = new THREE.Points(sphereGeometry, pointsMaterial);

scene.add(points);

// 4、初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// 5、创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

// 6、添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 7、使用渲染器
function render() {
  controls.update();
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();

// 8、监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  //   console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
