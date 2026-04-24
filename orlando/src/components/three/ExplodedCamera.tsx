import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { gsap } from "gsap";
import type { Group, Mesh } from "three";

interface CameraPartProps {
  position: [number, number, number];
  explodedOffset: [number, number, number];
  explodeRef: React.MutableRefObject<number>;
  children: React.ReactNode;
}

function CameraPart({ position, explodedOffset, explodeRef, children }: CameraPartProps) {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const t = explodeRef.current;
    groupRef.current.position.x = position[0] + explodedOffset[0] * t;
    groupRef.current.position.y = position[1] + explodedOffset[1] * t;
    groupRef.current.position.z = position[2] + explodedOffset[2] * t;
  });

  return <group ref={groupRef}>{children}</group>;
}

function CameraRig({
  explodeRef,
  mobile,
}: {
  explodeRef: React.MutableRefObject<number>;
  mobile: boolean;
}) {
  const rigRef = useRef<Group>(null);
  const bodyRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!rigRef.current) return;
    const t = state.clock.getElapsedTime();
    // Subtle idle rotation, plus pointer-driven tilt
    const { x, y } = state.pointer;
    rigRef.current.rotation.y = x * 0.4 + Math.sin(t * 0.3) * 0.1;
    rigRef.current.rotation.x = -y * 0.25 + Math.sin(t * 0.4) * 0.05;
  });

  // Mobile explodes vertically (Y axis), desktop on Z/X
  const axisZ = mobile ? 0 : 1;
  const axisY = mobile ? 1 : 0.2;

  return (
    <group ref={rigRef}>
      {/* Main body */}
      <CameraPart
        position={[0, 0, 0]}
        explodedOffset={[0, 0, 0]}
        explodeRef={explodeRef}
      >
        <mesh ref={bodyRef} castShadow receiveShadow>
          <boxGeometry args={[2.4, 1.5, 0.9]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.85}
            roughness={0.35}
          />
        </mesh>
        {/* Body top bevel */}
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[1.8, 0.3, 0.85]} />
          <meshStandardMaterial color="#0f0f0f" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Grip ridge */}
        <mesh position={[-0.95, -0.15, 0.46]}>
          <boxGeometry args={[0.5, 1.2, 0.05]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.7} />
        </mesh>
      </CameraPart>

      {/* Lens barrel (outer) */}
      <CameraPart
        position={[0.25, -0.05, 0.7]}
        explodedOffset={[0, axisY * -0.4, axisZ * 1.6]}
        explodeRef={explodeRef}
      >
        <mesh castShadow>
          <cylinderGeometry args={[0.7, 0.7, 0.55, 48]} />
          <meshStandardMaterial
            color="#1f1f1f"
            metalness={0.9}
            roughness={0.25}
          />
          <group rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
        {/* Ridged focus ring */}
        <mesh>
          <cylinderGeometry args={[0.74, 0.74, 0.14, 64]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.6}
            roughness={0.9}
          />
        </mesh>
      </CameraPart>

      {/* Lens mid section */}
      <CameraPart
        position={[0.25, -0.05, 1.05]}
        explodedOffset={[0, axisY * -0.8, axisZ * 2.6]}
        explodeRef={explodeRef}
      >
        <mesh>
          <cylinderGeometry args={[0.6, 0.6, 0.35, 48]} />
          <meshStandardMaterial
            color="#151515"
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>
      </CameraPart>

      {/* Front lens glass */}
      <CameraPart
        position={[0.25, -0.05, 1.3]}
        explodedOffset={[0, axisY * -1.2, axisZ * 3.6]}
        explodeRef={explodeRef}
      >
        <mesh>
          <cylinderGeometry args={[0.52, 0.52, 0.12, 48]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.2}
            roughness={0.05}
          />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
          <circleGeometry args={[0.48, 48]} />
          <meshStandardMaterial
            color="#223344"
            metalness={0.95}
            roughness={0.05}
            emissive="#1a2838"
            emissiveIntensity={0.15}
          />
        </mesh>
      </CameraPart>

      {/* Internal sensor (behind body, revealed on explode) */}
      <CameraPart
        position={[0.25, -0.05, -0.55]}
        explodedOffset={[0, axisY * 0.4, axisZ * -1.6]}
        explodeRef={explodeRef}
      >
        <mesh>
          <boxGeometry args={[0.8, 0.6, 0.05]} />
          <meshStandardMaterial
            color="#c6a664"
            metalness={0.95}
            roughness={0.25}
            emissive="#332211"
            emissiveIntensity={0.2}
          />
        </mesh>
      </CameraPart>

      {/* Dial left (shutter speed) */}
      <CameraPart
        position={[-0.6, 0.95, 0]}
        explodedOffset={[axisZ * -0.8, axisY * 0.8, 0]}
        explodeRef={explodeRef}
      >
        <mesh>
          <cylinderGeometry args={[0.22, 0.22, 0.22, 32]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.8}
            roughness={0.4}
          />
        </mesh>
      </CameraPart>

      {/* Dial right (mode) */}
      <CameraPart
        position={[0.85, 0.95, 0]}
        explodedOffset={[axisZ * 0.8, axisY * 0.8, 0]}
        explodeRef={explodeRef}
      >
        <mesh>
          <cylinderGeometry args={[0.22, 0.22, 0.22, 32]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.8}
            roughness={0.4}
          />
        </mesh>
      </CameraPart>

      {/* Hot shoe (center top) */}
      <CameraPart
        position={[0.15, 1.15, 0]}
        explodedOffset={[0, axisY * 1.6, axisZ * 0.3]}
        explodeRef={explodeRef}
      >
        <mesh>
          <boxGeometry args={[0.5, 0.12, 0.35]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.7}
            roughness={0.5}
          />
        </mesh>
      </CameraPart>

      {/* Viewfinder (back) */}
      <CameraPart
        position={[-0.3, 0.3, -0.48]}
        explodedOffset={[axisZ * -0.6, axisY * 0.2, axisZ * -1.2]}
        explodeRef={explodeRef}
      >
        <mesh>
          <boxGeometry args={[0.35, 0.25, 0.18]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.4}
            roughness={0.8}
          />
        </mesh>
      </CameraPart>

      {/* Shutter button */}
      <CameraPart
        position={[-0.75, 0.85, 0.3]}
        explodedOffset={[axisZ * -1.2, axisY * 1.0, 0.4]}
        explodeRef={explodeRef}
      >
        <mesh>
          <cylinderGeometry args={[0.1, 0.12, 0.1, 24]} />
          <meshStandardMaterial
            color="#8a8a8a"
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>
      </CameraPart>
    </group>
  );
}

export function ExplodedCamera() {
  const explodeRef = useRef(0);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const obj = { t: 0 };

    const handlePointer = (e: PointerEvent) => {
      const nx = Math.abs(e.clientX / window.innerWidth - 0.5) * 2;
      const ny = Math.abs(e.clientY / window.innerHeight - 0.5) * 2;
      const target = Math.min(1, Math.max(nx, ny));
      gsap.to(obj, {
        t: target,
        duration: 0.9,
        ease: "power3.out",
        onUpdate: () => {
          explodeRef.current = obj.t;
        },
      });
    };

    const handleScroll = () => {
      const progress = Math.min(
        1,
        window.scrollY / (window.innerHeight * 0.8)
      );
      gsap.to(obj, {
        t: progress,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
        onUpdate: () => {
          explodeRef.current = obj.t;
        },
      });
    };

    window.addEventListener("pointermove", handlePointer);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.4, 5.5], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, -2, 3]} intensity={0.5} color="#aabbff" />
      <spotLight position={[0, 4, 4]} intensity={0.8} angle={0.6} penumbra={0.5} />
      <Environment preset="city" />
      <CameraRig explodeRef={explodeRef} mobile={mobile} />
    </Canvas>
  );
}
