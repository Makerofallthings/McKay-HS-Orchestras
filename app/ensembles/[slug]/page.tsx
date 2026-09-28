import { EnsemblePage } from '@/components/orchestra/EnsemblePage';
import { ensembles } from '@/lib/orchestra-data';
import { notFound } from 'next/navigation';
export function generateStaticParams(){return ensembles.map(({slug})=>({slug}))}
export const dynamicParams=false;
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!ensembles.some(e=>e.slug===slug))notFound();return <EnsemblePage slug={slug}/>}
