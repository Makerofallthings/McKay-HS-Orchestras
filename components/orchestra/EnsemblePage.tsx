'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Header, Footer } from './HomePage';
import { ensembles } from '@/lib/orchestra-data';
const Stage=dynamic(()=>import('./Orchestra3DSeating'),{ssr:false,loading:()=> <div className="stage-shell"><div className="stage-canvas grid place-items-center">Preparing the stage…</div></div>});
export function EnsemblePage({slug}:{slug:string}){const ensemble=ensembles.find(e=>e.slug===slug)!;return <><Header/><main><div className="page-heading"><Link className="eyebrow" href="/#ensembles">← OUR ENSEMBLES</Link><h1>{ensemble.name}</h1><p>Explore the sound, one section at a time. Step onto our interactive stage and discover how every musician contributes to the whole.</p></div><Stage key={slug} ensembleId={slug} sections={ensemble.sections}/></main><Footer/></>}
