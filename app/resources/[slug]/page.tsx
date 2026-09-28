import { ResourcePage } from '@/components/orchestra/ResourcePage';
import { notFound } from 'next/navigation';
const slugs=['handbook','elementary','contact','auction','donate','calendar'];
export const dynamicParams=false;
export function generateStaticParams(){return slugs.map(slug=>({slug}))}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!slugs.includes(slug))notFound();return <ResourcePage slug={slug}/>}
