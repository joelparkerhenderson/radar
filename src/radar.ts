// radar.ts
import * as d3 from 'd3';
import type {
  Blip,
  BlipWithPosition,
  RadarConfig,
  ActiveFilters,
  QuadrantPosition
} from './types';

class Radar {
  private config: Required<RadarConfig>;
  private blipData: BlipWithPosition[];
  private activeFilters: ActiveFilters;
  private searchTerm: string;
  private svg!: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  private g!: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  private tooltip!: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
  private blipGroup!: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  private radius: number;
  private centerX: number;
  private centerY: number;
  private ringRadius: d3.ScaleLinear<number, number>;

  constructor(blips: Blip[], config: RadarConfig = {}) {
    // Set defaults
    this.config = {
      width: config.width ?? 1000,
      height: config.height ?? 800,
      rings: config.rings ?? 4,
      ringLabels: config.ringLabels ?? ['Adopt', 'Trial', 'Assess', 'Hold'],
      quadrantLabels: config.quadrantLabels ?? ['Languages', 'Frameworks', 'Tools', 'Platforms'],
      colors: config.colors ?? ['#8B4513', '#4682B4', '#228B22', '#DC143C'],
      animationDuration: config.animationDuration ?? 1000
    };

    const radarWidth = 600;
    const radarHeight = 600;
    this.radius = Math.min(radarWidth, radarHeight) / 2 - 50;
    this.centerX = radarWidth / 2;
    this.centerY = radarHeight / 2;

    this.activeFilters = {
      quadrants: [0, 1, 2, 3],
      rings: [0, 1, 2, 3]
    };
    this.searchTerm = '';

    this.ringRadius = d3.scaleLinear()
      .domain([0, this.config.rings])
      .range([0, this.radius]);

    this.blipData = this.prepareBlipData(blips);
    this.init();
  }

  private prepareBlipData(blips: Blip[]): BlipWithPosition[] {
    return blips.map((blip, index) => {
      const ringIndex = blip.ring;
      const quadrant = blip.quadrant;
      
      const quadrantAngle = quadrant * 90;
      const randomAngle = quadrantAngle + Math.random() * 90;
      const angleRad = (randomAngle - 90) * Math.PI / 180;
      
      const innerR = this.ringRadius(ringIndex);
      const outerR = this.ringRadius(ringIndex + 1);
      const r = innerR + (outerR - innerR) * (0.3 + Math.random() * 0.4);
      
      return {
        ...blip,
        id: index,
        number: index + 1,
        x: r * Math.cos(angleRad),
        y: r * Math.sin(angleRad),
        color: this.config.colors[quadrant]
      };
    });
  }

  private init(): void {
    this.clearContainer();
    this.createLayout();
    this.createRadar();
    this.createFilters();
    this.createLegend();
    this.updateBlips();
  }

  private clearContainer(): void {
    d3.select('#radar-container').selectAll('*').remove();
  }

  private createLayout(): void {
    const container = d3.select('#radar-container')
      .style('display', 'flex')
      .style('gap', '20px');

    // Left side: Radar
    const radarContainer = container.append('div')
      .style('flex-shrink', '0');

    this.createControls(radarContainer);
    this.createSVG(radarContainer);

    // Right side: Legend and filters
    container.append('div')
      .attr('class', 'legend-container')
      .style('flex', '1')
      .style('overflow-y', 'auto')
      .style('max-height', '600px');
  }

  private createControls(parent: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>): void {
    const controls = parent.append('div')
      .attr('class', 'controls')
      .style('margin-bottom', '10px');

    controls.append('input')
      .attr('type', 'text')
      .attr('placeholder', 'Search blips...')
      .attr('id', 'search-input')
      .style('padding', '8px')
      .style('width', '200px')
      .style('margin-right', '10px')
      .on('input', (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.searchTerm = target.value.toLowerCase();
        this.updateBlips();
      });

    controls.append('button')
      .text('Reset Filters')
      .style('padding', '8px 16px')
      .style('cursor', 'pointer')
      .on('click', () => this.resetFilters());
  }

