'use client';

import { Component, useEffect, useMemo, useRef, useState, useCallback, type ReactNode } from 'react';
import { Canvas, useThree, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Color, OrthographicCamera, NoToneMapping, CanvasTexture, SRGBColorSpace, Vector3 } from 'three';
import type { Section } from '@/lib/orchestra-data';
import { createSeats, conductorZ, sectionLayout, type Seat } from '@/lib/seating';
import ConcertHall from './ConcertHall';
import SeatRoster, {useSeatRoster} from './SeatRoster';

export { createSeats } from '@/lib/seating';
const PRINCIPAL_RED = '#ff404b';
const noRaycast = () => null;

function FitCamera({resetVersion}:{resetVersion:number}) {
  const { camera, size, invalidate, controls } = useThree();
  useEffect(() => {
    if (camera instanceof OrthographicCamera) {
      camera.position.set(0,22,13);
      camera.zoom = Math.min(size.width / 29, size.height / 19);
      camera.lookAt(0,1,-1.3);
      camera.updateProjectionMatrix();
      const orbit=controls as unknown as {target:Vector3;update:()=>void}|null;
      if(orbit){orbit.target.set(0,1,-1.3);orbit.update();}
      invalidate();
    }
  }, [camera, size.width, size.height, invalidate, controls, resetVersion]);
  return null;
}

// Labels stay inside WebGL. No nested React roots or manually reparented DOM.
function StageLabel({text,color,position}:{text:string;color:string;position:[number,number,number]}) {
  const texture=useMemo(()=>{
    const canvas=document.createElement('canvas');canvas.width=512;canvas.height=112;
    const context=canvas.getContext('2d');
    if(!context)return null;
    context.font='600 33px Arial';context.textAlign='center';context.textBaseline='middle';
    context.shadowColor='#000';context.shadowBlur=6;
    context.fillStyle=color;context.fillText(text,256,56);
    const map=new CanvasTexture(canvas);map.colorSpace=SRGBColorSpace;return map;
  },[text,color]);
  useEffect(()=>()=>texture?.dispose(),[texture]);
  return texture?<sprite position={position} scale={[2.75,.6,1]} raycast={noRaycast} renderOrder={10}>
    <spriteMaterial map={texture} transparent depthTest={false} depthWrite={false} toneMapped={false}/>
  </sprite>:null;
}

function Chair({ seat, color, dimmed, onHover, onLeave, onSelect }: {
  seat: Seat;
  color: string;
  dimmed: boolean;
  onHover: (seat: Seat | null) => void;
  onLeave: (seat: Seat) => void;
  onSelect: (seat: Seat) => void;
}) {
  const principal = seat.role === 'Principal';
  // Principals remain red even while another section is isolated.
  const chairColor = principal ? PRINCIPAL_RED : dimmed ? new Color(color).multiplyScalar(.23) : color;
  const hover = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    onHover(seat);
  };
  return <group position={seat.position} rotation={[0,seat.rotation,0]}>
    <mesh position={[0,.55,0]} castShadow raycast={noRaycast}>
      <boxGeometry args={[.68,.13,.66]}/>
      <meshStandardMaterial color={chairColor} roughness={.85} />
    </mesh>
    <mesh position={[0,.98,-.28]} castShadow raycast={noRaycast}>
      <boxGeometry args={[.68,.72,.12]}/>
      <meshStandardMaterial color={chairColor} roughness={.85}/>
    </mesh>
    {[-.25,.25].flatMap(x=>[-.24,.24].map(z=><mesh key={`${x}-${z}`} position={[x,.24,z]} raycast={noRaycast}>
      <boxGeometry args={[.06,.48,.06]}/><meshStandardMaterial color={dimmed?'#354139':'#8ea298'} roughness={.6}/>
    </mesh>))}
    {seat.role === 'Co-principal' && <mesh position={[0,1.25,-.205]} raycast={noRaycast}>
      <boxGeometry args={[.47,.07,.02]}/><meshBasicMaterial color="#fff1bc"/>
    </mesh>}
    {/* One stable raycast target prevents flicker between seat/back/leg meshes. */}
    <mesh position={[0,.72,0]} onPointerOver={hover} onPointerMove={hover}
      onPointerOut={()=>onLeave(seat)} onClick={event=>{event.stopPropagation();if(event.delta<=5)onSelect(seat)}}>
      <boxGeometry args={[.83,1.46,.86]}/>
      <meshBasicMaterial transparent opacity={0} depthWrite={false}/>
    </mesh>
  </group>;
}

