import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ViewChild, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as dagre from 'dagre';
import * as svgPanZoom from 'svg-pan-zoom';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

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
const TEXT_END = 20;
const LINE_HEIGHT = 40;
const BOX_WIDTH = 170;
const SvgPanZoom = (svgPanZoom.default || svgPanZoom);
class Edge {
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
class AjfGraphComponent {
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
                boxes.push(Object.assign({}, n));
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
class AjfGraphModule {
}
AjfGraphModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfGraphModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfGraphModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfGraphModule, declarations: [AjfGraphComponent], imports: [CommonModule], exports: [AjfGraphComponent] });
AjfGraphModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfGraphModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfGraphModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AjfGraphComponent],
                    exports: [AjfGraphComponent],
                    imports: [CommonModule],
                }]
        }] });

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfGraphComponent, AjfGraphModule, Edge };
//# sourceMappingURL=ajf-core-graph.mjs.map
