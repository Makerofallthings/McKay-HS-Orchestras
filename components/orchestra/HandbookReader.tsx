'use client';
import {SiteLink,SiteAnchor,SiteImage} from './SiteContent';
import {SiteText,SiteParagraphs} from './SiteContent';
import {useRef,useState} from 'react';
import {handbookSections,historicalConcerts} from '@/lib/handbook';
import {assetPath} from '@/lib/assets';
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from '@/components/ui/accordion';

export default function HandbookReader(){
 const [page,setPage]=useState(0);
 const [contentsOpen,setContentsOpen]=useState(false);
 const heading=useRef<HTMLHeadingElement>(null);
 const titles=[...handbookSections.map(s=>s.title),'2021–2022 concert dates','Original handbook PDF'];
 const chapter=handbookSections[page];
 const go=(next:number)=>{setPage(next);setContentsOpen(false);requestAnimationFrame(()=>{heading.current?.focus({preventScroll:true});});};
 return <div className="handbook-layout">
  <button className="mobile-guide-toggle" aria-expanded={contentsOpen} aria-controls="handbook-contents" onClick={()=>setContentsOpen(value=>!value)}><SiteText fallback="Browse handbook chapters "/><span aria-hidden="true"><SiteText fallback={contentsOpen?'−':'+'}/></span></button>
  <nav id="handbook-contents" className={'handbook-index'+(contentsOpen?' is-open':'')} aria-label="Handbook chapters"><span className="eyebrow"><SiteText fallback="IN THIS GUIDE"/></span>{titles.map((title,index)=><button key={title} aria-current={page===index?'page':undefined} onClick={()=>go(index)}><span><SiteText fallback={String(index+1).padStart(2,'0')}/></span><SiteText fallback={title}/></button>)}</nav>
  <div className="handbook-reader">
   <span className="chapter-number"><SiteText fallback="PAGE "/>{page+1}<SiteText fallback=" OF "/>{titles.length}</span><div data-edit-block="handbook-chapter"><h2 ref={heading} tabIndex={-1}><SiteText fallback={titles[page]}/></h2>
   <div className="handbook-chapters">
    {chapter?<section key={chapter.id}><SiteParagraphs paragraphs={chapter.paragraphs}/>{chapter.items&&<ul>{chapter.items.map(item=><li key={item}><SiteText fallback={item}/></li>)}</ul>}</section>:page===handbookSections.length?<section><p><SiteText fallback="These dates belong to the archived 2021–2022 edition. For upcoming performances, use the "/><SiteAnchor href="/#calendar" className="underline"><SiteText fallback="live calendar"/></SiteAnchor>.</p><Accordion type="single" collapsible><AccordionItem value="dates"><AccordionTrigger><SiteText fallback="Show historical concert schedule"/></AccordionTrigger><AccordionContent>{historicalConcerts.map(([date,title])=><div className="historical-event" key={date}><span><SiteText fallback={date}/></span><strong><SiteText fallback={title}/></strong></div>)}</AccordionContent></AccordionItem></Accordion></section>:<div className="embedded-document"><p><SiteText fallback="The complete original nine-page document."/></p><iframe src={assetPath('/documents/mckay-handbook-2021-22.pdf')} title="Original 2021–2022 McKay orchestra handbook" loading="lazy"/></div>}
   </div>
   </div><nav className="handbook-pagination" aria-label="Handbook pages"><button className="button" disabled={page===0} onClick={()=>go(page-1)}><SiteText fallback="← Previous"/></button><span className="handbook-page-count"><SiteText fallback="Page "/>{page+1}<SiteText fallback=" of "/>{titles.length}</span><button className="button primary" disabled={page===titles.length-1} onClick={()=>go(page+1)}><SiteText fallback="Next →"/></button></nav>
  </div>
 </div>;
}


