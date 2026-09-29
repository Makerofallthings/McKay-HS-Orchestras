export const ensembleNames = ['Advanced Symphony', 'Chamber Ensemble', 'Symphony Strings', 'String Ensemble', 'Concert Orchestra'];
export const slugify = (name: string) => name.toLowerCase().replaceAll(' ', '-');
export type Section = { id:string; name:string; color:string; count:number; rows:number[] };
const sections = [
 {id:'violin1',name:'1st Violins',color:'#45c2ff',count:4,rows:[2,2]},
 {id:'violin2',name:'2nd Violins',color:'#4e78ff',count:10,rows:[2,4,4]},
 {id:'viola',name:'Violas',color:'#be77ff',count:5,rows:[2,3]},
 {id:'cello',name:'Cellos',color:'#df9a4b',count:6,rows:[2,2,2]},
 {id:'bass',name:'Basses',color:'#983c5d',count:4,rows:[4]},
];
// User-requested demonstration seating, shared across the five ensemble pages.
// Basses sit four across behind the violas, with their chairs turned diagonally.
export const ensembles = ensembleNames.map(name=>({name,slug:slugify(name),sections:sections.map(s=>({...s,rows:[...s.rows]}))}));
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
