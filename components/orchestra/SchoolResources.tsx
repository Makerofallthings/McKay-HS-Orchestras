'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight, Download, BookOpen } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import HandbookReader from './HandbookReader';
import elementary from '@/lib/elementary-links.json';
import mascots from '@/lib/school-mascots.json';
const schoolMascots:Record<string,{src:string;alt:string}>=mascots;
import { SchoolClassInformation } from './SchoolClassInformation';

export function HandbookContent(){
  return <>
    <div className="resource-intro"><span className="eyebrow">THE STUDENT & FAMILY GUIDE</span><h1>Orchestra Handbook</h1><p>Instruments, rehearsals, performances, and being part of the McKay orchestra community—all in one place.</p></div>
    <div className="edition-note"><BookOpen size={22}/><div><strong>2021–2022 edition · Archived handbook</strong><p>This is the edition published on the original website. Dates and grading policies below are historical. Contact the director for the current year’s requirements.</p></div></div>
    <div className="resource-actions"><a className="button primary" href="/documents/mckay-handbook-2021-22.pdf" download><Download size={16}/> Download original PDF</a><Link className="button" href="/resources/contact">Ask the director <ArrowUpRight size={16}/></Link></div>
    <HandbookReader/>
  </>;
}

export function RentalResources(){return <section className="rental-section"><span className="eyebrow">YOUR FIRST INSTRUMENT</span><h2>Instrument rentals & supplies</h2><p>These local shops are listed by the orchestra program. Contact a shop for current availability, pricing, and hours.</p><div className="rental-grid"><article><h3>Willamette Valley Music</h3><p>484 State St<br/>Salem, OR 97301</p><a href="tel:+15033858790"><Phone size={16}/>503-385-8790</a><a href="https://www.wvmc.net/" target="_blank" rel="noreferrer">Visit store website <ArrowUpRight size={16}/></a></article><article><h3>Uptown Music</h3><p>3827 River Rd N<br/>Keizer, OR 97303</p><a href="tel:+15033934437"><Phone size={16}/>503-393-4437</a><a href="https://www.uptownmusicnw.com/" target="_blank" rel="noreferrer">Visit store website <ArrowUpRight size={16}/></a></article></div><p className="support-note">Need help getting an instrument or supplies? <Link href="/resources/contact">Talk with the orchestra director.</Link></p></section>}

export function ElementaryContent(){
 const [school,setSchool]=useState<string|null>(null);
 const [selection,setSelection]=useState(0);
 const classCard=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!school)return;
  // Scroll after React has rendered the selected school's details.
  const frame=requestAnimationFrame(()=>{
   classCard.current?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
  return ()=>cancelAnimationFrame(frame);
 },[school,selection]);
 return <>
   <div className="resource-intro"><span className="eyebrow">ELEMENTARY ORCHESTRAS</span><h1>First notes.<br/><em>Endless possibilities.</em></h1><p>Find your school’s class information, hear the instruments, and get ready to make music.</p></div>
   <section className="school-section"><div className="section-heading"><div><span className="eyebrow">START WITH YOUR SCHOOL</span><h2>Find your orchestra class.</h2></div></div><div className="school-grid">{elementary.schools.map(item=><button key={item.label} onClick={()=>{setSchool(item.label);setSelection(value=>value+1);}} aria-pressed={school===item.label}><span className="school-mascot"><img src={schoolMascots[item.label].src} alt={schoolMascots[item.label].alt} width={64} height={64} loading="lazy"/></span><span className="school-card-name">{item.label.charAt(0)+item.label.slice(1).toLowerCase()}<small>Elementary orchestra</small></span><ArrowUpRight size={17}/></button>)}</div>{school&&<div ref={classCard} style={{scrollMarginTop:24}}><SchoolClassInformation key={school} school={school} onClose={()=>setSchool(null)}/></div>}</section>
   <section className="instrument-section"><span className="eyebrow">FIND YOUR SOUND</span><h2>Hear the instruments.</h2><p>Explore the demonstration videos selected by the orchestra program.</p><Tabs defaultValue="VIOLIN"><TabsList className="h-auto flex-wrap justify-start gap-2 p-2 mt-5">{elementary.videos.map(video=><TabsTrigger className="px-5 py-3" value={video.label} key={video.label}>{video.label.charAt(0)+video.label.slice(1).toLowerCase()}</TabsTrigger>)}</TabsList>{elementary.videos.map(video=><TabsContent value={video.label} key={video.label}><iframe className="instrument-video" src={'https://www.youtube-nocookie.com/embed/'+video.url.split('/').pop()} title={video.label+' demonstration'} loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/><a className="under-link mt-4" href={video.url} target="_blank" rel="noreferrer">Watch {video.label.toLowerCase()} demonstration on YouTube ↗</a></TabsContent>)}</Tabs></section>
   <RentalResources/>
 </>;
}

export function ContactContent(){return <>
  <div className="resource-intro"><span className="eyebrow">CONTACT THE ORCHESTRA</span><h1>Let’s make<br/><em>a connection.</em></h1><p>Questions about joining, performances, instruments, or your student’s orchestra experience? Start here.</p></div>
  <div className="contact-grid"><article className="director-card"><span className="eyebrow">ORCHESTRA DIRECTOR</span><h2>Alex Figueroa</h2><p>For program questions, attendance concerns, and instrument support, email the director.</p><a className="contact-email" href="mailto:figueroa_alexander@salkeiz.k12.or.us"><Mail size={20}/><span>figueroa_alexander@salkeiz.k12.or.us</span></a><a className="button primary" href="mailto:figueroa_alexander@salkeiz.k12.or.us?subject=McKay%20Orchestra%20Question">Email Alex Figueroa <ArrowUpRight size={16}/></a></article><article className="school-contact"><span className="eyebrow">McKAY HIGH SCHOOL</span><h2>Visit & call</h2><address><MapPin size={20}/><span>2440 Lancaster Drive NE<br/>Salem, OR 97305</span></address><a className="office-phone" href="tel:+15033993080"><Phone size={20}/><span>503-399-3080<small>Main office</small></span></a><a className="button" href="https://www.google.com/maps/search/?api=1&query=McKay%20High%20School%202440%20Lancaster%20Drive%20NE%20Salem%20OR%2097305" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16}/></a></article></div>
  <div className="contact-help"><BookOpen size={26}/><div><h3>Looking for a quick answer?</h3><p>Browse the <Link href="/resources/handbook">orchestra handbook</Link>, explore <Link href="/resources/elementary">elementary classes</Link>, or check the <Link href="/#calendar">performance calendar</Link>.</p></div></div>
</>}
