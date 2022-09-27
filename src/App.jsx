import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import studio from "@theatre/studio";
import { getProject } from "@theatre/core";
import { editable as e, SheetProvider } from "@theatre/r3f";
import { Model } from "./Model";
import { message, save } from "@tauri-apps/api/dialog";
import { writeTextFile } from "@tauri-apps/api/fs";

// initialize the studio
studio.initialize();
studio.extend(extension);
const chukSheet = getProject("Chuk Project").sheet("Chuk Sheet");

const saveFile = async () => {
  const filePath = await save();
  const json = studio.createContentOfSaveFile('Chuk Project');
  const jsonString = JSON.stringify(json);
  await writeTextFile(filePath,jsonString);
};

function App() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={saveFile}>Save</button>
      </div>
      <Canvas
        style={{
          backgroundColor: "#111a21",
          width: "100vw",
          height: "100vh",
        }}
      >
        <SheetProvider sheet={chukSheet}>
          <OrbitControls />
          <e.pointLight
            theatreKey="Light 1"
            color="green"
            intensity={2}
            position={[-1, 1, 4]}
          />
          <e.pointLight
            theatreKey="Light 2"
            color="yellow"
            intensity={1}
            position={[1, 0, -1]}
          />
          <mesh position={[1, 1, -3]}>
            <boxGeometry args={[1, 1, 4]} />
            <meshStandardMaterial color="#FFED00" />
          </mesh>
          <mesh position={[2, -2, -1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#DD5411" />
          </mesh>
          <e.mesh theatreKey="chuk" position={[-1, -0.9, 0]}>
            <Model />
          </e.mesh>
        </SheetProvider>
      </Canvas>
    </div>
  );
}

export default App;
