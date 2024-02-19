import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//////////////////////////////////////////////////////////////////////////////// 目标：运用数学知识设计特定形状的星系二：让点随机分布且形成漩涡

// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30
);
// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 3、添加物体（warn：修改！！！！）
const textureLoader = new THREE.TextureLoader();
const particlesTexture = textureLoader.load("./textures/particles/1.png");

const params = {
  count: 10000, // （warn：修改！！！！）
  size: 0.1,
  radius: 5,
  branch: 3,
  color: "#ff6030",
  rotateScale: 0.3,  // （warn：新增！！！！）让值变小，从而使🌀线没那么弯（即🌀的半径变大）
};

let geometry = null;
let material = null;
let points = null;
const generateGalaxy = () => {
  // 生成顶点
  geometry = new THREE.BufferGeometry();
  //   随机生成位置和
  const positions = new Float32Array(params.count * 3);

  //   循环生成点
  for (let i = 0; i < params.count; i++) {
    // 当前的点应该在哪一条分支的角度上
    // 第1个点在第1条分支，第2个在第2条分支，第3个在第3条分支。即 i % params.branch
    // 第1条分支在120度，即 （2 * Math.PI / 3） * 1；第2条在 （(2 * Math.PI) / 3） * 2 上，第3条在 （(2 * Math.PI ) / 3）*3
    const branchAngel = (i % params.branch) * ((2 * Math.PI) / params.branch);

    // 当前点距离圆心的距离（warn：修改！！！！）
    // 1、2、3、
    // const distance = Math.random() * params.radius;
    // 4、让靠近原点的点更多，不靠近的更少
    const distance = (Math.random() * params.radius) * Math.pow(Math.random(), 3);
    const current = i * 3;

    /**
     * （warn：新增！！！！）
     * 生成随机数，让点散开
     * Math.pow(2,3); // 返回8，2的3次方
     */
    // 2、简单随机数
    // const randomX = Math.random()
    // const randomY = Math.random()
    // const randomZ = Math.random()

    // 3、让前半部分的点更集中，后半部分的点更分散
    // x的平方的图刚好符合，x的3次方的图也可以，这里用的3次方。2次方和上面的方法2都会使点偏向x轴的正值部分，不知道为啥？
    // Math.random() * 2 - 1 为一半
    // const randomX = Math.pow(Math.random() * 2 - 1, 3) ;
    // const randomY = Math.pow(Math.random() * 2 - 1, 3) ;
    // const randomZ = Math.pow(Math.random() * 2 - 1, 3) ;

    // 4、方法3的点虽然中心集中，尾部分散，但是还能看到核心的🌀线
    // 距离原点越近，随机的范围越小
    // const randomX = (Math.pow(Math.random() * 2 - 1, 3) * distance) / 5;
    // const randomY = (Math.pow(Math.random() * 2 - 1, 3) * distance) / 5;
    // const randomZ = (Math.pow(Math.random() * 2 - 1, 3) * distance) / 5;
    // 距离原点越近，随机的范围越大
    const randomX = (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;
    const randomY = (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;
    const randomZ = (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;

    /**
     * （warn：修改！！！！）
     * 当前点（可能不在轴线上）在空间中的x、y、z坐标，通过半径和角度来求得
     */
    // 1、在三条轴上(直线）--> 三条🌀线
    // positions[current] = Math.cos(branchAngel + distance * params.rotateScale) * distance; // x
    // positions[current + 1] = 0; // y
    // positions[current + 2] = Math.sin(branchAngel + distance * params.rotateScale) * distance; // z

    // 2、让每条🌀线上的点随机散开
    positions[current] = Math.cos(branchAngel + distance * params.rotateScale) * distance + randomX;
    positions[current + 1] = 0 + randomY;
    positions[current + 2] = Math.sin(branchAngel + distance * params.rotateScale) * distance + randomZ;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  //   设置点材质
  material = new THREE.PointsMaterial({
    color: new THREE.Color(params.color),
    size: params.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    map: particlesTexture,
    alphaMap: particlesTexture,
    transparent: true,
    vertexColors: false, 
  });

  points = new THREE.Points(geometry, material);
  scene.add(points);
};
generateGalaxy();

// 4、初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;

// console.log(renderer);
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
