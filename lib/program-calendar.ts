export type ProgramEvent={id:string;title:string;category:'Concert'|'Festival'|'Trip'|'Rehearsal';startsAt:string;endsAt:string;location:string};
// The future admin API will supply published events. No confirmed dates supplied yet.
export const programEvents:ProgramEvent[]=[];
// Opt-in design examples; these are not the official schedule.
export const previewEvents:ProgramEvent[]=[
 {id:'preview-fall',title:'Fall orchestra concert',category:'Concert',startsAt:'2026-10-15T19:00:00-07:00',endsAt:'2026-10-15T20:30:00-07:00',location:'McKay Auditorium'},
 {id:'preview-rehearsal',title:'Combined ensemble rehearsal',category:'Rehearsal',startsAt:'2026-11-05T16:00:00-08:00',endsAt:'2026-11-05T18:00:00-08:00',location:'McKay Orchestra Room'},
 {id:'preview-winter',title:'Winter concert',category:'Concert',startsAt:'2026-12-10T19:00:00-08:00',endsAt:'2026-12-10T20:30:00-08:00',location:'McKay Auditorium'},
 {id:'preview-festival',title:'Orchestra festival',category:'Festival',startsAt:'2027-03-18T09:00:00-07:00',endsAt:'2027-03-18T16:00:00-07:00',location:'Venue to be confirmed'},
 {id:'preview-trip',title:'Spring orchestra trip',category:'Trip',startsAt:'2027-04-15T08:00:00-07:00',endsAt:'2027-04-15T17:00:00-07:00',location:'Destination to be confirmed'},
];
