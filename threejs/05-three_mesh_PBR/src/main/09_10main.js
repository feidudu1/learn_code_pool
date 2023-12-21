import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
//////////////////////////////////////////////////////////////////// 目标：设置环境纹理

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

// 3、设置cube纹理加载器（warn：新增！！！！）
const cubeTextureLoader = new THREE.CubeTextureLoader();
// 6个面：px为x正方向，nx为x负方向
const envMapTexture = cubeTextureLoader.load([
  "textures/environmentMaps/1/px.jpg",
  "textures/environmentMaps/1/nx.jpg",
  "textures/environmentMaps/1/py.jpg",
  "textures/environmentMaps/1/ny.jpg",
  "textures/environmentMaps/1/pz.jpg",
  "textures/environmentMaps/1/nz.jpg",
]);

const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.1,
  //   envMap: envMapTexture,
});
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);

// 4、加载hdr环境图（warn：新增！！！！） 4和5二选一
const rgbeLoader = new RGBELoader();
// 效果不在vscode打开可以看到
rgbeLoader.loadAsync("textures/hdr/002.hdr").then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

// 5、给场景添加背景（warn：新增！！！！）
scene.background = envMapTexture;
// 给场景所有的物体添加默认的环境贴图
scene.environment = envMapTexture;

// 6、灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light);
//直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// 7、初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// // 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

// 8、创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

// 9、添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 10、使用渲染器
function render() {
  controls.update();
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}
render();

// 11、监听画面变化，更新渲染画面
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
