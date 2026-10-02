'use client';
import {SiteLink,SiteAnchor,SiteImage} from './SiteContent';
import {SiteText} from './SiteContent';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight, Download, BookOpen } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import HandbookReader from './HandbookReader';
import elementary from '@/lib/elementary-links.json';
import mascots from '@/lib/school-mascots.json';
const schoolMascots:Record<string,{src:string;alt:string}>=mascots;
import { SchoolClassInformation } from './SchoolClassInformation';
import {assetPath} from '@/lib/assets';

export function HandbookContent(){
  return <>
    <div className="resource-intro"><span className="eyebrow"><SiteText editable={false} fallback="THE STUDENT & FAMILY GUIDE"/></span><h1><SiteText fallback="Orchestra Handbook"/></h1><p><SiteText fallback="Instruments, rehearsals, performances, and being part of the McKay orchestra community—all in one place."/></p></div>
    <div className="edition-note"><BookOpen size={22}/><div><strong><SiteText fallback="2021–2022 edition · Archived handbook"/></strong><p><SiteText fallback="This is the edition published on the original website. Dates and grading policies below are historical. Contact the director for the current year’s requirements."/></p></div></div>
    <div className="resource-actions"><SiteAnchor className="button primary" href={assetPath('/documents/mckay-handbook-2021-22.pdf')} download><Download size={16}/><SiteText fallback=" Download original PDF"/></SiteAnchor><SiteLink className="button" href="/resources/contact"><SiteText fallback="Ask the director "/><ArrowUpRight size={16}/></SiteLink></div>
    <HandbookReader/>
  </>;
}

export function RentalResources(){return <section className="rental-section"><span className="eyebrow"><SiteText editable={false} fallback="YOUR FIRST INSTRUMENT"/></span><h2><SiteText fallback="Instrument rentals & supplies"/></h2><p><SiteText fallback="These local shops are listed by the orchestra program. Contact a shop for current availability, pricing, and hours."/></p><div className="rental-grid"><article><h3><SiteText fallback="Willamette Valley Music"/></h3><p><SiteText fallback="484 State St"/><br/><SiteText fallback="Salem, OR 97301"/></p><SiteAnchor href="tel:+15033858790"><Phone size={16}/><SiteText fallback="503-385-8790"/></SiteAnchor><SiteAnchor href="https://www.wvmc.net/" target="_blank" rel="noreferrer"><SiteText fallback="Visit store website "/><ArrowUpRight size={16}/></SiteAnchor></article><article><h3><SiteText fallback="Uptown Music"/></h3><p><SiteText fallback="3827 River Rd N"/><br/><SiteText fallback="Keizer, OR 97303"/></p><SiteAnchor href="tel:+15033934437"><Phone size={16}/><SiteText fallback="503-393-4437"/></SiteAnchor><SiteAnchor href="https://www.uptownmusicnw.com/" target="_blank" rel="noreferrer"><SiteText fallback="Visit store website "/><ArrowUpRight size={16}/></SiteAnchor></article></div><p className="support-note"><SiteText fallback="Need help getting an instrument or supplies? "/><SiteLink href="/resources/contact"><SiteText fallback="Talk with the orchestra director."/></SiteLink></p></section>}

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
   <div className="resource-intro"><span className="eyebrow"><SiteText editable={false} fallback="ELEMENTARY ORCHESTRAS"/></span><h1><SiteText fallback="First notes."/><br/><em><SiteText fallback="Endless possibilities."/></em></h1><p><SiteText fallback="Find your school’s class information, hear the instruments, and get ready to make music."/></p></div>
   <section className="school-section"><div className="section-heading"><div><span className="eyebrow"><SiteText editable={false} fallback="START WITH YOUR SCHOOL"/></span><h2><SiteText fallback="Find your orchestra class."/></h2></div></div><div className="school-grid">{elementary.schools.map(item=><button key={item.label} onClick={()=>{setSchool(item.label);setSelection(value=>value+1);}} aria-pressed={school===item.label}><span className="school-mascot"><SiteImage src={assetPath(schoolMascots[item.label].src)} alt={schoolMascots[item.label].alt} width={64} height={64} loading="lazy"/></span><span className="school-card-name"><SiteText fallback={item.label.charAt(0)+item.label.slice(1).toLowerCase()}/><small><SiteText fallback="Elementary orchestra"/></small></span><ArrowUpRight size={17}/></button>)}</div>{school&&<div ref={classCard} style={{scrollMarginTop:24}}><SchoolClassInformation key={school} school={school} onClose={()=>setSchool(null)}/></div>}</section>
   <section className="instrument-section"><span className="eyebrow"><SiteText editable={false} fallback="FIND YOUR SOUND"/></span><h2><SiteText fallback="Hear the instruments."/></h2><p><SiteText fallback="Explore the demonstration videos selected by the orchestra program."/></p><Tabs defaultValue="VIOLIN"><TabsList className="h-auto flex-wrap justify-start gap-2 p-2 mt-5">{elementary.videos.map(video=><TabsTrigger className="px-5 py-3" value={video.label} key={video.label}><SiteText fallback={video.label.charAt(0)+video.label.slice(1).toLowerCase()}/></TabsTrigger>)}</TabsList>{elementary.videos.map(video=><TabsContent value={video.label} key={video.label}><iframe className="instrument-video" src={'https://www.youtube-nocookie.com/embed/'+video.url.split('/').pop()} title={video.label+' demonstration'} loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/><SiteAnchor className="under-link mt-4" href={video.url} target="_blank" rel="noreferrer"><SiteText fallback="Watch "/><SiteText fallback={video.label.toLowerCase()}/><SiteText fallback=" demonstration on YouTube ↗"/></SiteAnchor></TabsContent>)}</Tabs></section>
   <RentalResources/>
 </>;
}

