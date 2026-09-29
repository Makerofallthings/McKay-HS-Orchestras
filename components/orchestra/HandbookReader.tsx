'use client';
import {useRef,useState} from 'react';
import {handbookSections,historicalConcerts} from '@/lib/handbook';
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from '@/components/ui/accordion';

export default function HandbookReader(){
 const [page,setPage]=useState(0);
 const heading=useRef<HTMLHeadingElement>(null);
 const titles=[...handbookSections.map(s=>s.title),'2021–2022 concert dates','Original handbook PDF'];
 const chapter=handbookSections[page];
 const go=(next:number)=>{setPage(next);requestAnimationFrame(()=>{heading.current?.focus({preventScroll:true});heading.current?.scrollIntoView({behavior:'instant',block:'start'});});};
 return <div className="handbook-layout">
  <nav className="handbook-index" aria-label="Handbook chapters"><span className="eyebrow">IN THIS GUIDE</span>{titles.map((title,index)=><button key={title} aria-current={page===index?'page':undefined} onClick={()=>go(index)}><span>{String(index+1).padStart(2,'0')}</span>{title}</button>)}</nav>
  <div className="handbook-reader">
   <span className="chapter-number">PAGE {page+1} OF {titles.length}</span><h2 ref={heading} tabIndex={-1}>{titles[page]}</h2>
   <div className="handbook-chapters">
    {chapter?<section key={chapter.id}>{chapter.paragraphs.map(p=><p key={p}>{p}</p>)}{chapter.items&&<ul>{chapter.items.map(item=><li key={item}>{item}</li>)}</ul>}</section>:page===handbookSections.length?<section><p>These dates belong to the archived 2021–2022 edition. For upcoming performances, use the <a href="/#calendar" className="underline">live calendar</a>.</p><Accordion type="single" collapsible><AccordionItem value="dates"><AccordionTrigger>Show historical concert schedule</AccordionTrigger><AccordionContent>{historicalConcerts.map(([date,title])=><div className="historical-event" key={date}><span>{date}</span><strong>{title}</strong></div>)}</AccordionContent></AccordionItem></Accordion></section>:<div className="embedded-document"><p>The complete original nine-page document.</p><iframe src="/documents/mckay-handbook-2021-22.pdf" title="Original 2021–2022 McKay orchestra handbook" loading="lazy"/></div>}
   </div>
   <nav className="handbook-pagination" aria-label="Handbook pages"><button className="button" disabled={page===0} onClick={()=>go(page-1)}>← Previous</button><label>Page <select aria-label="Go to handbook page" value={page} onChange={e=>go(Number(e.target.value))}>{titles.map((title,index)=><option key={title} value={index}>{index+1} · {title}</option>)}</select></label><button className="button primary" disabled={page===titles.length-1} onClick={()=>go(page+1)}>Next →</button></nav>
  </div>
 </div>;
}