  private createSVG(parent: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>): void {
    this.svg = parent.append('svg')
      .attr('id', 'radar')
      .attr('width', 600)
      .attr('height', 600)
      .style('border', '1px solid #ddd');

    this.g = this.svg.append('g')
      .attr('transform', `translate(${this.centerX}, ${this.centerY})`);

    this.tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('padding', '8px')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', '0')
      .style('z-index', '1000');

    this.blipGroup = this.g.append('g').attr('class', 'blips');
  }

  private createRadar(): void {
    this.drawRings();
    this.drawQuadrantLines();
    this.drawRingLabels();
    this.drawQuadrantLabels();
  }

  private drawRings(): void {
    for (let i = 1; i <= this.config.rings; i++) {
      this.g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', this.ringRadius(i))
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 1.5);
    }
  }

  private drawQuadrantLines(): void {
    this.g.append('line')
      .attr('x1', -this.radius)
      .attr('y1', 0)
      .attr('x2', this.radius)
      .attr('y2', 0)
      .attr('stroke', '#999')
      .attr('stroke-width', 2);

    this.g.append('line')
      .attr('x1', 0)
      .attr('y1', -this.radius)
      .attr('x2', 0)
      .attr('y2', this.radius)
      .attr('stroke', '#999')
      .attr('stroke-width', 2);
  }

  private drawRingLabels(): void {
    this.config.ringLabels.forEach((label, i) => {
      const r = this.ringRadius(i + 0.5);
      this.g.append('text')
        .attr('x', 5)
        .attr('y', -r)
        .attr('font-size', '12px')
        .attr('fill', '#666')
        .attr('font-weight', 'bold')
        .text(label);
    });
  }

  private drawQuadrantLabels(): void {
    const labelOffset = this.radius * 0.85;
    const quadrantPositions: QuadrantPosition[] = [
      { x: labelOffset, y: -labelOffset },
      { x: labelOffset, y: labelOffset },
      { x: -labelOffset, y: labelOffset },
      { x: -labelOffset, y: -labelOffset }
    ];

    this.config.quadrantLabels.forEach((label, i) => {
      this.g.append('text')
        .attr('x', quadrantPositions[i].x)
        .attr('y', quadrantPositions[i].y)
        .attr('font-size', '16px')
        .attr('font-weight', 'bold')
        .attr('fill', this.config.colors[i])
        .attr('text-anchor', 'middle')
        .text(label);
    });
  }

  private createFilters(): void {
    const filterSection = d3.select('.legend-container')
      .append('div')
      .attr('class', 'filters')
      .style('margin-bottom', '20px')
      .style('padding', '15px')
      .style('background', '#f5f5f5')
      .style('border-radius', '4px');

    filterSection.append('h3')
      .text('Filters')
      .style('margin-top', '0');

    this.createQuadrantFilters(filterSection);
    this.createRingFilters(filterSection);
  }

  private createQuadrantFilters(parent: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>): void {
    const quadrantFilters = parent.append('div')
      .style('margin-bottom', '15px');

    quadrantFilters.append('div')
      .style('font-weight', 'bold')
      .style('margin-bottom', '5px')
      .text('Quadrants:');

    this.config.quadrantLabels.forEach((label, i) => {
      const filterItem = quadrantFilters.append('label')
        .style('display', 'block')
        .style('margin', '5px 0')
        .style('cursor', 'pointer');

      filterItem.append('input')
        .attr('type', 'checkbox')
        .attr('checked', true)
        .attr('data-quadrant', i)
        .on('change', (event: Event) => {
          const target = event.target as HTMLInputElement;
          if (target.checked) {
            this.activeFilters.quadrants.push(i);
          } else {
            this.activeFilters.quadrants = this.activeFilters.quadrants.filter(q => q !== i);
          }
          this.updateBlips();
        });

      filterItem.append('span')
        .style('margin-left', '5px')
        .style('color', this.config.colors[i])
        .text(label);
    });
  }

  private createRingFilters(parent: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>): void {
    const ringFilters = parent.append('div');

    ringFilters.append('div')
      .style('font-weight', 'bold')
      .style('margin-bottom', '5px')
      .text('Rings:');

    this.config.ringLabels.forEach((label, i) => {
      const filterItem = ringFilters.append('label')
        .style('display', 'block')
        .style('margin', '5px 0')
        .style('cursor', 'pointer');

      filterItem.append('input')
        .attr('type', 'checkbox')
        .attr('checked', true)
        .attr('data-ring', i)
        .on('change', (event: Event) => {
          const target = event.target as HTMLInputElement;
          if (target.checked) {
            this.activeFilters.rings.push(i);
          } else {
            this.activeFilters.rings = this.activeFilters.rings.filter(r => r !== i);
          }
          this.updateBlips();
        });

      filterItem.append('span')
        .style('margin-left', '5px')
        .text(label);
    });
  }

  private createLegend(): void {
    const legendSection = d3.select('.legend-container')
      .append('div')
      .attr('class', 'legend');

    legendSection.append('h3')
      .text('Legend')
      .style('margin-top', '0');

    this.config.quadrantLabels.forEach((quadrantLabel, quadrantIndex) => {
      const quadrantGroup = legendSection.append('div')
        .attr('class', 'legend-quadrant')
        .style('margin-bottom', '20px');

      quadrantGroup.append('h4')
        .style('color', this.config.colors[quadrantIndex])
        .style('margin', '10px 0')
        .text(quadrantLabel);

      quadrantGroup.append('div')
        .attr('class', `legend-quadrant-${quadrantIndex}`);
    });
  }

  private updateBlips(): void {
    const filteredData = this.getFilteredData();
    this.renderBlips(filteredData);
    this.updateLegend(filteredData);
  }

  private getFilteredData(): BlipWithPosition[] {
    return this.blipData.filter(d => {
      const matchesQuadrant = this.activeFilters.quadrants.includes(d.quadrant);
      const matchesRing = this.activeFilters.rings.includes(d.ring);
      const matchesSearch = this.searchTerm === '' || 
        d.name.toLowerCase().includes(this.searchTerm);
      return matchesQuadrant && matchesRing && matchesSearch;
    });
  }

  private renderBlips(data: BlipWithPosition[]): void {
    const blips = this.blipGroup.selectAll<SVGGElement, BlipWithPosition>('.blip')
      .data(data, d => d.id.toString());

    // Exit
    blips.exit()
      .transition()
      .duration(300)
      .style('opacity', 0)
      .remove();

    // Enter
    const blipsEnter = blips.enter()
      .append('g')
      .attr('class', 'blip')
      .style('opacity', 0);

    blipsEnter.append('circle')
      .attr('r', 0);

    blipsEnter.append('text')
      .attr('class', 'blip-number');

    // Update
    const blipsMerge = blipsEnter.merge(blips);

    blipsMerge
      .transition()
      .duration(this.config.animationDuration)
      .style('opacity', 1)
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    blipsMerge.select('circle')
      .style('cursor', 'pointer')
      .transition()
      .duration(this.config.animationDuration)
      .attr('r', 8)
      .attr('fill', d => d.color)
      .attr('stroke', 'white')
      .attr('stroke-width', 2);

    blipsMerge.select('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', '10px')
      .attr('fill', 'white')
      .attr('pointer-events', 'none')
      .text(d => d.number.toString());

    this.attachBlipEventHandlers(blipsMerge);
  }

  private attachBlipEventHandlers(
    selection: d3.Selection<SVGGElement, BlipWithPosition, SVGGElement, unknown>
  ): void {
    selection
      .on('mouseover', (event: MouseEvent, d: BlipWithPosition) => {
        d3.select(event.currentTarget as SVGGElement)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', 12);
        
        this.tooltip
          .style('opacity', '1')
          .html(`<strong>#${d.number} ${d.name}</strong><br/>
                 ${this.config.quadrantLabels[d.quadrant]}<br/>
                 ${this.config.ringLabels[d.ring]}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');

        d3.selectAll('.legend-item')
          .style('opacity', '0.3');
        d3.select(`#legend-item-${d.id}`)
          .style('opacity', '1')
          .style('font-weight', 'bold');
      })
      .on('mouseout', (event: MouseEvent) => {
        d3.select(event.currentTarget as SVGGElement)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', 8);
        
        this.tooltip.style('opacity', '0');

        d3.selectAll('.legend-item')
          .style('opacity', '1')
          .style('font-weight', 'normal');
      })
      .on('click', (_event: MouseEvent, d: BlipWithPosition) => {
        alert(`${d.name}\nQuadrant: ${this.config.quadrantLabels[d.quadrant]}\nRing: ${this.config.ringLabels[d.ring]}`);
      });
  }

  private updateLegend(data: BlipWithPosition[]): void {
    this.config.quadrantLabels.forEach((_, quadrantIndex) => {
      const quadrantData = data
        .filter(d => d.quadrant === quadrantIndex)
        .sort((a, b) => a.ring - b.ring || a.name.localeCompare(b.name));

      const legendQuadrant = d3.select(`.legend-quadrant-${quadrantIndex}`);
      
      const items = legendQuadrant.selectAll<HTMLDivElement, BlipWithPosition>('.legend-item')
        .data(quadrantData, d => d.id.toString());

      items.exit().remove();

      const itemsEnter = items.enter()
        .append('div')
        .attr('class', 'legend-item')
        .attr('id', d => `legend-item-${d.id}`)
        .style('padding', '5px')
        .style('margin', '2px 0')
        .style('cursor', 'pointer')
        .style('border-radius', '3px')
        .style('transition', 'background 0.2s');

      itemsEnter.merge(items)
        .html(d => `
          <span style="display: inline-block; width: 25px; font-weight: bold; color: ${d.color}">
            ${d.number}.
          </span>
          <span>${d.name}</span>
          <span style="font-size: 11px; color: #666; margin-left: 5px">
            (${this.config.ringLabels[d.ring]})
          </span>
        `)
        .on('mouseover', (event: MouseEvent, d: BlipWithPosition) => {
          d3.select(event.currentTarget as HTMLDivElement)
            .style('background', '#f0f0f0');
          
          d3.selectAll('.blip')
            .style('opacity', '0.3');
          d3.selectAll<SVGGElement, BlipWithPosition>('.blip')
            .filter(b => b.id === d.id)
            .style('opacity', '1')
            .select('circle')
            .transition()
            .duration(200)
            .attr('r', 12);
        })
        .on('mouseout', (event: MouseEvent) => {
          d3.select(event.currentTarget as HTMLDivElement)
            .style('background', 'transparent');
          
          d3.selectAll('.blip')
            .style('opacity', '1')
            .select('circle')
            .transition()
            .duration(200)
            .attr('r', 8);
        })
        .on('click', (_event: MouseEvent, d: BlipWithPosition) => {
          alert(`${d.name}\nQuadrant: ${this.config.quadrantLabels[d.quadrant]}\nRing: ${this.config.ringLabels[d.ring]}`);
        });
    });
  }

  private resetFilters(): void {
    this.activeFilters = {
      quadrants: [0, 1, 2, 3],
      rings: [0, 1, 2, 3]
    };
    this.searchTerm = '';
    
    d3.select<HTMLInputElement, unknown>('#search-input').property('value', '');
    d3.selectAll<HTMLInputElement, unknown>('input[type="checkbox"]').property('checked', true);
    
    this.updateBlips();
  }

  public destroy(): void {
    this.tooltip.remove();
    this.clearContainer();
  }
}

export default Radar;
