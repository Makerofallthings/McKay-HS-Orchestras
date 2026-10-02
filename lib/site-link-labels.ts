import {siteConfig} from './orchestra-data';
import elementary from './elementary-links.json';
export function linkDescription(key:string):{label:string;location:string}{
 const known:Record<string,[string,string]>={
 [siteConfig.paypalUrl]:['Support the music · Donate with PayPal · Continue to PayPal','Header / Homepage fundraising'],
 [siteConfig.ticketUrl]:['Concerts & tickets','Homepage concert section'],
 [siteConfig.auctionUrl]:['Early access silent auction','Homepage / Auction page'],
 [siteConfig.officialUrl]:['Official orchestra website','Program resources'],
 [siteConfig.handbookUrl]:['Read the current handbook','Handbook resources'],
 [siteConfig.calendarSubscriptionUrl]:['View the official calendar','Calendar resources'],
 [siteConfig.twitterProfileUrl]:['McKay Orchestras on X','Header / Footer'],
 '/':['Home · McKAY High School Orchestras','Header / Footer / Back links'],
 '/resources/calendar':['Calendar · Experience the music','Header / Homepage'],
 '/resources/handbook':['Orchestra Handbook · orchestra handbook','Header / Contact'],
 '/resources/contact':['Contact Us · Get in touch · Ask the director','Header / Footer / Resources'],
 '/resources/elementary':['Elementary Orchestras · elementary classes','Header / Contact'],
 '#ensembles':['Meet our ensembles','Homepage hero'], '#welcome':['Discover McKay','Homepage hero'],
 'tel:+15033858790':['503-385-8790','Elementary / Willamette Valley Music'],
 'https://www.wvmc.net/':['Visit store website','Elementary / Willamette Valley Music'],
 'tel:+15033934437':['503-393-4437','Elementary / Uptown Music'],
 'https://www.uptownmusicnw.com/':['Visit store website','Elementary / Uptown Music'],
 'tel:+15033993080':['503-399-3080','Contact / Main office'],
 'mailto:figueroa_alexander@salkeiz.k12.or.us':['Email the orchestra director','Header / Footer / Contact']};
 elementary.schools.forEach(s=>{known[s.url]=[s.label+' original class sheet','Elementary / '+s.label]});
 elementary.videos.forEach(v=>{known[v.url]=['Watch '+v.label.toLowerCase()+' demonstration on YouTube','Elementary / Instrument demonstrations']});
 if(known[key])return {label:known[key][0],location:known[key][1]};
 if(key.includes('maps/search'))return {label:'Get directions',location:'Contact / McKay High School'};
 if(key.startsWith('mailto:'))return {label:key.includes('subject=')?'Email Alex Figueroa':key.slice(7).split('?')[0],location:'Contact / Teacher email'};
 if(key.includes('/documents/elementary/'))return {label:'Download original class sheet',location:'Elementary / '+key.split('/').pop()?.replace('.pdf','')};
 if(key.includes('/ensembles/'))return {label:key.split('/').filter(Boolean).pop()!.replaceAll('-',' '),location:'Homepage ensemble cards / Navigation'};
 if(key.includes('mckay-handbook'))return {label:'Download original PDF',location:'Handbook'};
 return {label:key.replace(/^https?:\/\//,'').split(/[?#]/)[0],location:'Website resource'};
}
