import {collection,onSnapshot,query,where} from 'firebase/firestore';
import {firebaseServices} from './firebase';
import type {ProgramEvent} from './program-calendar';
export type CalendarEvent=ProgramEvent&{published:boolean};
export const categories=['Concert','Festival','Trip','Rehearsal'] as const;
export function isCalendarEvent(value:unknown):value is Omit<CalendarEvent,'id'>{
 if(!value||typeof value!=='object')return false;
 const e=value as Record<string,unknown>;
 return typeof e.title==='string'&&e.title.trim().length>0&&typeof e.location==='string'&&categories.includes(e.category as typeof categories[number])&&typeof e.startsAt==='string'&&Number.isFinite(Date.parse(e.startsAt))&&typeof e.endsAt==='string'&&Date.parse(e.endsAt)>Date.parse(e.startsAt)&&typeof e.published==='boolean';
}
export function watchEvents(admin:boolean,onEvents:(events:CalendarEvent[])=>void,onError:(error:Error)=>void){
 const ref=collection(firebaseServices().db,'events');
 return onSnapshot(admin?ref:query(ref,where('published','==',true)),snapshot=>{onEvents(snapshot.docs.flatMap(doc=>{const data=doc.data();return isCalendarEvent(data)?[{...data,id:doc.id}]:[]}).sort((a,b)=>a.startsAt.localeCompare(b.startsAt)))},onError);
}
