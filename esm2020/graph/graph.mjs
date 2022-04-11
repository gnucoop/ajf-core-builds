/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as dagre from 'dagre';
import * as svgPanZoom from 'svg-pan-zoom';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const TEXT_END = 20;
const LINE_HEIGHT = 40;
const BOX_WIDTH = 170;
const SvgPanZoom = (svgPanZoom.default || svgPanZoom);
export class Edge {
    constructor(points) {
        this.points = points;
    }
    get path() {
        if (this.points.length < 2) {
            return '';
        }
        let result = 'M ';
        this.points.forEach(pt => {
            result += `${pt.x} ${pt.y} L`;
        });
        return result.substr(0, result.length - 2);
    }
}
export class AjfGraphComponent {
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this.boxes$ = new BehaviorSubject([]);
        this.edges$ = new BehaviorSubject([]);
        this.graph = new dagre.graphlib.Graph();
        this.graph.setGraph({ marginx: BOX_WIDTH / 2, marginy: LINE_HEIGHT });
    }
    /**
     * data una stringa crea un array di stringhe in base ad un TEXT_END
     * se la ripartizione ricade all'interno di una parola shifta il delimiter fino a trovare uno
     * spazio bianco.
     */
    lines(text) {
        const lines = [];
        while (text != null && text.length > 0) {
            let textEnd = TEXT_END;
            while (text[textEnd - 1] !== ' ' && text.length > TEXT_END) {
                textEnd--;
            }
            const line = text.slice(0, textEnd);
            text = text.split(line)[1];
            lines.push(line);
        }
        return lines;
    }
    ngOnInit() {
        if (this.nodes != null) {
            const widgetNodes = this.nodes;
            widgetNodes.forEach(node => {
                this.graph.setNode(node.id, {
                    width: BOX_WIDTH,
                    height: this._calculateHeight(node.label),
                    label: node.label,
                    red: node.red,
                    yellow: node.yellow,
                    green: node.green,
                    color: node.color || undefined,
                });
                if (node.parentId != null) {
                    try {
                        node.parentId = JSON.parse(node.parentId);
                    }
                    catch (e) { }
                    const parents = Array.isArray(node.parentId)
                        ? node.parentId
                        : [node.parentId];
                    parents.forEach(parent => {
                        this.graph.setEdge(`${parent}`, node.id, {});
                    });
                }
            });
            try {
                SvgPanZoom(this.graphElement.nativeElement, { controlIconsEnabled: true });
            }
            catch (e) {
                console.log(e);
            }
        }
        dagre.layout(this.graph);
        const boxes = [];
        this.graph.nodes().forEach((nodeId) => {
            const n = this.graph.node(nodeId);
            if (n) {
                boxes.push({ ...n });
            }
        });
        this.boxes$.next(boxes);
        const edges = [];
        this.graph.edges().forEach((edge) => {
            edges.push(new Edge(this.graph.edge(edge).points));
        });
        this.edges$.next(edges);
    }
    _calculateHeight(text) {
        const linesLength = this.lines(text).length;
        if (linesLength === 1) {
            return LINE_HEIGHT * 1.5;
        }
        return linesLength * LINE_HEIGHT;
    }
}
AjfGraphComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfGraphComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
AjfGraphComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfGraphComponent, selector: "ajf-graph", inputs: { nodes: "nodes" }, viewQueries: [{ propertyName: "graphElement", first: true, predicate: ["graph"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"wrapper\">\n  <svg #graph viewBox=\"0 0 1000 2000\" width=\"100%\" height=\"100%\">\n    <g *ngFor=\"let edge of edges$|async\">\n      <path class=\"edge\" [attr.d]=\"edge.path\" fill=\"none\" stroke=\"gray\" stroke-wodth=\"2px\"></path>\n    </g>\n    <g\n      *ngFor=\"let box of boxes$|async\"\n      [attr.fill]=\"box.color? box.color:'#d95989'\"\n      [attr.stroke]=\"box.color !== 'white' ? 'white' : 'black'\"\n      stroke-width=\"1px\"\n      transition=\"fill 0.2s\"\n    >\n      <rect\n        [attr.x]=\"box.x -(box.width/2)\"\n        [attr.y]=\"box.y - (box.height/2)\"\n        [attr.width]=\"box.width\"\n        [attr.height]=\"box.height\"\n        [attr.stroke]=\"box.red === true ? 'red' : box.yellow === true ? 'yellow' : box.green === true ? 'green' : 'black'\"\n        style=\"stroke-width:6\"\n      />\n      <ng-container *ngFor=\"let line of lines(box.label);let idx= index\">\n        <text\n          class=\"text\"\n          [attr.x]=\"box.x\"\n          [attr.y]=\"box.y - (box.height/2) + 30 +(30*idx)\"\n          dominant-baseline=\"middle\"\n          text-anchor=\"middle\"\n        >\n          {{ line }}\n        </text>\n      </ng-container>\n    </g>\n  </svg>\n</div>\n", styles: ["ajf-graph{width:100%;height:600px}ajf-graph .buttons{position:absolute;z-index:100}ajf-graph .wrapper{position:absolute;left:0px;top:0px;width:100%;height:600px;overflow:scroll}ajf-graph svg{display:block;cursor:move;height:600px}ajf-graph svg .edge{fill:none;stroke:gray;stroke-width:2px}\n"], directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i1.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfGraphComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-graph', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"wrapper\">\n  <svg #graph viewBox=\"0 0 1000 2000\" width=\"100%\" height=\"100%\">\n    <g *ngFor=\"let edge of edges$|async\">\n      <path class=\"edge\" [attr.d]=\"edge.path\" fill=\"none\" stroke=\"gray\" stroke-wodth=\"2px\"></path>\n    </g>\n    <g\n      *ngFor=\"let box of boxes$|async\"\n      [attr.fill]=\"box.color? box.color:'#d95989'\"\n      [attr.stroke]=\"box.color !== 'white' ? 'white' : 'black'\"\n      stroke-width=\"1px\"\n      transition=\"fill 0.2s\"\n    >\n      <rect\n        [attr.x]=\"box.x -(box.width/2)\"\n        [attr.y]=\"box.y - (box.height/2)\"\n        [attr.width]=\"box.width\"\n        [attr.height]=\"box.height\"\n        [attr.stroke]=\"box.red === true ? 'red' : box.yellow === true ? 'yellow' : box.green === true ? 'green' : 'black'\"\n        style=\"stroke-width:6\"\n      />\n      <ng-container *ngFor=\"let line of lines(box.label);let idx= index\">\n        <text\n          class=\"text\"\n          [attr.x]=\"box.x\"\n          [attr.y]=\"box.y - (box.height/2) + 30 +(30*idx)\"\n          dominant-baseline=\"middle\"\n          text-anchor=\"middle\"\n        >\n          {{ line }}\n        </text>\n      </ng-container>\n    </g>\n  </svg>\n</div>\n", styles: ["ajf-graph{width:100%;height:600px}ajf-graph .buttons{position:absolute;z-index:100}ajf-graph .wrapper{position:absolute;left:0px;top:0px;width:100%;height:600px;overflow:scroll}ajf-graph svg{display:block;cursor:move;height:600px}ajf-graph svg .edge{fill:none;stroke:gray;stroke-width:2px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { nodes: [{
                type: Input
            }], graphElement: [{
                type: ViewChild,
                args: ['graph', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2dyYXBoL3NyYy9ncmFwaC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZ3JhcGgvc3JjL2dyYXBoLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsS0FBSyxFQUdMLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEtBQUssVUFBVSxNQUFNLGNBQWMsQ0FBQzs7O0FBRTNDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdkIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBRXRCLE1BQU0sVUFBVSxHQUFHLENBQUUsVUFBa0IsQ0FBQyxPQUFPLElBQUksVUFBVSxDQUFzQixDQUFDO0FBb0JwRixNQUFNLE9BQU8sSUFBSTtJQUNmLFlBQW9CLE1BQWdCO1FBQWhCLFdBQU0sR0FBTixNQUFNLENBQVU7SUFBRyxDQUFDO0lBRXhDLElBQVcsSUFBSTtRQUNiLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGO0FBU0QsTUFBTSxPQUFPLGlCQUFpQjtJQU81QixZQUFvQixHQUFlLEVBQVUsU0FBb0I7UUFBN0MsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFKakUsV0FBTSxHQUEyQixJQUFJLGVBQWUsQ0FBUSxFQUFFLENBQUMsQ0FBQztRQUNoRSxXQUFNLEdBQTRCLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLFVBQUssR0FBNkIsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRzNELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUMsT0FBTyxFQUFFLFNBQVMsR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsSUFBWTtRQUNoQixNQUFNLEtBQUssR0FBYSxFQUFFLENBQUM7UUFDM0IsT0FBTyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3RDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQztZQUN2QixPQUFPLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxFQUFFO2dCQUMxRCxPQUFPLEVBQUUsQ0FBQzthQUNYO1lBQ0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDcEMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ3RCLE1BQU0sV0FBVyxHQUFtQixJQUFJLENBQUMsS0FBSyxDQUFDO1lBRS9DLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7b0JBQzFCLEtBQUssRUFBRSxTQUFTO29CQUNoQixNQUFNLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ3pDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO29CQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO29CQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTO2lCQUMvQixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtvQkFDekIsSUFBSTt3QkFDRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQWtCLENBQUMsQ0FBQztxQkFDckQ7b0JBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtvQkFDZCxNQUFNLE9BQU8sR0FBYSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBQ3BELENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUTt3QkFDZixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBa0IsQ0FBQyxDQUFDO29CQUM5QixPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO3dCQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQy9DLENBQUMsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJO2dCQUNGLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxFQUFDLG1CQUFtQixFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7YUFDMUU7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hCO1NBQ0Y7UUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixNQUFNLEtBQUssR0FBVSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtZQUN6QyxNQUFNLENBQUMsR0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsRUFBRTtnQkFDTCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO2FBQ3BCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixNQUFNLEtBQUssR0FBVyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUN2QyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU8sZ0JBQWdCLENBQUMsSUFBWTtRQUNuQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUM1QyxJQUFJLFdBQVcsS0FBSyxDQUFDLEVBQUU7WUFDckIsT0FBTyxXQUFXLEdBQUcsR0FBRyxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ25DLENBQUM7OzhHQXJGVSxpQkFBaUI7a0dBQWpCLGlCQUFpQixrTUNuRjlCLGl0Q0FrQ0E7MkZEaURhLGlCQUFpQjtrQkFQN0IsU0FBUzsrQkFDRSxXQUFXLG1CQUdKLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7eUhBRzVCLEtBQUs7c0JBQWIsS0FBSztnQkFDOEIsWUFBWTtzQkFBL0MsU0FBUzt1QkFBQyxPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBamZHcmFwaE5vZGV9IGZyb20gJy4vZ3JhcGgtbm9kZSc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgKiBhcyBkYWdyZSBmcm9tICdkYWdyZSc7XG5pbXBvcnQgKiBhcyBzdmdQYW5ab29tIGZyb20gJ3N2Zy1wYW4tem9vbSc7XG5cbmNvbnN0IFRFWFRfRU5EID0gMjA7XG5jb25zdCBMSU5FX0hFSUdIVCA9IDQwO1xuY29uc3QgQk9YX1dJRFRIID0gMTcwO1xuXG5jb25zdCBTdmdQYW5ab29tID0gKChzdmdQYW5ab29tIGFzIGFueSkuZGVmYXVsdCB8fCBzdmdQYW5ab29tKSBhcyB0eXBlb2Ygc3ZnUGFuWm9vbTtcblxuaW50ZXJmYWNlIEJveCB7XG4gIGdyZWVuOiBib29sZWFuO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgbGFiZWw6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICByZWQ6IGJvb2xlYW47XG4gIHdpZHRoOiBudW1iZXI7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICB5ZWxsb3c6IGJvb2xlYW47XG4gIGNvbG9yPzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSVBvaW50IHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBFZGdlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwb2ludHM6IElQb2ludFtdKSB7fVxuXG4gIHB1YmxpYyBnZXQgcGF0aCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnBvaW50cy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGxldCByZXN1bHQgPSAnTSAnO1xuICAgIHRoaXMucG9pbnRzLmZvckVhY2gocHQgPT4ge1xuICAgICAgcmVzdWx0ICs9IGAke3B0Lnh9ICR7cHQueX0gTGA7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdC5zdWJzdHIoMCwgcmVzdWx0Lmxlbmd0aCAtIDIpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1ncmFwaCcsXG4gIHRlbXBsYXRlVXJsOiAnZ3JhcGguaHRtbCcsXG4gIHN0eWxlVXJsczogWydncmFwaC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZHcmFwaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG5vZGVzPzogQWpmR3JhcGhOb2RlW107XG4gIEBWaWV3Q2hpbGQoJ2dyYXBoJywge3N0YXRpYzogdHJ1ZX0pIGdyYXBoRWxlbWVudCE6IEVsZW1lbnRSZWY7XG4gIGJveGVzJDogQmVoYXZpb3JTdWJqZWN0PEJveFtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Qm94W10+KFtdKTtcbiAgZWRnZXMkOiBCZWhhdmlvclN1YmplY3Q8RWRnZVtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RWRnZVtdPihbXSk7XG4gIGdyYXBoOiBkYWdyZS5ncmFwaGxpYi5HcmFwaDx7fT4gPSBuZXcgZGFncmUuZ3JhcGhsaWIuR3JhcGgoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuZ3JhcGguc2V0R3JhcGgoe21hcmdpbng6IEJPWF9XSURUSCAvIDIsIG1hcmdpbnk6IExJTkVfSEVJR0hUfSk7XG4gIH1cblxuICAvKipcbiAgICogZGF0YSB1bmEgc3RyaW5nYSBjcmVhIHVuIGFycmF5IGRpIHN0cmluZ2hlIGluIGJhc2UgYWQgdW4gVEVYVF9FTkRcbiAgICogc2UgbGEgcmlwYXJ0aXppb25lIHJpY2FkZSBhbGwnaW50ZXJubyBkaSB1bmEgcGFyb2xhIHNoaWZ0YSBpbCBkZWxpbWl0ZXIgZmlubyBhIHRyb3ZhcmUgdW5vXG4gICAqIHNwYXppbyBiaWFuY28uXG4gICAqL1xuICBsaW5lcyh0ZXh0OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW107XG4gICAgd2hpbGUgKHRleHQgIT0gbnVsbCAmJiB0ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCB0ZXh0RW5kID0gVEVYVF9FTkQ7XG4gICAgICB3aGlsZSAodGV4dFt0ZXh0RW5kIC0gMV0gIT09ICcgJyAmJiB0ZXh0Lmxlbmd0aCA+IFRFWFRfRU5EKSB7XG4gICAgICAgIHRleHRFbmQtLTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGxpbmUgPSB0ZXh0LnNsaWNlKDAsIHRleHRFbmQpO1xuICAgICAgdGV4dCA9IHRleHQuc3BsaXQobGluZSlbMV07XG4gICAgICBsaW5lcy5wdXNoKGxpbmUpO1xuICAgIH1cbiAgICByZXR1cm4gbGluZXM7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ub2RlcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCB3aWRnZXROb2RlczogQWpmR3JhcGhOb2RlW10gPSB0aGlzLm5vZGVzO1xuXG4gICAgICB3aWRnZXROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICB0aGlzLmdyYXBoLnNldE5vZGUobm9kZS5pZCwge1xuICAgICAgICAgIHdpZHRoOiBCT1hfV0lEVEgsXG4gICAgICAgICAgaGVpZ2h0OiB0aGlzLl9jYWxjdWxhdGVIZWlnaHQobm9kZS5sYWJlbCksXG4gICAgICAgICAgbGFiZWw6IG5vZGUubGFiZWwsXG4gICAgICAgICAgcmVkOiBub2RlLnJlZCxcbiAgICAgICAgICB5ZWxsb3c6IG5vZGUueWVsbG93LFxuICAgICAgICAgIGdyZWVuOiBub2RlLmdyZWVuLFxuICAgICAgICAgIGNvbG9yOiBub2RlLmNvbG9yIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChub2RlLnBhcmVudElkICE9IG51bGwpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgbm9kZS5wYXJlbnRJZCA9IEpTT04ucGFyc2Uobm9kZS5wYXJlbnRJZCBhcyBzdHJpbmcpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgY29uc3QgcGFyZW50czogc3RyaW5nW10gPSBBcnJheS5pc0FycmF5KG5vZGUucGFyZW50SWQpXG4gICAgICAgICAgICA/IG5vZGUucGFyZW50SWRcbiAgICAgICAgICAgIDogW25vZGUucGFyZW50SWQgYXMgc3RyaW5nXTtcbiAgICAgICAgICBwYXJlbnRzLmZvckVhY2gocGFyZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ3JhcGguc2V0RWRnZShgJHtwYXJlbnR9YCwgbm9kZS5pZCwge30pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIFN2Z1Bhblpvb20odGhpcy5ncmFwaEVsZW1lbnQubmF0aXZlRWxlbWVudCwge2NvbnRyb2xJY29uc0VuYWJsZWQ6IHRydWV9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGFncmUubGF5b3V0KHRoaXMuZ3JhcGgpO1xuICAgIGNvbnN0IGJveGVzOiBCb3hbXSA9IFtdO1xuICAgIHRoaXMuZ3JhcGgubm9kZXMoKS5mb3JFYWNoKChub2RlSWQ6IGFueSkgPT4ge1xuICAgICAgY29uc3QgbjogYW55ID0gdGhpcy5ncmFwaC5ub2RlKG5vZGVJZCk7XG4gICAgICBpZiAobikge1xuICAgICAgICBib3hlcy5wdXNoKHsuLi5ufSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5ib3hlcyQubmV4dChib3hlcyk7XG4gICAgY29uc3QgZWRnZXM6IEVkZ2VbXSA9IFtdO1xuICAgIHRoaXMuZ3JhcGguZWRnZXMoKS5mb3JFYWNoKChlZGdlOiBhbnkpID0+IHtcbiAgICAgIGVkZ2VzLnB1c2gobmV3IEVkZ2UodGhpcy5ncmFwaC5lZGdlKGVkZ2UpLnBvaW50cykpO1xuICAgIH0pO1xuICAgIHRoaXMuZWRnZXMkLm5leHQoZWRnZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlSGVpZ2h0KHRleHQ6IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgbGluZXNMZW5ndGggPSB0aGlzLmxpbmVzKHRleHQpLmxlbmd0aDtcbiAgICBpZiAobGluZXNMZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBMSU5FX0hFSUdIVCAqIDEuNTtcbiAgICB9XG4gICAgcmV0dXJuIGxpbmVzTGVuZ3RoICogTElORV9IRUlHSFQ7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gIDxzdmcgI2dyYXBoIHZpZXdCb3g9XCIwIDAgMTAwMCAyMDAwXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPlxuICAgIDxnICpuZ0Zvcj1cImxldCBlZGdlIG9mIGVkZ2VzJHxhc3luY1wiPlxuICAgICAgPHBhdGggY2xhc3M9XCJlZGdlXCIgW2F0dHIuZF09XCJlZGdlLnBhdGhcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImdyYXlcIiBzdHJva2Utd29kdGg9XCIycHhcIj48L3BhdGg+XG4gICAgPC9nPlxuICAgIDxnXG4gICAgICAqbmdGb3I9XCJsZXQgYm94IG9mIGJveGVzJHxhc3luY1wiXG4gICAgICBbYXR0ci5maWxsXT1cImJveC5jb2xvcj8gYm94LmNvbG9yOicjZDk1OTg5J1wiXG4gICAgICBbYXR0ci5zdHJva2VdPVwiYm94LmNvbG9yICE9PSAnd2hpdGUnID8gJ3doaXRlJyA6ICdibGFjaydcIlxuICAgICAgc3Ryb2tlLXdpZHRoPVwiMXB4XCJcbiAgICAgIHRyYW5zaXRpb249XCJmaWxsIDAuMnNcIlxuICAgID5cbiAgICAgIDxyZWN0XG4gICAgICAgIFthdHRyLnhdPVwiYm94LnggLShib3gud2lkdGgvMilcIlxuICAgICAgICBbYXR0ci55XT1cImJveC55IC0gKGJveC5oZWlnaHQvMilcIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJib3gud2lkdGhcIlxuICAgICAgICBbYXR0ci5oZWlnaHRdPVwiYm94LmhlaWdodFwiXG4gICAgICAgIFthdHRyLnN0cm9rZV09XCJib3gucmVkID09PSB0cnVlID8gJ3JlZCcgOiBib3gueWVsbG93ID09PSB0cnVlID8gJ3llbGxvdycgOiBib3guZ3JlZW4gPT09IHRydWUgPyAnZ3JlZW4nIDogJ2JsYWNrJ1wiXG4gICAgICAgIHN0eWxlPVwic3Ryb2tlLXdpZHRoOjZcIlxuICAgICAgLz5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGxpbmUgb2YgbGluZXMoYm94LmxhYmVsKTtsZXQgaWR4PSBpbmRleFwiPlxuICAgICAgICA8dGV4dFxuICAgICAgICAgIGNsYXNzPVwidGV4dFwiXG4gICAgICAgICAgW2F0dHIueF09XCJib3gueFwiXG4gICAgICAgICAgW2F0dHIueV09XCJib3gueSAtIChib3guaGVpZ2h0LzIpICsgMzAgKygzMCppZHgpXCJcbiAgICAgICAgICBkb21pbmFudC1iYXNlbGluZT1cIm1pZGRsZVwiXG4gICAgICAgICAgdGV4dC1hbmNob3I9XCJtaWRkbGVcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgbGluZSB9fVxuICAgICAgICA8L3RleHQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2c+XG4gIDwvc3ZnPlxuPC9kaXY+XG4iXX0=