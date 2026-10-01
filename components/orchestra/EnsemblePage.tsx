'use client';
import {SiteLink,SiteAnchor,SiteImage} from './SiteContent';
import {SiteText} from './SiteContent';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Header, Footer } from './HomePage';
import { ensembles } from '@/lib/orchestra-data';
const Stage=dynamic(()=>import('./Orchestra3DSeating'),{ssr:false,loading:()=> <div className="stage-shell"><div className="stage-canvas grid place-items-center"><SiteText fallback="Preparing the stage…"/></div></div>});
export function EnsemblePage({slug}:{slug:string}){const ensemble=ensembles.find(e=>e.slug===slug)!;return <><Header/><main><div className="page-heading"><SiteLink className="eyebrow" href="/#ensembles"><SiteText fallback="← OUR ENSEMBLES"/></SiteLink><h1><SiteText fallback={ensemble.name}/></h1><p><SiteText fallback="Explore the sound, one section at a time. Step onto our interactive stage and discover how every musician contributes to the whole."/></p></div><Stage key={slug} ensembleId={slug} sections={ensemble.sections}/></main><Footer/></>}
