'use client';

const noRaycast = () => null;

/** Lightweight architectural scenery, built entirely from reusable primitives. */
export default function ConcertHall() {
  return <group>
    <mesh position={[0,-.35,-1]} raycast={noRaycast}>
      <boxGeometry args={[25,.65,15]}/><meshStandardMaterial color="#39271b" roughness={.8}/>
    </mesh>
    {Array.from({length:38},(_,i)=><mesh key={`plank-${i}`} position={[0,-.012,6.15-i*.38]} receiveShadow raycast={noRaycast}>
      <boxGeometry args={[24.8,.04,.366]}/><meshStandardMaterial color={['#a47b50','#b58a59','#987048','#ad8153'][i%4]} roughness={.72}/>
    </mesh>)}
    {Array.from({length:11},(_,i)=><mesh key={`seam-${i}`} position={[-11+i*2.2,.013,-1]} raycast={noRaycast}>
      <boxGeometry args={[.012,.005,14.6]}/><meshStandardMaterial color="#755235"/>
    </mesh>)}
    <mesh position={[0,3.5,-8.4]} raycast={noRaycast}>
      <boxGeometry args={[25,7,.3]}/><meshStandardMaterial color="#33271f" roughness={.9}/>
    </mesh>
    {Array.from({length:19},(_,i)=><mesh key={`panel-${i}`} position={[-11.7+i*1.3,3.2,-8.15]} raycast={noRaycast}>
      <boxGeometry args={[1.18,6.3,.18]}/><meshStandardMaterial color={i%2?'#65452e':'#735035'} roughness={.8}/>
    </mesh>)}
    {[-1,1].map(side=><group key={side}>
      {Array.from({length:9},(_,i)=><mesh key={i} position={[side*(10.3+i*.28),3.5,-7.6 + Math.sin(i*1.9)*.13]} raycast={noRaycast}>
        <cylinderGeometry args={[.23,.29,7,10]}/><meshStandardMaterial color={i%2?'#123d30':'#1e503d'} roughness={1}/>
      </mesh>)}
      <mesh position={[side*12.15,3.7,-7.1]} raycast={noRaycast}>
        <boxGeometry args={[.25,7.6,.5]}/><meshStandardMaterial color="#bda36d" metalness={.55} roughness={.4}/>
      </mesh>
    </group>)}
    <mesh position={[0,7,-7.7]} raycast={noRaycast}>
      <boxGeometry args={[24.6,.8,.55]}/><meshStandardMaterial color="#194431" roughness={1}/>
    </mesh>
    <mesh position={[0,6.57,-7.35]} raycast={noRaycast}>
      <boxGeometry args={[24.5,.055,.06]}/><meshStandardMaterial color="#c5a66b" metalness={.5}/>
    </mesh>
    {[-8,-4,0,4,8].map(x=><mesh key={x} position={[x,.03,6.25]} raycast={noRaycast}>
      <boxGeometry args={[.8,.035,.06]}/><meshBasicMaterial color="#ffe1a0"/>
    </mesh>)}
  </group>;
}
