'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Header, Footer } from './HomePage';
import { ensembles } from '@/lib/orchestra-data';
const Stage=dynamic(()=>import('./Orchestra3DSeating'),{ssr:false,loading:()=> <div className="stage-shell"><div className="stage-canvas grid place-items-center">Preparing the stage…</div></div>});
export function EnsemblePage({slug}:{slug:string}){const ensemble=ensembles.find(e=>e.slug===slug)!;return <><Header/><main><div className="page-heading"><Link className="eyebrow" href="/#ensembles">← OUR ENSEMBLES</Link><h1>{ensemble.name}</h1><p>Explore the sound, one section at a time. Step onto our interactive stage and discover how every musician contributes to the whole.</p></div><Stage sections={ensemble.sections}/><section className="section-wrap border-t border-white/10"><span className="eyebrow">UNDER THE DIRECTION OF ALEX FIGUEROA</span><h2 className="mt-4">A shared love of music.</h2><p className="mt-5 max-w-2xl">Part of McKay’s five-ensemble orchestra program. Visit the program’s official website for current rehearsal information, repertoire, and placement details.</p><Link className="button primary mt-6" href="https://www.mckayorchestras.com/" target="_blank" rel="noreferrer">Program information ↗</Link></section></main><Footer/></>}