class StageBoundary extends Component<{children:ReactNode},{failed:boolean}> {
  state = {failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed ? <p className="p-10">The 3D stage is unavailable on this device. Every section and seating role is listed below.</p> : this.props.children;}
}

export default function Orchestra3DSeating({sections,ensembleId='default'}:{sections:Section[];ensembleId?:string}) {
  const [selectedSeat,setSelectedSeat] = useState<Seat|null>(null);
  const {roster,save,error}=useSeatRoster(ensembleId);
  const [hoveredSeat,setHoveredSeat] = useState<Seat|null>(null);
  const [hoveredSection,setHoveredSection] = useState<string|null>(null);
  const [selected,setSelected] = useState<string|null>(null);
  const [reset,setReset] = useState(0);
  const hoverOwner = useRef<Seat|null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>|null>(null);
  const dragging = useRef(false);
  const cancelTimer = useCallback(()=>{if(hoverTimer.current!==null){clearTimeout(hoverTimer.current);hoverTimer.current=null;}},[]);
  const clearHover = useCallback(()=>{cancelTimer();hoverOwner.current=null;setHoveredSeat(null);},[cancelTimer]);
  const enterSeat = useCallback((seat:Seat|null)=>{
    if(dragging.current||!seat)return;
    if(hoverOwner.current?.id===seat.id)return;
    cancelTimer();
    hoverOwner.current=seat;
    // Briefly settle the nearest hit before changing sections.
    hoverTimer.current=setTimeout(()=>{setHoveredSeat(seat);hoverTimer.current=null;},65);
  },[cancelTimer]);
  const leaveSeat = useCallback((seat:Seat)=>{
    // An outgoing hit must never clear a newer chair's hover state.
    if(hoverOwner.current?.id!==seat.id)return;
    cancelTimer();hoverOwner.current=null;
    hoverTimer.current=setTimeout(()=>{if(!hoverOwner.current)setHoveredSeat(null);hoverTimer.current=null;},150);
  },[cancelTimer]);
  useEffect(()=>()=>cancelTimer(),[cancelTimer]);
  const seats = useMemo(()=>createSeats(sections),[sections]);
  const active = selected ?? hoveredSection ?? hoveredSeat?.sectionId;
  const focus = sections.find(section=>section.id===active);
  const select = (id:string) => {clearHover();setSelectedSeat(null);setHoveredSection(null);setSelected(previous=>previous===id?null:id);};
  const selectSeat=(seat:Seat)=>{clearHover();setHoveredSection(null);setSelected(seat.sectionId);setSelectedSeat(seat);};
  const detailSeat=hoveredSeat?.sectionId===active?hoveredSeat:selectedSeat;
  const player=detailSeat?roster[detailSeat.id]:undefined;

  useEffect(()=>{
    const context=(document as Document & {modelContext?:{registerTool:(tool:unknown,options:unknown)=>unknown}}).modelContext;
    if(!context?.registerTool)return;
    const lifecycle=new AbortController();
    try {
      Promise.resolve(context.registerTool({
        name:'get_orchestra_sections',
        description:'Read the current ensemble section counts and row arrangements. These are demonstration rosters.',
        inputSchema:{type:'object',properties:{},additionalProperties:false},
        annotations:{readOnlyHint:true},
        execute:(input:unknown)=>{
          if(!input || typeof input!=='object' || Array.isArray(input) || Object.keys(input).length) throw new Error('Expected an empty object.');
          return {sections,total:seats.length,principalColor:PRINCIPAL_RED,isDemo:true};
        },
      },{signal:lifecycle.signal})).catch(()=>{});
    } catch {}
    return ()=>lifecycle.abort();
  },[sections,seats.length]);

  return <div className="stage-shell">
    <div className="stage-status"><span>INTERACTIVE STAGE · {seats.length} MUSICIANS</span><span>Section seating · Demonstration layout</span></div>
    <div className="stage-canvas mt-5" onPointerLeave={clearHover}>
      <StageBoundary><Canvas orthographic shadows dpr={[1,1.5]} frameloop="demand"
        camera={{position:[0,22,13],zoom:30,near:.1,far:100}}
        gl={{antialias:true,toneMapping:NoToneMapping}}
        fallback={<p className="p-10">Use the section controls below if your device does not support WebGL.</p>}>
        <FitCamera resetVersion={reset}/>
        <ambientLight intensity={.8}/>
        <hemisphereLight args={['#ffe8c7','#1a2923',1]}/>
        <directionalLight position={[-4,15,8]} intensity={1.7} color="#ffe9ce" castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-14} shadow-camera-right={14} shadow-camera-top={14} shadow-camera-bottom={-14} shadow-normalBias={.04}/>
        <ConcertHall/>
        <mesh position={[0,-.03,conductorZ]} raycast={noRaycast}>
          <boxGeometry args={[1.65,.12,1.2]}/><meshStandardMaterial color="#a38960"/>
        </mesh>
        <StageLabel text="CONDUCTOR" color="#d1c4a5" position={[0,.15,conductorZ+1.2]}/>
        {focus&&<StageLabel text={focus.name} color={focus.color} position={focus.id==='bass'?[2.5,1.6,-4.9]:sectionLayout[focus.id].label}/>}
        {seats.map(seat=><Chair key={seat.id} seat={seat} color={sections.find(s=>s.id===seat.sectionId)!.color}
          dimmed={!!active&&active!==seat.sectionId} onHover={enterSeat} onLeave={leaveSeat} onSelect={selectSeat}/>)}
        <OrbitControls makeDefault target={[0,1,-1.3]} enablePan={false} enableDamping={false}
          minZoom={12} maxZoom={85} minPolarAngle={.2} maxPolarAngle={Math.PI/2}
          onStart={()=>{dragging.current=true;clearHover();}} onEnd={()=>{dragging.current=false;}}/>
      </Canvas></StageBoundary>
      <div className="stage-tip" role="status" aria-live="polite">
        <strong>{focus?`${focus.name} · ${focus.count} members`:'A clearer view of every section.'}</strong>
        <span>{detailSeat?`${player?`${player.name} · Grade ${player.grade}`:'Unassigned player'} · Seat ${detailSeat.number} · ${detailSeat.role}`:focus?`${selected?'Pinned · ':''}Rows: ${focus.rows.join(' – ')}`:'Hover a chair or select an instrument below.'}</span>
      </div>
      <span className="stage-hint">Drag to orbit · Scroll to zoom · Tap a chair for player details</span>
    </div>
    <div className="stage-legend" aria-label="Instrument sections">
      {sections.map(section=><button key={section.id} aria-pressed={selected===section.id}
        onClick={()=>select(section.id)} onMouseEnter={()=>{clearHover();setHoveredSection(section.id);}} onMouseLeave={()=>setHoveredSection(null)}>
        <i style={{background:section.color}}/>{section.name} <span className="ml-2 opacity-70">{section.count}</span>
      </button>)}
      <button onClick={()=>{setSelected(null);setSelectedSeat(null);setHoveredSection(null);clearHover();setReset(value=>value+1);}}>Reset view</button>
    </div>
    <label className="block text-sm my-3">Player details <select className="ml-3 rounded border border-white/20 bg-[#17251e] p-2 max-w-full" aria-label="Select a seat for player details" value={selectedSeat?.id||''} onChange={event=>{const seat=seats.find(s=>s.id===event.target.value);if(seat)selectSeat(seat);else setSelectedSeat(null);}}><option value="">Choose a chair…</option>{seats.map(seat=><option key={seat.id} value={seat.id}>{sections.find(s=>s.id===seat.sectionId)?.name} · Seat {seat.number}{roster[seat.id]?` · ${roster[seat.id].name}`:''}</option>)}</select></label>
    {selectedSeat&&<SeatRoster key={selectedSeat.id} seat={selectedSeat} player={roster[selectedSeat.id]} onSave={save} error={error} onClose={()=>setSelectedSeat(null)}/>}
    <div className="seat-key"><span><i style={{background:PRINCIPAL_RED}}/>Principal · front outside chair</span><span><i className="co-principal-mark"/>Co-principal · adjacent chair, cream stripe</span></div>
  </div>;
}
