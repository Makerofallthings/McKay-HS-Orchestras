'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

export default function RouteScroll() {
  const pathname=usePathname();
  useEffect(()=>{
    // Wait until the new page is committed, then override retained scroll.
    const frame=requestAnimationFrame(()=>{
      if(window.location.hash) {
        const target=document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
        target?.scrollIntoView({behavior:'instant',block:'start'});
      } else window.scrollTo({top:0,left:0,behavior:'instant'});
    });
    return ()=>cancelAnimationFrame(frame);
  },[pathname]);
  return null;
}
