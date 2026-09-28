'use client';
import { Component, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Canvas, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { Section } from '@/lib/orchestra-data';

export type Seat = {id:string;sectionId:string;position:[number,number,number];rotation:number};
// Place a chair for each player in concentric semicircular rows, facing the conductor.
export function createSeats(sections:Section[]):Seat[]{
 return sections.flatMap((section,sectionIndex)=>Array.from({length:section.count},(_,i)=>{
   const row=Math.floor(i/3), slot=i%3, inRow=Math.min(3,section.count-row*3);
   const angle=Math.PI*.93-(sectionIndex+(slot+.5)/inRow)*(Math.PI*.86/sections.length);
   const radius=4+row*1.4;
   return {id:`${section.id}-${i+1}`,sectionId:section.id,position:[Math.cos(angle)*radius,0,-Math.sin(angle)*radius+2.4],rotation:angle-Math.PI/2};
 }));
}
function Chair({seat,color,dimmed,onHover,onSelect}:{seat:Seat;color:string;dimmed:boolean;onHover:(id:string|null)=>void;onSelect:(id:string)=>void}){
 const material={color:dimmed?'#2b3831':color,roughness:.58,metalness:.15};
 const hover=(event:ThreeEvent<PointerEvent>)=>{event.stopPropagation();onHover(seat.sectionId)};
 return <group position={seat.position} rotation={[0,seat.rotation,0]} onPointerOver={hover} onPointerOut={()=>onHover(null)} onClick={e=>{e.stopPropagation();onSelect(seat.sectionId)}}>
   <mesh position={[0,.57,0]} castShadow><boxGeometry args={[.64,.13,.65]}/><meshStandardMaterial {...material}/></mesh>
   <mesh position={[0,.97,-.29]} castShadow><boxGeometry args={[.64,.69,.11]}/><meshStandardMaterial {...material}/></mesh>
   {[-.25,.25].flatMap(x=>[-.24,.24].map(z=><mesh key={`${x}-${z}`} position={[x,.26,z]}><boxGeometry args={[.055,.52,.055]}/><meshStandardMaterial color={dimmed?'#243128':'#84978a'} metalness={.7} roughness={.35}/></mesh>))}
 </group>
}
class StageBoundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?<div className="p-10 text-center">The 3D stage is unavailable on this device. Explore all section counts using the buttons below.</div>:this.props.children}}
export default function Orchestra3DSeating({sections}:{sections:Section[]}){
 const [hovered,setHovered]=useState<string|null>(null),[selected,setSelected]=useState<string|null>(null),[reset,setReset]=useState(0);
 const active=hovered??selected, seats=useMemo(()=>createSeats(sections),[sections]);
 const focus=sections.find(s=>s.id===active);
 const select=(id:string)=>setSelected(previous=>previous===id?null:id);
 useEffect(()=>{
   const context=(document as Document & {modelContext?:{registerTool:(tool:unknown,options:unknown)=>unknown}}).modelContext;
   if(!context?.registerTool)return;
   const lifecycle=new AbortController();
   try{Promise.resolve(context.registerTool({name:'get_orchestra_sections',description:'Read the visible ensemble section counts. These are illustrative roster totals.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:()=>({sections,total:seats.length,isDemo:true})},{signal:lifecycle.signal})).catch(()=>{});}catch{}
   return ()=>lifecycle.abort();
 },[sections,seats.length]);
 return <div className="stage-shell"><div className="stage-status"><span>INTERACTIVE STAGE · {seats.length} MUSICIANS</span><span>Illustrative seating · No student names are displayed</span></div><div className="stage-canvas mt-5" onMouseLeave={()=>setHovered(null)}>
 <StageBoundary><Canvas key={reset} shadows dpr={[1,1.5]} frameloop="demand" camera={{position:[0,12,14],fov:42}} fallback={<p className="p-10">WebGL is unavailable. Use the section buttons below.</p>} onPointerMissed={()=>setSelected(null)}>
   <ambientLight intensity={1.2}/><directionalLight position={[-5,12,5]} intensity={2.2} castShadow shadow-mapSize={[1024,1024]}/><pointLight position={[6,6,-4]} intensity={35} color="#bce7cd"/>
   <mesh position={[0,-.19,-.4]} receiveShadow><cylinderGeometry args={[8.7,8.7,.35,80]}/><meshStandardMaterial color="#303e32" roughness={.9}/></mesh>
   <mesh position={[0,.03,2.7]} receiveShadow><boxGeometry args={[1.45,.2,1.1]}/><meshStandardMaterial color="#977b52"/></mesh>
   {seats.map(seat=><Chair key={seat.id} seat={seat} color={sections.find(s=>s.id===seat.sectionId)!.color} dimmed={!!active&&active!==seat.sectionId} onHover={setHovered} onSelect={select}/>)}
   <OrbitControls makeDefault target={[0,0,-.6]} minDistance={10} maxDistance={28} minPolarAngle={.18} maxPolarAngle={Math.PI/2.35} enablePan={false}/>
 </Canvas></StageBoundary>
 <div className="stage-tip" role="status" aria-live="polite"><strong>{focus?focus.name:'Every chair has a part to play.'}</strong><span>{focus?`${focus.count} members`:'Hover a chair or choose a section below.'}</span></div><span className="stage-hint">Drag to rotate · Scroll to zoom · Tap a chair to isolate</span></div>
 <div className="stage-legend" aria-label="Instrument sections">{sections.map(s=><button key={s.id} aria-pressed={selected===s.id} onClick={()=>select(s.id)} onFocus={()=>setHovered(s.id)} onBlur={()=>setHovered(null)} onMouseEnter={()=>setHovered(s.id)} onMouseLeave={()=>setHovered(null)}><i style={{background:s.color}}/>{s.name} <span className="ml-2 opacity-70">{s.count}</span></button>)}<button onClick={()=>{setSelected(null);setHovered(null);setReset(x=>x+1)}}>Reset view</button></div>
 </div>
}
