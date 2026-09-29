import {Mail} from 'lucide-react';
import {siteConfig} from '@/lib/orchestra-data';
export default function SocialLinks(){return <div className="social-links">
 <a href={siteConfig.twitterProfileUrl} target="_blank" rel="noreferrer" aria-label="McKay Orchestras on X" title="McKay Orchestras on X"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.2-9.4L.8 2h6.5l4.5 6.7L18.9 2ZM17.9 20h1.8L6.3 4H4.4l13.5 16Z"/></svg></a>
 <a href="mailto:figueroa_alexander@salkeiz.k12.or.us" aria-label="Email the orchestra director" title="Email the orchestra director"><Mail size={19}/></a>
 </div>}
