'use client';
import {createContext,useContext,useEffect,useState} from 'react';
import {onAuthStateChanged,type User} from 'firebase/auth';
import {doc,onSnapshot} from 'firebase/firestore';
import {firebaseServices} from '@/lib/firebase';
import Link from 'next/link';
import {assetPath} from '@/lib/assets';
export type SiteSettings={copy:Record<string,string>;links:Record<string,string>;assets:Record<string,string>;studentCount:number;enabledEnsembles:string[];version:number};
export const defaultSettings:SiteSettings={copy:{},links:{},assets:{},studentCount:150,enabledEnsembles:['chamber-ensemble','advanced-symphony','string-ensemble','concert-orchestra'],version:0};
const SiteContext=createContext({settings:defaultSettings,user:null as User|null,isAdmin:false,contentError:false});
export function SiteContentProvider({children}:{children:React.ReactNode}){
 const [settings,setSettings]=useState(defaultSettings),[user,setUser]=useState<User|null>(null),[isAdmin,setAdmin]=useState(false),[contentError,setError]=useState(false);
 useEffect(()=>{const {auth,db}=firebaseServices();let stopAdmin:(()=>void)|undefined;const stopAuth=onAuthStateChanged(auth,current=>{stopAdmin?.();setUser(current);setAdmin(false);if(current)stopAdmin=onSnapshot(doc(db,'admins',current.uid),s=>setAdmin(current.emailVerified&&s.exists()),()=>setAdmin(false))});const stopContent=onSnapshot(doc(db,'site','content'),s=>{const data=s.data();if(data){const copy=Object.fromEntries(Object.entries(data.copy??{}).filter(([,v])=>typeof v==='string')) as Record<string,string>;setSettings({links:Object.fromEntries(Object.entries(data.links??{}).filter(([,v])=>typeof v==="string")) as Record<string,string>,assets:Object.fromEntries(Object.entries(data.assets??{}).filter(([,v])=>typeof v==="string")) as Record<string,string>,version:Number.isInteger(data.version)?data.version:0,copy,studentCount:Number.isInteger(data.studentCount)?data.studentCount:150,enabledEnsembles:Array.isArray(data.enabledEnsembles)?data.enabledEnsembles:defaultSettings.enabledEnsembles})}else setSettings(defaultSettings);setError(false)},()=>setError(true));return ()=>{stopAuth();stopAdmin?.();stopContent()}},[]);
 return <SiteContext.Provider value={{settings,user,isAdmin,contentError}}>{children}</SiteContext.Provider>;
}
export function useSiteContent(){return useContext(SiteContext)}
export function SiteText({fallback}:{fallback:string}){const {settings}=useSiteContent();return <>{(settings.copy[fallback]??fallback).replaceAll("{{studentCount}}",String(settings.studentCount)).replaceAll("{{ensembleCount}}",String(settings.enabledEnsembles.length))}</>}
export function safeSiteUrl(value:string){return /^https?:\/\//i.test(value)||/^mailto:/i.test(value)||/^tel:/i.test(value)||/^webcal:\/\//i.test(value)||(/^\/(?!\/)/.test(value))||value.startsWith('#')}
export function SiteLink(props:React.ComponentProps<typeof Link>){const {settings}=useSiteContent();const original=typeof props.href==='string'?props.href:'';const replacement=settings.links[original];return <Link {...props} href={replacement&&safeSiteUrl(replacement)?replacement:props.href}/>}
export function SiteAnchor(props:React.ComponentProps<'a'>){const {settings}=useSiteContent();const replacement=settings.links[props.href??''];return <a {...props} href={replacement&&safeSiteUrl(replacement)?replacement:props.href}/>}
export function SiteImage(props:React.ComponentProps<'img'>){const {settings}=useSiteContent();const original=typeof props.src==='string'?props.src:'';const key=original.replace(/^\/McKay-HS-Orchestras(?=\/)/,'');const replacement=settings.assets[key];return <img {...props} src={replacement&&safeSiteUrl(replacement)?(replacement.startsWith("/")?assetPath(replacement):replacement):props.src}/>}
