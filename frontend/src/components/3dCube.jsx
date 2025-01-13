import React, { useRef, useEffect, useState } from "react";
import { FaStepBackward, FaStepForward, FaPause, FaPlay } from "react-icons/fa";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import {
  materials,
  Roll,
  stateMap,
} from "../assets/utils/3Dhelpers";

const VirtualCube = ({ cubeColors, initialFaceColors }) => {
  // const [cleanedCubeColors, setCleanedCubeColors] = useState(() => cleanColors(cubeColors));

  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const groupRef = useRef(null);
  const cubesRef = useRef([]);
  const moveQueueRef = useRef([]);
  const isRotatingRef = useRef(false);
  const resizeObserverRef = useRef(null);

  const cleanColors = (cubeColors) => {
    const cleanedCubeColors = {};

    Object.keys(cubeColors).forEach((key) => {
      cleanedCubeColors[key] = cubeColors[key].map((color) =>
        color.replace(/^bg-/, "").replace(/\d+/g, "").replace(/-$/, "") 
    );
    });

    return cleanedCubeColors;
  };
  const cleanedCubeColors=cleanColors(cubeColors)
  const rotateConditions = {
    right: { axis: "x", value: 1 },
    left: { axis: "x", value: -1 },
    top: { axis: "y", value: 1 },
    bottom: { axis: "y", value: -1 },
    front: { axis: "z", value: 1 },
    back: { axis: "z", value: -1 },
    rotateUp: { axis: "x" },
    rotateDown: { axis: "x" },
    rotateRight: { axis: "y" },
    rotateLeft: { axis: "y" },
  };

  const cPositions = [-1, 0, 1];

  const init = () => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const { width, height } = container.getBoundingClientRect();

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(35, width / height, 1, 1000);
    camera.position.set(6, 6, 6);
    cameraRef.current = camera;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    createObjects();
  };

  const createObjects = () => {
    const geometry = new RoundedBoxGeometry(1, 1, 1, 1, 0.12);
    let index = 0;

    const createCube = (position) => {
      let mat = [];
      for (let i = 0; i < 6; i++) {
        if (stateMap[index][i]) {
          const values = stateMap[index][i];
          mat.push(materials[cleanedCubeColors[values.position][values.no]]); // Use cleanedCubeColors from state
        } else {
          mat.push(materials.black);
        }
      }
      index++;

      const cube = new THREE.Mesh(geometry, mat);
      cube.position.set(position.x, position.y, position.z);
      cubesRef.current.push(cube);

      const edgesGeometry = new THREE.EdgesGeometry(geometry);
      const edgesMaterial = new THREE.LineBasicMaterial({
        color: 0x000000,
        linewidth: 1,
      });
      const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

      cube.add(edges);
      sceneRef.current.add(cube);
    };

    cPositions.forEach((x) => {
      cPositions.forEach((y) => {
        cPositions.forEach((z) => {
          createCube({ x, y, z });
        });
      });
    });

    const group = new THREE.Group();
    sceneRef.current.add(group);
    groupRef.current = group;
  };

  const handleResize = () => {
    if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

    const container = mountRef.current;
    const { width, height } = container.getBoundingClientRect();

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  };

  const processNextMove = async () => {
    if (moveQueueRef.current.length === 0) return;

    isRotatingRef.current = true;
    const move = moveQueueRef.current.shift();

    const rollObject = new Roll(
      rotateConditions[move.position],
      move.direction,
      sceneRef.current,
      groupRef.current,
      cubesRef.current,
      Math.PI / 50
    );

    while (rollObject.active) {
      const finished = await rollObject.rollFace();
      if (finished) {
        isRotatingRef.current = false;
        if (moveQueueRef.current.length > 0) {
          processNextMove();
        }
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 16));
    }
  };

  const moves = (position, direction) => {
    moveQueueRef.current.push({ position, direction });
    if (!isRotatingRef.current) {
      processNextMove();
    }
  };

  const animate = () => {
    requestAnimationFrame(animate);
    if (controlsRef.current) controlsRef.current.update();
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  useEffect(() => {
    init();
    animate();
    window.moves = moves;

    // Set up ResizeObserver to watch container size changes
    resizeObserverRef.current = new ResizeObserver(handleResize);
    if (mountRef.current) {
      resizeObserverRef.current.observe(mountRef.current);
    }

    return () => {
      // Cleanup resize observer
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }

      // Cleanup Three.js
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      delete window.moves;

      rendererRef.current?.dispose();
      cubesRef.current.forEach((cube) => {
        cube.geometry.dispose();
        cube.material.forEach((material) => material.dispose());
      });
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900">
      <div
        ref={mountRef}
        className="w-full h-[500px] md:w-2/3 overflow-hidden rounded-3xl bg-gray-900"
      />
      <div className="flex flex-wrap justify-center gap-4 m-4">
        <button className="px-4 py-2 text-lg font-semibold text-white bg-black rounded hover:bg-gray-700 ">
          <FaStepBackward />
        </button>
        <button className="px-4 py-2 text-lg font-semibold text-white bg-black rounded hover:bg-gray-700 active:bg-gray-900">
          {/* <FaPause /> */}
          <FaPlay />
        </button>
        <button className="px-4 py-2 text-lg font-semibold text-white bg-black rounded hover:bg-gray-700">
          <FaStepForward />
        </button>
      </div>
    </div>
  );
};

export default VirtualCube;
