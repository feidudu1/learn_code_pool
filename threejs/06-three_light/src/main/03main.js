import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入dat.gui
import * as dat from "dat.gui";

//////////////////////////////////////////////////////////////////////// 目标：聚光灯 点光源为point 聚光灯为spot

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

// 3、添加物体
const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry, material);
// 投射阴影
sphere.castShadow = true;
scene.add(sphere);

// 4、创建平面
const planeGeometry = new THREE.PlaneBufferGeometry(50, 50);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(0, -1, 0);
plane.rotation.x = -Math.PI / 2;
// 接收阴影
plane.receiveShadow = true;
scene.add(plane);

// 5、灯光（warn：修改！！！！）
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light);

//直线光源（warn：修改！！！！）
const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(5, 5, 5);
spotLight.castShadow = true;
spotLight.intensity = 2; // 光照强度
// 设置阴影贴图模糊度
spotLight.shadow.radius = 20;
// 设置阴影贴图的分辨率
spotLight.shadow.mapSize.set(512, 512);
// console.log(directionalLight.shadow);
// 设置透视相机的属性
spotLight.target = sphere;
spotLight.angle = Math.PI / 6; // 光线散射角度，最大为 Math.PI/2
spotLight.distance = 0; // 从光源发出光的最大距离，其强度根据光源的距离线性衰减。
spotLight.penumbra = 0; // 半影，聚光锥的半影衰减百分比，在0-1之间，默认为0.
spotLight.decay = 0; // 沿着光照距离的衰减量

scene.add(spotLight);

// 6、gui（warn：新增！！！！）
const gui = new dat.GUI();
gui.add(sphere.position, "x").min(-5).max(5).step(0.1);
gui
  .add(spotLight, "angle")
  .min(0)
  .max(Math.PI / 2)
  .step(0.01);
gui.add(spotLight, "distance").min(0).max(10).step(0.01);
gui.add(spotLight, "penumbra").min(0).max(1).step(0.01);
gui.add(spotLight, "decay").min(0).max(5).step(0.01);

// 7、初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 开启场景中的阴影贴图（warn：新增！！！！）
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;

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