export function ContactContent(){return <>
  <div className="resource-intro"><span className="eyebrow"><SiteText editable={false} fallback="CONTACT THE ORCHESTRA"/></span><h1><SiteText fallback="Let’s make"/><br/><em><SiteText fallback="a connection."/></em></h1><p><SiteText fallback="Questions about joining, performances, instruments, or your student’s orchestra experience? Start here."/></p></div>
  <div className="contact-grid"><article className="director-card"><span className="eyebrow"><SiteText editable={false} fallback="ORCHESTRA DIRECTOR"/></span><h2><SiteText fallback="Alex Figueroa"/></h2><p><SiteText fallback="For program questions, attendance concerns, and instrument support, email the director."/></p><SiteAnchor className="contact-email" href="mailto:figueroa_alexander@salkeiz.k12.or.us"><Mail size={20}/><span><SiteText fallback="figueroa_alexander@salkeiz.k12.or.us"/></span></SiteAnchor><SiteAnchor className="button primary" href="mailto:figueroa_alexander@salkeiz.k12.or.us?subject=McKay%20Orchestra%20Question"><SiteText fallback="Email Alex Figueroa "/><ArrowUpRight size={16}/></SiteAnchor></article><article className="school-contact"><span className="eyebrow"><SiteText editable={false} fallback="McKAY HIGH SCHOOL"/></span><h2><SiteText fallback="Visit & call"/></h2><address><MapPin size={20}/><span><SiteText fallback="2440 Lancaster Drive NE"/><br/><SiteText fallback="Salem, OR 97305"/></span></address><SiteAnchor className="office-phone" href="tel:+15033993080"><Phone size={20}/><span><SiteText fallback="503-399-3080"/><small><SiteText fallback="Main office"/></small></span></SiteAnchor><SiteAnchor className="button" href="https://www.google.com/maps/search/?api=1&query=McKay%20High%20School%202440%20Lancaster%20Drive%20NE%20Salem%20OR%2097305" target="_blank" rel="noreferrer"><SiteText fallback="Get directions "/><ArrowUpRight size={16}/></SiteAnchor></article></div>
  <div className="contact-help"><BookOpen size={26}/><div><h3><SiteText fallback="Looking for a quick answer?"/></h3><p><SiteText fallback="Browse the "/><SiteLink href="/resources/handbook"><SiteText fallback="orchestra handbook"/></SiteLink><SiteText fallback=", explore "/><SiteLink href="/resources/elementary"><SiteText fallback="elementary classes"/></SiteLink><SiteText fallback=", or check the "/><SiteLink href="/#calendar"><SiteText fallback="performance calendar"/></SiteLink>.</p></div></div>
</>}

