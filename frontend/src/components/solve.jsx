import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./cube.css";
import Cube from "./cube";
import CameraPopup from "./CameraPopUp";
import FillCube from "./FillCube";
import Cube3D from "./3dCube";
import Alert from "./Alert";
import { FaArrowLeft } from "react-icons/fa";
const Solve = ({ onClose }) => {
  const navigate = useNavigate();

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupVisible, setVisibility] = useState(false);
  const [alert, setAlert] = useState({ message: "", visible: false });

  //selected color to fill
  const [currentColor, setCurrentColor] = useState("bg-white");

  const initialFaceColors = Array(9).fill("bg-white"); // Initial colors for each fac
  const [cubeColors, setCubeColors] = useState({
    front: [
      "bg-blue-600",
      "bg-blue-600",
      "bg-blue-600",
      "bg-blue-600",
      "bg-blue-600",
      "bg-blue-600",
      "bg-blue-600",
      "bg-blue-600",
      "bg-blue-600",
    ],
    back: [
      "bg-green-500",
      "bg-green-500",
      "bg-green-500",
      "bg-green-500",
      "bg-green-500",
      "bg-green-500",
      "bg-green-500",
      "bg-green-500",
      "bg-green-500",
    ],
    left: [
      "bg-orange-500",
      "bg-orange-500",
      "bg-orange-500",
      "bg-orange-500",
      "bg-orange-500",
      "bg-orange-500",
      "bg-orange-500",
      "bg-orange-500",
      "bg-orange-500",
    ],
    right: [
      "bg-red-500",
      "bg-red-500",
      "bg-red-500",
      "bg-red-500",
      "bg-red-500",
      "bg-red-500",
      "bg-red-500",
      "bg-red-500",
      "bg-red-500",
    ],
    top: [
      "bg-white",
      "bg-white",
      "bg-white",
      "bg-white",
      "bg-white",
      "bg-white",
      "bg-white",
      "bg-white",
      "bg-white",
    ],
    bottom: [
      "bg-yellow-400",
      "bg-yellow-400",
      "bg-yellow-400",
      "bg-yellow-400",
      "bg-yellow-400",
      "bg-yellow-400",
      "bg-yellow-400",
      "bg-yellow-400",
      "bg-yellow-400",
    ],
  });

  const [solve_response, setResponse] = useState({
    sequence: [],
    is_solved: true,
    error: "",
  });

  const getRubiks_cube = (cubeColors) => {
    const faces = ["F", "B", "L", "R", "U", "D"];
    const getColorNotation = {
      "bg-blue-600": "B",
      "bg-white": "W",
      "bg-green-500": "G",
      "bg-red-500": "R",
      "bg-orange-500": "O",
      "bg-yellow-400": "Y",
    };
    console.log(cubeColors);
    const rubiks_cube_notation = {};

    Object.keys(cubeColors).forEach((face, faceNo) => {
      cubeColors[face].forEach((color, index) => {
        rubiks_cube_notation[`${faces[faceNo]}${index + 1}`] =
          getColorNotation[color];
      });
    });
    return rubiks_cube_notation;
  };

  // fetch the solution and put in stateful variable
  const solve_cube = async () => {
    try {
      const cube = getRubiks_cube(cubeColors);
      console.log(cube);
      const response = await fetch("http://127.0.0.1:8000/solve/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rubiks_cube: cube,
        }),
      });
      const data = await response.json();
      setResponse(data);
      console.log(data);
      if (!data.is_solved) {
        console.log(solve_response);
        setVisibility(true);
      } else if (data.is_solved && data.sequence.length === 0) {
        setAlert({ message: "Cube is already solved!", visible: true });
      }
    } catch (error) {
      setResponse((prev) => {
        [], false, "Fetch error";
      });
    }
  };

  return (
    <div className="py-16 bg-black">
      {/* back button */}
      <div className="fixed top-4 left-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white bg-transparent p-2 rounded hover:scale-110 transition duration-300 ease-in-out"
        >
          <FaArrowLeft /> Back
        </button>
      </div>
      {/* Alert Component */}
      <Alert
        message={alert.message}
        isVisible={alert.visible}
        onClose={() => setAlert({ ...alert, visible: false })}
      />

      {/* error div */}
      <div
        className={`h-screen w-screen fixed flex justify-center items-center inset-0 z-10 bg-black/50 ${
          popupVisible ? "" : "hidden"
        }`}
        onClick={() => setVisibility(false)}
      >
        <button
          onClick={() => setVisibility(false)}
          className="absolute top-[calc(50%-70px)] right-[calc(40%-10px)] text-red-500 hover:text-red-600 z-20 transition duration-300 text-3xl "
        >
          &times;
        </button>

        {/* Popup Container */}
        <div
          className="relative p-6 bg-white border border-red-600 rounded-md shadow-md"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
        >
          {solve_response.error}
        </div>
      </div>
      <div className="flex justify-evenly flex-wrap ">
        {/*cube */}
        <Cube
          cubeColors={cubeColors}
          currentColor={currentColor}
          setCubeColors={setCubeColors}
        />

        {/* menu */}
        <div className="flex flex-col justify-center rounded-2xl w-auto">
          <button
            onClick={() => setPopupOpen(true)}
            className="bg-blue-600 text-white py-2 px-6 my-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Scan the Cube
          </button>

          {popupOpen && (
            <CameraPopup
              onClose={() => setPopupOpen(false)}
              setCubeColors={setCubeColors}
            />
          )}

          {/* fillcube colors section */}
          <FillCube
            setCubeColors={setCubeColors}
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            initialFaceColors={initialFaceColors}
          />

          {/* sends the cube notation to solve */}
          <button
            onClick={() => {
              solve_cube();
            }}
            className="bg-blue-600 text-white py-2 px-6 my-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Solve the Cube
          </button>
          <button
            onClick={() => navigate("/virtualcube")}
            className="bg-blue-600 text-white py-2 px-6 my-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Virtual Cube
          </button>
        </div>
      </div>

      {solve_response.sequence?.length > 0 && (
        <>
          {/* solution container */}
          <div className="h-auto w-full  flex flex-col justify-center align-middle">
            <p className=" text-white font-bold text-lg select-none my- px-3 ">
              Solve Sequence:
            </p>
            <div className="h-auto w-auto  pb-4 pl-16">
              <p className="text-white text-xl">
                {solve_response.sequence?.length > 0
                  ? solve_response.sequence.join(" ")
                  : ""}
              </p>
            </div>

            {/* Show steps */}
            <button className="font-bold text-lg select-none my-2 px-3 text-white hover:bg-gray-700 active:bg-gray-700 border">
              Show steps
            </button>
            <Cube3D
              cubeColors={cubeColors}
              initialFaceColors={initialFaceColors}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default Solve;
