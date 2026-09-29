'use client';
import {useEffect,useState} from 'react';
import type {Seat} from '@/lib/seating';
export type Player = {name:string;grade:9|10|11|12};
export type Roster = Record<string,Player>;
export function useSeatRoster(ensembleId:string) {
  const [roster,setRoster]=useState<Roster>({});
  const [error,setError]=useState('');
  const key=`mckay-seat-roster:${ensembleId}`;
  useEffect(()=>{
    try {
      const saved=JSON.parse(localStorage.getItem(key)||'{}');
      const valid:Roster={};
      for(const [id,p] of Object.entries(saved)) {
        const player=p as Player;
        if(player && typeof player.name==='string' && [9,10,11,12].includes(player.grade))valid[id]=player;
      }
      setRoster(valid);
    }catch{setRoster({});}
  },[key]);
  function save(id:string,player:Player|null) {
    const next={...roster};
    if(player)next[id]=player;else delete next[id];
    setRoster(next);
    try{localStorage.setItem(key,JSON.stringify(next));setError('');}
    catch{setError('Saved for this visit only; browser storage is unavailable.');}
  }
  return {roster,save,error};
}
export default function SeatRoster({seat,player,onSave,onClose,error}:{seat:Seat;player?:Player;onSave:(id:string,player:Player|null)=>void;onClose:()=>void;error:string}) {
  const [editing,setEditing]=useState(false);
  return <div className="rounded-lg border border-white/15 bg-[#17251e] p-5 mt-4">
    <div className="flex justify-between gap-4"><div><strong>{player?.name||'Unassigned seat'}</strong><p className="text-sm">{player?`Grade ${player.grade} · `:''}Seat {seat.number} · {seat.role}</p></div><button onClick={onClose} aria-label="Close player details">✕</button></div>
    {!editing?<button className="text-sm underline mt-3" onClick={()=>setEditing(true)}>{player?'Edit assignment':'Assign a player'}</button>:<form className="flex flex-wrap items-end gap-3 mt-4" onSubmit={event=>{event.preventDefault();const data=new FormData(event.currentTarget);const name=String(data.get('name')||'').trim();if(!name)return;onSave(seat.id,{name,grade:Number(data.get('grade')) as Player['grade']});setEditing(false);}}>
      <label className="text-sm">Player name<input name="name" required maxLength={80} defaultValue={player?.name||''} className="block rounded border border-white/20 bg-black/30 p-2"/></label>
      <label className="text-sm">Grade<select name="grade" defaultValue={player?.grade||9} className="block rounded border border-white/20 bg-[#17251e] p-2">{[9,10,11,12].map(grade=><option key={grade}>{grade}</option>)}</select></label>
      <button type="submit" className="button primary">Save</button><button type="button" onClick={()=>setEditing(false)}>Cancel</button>
      {player&&<button type="button" className="text-sm underline" onClick={()=>{onSave(seat.id,null);setEditing(false);}}>Clear assignment</button>}
    </form>}
    <p className="text-xs mt-3">Assignments are saved in this browser for this ensemble. They are not published to the school roster.</p>
    {error&&<p role="status">{error}</p>}
  </div>;
}
