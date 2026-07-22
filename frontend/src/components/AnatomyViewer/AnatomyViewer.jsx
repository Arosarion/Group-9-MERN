import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Canvas, useThree } from "@react-three/fiber";

import {
  Environment,
  Html,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import * as THREE from "three";

import anatomyData from "./anatomyData";
import "./AnatomyViewer.css";

const MODEL_PATH = "/models/anatomy.glb";

const DEFAULT_CAMERA_POSITION = new THREE.Vector3(
  -0.022,
  0.919,
  0.728
);

const DEFAULT_CAMERA_TARGET = new THREE.Vector3(
  -0.026,
  0.834,
  0.015
);

const SYSTEM_NAMES = new Set(["Skeleton", "Muscles"]);

function LoadingMessage() {
  return (
    <Html center>
      <div className="model-loading-message">
        Loading 3D model...
      </div>
    </Html>
  );
}

function formatPartName(name = "") {
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .trim();
}

function findInteractivePart(object) {
  let current = object;

  while (current) {
    if (
      current.name &&
      !SYSTEM_NAMES.has(current.name) &&
      anatomyData[current.name]
    ) {
      return current;
    }

    current = current.parent;
  }

  return null;
}

function getMaterials(object) {
  if (!object?.material) {
    return [];
  }

  return Array.isArray(object.material)
    ? object.material
    : [object.material];
}

function setPartHighlight(part, highlighted, selected = false) {
  if (!part) {
    return;
  }

  part.traverse((object) => {
    if (!object.isMesh) {
      return;
    }

    getMaterials(object).forEach((material) => {
      if (!material) {
        return;
      }

      if ("emissive" in material) {
        if (selected) {
          material.emissive.set("#def31d");
          material.emissiveIntensity = 0.45;
        } else if (highlighted) {
          material.emissive.set("#e2ee36");
          material.emissiveIntensity = 0.28;
        } else {
          material.emissive.set("#000000");
          material.emissiveIntensity = 0;
        }
      }

      material.needsUpdate = true;
    });
  });
}

function AnatomyModel({
  mode,
  selectedPartName,
  onPartHover,
  onPartMove,
  onPartLeave,
  onPartSelect,
}) {
  const { scene } = useGLTF(MODEL_PATH);

  const hoveredPartRef = useRef(null);
  const selectedPartRef = useRef(null);

  const model = useMemo(() => {
    const clonedModel = clone(scene);

    clonedModel.traverse((object) => {
      if (!object.isMesh) {
        return;
      }

      object.castShadow = true;
      object.receiveShadow = true;

      if (Array.isArray(object.material)) {
        object.material = object.material.map((material) =>
          material.clone()
        );
      } else if (object.material) {
        object.material = object.material.clone();
      }
    });

    return clonedModel;
  }, [scene]);

  useEffect(() => {
    const muscles = model.getObjectByName("Muscles");
    const skeleton = model.getObjectByName("Skeleton");

    if (muscles) {
      muscles.visible =
        mode === "both" || mode === "muscles";
    }

    if (skeleton) {
      skeleton.visible =
        mode === "both" || mode === "skeleton";
    }

    if (
      hoveredPartRef.current &&
      !hoveredPartRef.current.visible
    ) {
      setPartHighlight(hoveredPartRef.current, false);
      hoveredPartRef.current = null;
      onPartLeave();
    }
  }, [model, mode, onPartLeave]);

  useEffect(() => {
    if (selectedPartRef.current) {
      setPartHighlight(selectedPartRef.current, false);
    }

    const selectedObject = selectedPartName
      ? model.getObjectByName(selectedPartName)
      : null;

    selectedPartRef.current = selectedObject;

    if (selectedObject) {
      setPartHighlight(selectedObject, false, true);
    }
  }, [model, selectedPartName]);

  const handlePointerMove = (event) => {
    event.stopPropagation();

    const part = findInteractivePart(event.object);

    if (!part) {
      if (hoveredPartRef.current) {
        if (
          hoveredPartRef.current !== selectedPartRef.current
        ) {
          setPartHighlight(
            hoveredPartRef.current,
            false
          );
        }

        hoveredPartRef.current = null;
        onPartLeave();
      }

      document.body.style.cursor = "default";
      return;
    }

    if (hoveredPartRef.current !== part) {
      if (
        hoveredPartRef.current &&
        hoveredPartRef.current !== selectedPartRef.current
      ) {
        setPartHighlight(
          hoveredPartRef.current,
          false
        );
      }

      hoveredPartRef.current = part;

      if (part !== selectedPartRef.current) {
        setPartHighlight(part, true);
      }

      onPartHover(part.name, event);
    } else {
      onPartMove(event);
    }

    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (event) => {
    event.stopPropagation();

    if (
      hoveredPartRef.current &&
      hoveredPartRef.current !== selectedPartRef.current
    ) {
      setPartHighlight(
        hoveredPartRef.current,
        false
      );
    }

    hoveredPartRef.current = null;
    document.body.style.cursor = "default";
    onPartLeave();
  };

  const handleClick = (event) => {
    event.stopPropagation();

    const part = findInteractivePart(event.object);

    if (part) {
      onPartSelect(part.name);
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <primitive
      object={model}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    />
  );
}

function CameraController({
  resetSignal,
  controlsRef,
}) {
  const { camera } = useThree();
  const previousResetSignal = useRef(resetSignal);

  const resetCamera = () => {
    camera.position.copy(DEFAULT_CAMERA_POSITION);
    camera.up.set(0, 1, 0);
    camera.lookAt(DEFAULT_CAMERA_TARGET);
    camera.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.target.copy(
        DEFAULT_CAMERA_TARGET
      );

      controlsRef.current.update();
    }
  };

  useEffect(() => {
    resetCamera();

    if (controlsRef.current) {
      controlsRef.current.saveState();
    }
  }, [camera]);

  useEffect(() => {
    if (
      previousResetSignal.current === resetSignal
    ) {
      return;
    }

    previousResetSignal.current = resetSignal;
    resetCamera();
  }, [resetSignal, camera]);

  return null;
}

function AnatomyInfoPanel({
  selectedPartName,
  onClose,
}) {
  if (!selectedPartName) {
    return (
      <aside className="anatomy-info-panel anatomy-info-panel-empty">
        <div className="anatomy-info-empty-icon">
          ◉
        </div>

        <h2>Select a region</h2>

        <p>
          Click a highlighted anatomy region to learn
          more about it.
        </p>
      </aside>
    );
  }

  const info = anatomyData[selectedPartName];

  if (!info) {
    return null;
  }

  return (
    <aside className="anatomy-info-panel">
      <button
        type="button"
        className="anatomy-info-close"
        onClick={onClose}
        aria-label="Close information panel"
      >
        ×
      </button>

      <p className="anatomy-info-system">
        {info.system}
      </p>

      <h2>{info.title}</h2>

      <p className="anatomy-info-description">
        {info.description}
      </p>

      <div className="anatomy-info-divider" />

      <h3>Key facts</h3>

      <ul>
        {info.facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
    </aside>
  );
}

export default function AnatomyViewer({
  mode = "both",
  resetSignal = 0,
  onReset,
}) {
  const controlsRef = useRef(null);
  const viewerRef = useRef(null);

  const [selectedPartName, setSelectedPartName] =
    useState(null);

  const [hoverInfo, setHoverInfo] = useState({
    visible: false,
    name: "",
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!selectedPartName) {
      return;
    }

    const skeletonParts = [
      "Skull",
      "RibCage",
      "Spine",
      "Pelvis",
      "LeftArm",
      "RightArm",
      "LeftLeg",
      "RightLeg",
    ];

    const isSkeletonPart =
      skeletonParts.includes(selectedPartName);

    if (
      (mode === "skeleton" && !isSkeletonPart) ||
      (mode === "muscles" && isSkeletonPart)
    ) {
      setSelectedPartName(null);
    }
  }, [mode, selectedPartName]);

  const getTooltipCoordinates = (event) => {
    if (!viewerRef.current) {
      return { x: 0, y: 0 };
    }

    const bounds =
      viewerRef.current.getBoundingClientRect();

    return {
      x: event.clientX - bounds.left + 16,
      y: event.clientY - bounds.top + 16,
    };
  };

  const handlePartHover = (name, event) => {
    const coordinates =
      getTooltipCoordinates(event);

    setHoverInfo({
      visible: true,
      name,
      ...coordinates,
    });
  };

  const handlePartMove = (event) => {
    const coordinates =
      getTooltipCoordinates(event);

    setHoverInfo((current) => ({
      ...current,
      ...coordinates,
    }));
  };

  const handlePartLeave = () => {
    setHoverInfo((current) => ({
      ...current,
      visible: false,
    }));
  };

  return (
    <div
      ref={viewerRef}
      className="anatomy-viewer-layout"
    >
      <div className="anatomy-viewer">
        <Canvas
          shadows
          camera={{
            position:
              DEFAULT_CAMERA_POSITION.toArray(),
            fov: 35,
            near: 0.01,
            far: 1000,
          }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping:
              THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.85,
          }}
          onCreated={({ gl }) => {
            gl.outputColorSpace =
              THREE.SRGBColorSpace;
          }}
          onPointerMissed={() => {
            setSelectedPartName(null);
            handlePartLeave();
          }}
        >
          <CameraController
            resetSignal={resetSignal}
            controlsRef={controlsRef}
          />

          <hemisphereLight
            intensity={0.75}
            color="#ffffff"
            groundColor="#160d22"
          />

          <directionalLight
            position={[5, 7, 6]}
            intensity={1.35}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          <directionalLight
            position={[-4, 3, 4]}
            intensity={0.5}
          />

          <directionalLight
            position={[0, 4, -5]}
            intensity={0.65}
          />

          <Suspense fallback={<LoadingMessage />}>
            <AnatomyModel
              mode={mode}
              selectedPartName={selectedPartName}
              onPartHover={handlePartHover}
              onPartMove={handlePartMove}
              onPartLeave={handlePartLeave}
              onPartSelect={setSelectedPartName}
            />

            <Environment
              preset="studio"
              environmentIntensity={0.25}
            />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            makeDefault
            enableRotate
            enableZoom
            enablePan
            enableDamping
            dampingFactor={0.08}
            mouseButtons={{
              LEFT: THREE.MOUSE.ROTATE,
              MIDDLE: THREE.MOUSE.DOLLY,
              RIGHT: THREE.MOUSE.PAN,
            }}
            minDistance={0.15}
            maxDistance={20}
            zoomSpeed={1.05}
            rotateSpeed={0.45}
            panSpeed={0.65}
            screenSpacePanning
            zoomToCursor
          />
        </Canvas>

        {hoverInfo.visible && (
          <div
            className="anatomy-hover-tooltip"
            style={{
              left: hoverInfo.x,
              top: hoverInfo.y,
            }}
          >
            {formatPartName(hoverInfo.name)}
          </div>
        )}

        {onReset && (
          <button
            type="button"
            className="anatomy-reset-button"
            onClick={onReset}
          >
            ↻ Reset View
          </button>
        )}

        <div className="anatomy-viewer-instructions">
          <span>Left drag to rotate</span>
          <span>Right drag to move</span>
          <span>Scroll to zoom</span>
        </div>
      </div>

      <AnatomyInfoPanel
        selectedPartName={selectedPartName}
        onClose={() => setSelectedPartName(null)}
      />
    </div>
  );
}

useGLTF.preload(MODEL_PATH);