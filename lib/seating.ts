import type { Section } from './orchestra-data';

export type Seat = {
  id: string;
  sectionId: string;
  number: number;
  row: number;
  role: 'Principal' | 'Co-principal' | 'Section player';
  position: [number, number, number];
  rotation: number;
};

export const conductorZ = 3.4;
const polar = (radius:number,angle:number):[number,number,number] => [radius*Math.cos(angle),0,conductorZ-radius*Math.sin(angle)];
export const sectionLayout: Record<string,{angle:number;radius:number;label:[number,number,number]}> = Object.fromEntries(
  [['violin1',160,4.5],['violin2',115,4.5],['viola',65,4.5],['cello',20,4.5],['bass',20,10.1]].map(([id,degrees,radius])=>{
    const angle=Number(degrees)*Math.PI/180;
    const label=polar(Number(radius)-1.15,angle);label[1]=.15;
    return [id,{angle,radius:Number(radius),label}];
  })
);

/** Sections fan around the conductor on concentric semicircular rows.
 * Cellos mirror first violins and face them directly across the stage.
 * Basses form a straight horizontal row behind the violas. Their chairs turn
 * diagonally toward the conductor, following the requested sight line.
 * The outside player of the front desk is the principal; their partner is
 * the co-principal. Second violins have four chairs in each rear row.
 */
export function createSeats(sections: Section[]): Seat[] {
  return sections.flatMap((section) => {
    if (section.rows.reduce((sum, count) => sum + count, 0) !== section.count) {
      throw new Error(`Row sizes must equal the member count for ${section.name}.`);
    }
    const layout = sectionLayout[section.id];
    if (!layout) throw new Error(`Unknown section: ${section.id}`);
    let number = 0;
    return section.rows.flatMap((rowCount, row) => {
      const radius = layout.radius + row * 1.7;
      // On the left, the left-most seat is outside; on the right, the right-most.
      const outsideFirst = Math.cos(layout.angle) < 0 ? 1 : -1;
      return Array.from({ length: rowCount }, (_,slot): Seat => {
        // Fixed arc spacing keeps wider back rows airy without squashing sections.
        const angle = layout.angle + ((rowCount - 1) / 2 - slot) * 1.35 / radius * outsideFirst;
        number += 1;
        return {
          id: `${section.id}-${number}`,
          sectionId: section.id,
          number,
          row,
          role: row === 0 && slot === 0 ? 'Principal' : row === 0 && slot === 1 ? 'Co-principal' : 'Section player',
          position: section.id === 'bass' ? [4.6 - slot * 1.4, 0, -4.9] : polar(radius,angle),
          // Chair fronts point along local +Z. The outer string sections face
          // each other horizontally; only the inner sections fan inward.
          rotation: section.id === 'violin1' ? Math.PI / 2
            : section.id === 'cello' ? -Math.PI / 2
            : section.id === 'bass' ? -Math.PI / 3 : angle - Math.PI / 2,
        };
      });
    });
  });
}
