export const ensembleNames = ['Advanced Symphony', 'Chamber Ensemble', 'Symphony Strings', 'String Ensemble', 'Concert Orchestra'];
export const slugify = (name: string) => name.toLowerCase().replaceAll(' ', '-');
export type Section = { id:string; name:string; color:string; count:number };
const sections = [
 {id:'violin1',name:'1st Violins',color:'#64a9e4'},
 {id:'violin2',name:'2nd Violins',color:'#327dbc'},
 {id:'viola',name:'Violas',color:'#af81cc'},
 {id:'cello',name:'Cellos',color:'#c68c55'},
 {id:'bass',name:'Basses',color:'#a74451'},
];
// Illustrative section sizes. Replace with the director's approved roster totals.
const counts = [[12,10,8,6,4],[8,6,4,4,2],[10,8,6,6,3],[9,8,5,5,2],[10,9,6,6,3]];
export const ensembles = ensembleNames.map((name,index)=>({ name,slug:slugify(name),sections:sections.map((s,i)=>({...s,count:counts[index][i]})) }));
export type Concert = {id:string;title:string;start:string;end:string;location:string};
export const concerts:Concert[]=[
 {id:'bach',title:'Bach & Mendelssohn (sample event)',start:'2026-10-16T02:00:00Z',end:'2026-10-16T03:30:00Z',location:'McKay High School Auditorium, Salem, Oregon'},
 {id:'winter',title:'Winter concert (sample event)',start:'2026-12-11T03:00:00Z',end:'2026-12-11T04:30:00Z',location:'McKay High School Auditorium, Salem, Oregon'},
 {id:'spring',title:'Spring strings showcase (sample event)',start:'2027-03-19T02:00:00Z',end:'2027-03-19T03:30:00Z',location:'McKay High School Auditorium, Salem, Oregon'},
];
export const siteConfig = {
 officialUrl:'https://www.mckayorchestras.com/',
 // Approved public media and verified official links belong here, never secrets.
 heroVideoUrl:'',
 tracks:[] as {title:string;subtitle:string;url:string}[],
 paypalUrl:'https://www.paypal.com/donate/?hosted_button_id=F4KB33NLGKSEE', ticketUrl:'https://www.eventbrite.com/e/bach-mendelssohn-tradition-and-transformation-tickets-1979884052498', auctionUrl:'https://givebutter.com/c/mckay-music-program-silent-auction-May1st', handbookUrl:'https://www.mckayorchestras.com/orchestra-handbook',
 calendarEmbedUrl:"https://www.google.com/calendar/embed?color=%23145e39&color=%234986e7&color=%23959ca7&color=%23ac725e&color=%23cd74e6&color=%23eac95e&color=%23f83a22&src=4ks24hq1pf0l4r0c47eraantvs@group.calendar.google.com&src=8ru7jb2q0p5j759qmhak4772oo@group.calendar.google.com&src=ad72ih83dgq54dk8e87tltvp4s@group.calendar.google.com&src=c9ldttnkheqn2r6hfbv6n2k1kc@group.calendar.google.com&src=hcvg4jioi03sk46pcsen90eje0@group.calendar.google.com&src=k6gbin7dag6dpgkmsc6udvcle8@group.calendar.google.com&src=mckayhsorchestra@gmail.com&mode=AGENDA&ctz=America%2FLos_Angeles", calendarSubscriptionUrl:'https://www.mckayorchestras.com/calendar', twitterProfileUrl:'https://twitter.com/McKayOrchestras',
 campaign:{raised:1200,goal:5000,isDemo:true},
};
