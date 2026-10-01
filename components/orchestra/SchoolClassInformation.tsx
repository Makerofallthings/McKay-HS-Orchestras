'use client';
import {SiteLink,SiteAnchor,SiteImage} from './SiteContent';
import {SiteText} from './SiteContent';
import { schoolDetails } from '@/lib/elementary-classes';
import {useState} from 'react';
import {assetPath} from '@/lib/assets';
export function SchoolClassInformation({school,onClose}:{school:string;onClose:()=>void}){
 const info=schoolDetails[school];
 const [showOriginal,setShowOriginal]=useState(false);
 return <section className="school-detail" aria-label={`${school} class information`}>
  <div className="flex items-center justify-between gap-4"><h3><SiteText fallback={school.charAt(0)+school.slice(1).toLowerCase()}/><SiteText fallback=" class information"/></h3><button className="button" onClick={onClose}><SiteText fallback="Close"/></button></div>
  <p className="school-edition"><SiteText fallback="Migrated class sheet · Year not specified. These are the published details, not a verified current schedule. Contact the listed teacher to confirm dates and times."/></p>
  <div className="class-grid">{info.classes.map((item,index)=><article key={index}>
    <span className="eyebrow"><SiteText fallback={item.grade}/><SiteText fallback=" ORCHESTRA"/></span>
    <h4><SiteText fallback={item.location||'School orchestra class'}/></h4>
    <div className="class-teachers">{item.teachers.map(teacher=><div key={teacher.email}><strong><SiteText fallback={teacher.name}/></strong><SiteAnchor href={'mailto:'+teacher.email}><SiteText fallback={teacher.email}/></SiteAnchor></div>)}</div>
    <span className="class-caption"><SiteText fallback="CLASS TIMES"/></span><ul>{item.schedule.map(line=><li key={line}><SiteText fallback={line}/></li>)}</ul>
    <p className="class-start"><SiteText fallback="Listed start: "/><SiteText fallback={item.starts}/></p>
  </article>)}</div>
  {info.transport&&<div className="transport-details"><h4><SiteText fallback="Getting to orchestra & home"/></h4>{info.transport.map(line=><p key={line}><SiteText fallback={line}/></p>)}</div>}
  <div className="resource-actions class-sheet-actions"><SiteAnchor className="button primary" href={assetPath('/documents/elementary/'+school.toLowerCase()+'.pdf')} download><SiteText fallback="Download original class sheet ↓"/></SiteAnchor><button className="button" aria-expanded={showOriginal} aria-controls="original-class-sheet" onClick={()=>setShowOriginal(value=>!value)}><SiteText fallback={showOriginal?'Hide':'View'}/><SiteText fallback=" original class sheet "/><SiteText fallback={showOriginal?'−':'+'}/></button></div>
  {showOriginal&&<div id="original-class-sheet" className="class-sheet-viewer"><iframe title={school+' original class sheet'} src={assetPath('/documents/elementary/'+school.toLowerCase()+'.pdf')}/></div>}
 </section>
}
