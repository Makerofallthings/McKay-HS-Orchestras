'use client';
import { schoolDetails } from '@/lib/elementary-classes';
import {useState} from 'react';
import {assetPath} from '@/lib/assets';
export function SchoolClassInformation({school,onClose}:{school:string;onClose:()=>void}){
 const info=schoolDetails[school];
 const [showOriginal,setShowOriginal]=useState(false);
 return <section className="school-detail" aria-label={`${school} class information`}>
  <div className="flex items-center justify-between gap-4"><h3>{school.charAt(0)+school.slice(1).toLowerCase()} class information</h3><button className="button" onClick={onClose}>Close</button></div>
  <p className="school-edition">Migrated class sheet · Year not specified. These are the published details, not a verified current schedule. Contact the listed teacher to confirm dates and times.</p>
  <div className="class-grid">{info.classes.map((item,index)=><article key={index}>
    <span className="eyebrow">{item.grade} ORCHESTRA</span>
    <h4>{item.location||'School orchestra class'}</h4>
    <div className="class-teachers">{item.teachers.map(teacher=><div key={teacher.email}><strong>{teacher.name}</strong><a href={'mailto:'+teacher.email}>{teacher.email}</a></div>)}</div>
    <span className="class-caption">CLASS TIMES</span><ul>{item.schedule.map(line=><li key={line}>{line}</li>)}</ul>
    <p className="class-start">Listed start: {item.starts}</p>
  </article>)}</div>
  {info.transport&&<div className="transport-details"><h4>Getting to orchestra & home</h4>{info.transport.map(line=><p key={line}>{line}</p>)}</div>}
  <div className="resource-actions class-sheet-actions"><a className="button primary" href={assetPath('/documents/elementary/'+school.toLowerCase()+'.pdf')} download>Download original class sheet ↓</a><button className="button" aria-expanded={showOriginal} aria-controls="original-class-sheet" onClick={()=>setShowOriginal(value=>!value)}>{showOriginal?'Hide':'View'} original class sheet {showOriginal?'−':'+'}</button></div>
  {showOriginal&&<div id="original-class-sheet" className="class-sheet-viewer"><iframe title={school+' original class sheet'} src={assetPath('/documents/elementary/'+school.toLowerCase()+'.pdf')}/></div>}
 </section>
}
