import { Pipe, Directive, ChangeDetectorRef, Input, Component, ViewEncapsulation, ChangeDetectionStrategy, ViewContainerRef, NgModule, ComponentFactoryResolver, Renderer2, ViewChild } from '@angular/core';
import { buildStringIdentifier } from '@ajf/core/common';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';
import fileSaver__default from 'file-saver';
import XLSX__default from 'xlsx';
import { AjfFormulaSerializer, alwaysCondition, AjfConditionSerializer, evaluateExpression, createFormula } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { AjfImageType } from '@ajf/core/image';
import { createPdf } from 'pdfmake/build/pdfmake';

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
class AjfBaseWidgetComponent {
    constructor(_cdr, el) {
        this._cdr = _cdr;
        this.el = el;
    }
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        if (this._instance !== instance) {
            this._instance = instance;
            this._cdr.detectChanges();
        }
    }
}

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
// tslint:disable-next-line:prefer-const-enum
var AjfChartType;
(function (AjfChartType) {
    AjfChartType[AjfChartType["Line"] = 0] = "Line";
    AjfChartType[AjfChartType["Bar"] = 1] = "Bar";
    AjfChartType[AjfChartType["HorizontalBar"] = 2] = "HorizontalBar";
    AjfChartType[AjfChartType["Radar"] = 3] = "Radar";
    AjfChartType[AjfChartType["Scatter"] = 4] = "Scatter";
    AjfChartType[AjfChartType["Doughnut"] = 5] = "Doughnut";
    AjfChartType[AjfChartType["Pie"] = 6] = "Pie";
    AjfChartType[AjfChartType["PolarArea"] = 7] = "PolarArea";
    AjfChartType[AjfChartType["Bubble"] = 8] = "Bubble";
    AjfChartType[AjfChartType["LENGTH"] = 9] = "LENGTH";
})(AjfChartType || (AjfChartType = {}));

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
function chartToChartJsType(chartType) {
    switch (chartType) {
        case AjfChartType.Line:
            return 'line';
        case AjfChartType.Bar:
            return 'bar';
        case AjfChartType.HorizontalBar:
            return 'horizontalBar';
        case AjfChartType.Radar:
            return 'radar';
        case AjfChartType.Scatter:
            return 'scatter';
        case AjfChartType.Doughnut:
            return 'doughnut';
        case AjfChartType.Pie:
            return 'pie';
        case AjfChartType.PolarArea:
            return 'polarArea';
        case AjfChartType.Bubble:
            return 'bubble';
        default:
            return 'line';
    }
}

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
class AjfGetColumnContentPipe {
    transform(instance, column) {
        return column >= 0 && column < instance.content.length ? instance.content[column] : null;
    }
}
AjfGetColumnContentPipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfGetColumnContent' },] }
];

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
// tslint:disable-next-line:prefer-const-enum
var AjfAggregationType;
(function (AjfAggregationType) {
    AjfAggregationType[AjfAggregationType["None"] = 0] = "None";
    AjfAggregationType[AjfAggregationType["Sum"] = 1] = "Sum";
    AjfAggregationType[AjfAggregationType["Average"] = 2] = "Average";
    AjfAggregationType[AjfAggregationType["WeightedAverage"] = 3] = "WeightedAverage";
    AjfAggregationType[AjfAggregationType["LENGTH"] = 4] = "LENGTH";
})(AjfAggregationType || (AjfAggregationType = {}));

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
// tslint:disable-next-line:prefer-const-enum
var AjfWidgetType;
(function (AjfWidgetType) {
    AjfWidgetType[AjfWidgetType["Layout"] = 0] = "Layout";
    AjfWidgetType[AjfWidgetType["PageBreak"] = 1] = "PageBreak";
    AjfWidgetType[AjfWidgetType["Image"] = 2] = "Image";
    AjfWidgetType[AjfWidgetType["Text"] = 3] = "Text";
    AjfWidgetType[AjfWidgetType["Chart"] = 4] = "Chart";
    AjfWidgetType[AjfWidgetType["Table"] = 5] = "Table";
    AjfWidgetType[AjfWidgetType["Map"] = 6] = "Map";
    AjfWidgetType[AjfWidgetType["Column"] = 7] = "Column";
    AjfWidgetType[AjfWidgetType["Formula"] = 8] = "Formula";
    AjfWidgetType[AjfWidgetType["ImageContainer"] = 9] = "ImageContainer";
    AjfWidgetType[AjfWidgetType["DynamicTable"] = 10] = "DynamicTable";
    AjfWidgetType[AjfWidgetType["LENGTH"] = 11] = "LENGTH";
})(AjfWidgetType || (AjfWidgetType = {}));

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
class AjfReportRenderer {
    constructor(_cdr) {
        this._cdr = _cdr;
    }
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        this._instance = instance;
        this._report = instance != null ? instance.report : null;
        this._cdr.markForCheck();
    }
    get report() {
        return this._report;
    }
}
AjfReportRenderer.decorators = [
    { type: Directive }
];
AjfReportRenderer.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
AjfReportRenderer.propDecorators = {
    instance: [{ type: Input }]
};

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
const buildReportStringIdentifier = (report, context, opts) => {
    if (report == null) {
        return '';
    }
    const stringIdentifier = report.stringIdentifier || [];
    if (stringIdentifier.length === 0) {
        return '';
    }
    return buildStringIdentifier(stringIdentifier, context, opts);
};

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
class AjfReportStringIdentifierPipe {
    transform(report, context, opts) {
        return buildReportStringIdentifier(report, context, opts);
    }
}
AjfReportStringIdentifierPipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfReportStringIdentifier' },] }
];

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
class AjfWidgetExport {
    constructor() {
        this.overlay = true;
        this.enable = false;
    }
    buildCsv() {
        let csvString = '';
        const DELIMITER = ',';
        const STOP = '\n';
        switch (this.widgetType) {
            default:
            case AjfWidgetType.Chart:
                this.data = this.data;
                if (this.data.datasets == null || this.data.labels == null) {
                    return csvString;
                }
                csvString = DELIMITER + this.data.labels.toString() + STOP;
                this.data.datasets.forEach((dataset) => {
                    const data = dataset.data || [];
                    csvString += dataset.label + DELIMITER + data.toString() + STOP;
                });
                break;
            case AjfWidgetType.Table:
                let prefix = '';
                let rowSpan = 0;
                this.data = this.data;
                for (let row of this.data) {
                    csvString += prefix;
                    for (let elem of row) {
                        if (elem.rowspan == null) {
                            if (parseInt(elem.value, 10) || elem.value === false) {
                                csvString += elem.value + ',';
                            }
                            else {
                                csvString += elem.value + ',';
                            }
                        }
                        else {
                            rowSpan = elem.rowspan;
                            csvString += elem.value + ',';
                            prefix = ',';
                        }
                    }
                    if (csvString[csvString.length - 1] === ',') {
                        csvString = csvString.substring(0, csvString.length - 1);
                    }
                    csvString += '\n';
                    rowSpan--;
                    if (rowSpan > 0) {
                        csvString += ',';
                    }
                    prefix = '';
                }
                break;
        }
        return csvString;
    }
    exportCsv() {
        if (this.widgetType == null || this.data == null) {
            return;
        }
        fileSaver__default(new Blob([this.buildCsv()], { type: 'text/csv;charset=utf-8' }), `${this._buildTitle(this.widgetType)}${'.csv'}`);
    }
    buildXlsx() {
        let xlsxData = [];
        let labels = [];
        switch (this.widgetType) {
            default:
            case AjfWidgetType.Chart:
                this.data = this.data;
                const datasets = this.data.datasets || [];
                labels = this.data.labels;
                for (let i = 0; i < datasets.length; i++) {
                    const row = {};
                    const data = datasets[i].data || [];
                    row['name'] = datasets[i].label;
                    for (let j = 0; j < data.length; j++) {
                        row[labels[j]] = data[j];
                    }
                    xlsxData.push(row);
                }
                break;
            case AjfWidgetType.Table:
                this.data = this.data;
                this.data.forEach((row, idxRow) => {
                    const res = {};
                    if (idxRow === 0) {
                        labels = row.map(r => r.value.changingThisBreaksApplicationSecurity);
                    }
                    else {
                        row.forEach((elem, idxElem) => {
                            res[labels[idxElem]] = elem.value.changingThisBreaksApplicationSecurity;
                        });
                        xlsxData.push(res);
                    }
                });
                break;
        }
        return xlsxData;
    }
    exportXlsx() {
        const ws = XLSX__default.utils.json_to_sheet(this.buildXlsx());
        const wb = XLSX__default.utils.book_new();
        const title = this._buildTitle(this.widgetType);
        XLSX__default.utils.book_append_sheet(wb, ws, title);
        XLSX__default.writeFile(wb, `${title}.xlsx`);
    }
    _buildTitle(widgetType) {
        return `${AjfWidgetType[widgetType]} ${format(new Date(), `yyyy-MM-dd`)}`;
    }
}
AjfWidgetExport.decorators = [
    { type: Component, args: [{
                selector: 'ajf-widget-export',
                template: `
    <div class="ajf-widget-wrapper">
        <ng-content></ng-content>
        <div  *ngIf="enable" class="ajf-export-menu" [style.display]="!overlay?'block':'none'">
            <button (click)="exportCsv()">
                CSV
            </button>
            <button (click)="exportXlsx()" mat-menu-item>
                XLSX
            </button>
        </div>
    </div>
    `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:0}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-widget-wrapper:hover .ajf-export-menu{display:block !important}\n"]
            },] }
];
AjfWidgetExport.ctorParameters = () => [];
AjfWidgetExport.propDecorators = {
    widgetType: [{ type: Input }],
    data: [{ type: Input }],
    overlay: [{ type: Input }],
    enable: [{ type: Input }]
};

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
class AjfWidgetHost {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
AjfWidgetHost.decorators = [
    { type: Directive, args: [{ selector: '[ajf-widget-host]' },] }
];
AjfWidgetHost.ctorParameters = () => [
    { type: ViewContainerRef }
];

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
class AjfReportsModule {
}
AjfReportsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AjfGetColumnContentPipe,
                    AjfReportStringIdentifierPipe,
                    AjfWidgetHost,
                    AjfWidgetExport,
                ],
                imports: [
                    CommonModule,
                ],
                exports: [
                    AjfGetColumnContentPipe,
                    AjfReportStringIdentifierPipe,
                    AjfWidgetHost,
                    AjfWidgetExport,
                ],
            },] }
];

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
function createAggregation(aggregation) {
    return Object.assign(Object.assign({}, aggregation), { aggregation: aggregation.aggregation || AjfAggregationType.None });
}

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
class AjfAggregationSerializer {
    static fromJson(json) {
        if (json.aggregation == null) {
            throw new Error('Malformed aggregation');
        }
        return createAggregation(Object.assign(Object.assign({}, json), { aggregation: json.aggregation }));
    }
}

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
function createDataset(dataset) {
    return Object.assign(Object.assign({}, dataset), { aggregation: dataset.aggregation || createAggregation({ aggregation: AjfAggregationType.None }) });
}

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
class AjfDatasetSerializer {
    static fromJson(json) {
        if (json.formula == null || json.aggregation == null || json.label == null) {
            throw new Error('Malformed dataset');
        }
        json.formula = json.formula instanceof Array ?
            json.formula = json.formula.map(f => AjfFormulaSerializer.fromJson(f)) :
            AjfFormulaSerializer.fromJson(json.formula);
        json.aggregation = AjfAggregationSerializer.fromJson(json.aggregation);
        return createDataset(json);
    }
}

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
function createWidget(widget) {
    return Object.assign(Object.assign({}, widget), { styles: widget.styles || {}, visibility: widget.visibility || alwaysCondition() });
}

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
class AjfWidgetSerializer {
    static fromJson(json) {
        if (json.widgetType == null) {
            throw new Error('Malformed widget');
        }
        json.visibility =
            json.visibility ? AjfConditionSerializer.fromJson(json.visibility) : alwaysCondition();
        json.styles = json.styles || {};
        const obj = json;
        if (obj.widgetType === AjfWidgetType.Layout || obj.widgetType === AjfWidgetType.Column) {
            return AjfWidgetSerializer._widgetWithContentFromJson(obj);
        }
        if (obj.widgetType === AjfWidgetType.Chart || obj.widgetType === AjfWidgetType.Table) {
            const w = AjfWidgetSerializer._dataWidgetFromJson(obj);
            if (obj.widgetType === AjfWidgetType.Chart) {
                const cw = w;
                if (cw.labels instanceof Array) {
                    cw.labels.map(l => AjfFormulaSerializer.fromJson(l));
                }
                else if (cw.labels != null) {
                    cw.labels = AjfFormulaSerializer.fromJson(cw.labels);
                }
            }
            return w;
        }
        if (obj.widgetType === AjfWidgetType.Map) {
            const mw = obj;
            mw.coordinate = AjfFormulaSerializer.fromJson(mw.coordinate);
        }
        return obj;
    }
    static _dataWidgetFromJson(json) {
        let dataset;
        if (json.dataset == null) {
            dataset = [];
        }
        else {
            if (json.widgetType === AjfWidgetType.Table) {
                dataset = json.dataset
                    .map(row => row.map(cell => AjfDatasetSerializer.fromJson(cell)));
            }
            else {
                dataset = json.dataset.map(d => AjfDatasetSerializer.fromJson(d));
            }
        }
        return Object.assign(Object.assign({}, createWidget(json)), { dataset });
    }
    static _widgetWithContentFromJson(json) {
        const content = (json.content || []).map(c => AjfWidgetSerializer.fromJson(c));
        return Object.assign(Object.assign({}, createWidget(json)), { content });
    }
}

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
class AjfReportContainerSerializer {
    static fromJson(json) {
        json.content = (json.content || []).map(c => AjfWidgetSerializer.fromJson(c));
        return Object.assign(Object.assign({}, json), { content: json.content, styles: json.styles || {} });
    }
}

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
function createReport(report) {
    return Object.assign({}, report);
}

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
class AjfReportSerializer {
    static fromJson(json) {
        const containers = ['header', 'footer', 'content'];
        containers.forEach(c => {
            if (json[c]) {
                json[c] =
                    AjfReportContainerSerializer.fromJson(json[c]);
            }
        });
        return createReport(json);
    }
}

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
class AjfReportWidget {
    constructor(_cfr, _renderer) {
        this._cfr = _cfr;
        this._renderer = _renderer;
        this._init = false;
    }
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        if (this._instance !== instance) {
            this._instance = instance;
            if (this._init) {
                this._loadComponent();
            }
        }
    }
    ngOnInit() {
        this._init = true;
        this._loadComponent();
    }
    _loadComponent() {
        if (!this._init || this._instance == null || this.widgetHost == null ||
            !this.instance.visible) {
            return;
        }
        const vcr = this.widgetHost.viewContainerRef;
        vcr.clear();
        const componentDef = this.widgetsMap[this._instance.widget.widgetType];
        if (componentDef == null) {
            return;
        }
        const component = componentDef.component;
        try {
            const componentFactory = this._cfr.resolveComponentFactory(component);
            const componentRef = vcr.createComponent(componentFactory);
            const componentInstance = componentRef.instance;
            Object.keys(this._instance.widget.styles).forEach((style) => {
                try {
                    this._renderer.setStyle(componentInstance.el.nativeElement, style, `${this._instance.widget.styles[style]}`);
                }
                catch (e) {
                }
            });
            componentInstance.instance = this._instance;
            if (componentDef.inputs) {
                Object.keys(componentDef.inputs).forEach(key => {
                    if (key in componentInstance) {
                        componentInstance[key] = componentDef.inputs[key];
                    }
                });
            }
        }
        catch (e) {
        }
    }
}
AjfReportWidget.decorators = [
    { type: Directive }
];
AjfReportWidget.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Renderer2 }
];
AjfReportWidget.propDecorators = {
    widgetHost: [{ type: ViewChild, args: [AjfWidgetHost, { static: true },] }],
    instance: [{ type: Input }]
};

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
const componentsMap = {};

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
class AjfWidgetService {
    constructor() {
        this.componentsMap = componentsMap;
    }
    registerCustomWidget(widget) {
        const { widgetType, component } = widget;
        if (widgetType < 100) {
            throw new Error('Invalid custom widget type, it must be greater than 100');
        }
        if (component == null) {
            throw new Error('Invalid custom widget component');
        }
        this.componentsMap[widgetType] = widget;
    }
}

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
function evaluateAggregation(aggregation, formulas, context) {
    const data = formulas.map(f => evaluateExpression(f.formula, context));
    switch (aggregation.aggregation) {
        case AjfAggregationType.None:
            if (data.length !== 1) {
                throw new Error('Invalid aggregation');
            }
            return data[0];
        case AjfAggregationType.Sum:
            return data.map((r) => r.reduce((s, d) => s + d, 0));
        case AjfAggregationType.Average:
        case AjfAggregationType.WeightedAverage:
            return data.map((r) => {
                const sum = r.reduce((s, d) => s + d, 0);
                return sum / data.length;
            });
        default:
            return [];
    }
}

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
function createWidgetInstance(widget, context, _ts) {
    return {
        widget,
        widgetType: widget.widgetType,
        visible: evaluateExpression(widget.visibility.condition, context),
        styles: widget.styles || {},
    };
}

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
function trFormula(f, context, ts) {
    let formula = f.formula;
    if (formula.substr(0, 1) === '"' || formula.substr(0, 1) === '\'') {
        const ft = formula.slice(1, -1);
        const transFt = ft != null && typeof ft === 'string' && ft.trim().length > 0 ? ts.instant(ft) : ft;
        if (ft.length > 0) {
            formula = `"${transFt}"`;
        }
    }
    else {
        formula = formula != null && typeof formula === 'string' && formula.trim().length > 0 ?
            ts.instant(formula) :
            formula;
    }
    return evaluateExpression(formula, context);
}

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
function widgetToWidgetInstance(widget, context, ts) {
    const wi = createWidgetInstance(widget, context, ts);
    if (widget.widgetType === AjfWidgetType.Column || widget.widgetType === AjfWidgetType.Layout) {
        const wwc = widget;
        const wwci = wi;
        let content = [];
        wwc.content.forEach(c => {
            if (wwc.repetitions != null) {
                wwci.repetitions = evaluateExpression(wwc.repetitions.formula, context);
                if (typeof wwci.repetitions === 'number' && wwci.repetitions > 0) {
                    for (let i = 0; i < wwci.repetitions; i++) {
                        content.push(widgetToWidgetInstance(c, Object.assign(Object.assign({}, context), { '$repetition': i }), ts));
                    }
                }
            }
            else {
                content.push(widgetToWidgetInstance(c, context, ts));
            }
            wwci.content = content;
        });
    }
    else if (widget.widgetType === AjfWidgetType.Chart) {
        const cw = widget;
        const cwi = wi;
        const labels = cw.labels instanceof Array ? cw.labels : [cw.labels];
        const evLabels = labels.map(l => {
            let evf = evaluateExpression(l.formula, context);
            try {
                if (evf instanceof Array) {
                    evf = evf.map(v => v != null && typeof v === 'string' && v.trim().length > 0 ? ts.instant(v) : v);
                }
                else {
                    evf = evf != null && typeof evf === 'string' && evf.trim().length > 0 ? ts.instant(evf) :
                        evf;
                }
            }
            catch (_e) {
            }
            return evf;
        });
        cwi.labels = cw.labels instanceof Array ? evLabels : evLabels[0];
        cwi.datasets = cw.dataset.map(d => {
            let ds = Object.assign(Object.assign({}, d.options || {}), { data: evaluateAggregation(d.aggregation, d.formula, context) });
            if (d.chartType != null) {
                const ct = chartToChartJsType(d.chartType);
                ds = Object.assign(Object.assign({}, ds), { chartType: ct, type: ct });
            }
            if (d.options != null) {
                ds = Object.assign(Object.assign({}, ds), { options: d.options });
            }
            if (d.label != null) {
                ds = Object.assign(Object.assign({}, ds), { label: d.label.trim().length > 0 ? ts.instant(d.label) : d.label });
            }
            if (d.datalabels != null) {
                ds.datalabels = deepCopy(d.datalabels);
            }
            return ds;
        });
        cwi.data = { labels: cwi.labels, datasets: cwi.datasets };
        cwi.chartType = chartToChartJsType(cw.type || cw.chartType);
        cwi.exportable =
            cw.exportable && (cw.exportable === true || cw.exportable === 'true') ? true : false;
        if (cw.options != null && cw.options.plugins != null) {
            const plugins = cw.options.plugins;
            const pluginNames = Object.keys(plugins);
            pluginNames.forEach((pluginName) => {
                const plugin = plugins[pluginName];
                const pluginOptions = Object.keys(plugin);
                pluginOptions.forEach((pluginOptionName) => {
                    const pluginOption = plugin[pluginOptionName];
                    if (typeof pluginOption !== 'string' && pluginOption != null &&
                        pluginOption.formula != null) {
                        plugin[pluginOptionName] = evaluateExpression(pluginOption.formula, context);
                    }
                });
            });
        }
    }
    else if (widget.widgetType === AjfWidgetType.Table) {
        const tw = widget;
        const twi = wi;
        twi.dataset = tw.dataset.map(row => row.map(cell => {
            return cell.formula instanceof Array ?
                cell.formula.map(f => trFormula(f, context, ts)) :
                trFormula(cell.formula, context, ts);
        }));
        twi.data = (tw.dataset || []).map(row => row.map(cell => {
            let evf = '';
            try {
                evf = cell.formula instanceof Array ?
                    cell.formula.map(f => trFormula(f, context, ts)) :
                    trFormula(cell.formula, context, ts);
            }
            catch (_e) {
            }
            return ({
                value: evf,
                style: Object.assign(Object.assign({}, tw.cellStyles), cell.style),
                rowspan: cell.rowspan,
                colspan: cell.colspan,
            });
        }));
    }
    else if (widget.widgetType === AjfWidgetType.DynamicTable) {
        const tdw = widget;
        const tdwi = wi;
        tdwi.dataset = tdw.dataset.map((cell) => {
            return cell.formula instanceof Array ?
                cell.formula.map(f => trFormula(f, context, ts)) :
                trFormula(cell.formula, context, ts);
        });
        tdwi.exportable =
            tdw.exportable && (tdw.exportable === true || tdw.exportable === 'true') ? true : false;
        let dataset = evaluateExpression(tdw.rowDefinition.formula, context) || [];
        dataset = (dataset || []).map((row) => row.map(cell => {
            let trf = cell.value;
            try {
                if (trf instanceof Array) {
                    trf = trf.map(v => v != null && typeof v === 'string' && v.trim().length > 0 ? ts.instant(v) : v);
                }
                else {
                    trf = trf != null && typeof trf === 'string' && trf.trim().length > 0 ? ts.instant(trf) :
                        trf;
                }
            }
            catch (_e) {
            }
            return (Object.assign(Object.assign({}, cell), { value: trf }));
        }));
        const header = (tdw.dataset || []).map(cell => {
            let evf = '';
            try {
                evf = cell.formula instanceof Array ?
                    cell.formula.map(f => trFormula(f, context, ts)) :
                    trFormula(cell.formula, context, ts);
            }
            catch (_e) {
            }
            return ({
                value: evf,
                style: Object.assign(Object.assign({}, tdw.cellStyles), cell.style),
                rowspan: cell.rowspan,
                colspan: cell.colspan,
            });
        });
        tdwi.data = [[...header], ...dataset];
    }
    else if (widget.widgetType === AjfWidgetType.Image) {
        const iw = widget;
        const iwi = wi;
        if (iw.flag) {
            iwi.flag = evaluateExpression(iw.flag.formula, context);
        }
        if (iw.icon) {
            iwi.icon = evaluateExpression(iw.icon.formula, context);
        }
        if (iw.url) {
            iwi.url = evaluateExpression(iw.url.formula, context);
        }
    }
    else if (widget.widgetType === AjfWidgetType.ImageContainer) {
        const icw = widget;
        const icwi = wi;
        if (icw.flags) {
            icwi.flags = icw.flags instanceof Array ?
                icw.flags.map(f => evaluateExpression(f.formula, context)) :
                evaluateExpression(icw.flags.formula, context);
        }
        if (icw.icons) {
            icwi.icons = icw.icons instanceof Array ?
                icw.icons.map(f => evaluateExpression(f.formula, context)) :
                evaluateExpression(icw.icons.formula, context);
        }
        if (icw.urls) {
            icwi.urls = icw.urls instanceof Array ?
                icw.urls.map(f => evaluateExpression(f.formula, context)) :
                evaluateExpression(icw.urls.formula, context);
        }
    }
    else if (widget.widgetType === AjfWidgetType.Text) {
        const tew = widget;
        const tewi = wi;
        const formulaRegEx = /\[{2}(.+?)\]{2}/g;
        const matches = [];
        let match;
        let htmlText = tew.htmlText;
        while (match = formulaRegEx.exec(htmlText)) {
            const idx = match.index;
            const len = match[0].length;
            const formula = createFormula({ formula: match[1] });
            matches.push({ idx, len, formula });
        }
        matches.reverse().forEach((m) => {
            let calcValue;
            try {
                calcValue = evaluateExpression(m.formula.formula, context);
            }
            catch (e) {
                calcValue = '';
            }
            htmlText = `${htmlText.substr(0, m.idx)}${calcValue}${htmlText.substr(m.idx + m.len)}`;
        });
        tewi.htmlText = htmlText != null && htmlText.length > 0 ? ts.instant(htmlText) : htmlText;
    }
    else if (widget.widgetType === AjfWidgetType.Formula) {
        const fw = widget;
        const fwi = wi;
        fwi.formula = evaluateExpression(fw.formula.formula, context);
    }
    else if (widget.widgetType === AjfWidgetType.Map) {
        const mw = widget;
        const mwi = wi;
        mwi.coordinate = evaluateExpression(mw.coordinate.formula, context);
    }
    else if (widget.widgetType > 100) {
        const iiFn = componentsMap[widget.widgetType] != null ?
            componentsMap[widget.widgetType].initInstance :
            null;
        if (iiFn != null) {
            return iiFn(wi, context, ts);
        }
    }
    return wi;
}

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
function createReportContainerInstance(container, context, ts) {
    const content = container.content.map(c => widgetToWidgetInstance(c, context, ts));
    return {
        container,
        content,
        styles: container.styles,
    };
}

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
function createReportInstance(report, context, ts) {
    (report.variables || []).forEach(variable => {
        context[variable.name] = evaluateExpression(variable.formula.formula, context);
    });
    return {
        report,
        header: report.header ? createReportContainerInstance(report.header, context, ts) : undefined,
        content: report.content ? createReportContainerInstance(report.content, context, ts) :
            undefined,
        footer: report.footer ? createReportContainerInstance(report.footer, context, ts) : undefined,
        styles: report.styles || {},
    };
}

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
function loadReportImages(report) {
    const promises = [];
    if (report.header != null) {
        promises.push(loadContainerImages(report.header));
    }
    if (report.content != null) {
        promises.push(loadContainerImages(report.content));
    }
    if (report.footer != null) {
        promises.push(loadContainerImages(report.footer));
    }
    return new Promise(resolve => {
        Promise.all(promises).then(maps => {
            let map = {};
            for (const m of maps) {
                map = Object.assign(Object.assign({}, map), m);
            }
            resolve(map);
        });
    });
}
function loadContainerImages(container) {
    const promises = [];
    for (let widget of container.content) {
        promises.push(loadWidgetImages(widget));
    }
    return new Promise(resolve => {
        Promise.all(promises).then(maps => {
            let map = {};
            for (const m of maps) {
                map = Object.assign(Object.assign({}, map), m);
            }
            resolve(map);
        });
    });
}
function loadWidgetImages(widget) {
    switch (widget.widgetType) {
        case AjfWidgetType.Layout:
        case AjfWidgetType.Column:
            return loadContainerImages(widget);
        case AjfWidgetType.Image:
            const image = widget;
            if (image.widget.imageType !== AjfImageType.Image) {
                break;
            }
            return new Promise(resolve => {
                const req = new XMLHttpRequest();
                req.onerror = () => resolve({}); // ignore 404's
                req.onload = () => {
                    const r = new FileReader();
                    r.onerror = () => resolve({});
                    r.onloadend = () => {
                        const result = r.result;
                        if (result.startsWith('data:image')) {
                            const map = {};
                            map[image.url] = result;
                            resolve(map);
                        }
                        else {
                            resolve({});
                        }
                    };
                    r.readAsDataURL(req.response);
                };
                req.open('GET', image.url);
                req.responseType = 'blob';
                req.send();
            });
    }
    return new Promise(resolve => resolve({}));
}

const vfsFonts = {
    "roboto-all-400-italic.woff": "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",
    "roboto-all-400-normal.woff": "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",
    "roboto-all-500-italic.woff": "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",
    "roboto-all-500-normal.woff": "d09GRgABAAAAAQOYABIAAAACBAQAAQABAAAAAAAAAAAAAAAAAAAAAAAAAABHREVGAAABlAAAASwAAAHqcGptjkdQT1MAAALAAAAnBQAAVhwfGyUBR1NVQgAAKcgAAATCAAAKAtB4085PUy8yAAAujAAAAFMAAABgl+axumNtYXAAAC7gAAAJVQAAEkZQq/ziY3Z0IAAAODgAAABcAAAAXDEcBktmcGdtAAA4lAAAATIAAAG8h/wkq2dhc3AAADnIAAAADAAAAAwACAATZ2x5ZgAAOdQAALaFAAFtYHxAhHFoZG14AADwXAAAAU4AAAPs8wnq5mhlYWQAAPGsAAAANgAAADb8n9JyaGhlYQAA8eQAAAAgAAAAJArvCZlobXR4AADyBAAACB4AAA+AnIP9aGxvY2EAAPokAAAHcgAAB8KzPVShbWF4cAABAZgAAAAgAAAAIAYQAw9uYW1lAAEBuAAAANkAAAGAG8c6DHBvc3QAAQKUAAAAEwAAACD/bQBkcHJlcAABAqgAAADwAAABUxoCoyl42g3PA6gYUACF4f/cOyvONtNs27btLffizDzbdp5t2/aWtme/01/fyXUQgRIAoJMEulCTtsg71iY4sdCJxU4sc2KlE6tZbzeyze514iDHiJxy4gxn7UUnLjtx1YmbTtx14j4P7CMe26dOvOGD/ezEdyd+8tv+JdNmO5ErIUVFW0iFbSmVsxVUwVZRNVtDNYmqp/pIjdTYNlVT20qtbQd1tt3U3fZSHztAA+xgDbdjNNZO1EQ7WZPtdE23MzXbztVcO1/z7RmdIeqsLhD0RT+QfocBKAwOe+y+cM5eCHfsvfDcvgz/bUpIsWkhF0XFaAvEIrZYXGs3xA12c9xit8XtdmfcY/fFj8gFoBjQAFGCg+6QO+yOuKMclb+rlmoj8pPAXo5xTGfyAD9tVoF42pSSQ7QeQRCF69m2bbO7q2Pbtm0bD3GyertwG9ua1VvPNtzEtln195mY5zvt7pqqewfcAMAfSqEZeLZp16UPxI9eOGsKxI+fNXYyxE8ZOWcaxIMnAMCnT3wX3CaPnTUNfAHMis7cAaj569vg5rGC77qd9m4U8SLe+7lPP4XqpkjVljrmMwQlSvUYy3nUFo7xPxXQAffpOXqHKJe2PhRwTjVgjbADPYMwqA0OwkHKwhrcEtxOrwreI1ZQ34g12goJlMEKKSaGbApdEjYtvEf4U70q/DUOiroaY8c+jPONC46LTHBP8E1olbAg0T1pQ0q/tEKU6YsyM0V59jz+vliFksnpkvuWVtfzrufvKmhSsK2wTlwsihYriu4XR5cswZqyt+WyYl5VG6yphMpNlSeqgqvaUE0WZb2qahLWyGBxUZSLFeoxg5Lnpj6zL+KrGkQ8oy2qeZ/CbxGp6pgBpQPfM0hbNXyLsA2si4NepVdRpAaniVQDKy7sHxvFH0SNcbww8L7TBmmK6zTc4mIfo3eQS6vYKUahyZrzZJfVMX3IRHX8xX3SFhRbujKmPCknGcynrJVYxa/IyWPOfZGK+0Q518m+61Wkni0uUoU7GP62UZKz5Fq5IvZBpPKZoz2fOKcM73IlHFOQWk7jO//TON6fmqlCWb9phFHPNNzHfw4OEtdJgcfS/loTSqO7ukka0Es+Yb2+uuTStoZd4epdbQc5YoE7rAdPAsCbcIMACKS9CMITsiAfvKAQimi3BKohCCQRBQjNIRraQjtIhI7QCZKhC5EK3Yk06Al9IB36EdkwgMj5zDA9IIGRAFAQ/Vgjtm3btm3btm3btm3btm3bydSrPkKjCqojEWoGkmFIIDkmBFJgeiAlVmM9UmEjNiM9tgYyYXsgM3ZhN7JgbyAb9gey4yBOIAfOBArgHG6gIG7hJcrgdaAOPuAT6uIrvqEBfhBoRPN3NOU//Act+D//R0tGYhS0YhzGQVumYCq0Y1qmR0dmZEZ0YWZmRldmZVZ0Y17mQ3eWYzn0ZAVWQC9WYiX0ZjXWQB/2Y3/050AOxkA+5hMM4TM+wzC+kDFcfykk5iq0wmGpIisGViqukmK9kis5diilUmKnUis1dimt0mK30isH9qigCuOYiqooTqq4iuOUSqokTqu0SuOMKqgCzqqSKuGcqqgKzquaquGCaqgGLqqWmuGSWqgF7quVWuGB2qgNHqq7uuOReqonHqu3euOJRmoknmq0xuGZJmgCXmmSJuG1Zmgu3miB1uOTNmkT/9I2bePf2qEd/Ed7tIf/ar8O8D8d0mGG0FGdZiid1XlG1EVdYxTd0E3G0m3dYxw90VMm0HM9ZyK91Esm1mu9YxJ91Dem0A/9YDrLZnr/5b+Y0f84LDM5giMyjyM7GvM5ruOxkBM5EYs4iVOxqDO4Bsu4lmuxq+u4Jbu5oztyiAd5OId6pEdytMd6HMd4oidynCd7Csd7mqdxomd4Bid5oZdyspd7OWd4pVdxptd4DWd7gzdxjrd4C+d7m3dwgXd5Fxd7j/dwiff5CJf6mI9xjU/6JNf6jC9wnS/5Ejf7iq9wS/BHpp/7cCbows99zByU/+c+dQ/6xamdAFlV3QkDv+89TMQWbJYvrCIiIg7YdhAYaFuCzQ6mkGAPH8G2RASVJWAMMSSh+ChBulnkY0lFKmNbM1RZOJCKoFISBIGIAok808BzUJZ+NLzGFnoHok5x5peGWDjlLDVV9ev/Oecu757zv/e+c+/rBSzkaHg3sZKkddpHeVHb6F7Xx33Rd2Idorbx66PvyEuP+CpxDevZwpt8pv08NdRF30nEo7aJG8RilrKcUsq0HyZlv7GoTbg++ijKvlwdteb2MDjKCbnRAJ87LLhywmfRSEYxhvEU8g8hE00MVdEPw9moiLXa1vEbbVvs4w22q++wbJ+4nz9a5rOjFJfCZ7EELcLgWHuxYzgb6yJ2Y2DUNlYgDhMfFSczg+cvV8eW8gIrqbZtDbXUUU8DjWFwvHk4Eb+BLG6kBS25iezwWbwVrWlDWzrSic7cTBduCVXxrtxKN24LZ+PdMUbxHvZzh9hTvFP8O7G3bXLIpQ996c8A8shnEIMpYCjDeSjkxp8UpzOT+fK8gIUs8rnPU8xSlvMCqx1Hqc99ha22+b22t8Wd2ncr71H+g3jAvg9a56h9feIYj2k/QTlp61aIVWI9X1jvS+tcDp8lEuFsopnYnCzl7DA40SqcSLQW24jttHegI93pQU96WzeHXPqp97f+31t/gDhQzBPvFfPF+8RB4vfEweL9YoE4RBwqDhOHiyPEkeIocbQ4RnxA/L441meMYzyFTGAikyhiClN5gqeYwSxm8zTPMJdnmccvQlViPgtYyHMsZgkl+rSMFax0/bzqGP7FMWyy3Wu8YZ1t4naSlh+y3pFwNrrNNX8yyguno3vDuei+cDwqU0+Fk7EO4XRsoDgsnIxfH47H54sLWMjKcC6+Stsa1rOFNzlq2WeWnaeGunA8EQ+nEzeIxSxlOSvDyUSpmBTLLD9Myuff7GgOOprzjuRDR3LQkRx0JOdjA8Vh4aAj+TA+X1zAQlapr2E9W3iTo9rrwoc++XziBrGYpSxnZTiYKBWTYpnlh31WqygnVEcDQ3W8GdfxLb7NQzzHYpZQwjJWcCBUJ37OL/mz7b8ffSvKjrJoEbWN7o9aRyOM70hGMYZCJkdtorXiOrazj/1cco9J0IVuFPAok5nBoig7tpglFFMSZcezXRetaE0b2tKbHHLpQ1/6M4A88hnEYAoYynC2coxyKmiw/0Yucdm50ozmtKMDHelBP8YyjvEUMoGJTKKIp3mGucxjE9vQf7O0iyEVWxxejAYbr3PRSEYxhkLWso7t7GM/l8K5WIIudKOAR5nMDGddNq1oTRva0pscculDX/ozgDzyGcRgChjKcLZyjHIquBzOJZrRnHZ0oCM96MdYxjGeQiYwkUkU8TTPMJd5bGIb+hd18A12yjfOKZlu765/Kt6JztxMF55kOjN5mz2cCKcS3enJFKbyBE8xg1nM5lleC6ciZ2lYFLUOi2LPs5QXWKnNdeAoBuplM67jW3ybh3iOxSyhhGWs4ICj/zm/5M+27xp9K9RHWfwwNERF7OBiuOB7tCG2KNTHFrOEYkpCve+uhnh3VrOTNFXU02B5I5dCvft+QyKL3uSQSwnLWMEhjvise6M7/O3FPfTjOdbwIq/zrmvU2rHraUcnbuYWbuV+pnOB4CgiYsRJ0Iu7uJvv8j3uZwjDeIKnmME/8s/8jiP8q6O8juu5jdu5g8d4nGk8yXRm8iPm8GN+wk/5Gb9jn77k621GbzN6m9HbjN5m9Dajtxm9zURvhT16nK3HGT3O6HFGjzN6nNHjjB5n9Dijxxk9zuhxRo8zepzR44weZ/Q4o8cZPc7ocUaPM3qc0eOMHmf0OKPHGT3O6HFGjzN6nNHjjB5n9Dijxxk9zuhxRo8zepzR44weZ/Q4o8cZPc7ocUaPM3qc0eOMHmf0OKPHGT3ORAPMBE9H+aHMt8ShaIvyG7zr3P44lMVa+N66RxxCEdXqNdRSRz0NNIbTvk0OxW8X7+BOVqmvoVR5vfiKuEV8PZTF3xQPqn+sXKf8RdP32qFEi1CWyFZuTSfl/uIA8shnEIMpYCjDGcloHqDYPpaynFJe1ZeertHhUWtuDx9EW3iD90O93n3guh0eW8oLrKRaWw211FFPA43hg/jt3MGdlPIKB/kifJDIpjX9GUAe+QxiMAUMZTgjGc0DvOpYYs6oltE29+xj0UhGMYZxYXf0A8aHVPSQWKhtYjjuXpCOilirvo7faNsu7tD2jpzutq55YfSH8Gm0N9RG74XKaJ/l+zkQKqI/Wv9P5gMfhMPRwfBJdM76tdTRQCMXuGT9v4hf8CWXw+5YRCIci10ntg8p96F0rIt6N3pp608+gyjQNl4sZAIP86i2ycwIx+LZtKI1bWhLh7Db3ToV70RnbqYLt5gRdeVWunFbSMe709s2OeTSh770ZwB55DOIwRQwlOFM9jlTmMo0nvQZ05nJIvt/nmKWspwXWO3zttr2Lev/Xv1t6+7Utlt5j/IfxGOWH7f8hPpJsVw9bZ0K8bT6p1Sp1/O58mXtIex2P077LjyWaE6WcjuxAx3pank3uodUood6T7G3dXLIpa9l/bSPZRzjKWQCE5lEEVNsN5UneIoZzGI2T1v+DHN5Vn2e+AuzyvksYCHPsZgllPjcZaxgrc/fwCbbvGbbNyzfprydvdrf55D1jjg/f+kb7eMoixHOzJGMYgyFTAw1zu5jURFr1dfxG23bxR3a9oRzrpWbnNFV0T5t+zngTP5jqHFGVzpja2MJOjrDuojdKOBRJjODReHj2GKWUExJ+NiZWBtvRWva0JZbQk28K7fSjdtkqju9Lcshlz70pT8DyCOfQQymgKEMZ5F9PE8xS1nOC6y2z62W/155p/Ju8Q8c01ZOWluFWCXW0+B4G7nE5VDrzDmWaCY2J0u5ndiBjvSgt7YccumnPpZxjKeQCUxkEkU8zTPMZR6/CDWJ+SxgIc+xmCWU2OcyVrDJum9o2yZu55C2I3I2wrfljVFrRsjQSEYxhkLWso7tyGy0T9zPpVAZS9CFbhTwKJOZwfPRjbGlvMDK6EYZrIy3ojVtaEtvcsilD33pzwDyyGcQgylgKMPZyjHKqeByqEw0oznt6EBHetCPsYxjPIVMYCKTKOJpnmEu89jENvTZDPKAc/l8qDarOxJd9nRmBh2b5TyPadnl7wGzwF9Y78Yoi2ufg0arjxHH20Oh+ENrFHHtM9EO9XfD/4/eE//2fHTAdn97RmofqrwBzfovnpVujC1mCcWURDd+47NSR+8gOtGZm+nCbVFWvDv/2+eoJ+1jOjNZbT9btb2tvFN5j3hM/YRYLqa1VYhVYj0NjrORS3jmSiSirK+eu7KUr3326u55vofYU+xtWQ65/E+ex6bYZipP8BQzmMVsrn1We1Z9nlhiv8tYwSb117Q3Pb9xSNuRKKsp86fMCB72PP0I1TgXYn2dHUPRFv8Vv2Ydpzx7t6QzR63bwpb10SNUm+X0ZSjq8V/xa9ZxylNASzpz1Lrd3Hkbm7YsEh8JnjVEe3A3bbx2L+6EjfHurOZXZuG/Zh071dOcsk6VWB8aEwmy+Nsn9VbOIZcSlrGCQxzhqM99zHfEgSiLAealeWYp+Y7E/NQRZhxhTVQk7qDM8hQfW35Cz33TRhnrV1vnYtjvevpzrHk4463HYb3IxLqGitg9Tb2p8RakzLX2bmyI+lD1YeojzGZGUaTtEW2P2W6Kp63H3XFmhsddl/t9fxyILWYJxZSEA01zX7PxeHfmm9MuYCGrtK/WtkZcT9P818i8Ke7U/oHsHbXex9rS6qfc96vEOsvrxQb7buRSOOANzOGEp4emeXKW2KJpVGsSncTOYi/Z7639LjFHvFvMFb8b0k3z4hLlpeIycbm4Qlxpjr3K8lL1pHKZzzik/bB4xPj+WCZ2ycQumXhJJt6XiVqZ2GhuWhb9gIfYTZnlh8MF2XhJNmqj48quTRk5IyO7o3PWqaWOBhq5wEXz37+IX/All2Uh4jo6hPfNKctkrNa8skzGXpKxP5lflplflslcray9JGtnYqN4wBu2B2VrvGWFTOBhfKvJ5EFZrIpNCxdkslQmD8ZmhwuyuUs2d8nmLtncJZu7ZNOvNLIymSlMZRrzw0sy+5LMviSzG2V1o6xulNWNslorqxvNDctktUpWX5LV2vhx9ZOc5lPqrNPgMxq5xOfaQiiT3fdldqOs1sporTlfmTlfmaxWyWiVbFbJ5BlzvTLZ3CiTG2Vxowy+JINnEmu1l6pvEPfyPknLyuz3sLzNlcnNMrlZJktlcq9M1svkBplMymRSJpORa0s2k7JZKpOlMlkvi+euXld7ZDEZubZkMimTSZlMymRSJpMy+Z5MJmUyKZNJmUzKZFImkzK5VyaTMul+FGpkMymbpbK5SzaTspmUzfqr12HpV9ehjMpmUjaTspmUzaRs1l+9Nj+Q0bOy+bJsvieTm2Vys0xulsnNMrlZJjfIZFImkzKZlMmkTCZlslQmS2WyVCY3yOQGmdwgkxtksl4mN8hkUibPyWSpTNbLZFImk67RGtlMymZSNjfI5mbZ3Cybm2UzKZtJ2dwrmxtks/7KNSq6RmU1KatJWT0nq+dk9ZyspmU1KasbZHWDrG6Q1VJZTctqUlY3yGpSVpOympTVUlndK6t7o/GyuVMG0zKYlsG0O6S7IzuaMpmWyZ0yuVP29steWubSMpeWubTMpWUuLXMnZS4tc2mZS8tcWubSMpd29zzvzlnjzvmZDKZlLi1zO2XupMylZS4tYztl6lOZSstUWqbSMpWOuXPKTLkMpN0da9wda2QiLRNpmUjLRFomdsYXsJDVlr+lbad4VP248knSfx1x8VOqlOv5XDkYoYRRzaKrcjd6K+eQS1/1EnEZK1gZdhrRtNFMG8200UwbzZ2JQ5YdMV7TjWbGtVF59dqoNLIpI5sysinXRp0RTRnRjBHNXL02ql0bZ41uxuimXBt1RjhlhFNGOGWEU0Y4ZYQ/NMIpI5wywikjnDLCKSOccm1UGtnU1WujzginjHDGCB80wikjnLp6bdQZ6Yxr46xr46zRThntlNFOGe3U1euiznVR6bo477rIGP0PXQOVMpAy8ikjnzLyKSOfMvIZI58x8hnXQKVroNI1UOkaqLx6DVTKRso1UC0bmavXQEpGUq6BOhlJyUjKNVApGynZSDnvK533lVfP+7qr532d7KRkJ+W8r3beVzvvq533Z2Uo5byvdN5XOu8rZSjjvD8rSynnfaVMpWQqJVMpmco47yud954aotuj7OgOI9+Le+jHgFAe5XGf8/k59TW8yBbrvi6+IZZZfkj5sHJK2e9l0XHlpjuc+vmoTVSv/nkojzWLsmPXG+kWYjuxg7ZO4s3cwq0M1Ha/OEz8611rpDhKHC1+X3zQtuP4v66Px8JJmTkRm6Y+/a93LvUfydps9TlUU0MtddTTQCMXrB/MbyNixElwfTgZNxbxO7iTXtru4m6+y/e4nyEM4wmeYgbzXZsLWMgq+1nDP2ovtZ9/Fterv6L8O+Utym9yUP2I+r9y1HZ12r6IsmW+PHGdzF3PDeFkIltba25Tv507+Oudro/1+msfQB75DGIwBQxlOCMZzQM8ZtvHmcaTTGcmP2IOP+Yn/JSfUezzl7KclaG86U66WixVf9X+9Cexj6S2Mg7Le7/IueoMqnMGNV6db9Y6W+quzGpEc7Srs5oGZ0qds6Exdg8DlYeIw0Szj6a542Oy+jhNsw3RTEOmao14XXwBC1mlvob1bOHKvLDW9dZgZOviPs/o1hrZxsQNYguxE71CQ+Iu7qZY+1KWh1o9rUuUikmxzHqHHe8M18lNV+5q5HumuE/cou0NypQPa0uJR533Hysf50SUdWXepr3SXs57eq+3/kVX3ueuHc/Dro2bYi3o4C5zT9Tyyh1L+xDlK3epM64FdypxtOjtbOxBy8bZpkh8zDqPM0256U5l29nKcyyvpoZa6qingcboJqOYid8u3sGdfO0uxhpKta8XXxG3iK9HLY2s2XaU5fy96crdTFud+EV0kxE2q6ZF1DKRrd6aTsq9PI/dxd2YeyX6OGf6WzaAPPIZxGAKGMpwRjKaBygOZt0sZyWr7Ge1/ZQqv2p5012Nw0GOzNHeibIYEF6Wsf2y9duoTDnFlXlYRlbebZo1Xw5HjP5+I/9y06x4mDjCSI7CvMkI/9kInzO6/2R0k+ZH78QWs4RiSsI7RvO3RvDl+AIWskp9DevZwps0zYEsq1NusE0jl8I7Rm2/Ufvt1+cyelKsbSnLWRleTqzSVqqcVC6zzWH9+q4eVrjKzujh6ahM+bBySjwa/PKgfJwT3l/Xm7M3455wRk8rYkPEYeKD4jjtReI0Zjq/ZotzQpVendarivgCFrJKfQ3r2cLr4YyendazT+NHLfd5eucXCFrITyd6hU8Td3E3xdqXspyVoUJvTutNRdRdL07phR6Ih8WUeNQ3ycfKx9GD6LxYb/bUjHvCab04FRsiDhMfFMdpLxKnMZs5wX+G+C1yAQt5/asjPeVIHSGduOYIHdUpR3Qqau+IPjOmDVGZmLLngQyzR7+QxeeLC1jIKvU1rGcLb3JUe527yg0Us5TlrPR/DqVi0j4HmhP5Dzse4mH3yN3iObzDiqrVa5XraKCRC1y07C/iF3zJZTPKiOto7n7Z1b2zl3Lf4ElPzCOfQQzVNl4sZAIP84i2WWaBHZjMFKYyjbc4zklOuZ+eFj/lc4KZXkv3yM50Ve5GX9aygb287/i6X/O764WoiB1cDI2OvNER+/2VPGbxzb/DXoh3ZzU7SVNFPV//HfZCIove5JBLCctYwSGO+Ox+0Thj+AMeYjfnOG/2UivW0UAjF7joXchfxM/FL8Qv+bfwoaOvjkVcRy/6k2eumC8OYqTyaMYrFzKBh5kVzhvr6vhkpjCVabzFcU5ymk/5nGB+15Vu9PEeoq+4WlwrbmAv7zumG4zzBeNsDFnMEoopCcaJRi5ZZ+LXfy9gvKfaQnEt69jOPvbT9DsA7b1B8J9e/9lvAd/43r9jeD/eic7cTBf+t+/8n7TtdGayVf1tcQ/HlE+I5WIF3uN/9Q7/2vf33T299xB7iv+Td/dTrDeVJ3iKGcxiNte+139WfZ64ideUr76zj172nrlFlMUwtRHe+4xkFKO1jRH9V0VUKH71rll5HdvZoW6mHu1T3s+fvNE+H/a5+30UedcRS9AsfNT0XxneOcuM/zvR1tV75W5iAeMsf1SczBTrTGWG8hzti6IWscUsoZiSqEXciMVvIIsbaUFLbiLb+5VWtKYNbfmG/wT56j21kY735O/obd0cculDX/ozgDzyGcRgChjKcK79r5Kmd9ba3lZuemctfmLfx7SdUC4Xm95bi1+9t9anRi7xZdOZsevKu2uxOVnKzthEG9qpd6Aj3X0D9BB7il97h63t7607kHu5j+9xP0MYxghGMYbvM9Y24xhPIROYyCSK+K/+M+Zpy59hLs+qzxOvfef9L8FZp+01y7aJzpuv3nvfFLmfNT19XXT2fY7rIhaLvtP0JGYGGxupPtpve+PUZynPMZvvY4+rrTvW+VodjWQUYyhkLevYzj72c2U+29KnVDgv3SXFfwtv+bQK52i1T2sZ6yJ2Iy/8PlYgjrRsdDgaG2fZo+qTmcEs7XPMJbPd9VrRmja0pTc55NKHvvRnAHnkM4jBFDCU4WzlGOVUcNndshnNaUcHOtKDPuYj/cSxjGM8hUxgIpMo4mmeYS7zWG27TeI2jE3k7b8rtogdXAz/z6hUN41/8/CJbztXqXHPCyNiRjg2minRt2NTQ6MRWBC/zRncndXsJE0V9cHZSxa9ySEXo5EoEZexgtXqh8QjPvu2K79DyGiRuIPzvpGr1f0PkyOSn9Bw5TcJRzeUceqPiP6z59rfJq75PaL2G36PMAvgv/k9oukbKhVleb+yiMUsoZgS7zwaaOSSdf6PYy6PqrkYfmr09jjWQ0bvqJH7xLGWG70ujrfcCO4xgn7HUZ7iuKeGeqP4D46zPNGSzvQJe4zKnqiFvT1ub2X2dvSrvdmTvZTF7OXaPdiqzFZlUXNbTbfFe9du8R/XburbR/rmzspillBMSfgo3kAjl6wz2bX1YjSSUYxhfJgTFYoTQvtoUuR7QHkd29nHfi6FF2MJ2oc5sS5iNwp4lMnMCC/Gs2lFa9rQlo5hTrwTnbmZLvTWnkMufehLfwaQRz6DGEwBQxnOk7adzkx+EtrHf8rP+Dm/ZKt13rZsD8eUT4jlYgVnLL8cXkw0oznt6EBHuoc5iR5iT7GfOJZxjKeQCUxkEkVMsd5UnuApZjCL2Txt+TPM5Vn1eeImXlPeJm7noHGONY10s6iFp8D7nZtmvt4xeWMVveU3rz1K70at/J5c3vS/EB94gjroGj7qblflOeSivOYx2ln5QEj9O5XmACRXEIThnj37lmEpLoSF2IXYtm3bdlKIVYxt27Z5tov7Ol+9bHBads/01/3PY+N5m6tSyWYQe9Ih7IHH8hlXo8QYrtjh816PSBLP6YyXyXloNhr3c15p0F2YfsPqiammn00N9uZ1eN+E/1aayrgfTH+9bEZiO4Z4HMzMsR0r28E4I/DjuI+z2Jt8zl0CfWVf6WxJJMXPWvcQ0XOpId10nvTmrtJYK1fmWAWy0Dooy7SfrNTWcE+SqxpHp1MkPSFNOfoIg38E/HHwx8IfDcdgOELIwWVYWkqmZcHiliLs/NhYPKu64QozDqkBWyyrxmnKWsmsnEMwemFsAGMskY6CsyWc0UTb2LS1csnhNdPfymZl1WRl9Yc7Eu4Qoq9BPl9LaYnUH3Yfcyy8TcloK02D6p304Hkg1RtLpudwRr9Q90B2HbJrkD0T7nVDd0eu4X1DU6F8A2UKlBegTIXyIZQfoLxr1nJ31Cfl9SijZpOvr7KNPJ9DA+fJ4m9d3BOu8pD527A/gPsZPAvJ/FB4lsIzjNp9hiePKhynCg+own4zFr9wPHICe4NcspJv6vE8mOeh/I9FLw6osqQ3EUcEOhrO4fMD+xzsc7FPD9wPyEALG8RhnBzZceVH4vG6TqS38TtFld7id565UvE9gVpe4H8P/z1EiWI1gXEemaH8j9WHZDhbDCM8Isb3bIMzxQtRArbcD+R5kP6E5AczJfztj14hYdJDYlHSW3ojtpDPu6jERcydUO7TYj0Zb4r1ZARzHOzBtxYr0WnoIedKRrDeoppXieE5lRxDJcdRyeZU8hCV3AvZOao4j+rNpnrbmW0m45+gevOo3lyqN4fZj6LROOgT0Oge5p6CRhdIEXZ+bCyeVReg0ZlotAoanUt25pOdYWTnAxpdaNgyotG5xHoSjZItnUMGtlHTMWQtCbLRZG4TmTuMRmej0TiYNtprPjjQZ++UbvrD1mSofcR/xz6iT7M7RjL1HvPl2rZx2EZjm45trARJb02Uc7YaEyRMFupXOa35clZz5Bbe73mf9IuTsga2Goqi6Mbd3aGDCrcabXB3d29wqPAOqXF3bXB3d3d7xvc2izt3MnmafFkze989J56cE76ab/BVpStsUlmp8rbaPdVKzZRIbVn4wU+3Usu6m6zET34pBSLueoRXbgoTctM31kmEU4/gKfkU2PyYLDYwW1JVWdhg9M5erzZnJO7xRRkgx0vZ7nqQiFcpFpyUD8RknSy7/jZWVyWAnLRKlooEBann4IeXchUAeWmV3OB9yXE9nRqyMIo38oGwigW/+SbxC9stvFUgjDXa4+Yr/OCt8XfM5hpRdqqWanOb72SrmgyETEU0sl00UxazlzjAT6N25tgNjOS4pJqqyVluel10RjV44DisVk3H1Fhp1NrtKevFhQi/rcdUTeJXsd7QH3uk7Wu+KTO1rKozVeKZfOCHigTRInyNoFn5aP27aiuVmrIwxKf7jNOfAtVQAjzio5sWOHM5IA/6Fmd60uGqOxN1JNbyl45OSB7O14R+66AEuGUUZZ/EBh7Lhb1e+hD8bq0Hk/b++SbrxHjl/g+rKwMssn5TAfCLe8oIf5O+x0vMynN+cs6475ukjfUp8oFzaZVlRIranezgWOI3456X7xrZ+VARcPyvMIxLRtNZTUcmMElSBVVgDutwp4nZKscWpws1VMFpLlFVFi4R4jiXJPZxwpZqqzbPlQT3nSVckOhuFLKl/xzbA4ydYRQG4fc7t7Zt27Zt20as2rbdqAhqG0Ftu402aLvhmuefTGxzHtMq5fKk/DyHRTxTMS+mmqqrHGqgFsqrNuqkYuqp3iqrvl4FbH9FVH8lVH81jfOqa4ImqQaevzaev44u6orqovcb6qHXSI+9xvqgj2qiz14zffOa64d+qYX+KE6t9c/rpHivs5K8Lkr3uipTWeoWcrjh74Hh74Xh743h74Pe74/eH4TeH4reH4beH47eHxE8jQqeRqP3x6D3xwa3W5oQtocdmo7en4nen+16v4TmIPZ3WHVrrn3I/FPI/AvI/MvI/CvI/KvI/Gs2wkboOj7/Bj7/Jj7/Fj7/Nj7/Dj7/Lj7/GT7/OT7/BT7/JT7/FT7/ta2xNXpj62yd3toG26B3tsk26b1tsS36YNtsmz5i+D/ZLjukz7j9P7j9uMjtKzFy+0qK3L6SI7evlMjtK9Xd/lulI/ZzIfbz2i+3+oWx+qWw+mWw+mWx+uWw+pWw+jWw+jXd6hcPtVH6zVH6LVH6bVH67VH6HVD63VH6C1D6C1H6S2KLY4td7HthGWJ/OWJ/LWJ/HWJ/A2J/I2J/M2J/C2J/K2J/F2J/N2J/L2J/H2L/IGL/EGL/KGL/GGL/OGL/JGL/VOyti/3TLva/hbPZ1dSJiuM4FEbhT5LX2KnslaRS2/s/z8z7DBTmgom7KgzdQJ+fg2SEZazlSpryrzOA6Hmf/JnsxU5SA1gZPIPkCFhbubnaGm0EaLRO6EAFoFIpWhwAPfZ6T/4MrWWS/8OHLMnm0AOqB77MmzcAW8AnYnwS4IL9N3/2itfZ8+tsjGyJ4qb3GK0PF7C1NxASxPhjJMAl3vk9nJ29O08t8O7d30eSsEaeZaeeIkiR1ZRRM8tJNwWgUiIAvV7WhDunmQm17s57KsusMODZXKqwkpSQQ7jEmnBl2StGvdHGUwiQ1SAZowLWNmCIurc22mIEFaCgJ/rUPoi6OfiUvfhQAxKOdta2Gh2K1klvr3Mh6F0JR72zMzijkjVqdMDsRu+cjHrTnYwdhVqHTjeNCZICKGh96sMg5nrUWvetxNd/6ZxC7O4yoz5kDUQdq/DmAwNG98TqgjiH4EUrIYHKgMH8HCdHLQ7E2bzpv7xi40mSNOUfOwDRc3Jx8ggNMkT7CiBPPlnpnR1sDLYQtFE/SARFUSkSxjg1e52130X+cTzNejUeJ058kNABCgRpYf6V7IgVYAOObuBqiYI9iuI5qmtSvEx9yiTJswIygMY9WeWsk5GlaJlTzNnYz24LZZIsfY2vcPViztEzCiFQpjmTBOBIzCje/omLC3Z2TnZTC5yc/G1cCJpZsntypJ8yaGdJEYCiitRTOp1GG2ZpJstmc3/NK5YpYZFVIYIn450rwl696AGDzmBrHUJGA8gG4nkrkMFgg0FCQY0KHahV6oV/vWkEyCBb2WilqIqdvaQYAUXnQDjo7OzADkWjBUkBZ50U8yeDLu7stKMQu5amMSjEuqdY95suvHpBkWKuRyX9YFSlb0zh9By7a8FBF4qaRHHPIHCBWF0SxHpQA0iTwXwlAeKM9s66Lw/YWv8HTGaQTAAAAHjabVUDsCQxFOyXzOL2/tm2bdv4ONu2bdtW6Wzbtm3bNma6pvbmo1KbTfr169dJXtVAAPiwQ0rCKF22cnUkbNana3skbNW1RTskbN+ke0dkhgEAf//yX6AQCVnhKVG3THJ0L1W1ujmXrVoiOYoGBldOjqZBJWomR0jV4EBzXb1qJTPKXJed60Ik7t323oA7HOINh3iI/FfR5t7XrFmHzijavGOnDijbsmuTZqjcvk2rJqjJuT7n1u07NWuPzpx7cu7fsUeHrhgKQNk/gQ+AZtXI3HsA+vLwByj7X+z6mrPBOTICkBCn8MUz17POc8HzxOvz5vaW93b1Tqd/N2IiI0qiLrpirJ0ZE4LJvHnhCHTgvR14kANv/B9XIQ68vAN/4sCzO/BnDjz+f1w3gYLCMqwCJLWkg8uOeaFMrlseyQN5LE/kob4LgRuBCFIh6ol6ZmYaNlPcOZEXXbEIa7ANJ/BLokp8qSjNZaBMlh3yRUGlVIVVkBqr5qst6p76oFPrrDq/rqj765F6sp6rN+kz+p7hMwobZY3WxlBjunHEuGZ8cCV2ZXXld5V0VXbVdA12rXBdcv1xp4cbUREbCZEcaZFZ3kJhuc4LhdXyxjqNzg+FlfIeCiv0ciisgsDQWyyGtVKZrAy+aYDeASU79DbGQut+pW4Qdb9QN8TS1VWpu5K6ihqLLaYqYymx0q4I1H5SrTHVflCtoaWmKlBtNdU0vFaO3kO9mnS2j1p2RNVmpC4jBxihA/WN6oeIuBCAmIiPpEitGpPflPwjVlQvtWrLH6sqPIgO8pAR2ZFXH4PGCpMPqjWl17/02pxeFb2u9d/ocd6jAZ+pExeJVQdW68RqJ1ltvfNcqhvjfRg/7XA/gMhZImE9nbc9ueipr8VRBj31p6dh9LTR8RqXWPmChfsrv2b2FWa/ZMc7b8nL6GhG31N7LF96PDWoqqaTcy38yyofI/mYHYnZBegsgM5W+G9rq7//Mjv6byfPvj0C3ZjUDaZuDOpWoatq1F3l111i8bjabXG5auLsGr2X916LlfY7I6oOI/UYOeh4ke+sfThcPzUhvxn5R3nPyyxnKgFvKrT/RNRoRv8J6b8F7yUJ/a/z+z8Rpos6skZn1jjFGhtCdVF3xvsyfsbheSCRcxHcZHI66UcnyehkAJ0Mp5NNjt65zHoXQ/XOG2ZfZfarcL2TitExjH6g9ji+0gRH78wg57r//edae67m+1fz/KsFXDlrxOWJ41C9EZ1XpPM1dO5g6s6s1Jun6Ep+d7rpSTdOZhcy+5DZjcweZPYKxxxI5kgyB5M5lMzh4ZiDyBxF5hAyh5E5gkyBoTfbnR8DaZABQCZkgQvZkBte5EUhREURFEVslEEFxEUlBCIRglHdVK+JekiNBmiIjBhijswYZo4sGGmOrBhjjmyYYI7smI15yIFz5sjj/5oJ3FAQKNVL9fajClFh6Jv6lr6t7/DuM6iMqpAqHCpPrCH9YPix4mC21WWyGxoVESg7oRDo4CR2cPaQEyK7oBBCvYrOCjKEWCy4bUzbX+qWAHk+KCiZLtMBOSAnIY4TFIZPDslBEz8sR+SoHJPjcoIcm4GEJuMa+qIbust1uSE35Zbclju8j9hIAvwDHQt3jgAAeNolhbkBQDAARR+5xpAddCpdyuj1WcnNClaxgSGUbv7xHkLW0YYC1aoUouS3WAgx8P7PSnwV2BKwAM57Rw7XoTkhmDbGEk0AMlMz9qm4AbwjDt0AeNqcz2O02FoQhuFvsue4NnN30mvbtl3btm3btm3btpnk1LabpPOjdjtrPTH2C0DdkEG2dGMfC0S2AEeWAXAO9RCJSgAMJEQd9MMojMZcLMFaHMBJBJSYktIL9BK9Tf9RXipKdagutaUO1J/G0SkKjfTGR0Z2Y5ax1Fhu7DbOKlJKxajEKpNqoVqpDqq/Gqemq+VqjdqgtvAL/Bb/wH9xAS7L1bkJ9+XhPJ5n8Breyh6fj6CIJBHJTTK/Mhubp82z5uXn/tAxOk4n1Sm1qW39kn5bv6c/1Z/r73UlXVcP0iP0KD1ez9CzrQgruZXKsq0XrTetPLZhR9qJ7WR2Otu0X7N/tvPZhV9YccK4sPAqB2HohyFwo1pLdX+pHoN5WIp1OIhTCCkJJaMX6WV6h/6nfFTsRnU/GivVV4w0N6qXSPU2qcat6kZS3UZ1VAPVeDVDrVDrpRr8Ir/NP/LfXJDLcQ1uxv14BE/gmbyWt3E8X4gwIpKaML8065n9zDPmOamGjtVJdHKdWmv9glS/qz+5VT1QD9EjpXq6nnVXdc4b1UnvqC4k1STVJNXXpJqA8EK4j34KF9Bn4XyA3hSviBdEJmGJtCJ9mCqMCiOCS8FRioRMUDj4Hp/52/yt/nJ/kj/MH+oP8Hv7LQB5MiVk/Fh56sK14NpV4NoMMUEMFf1Fd9EeCL4WX8hxHmDflX0z9pXc12VvuK/TvtZeBa+iVxbwSnklveJe/vj5Xvb46d7fnuWlBtwz4rh7wN3v9nHbu23dRk4nt7r7hzNizyinj9Pb6eJ0dJo6JZ3/nX92Hk8+NfZi5AxjHi0C4d7ZJ04AlEa8e4dKuGuoEtXBQ4ZK3XiiHUDDblybBxjR4m3xrygg2ogeYo5YI+LxgDE2PPDqAiGeZegEnaRTdJrO0FnUpyMU0HWC4CEh1AAAA+D3z3tZ66wbZdt1gWwbm3S/uGtfM7+iwL/sZd9/JUqVKc9BDlWoVKVajdoc5Vi9Bo2aNGvJSU61atOuQ2fOivec56L4zKUu3Xr06tOfKwMGDRk2YtSY8VznxoRJU6bNmDWX29yZt2DRkmUruc+DdRu27di1V3wV38WPOk+evXi1as2mrfwRBA/YDQUAAAT3b3X/A1RPtW3GSRE7NVLbmBllzC7G7bbHXiaYtN8BB5lyyGGmHXGUGceYdZw5J5xk3ikWWHTaGWedc94FF11i2xVXCblMmAhRYsRJkHSNFDt+GyJtmIwRo8aMkyVH3qQ/pii4Q9Fd9yi5T5kKVdMmqJkxa868BYuWqNOwbIUmV1xzY5Vb7ri3xgOPPPFsnRcbHvDqIW8e+etxoCdBi6eeee5F0Bq0Be1e+mcz6PgnCS4OGggAAAjesrg9cXjjbkXg7pQALUABcXcrI43lFZ1hnAmzBsI8Cyyy5JA64jDrbLDJlhm22WGXPfbNmeeAQ444dtQxTjjljHMLFh13wrARJ52yZNk0F1yaNOW0M85yxTU33HLHPQ88GjXGE8+8uOiCSy674qprvPJm3IRHHvPOB598WbHKtyfW+OGXP/5tWCdtiGIwHXRNNYOBVqfpeoqyYwujKLz3rti2bdu2bdu2bSeN2LZt27ZtpzHvWFcPX+Y/1kvUp6pb0Rcq3P9EFOMhCQYhBBaIfU4XYg2aY63YF3Qd9qMzDuAo+zt6zMhQHMd59q/0gthX9CKucQfS67iBYbiJu8a4EPQe7mMEHuApe1j6zMgoPMd79ij0g5jR+Ihv7HHpd/zAGPxEAHtiGihmHHg/2cjsKWgUsS8RVcx4Gk1PbZeTphIzgaYW+xppwPPIlaVZxUyk2ZCbvRrNI2YSzYsi7HVoURRjn0yLoyx7E1oO5dmn0gqoyt6aVkN19um0Bhqzd6RN0JS7P22GltyDaSu0xhu0wSD24XSwmJl0sphZdJoYH7oAC7l96Xps4PanH8R9o7/EfsFvcZHpHwRx+yMO4qIv4iE+BiK3mDm0rpi5dI+R7ziG4+zz6EkxC+gN3OVeSD+L4S3oGVh+WUE9MatoWDGraWQxa2hyMWvpCIzkXkdHiZtHR4vZQMdgHPt8OkHcIjoJ07gX0+mYYYzZSGfCh30F9RWzmfrBn301nS1mC52Duexr6TwxW+l8cevpAjHb6EJxG+hiMdvpEixl30iXidlBl4vbTFdgJftOugob2LfQjWAzu+kucdyeGHOE7sFednj7xByl+8XtoQdwjB3ecXH76QmcZD9LT+Ec+wF6EZfYz9NrYthCGHF/qBV3lDoxl6gn7hgNIeYyDYkw7MdpWIRnv0IjiDtDI4oLoJHEnaWRxVynUcSdo1HF3KDREJ39PI0h5iaNKe4ijYU47LdoXHGXaDxxp2l8MXdpAiRjv0yTIwX7PZpS3C2aCpnZH9As4m7TrMjB/ormFHeH5kIe9nc0r7i7NB8Ksn+khcTdo4XFfKVFUJT9Pi0m5hstLu4hLSHmOy0p7hEthcrsP2gVcYG0qrjHtJpYR6uLe0JriPVoTdRhf0rroj57CNpA3EvaUFwQbSTuFW0Mno02NG0mnh9tjs7s4WgXdGU3tBt6ssemvdCb3dE+4oWkfcULQfuBZ4WNT8dgPHcaOkE8XzoRU9kz0GmYzu5PZ8CHPSv1hR97KOqPuew56TzMZ59DF2Ale166CqvZw9A1WMs9ma7Deu5wdAM2cs+jm7DL8J6hu8XzoXuwl70C3Yf97DPpARzijkAPg8+qrURP4wz7VHoW59hr0fO4zh6Z3hBbh94ULy69JV4cehv3uePRB+DryNalj/CVPTH9hu/c0+kP/OTOTn+Bz6utTwMRpGdiSCO2MbXi5aQOUdib0KjiLaLREJ2dr4NEBtYY94sWQmHuH3QIRnK/pgvAZ8XLRT/hM/tH+gU/9X5IXFE8/p5JDHju2G40HMJzD6RREJV7MI2OGNxDaUzxltDYSMQ+nCZBMu7xNCVSc0+iWcROpdmQ3fAupHmRj30aLSDuKy0hdgbtIXYmHSx2Fl0s3l9dItaHLsMqbl+6WrxJdI3YuXSj2Hl0J3Zxz6d7sFffTyQNKXYxjS52CY0ldilNJnYZTSVmF80kdjmtj0b62TCZE7uGhhKziUYWu5ZGRTTudTSe2A00kdiNNL3YTbSM2M20idgttAVacvNeTnlKLO/cdxaOm/fst8Ni+TP/tgjBzectMEgsn7GgPwjgPhAMJ19IBgAAAAAqAMwAkQCeAJEA7AByALIAfQBWAF8ATgBgAQQAqgDEAAAAFP5gABQCmwAQ/zkADf6XABIDIQALBDoAFASNABAFsAAUBhgAFQbAABACWwASBwQABQbeAAEAAAAAeNpdjgFHBEEYhmfa7bqrIkCMmLGuODMOgMBi9sjB1h7mC1W6owv0B2Ih1qDf8i6wB9zPuT+RmttjVTDvvM/H4wXTUwxyV3P+SQ3//oA9rwfRw70B11JmSwv+aLCnwUfKINJygmg4uXUJSS/99dzLiXx5miMethkOC09jCVa4ZXhnTiEl0X0XRFcG8VYTtxpPQfDaCtps0fjLYF9PJaKL3N04lFYgtSSUkhnWucPaCkVk0Os2hnxfnu3WHmj0Rgb9naFwSAUYeb9riULpvfAJdX39tzec/Qfpb4BomDW8zNtLmSixBYlKVFhI1mCgp4XLwkRFBocaOjM40jAhjnV9ySvpC7dKWcyemz6rZm7FdLR5I4EkyGXVnLKOUVCcaKRVI9mdqw2zYsVMtLFkfgBdrojxAAAAAQACAAgAAv//AA942qx7B1wUSdN3V8/MLkvcwLJkWFbAjLIsKJ6eWcQcznCKYlYMp55gzjme+bzT03vM4dTdOXPO6fGUC2ZfH3POGIFtvu6ZRXbA1y+9P2WGnmWnq6or/KuqGwmoO0JcacGOOKRCGuSN/NB3ordWp9NXtXtr7SibXVXSVSNdfbKRHdVrZ8dxIQ4cWaO9NEB0gLQ12os8RvSboiDf1PLNQ7rZPa+L3vIDH/kB1tp9r1eqbDbrzJwOQAecGWxg5ko7v8LHEslzsge872KOEMBOp2DPXS2onaPx0DwdHubshDtNw50QRj8UvIZVEv0+6CtR5evH3qzS2uFzdHrTgTel06HysXuWa2e+HPKmPf1LO8RVqgwWOn1CYnyA0V8VFQNj/jQBIh9Tx6WmTEqBzTyXe7Rqo0ZVk1JTEcKoB/cG11QhxFOZRcsTcfTdXBSdCGfTSe3qbLs6zs5p7R7Zdg/2es6iswrsAgbLzC1QgV6EoWQ09p7OLgijdPq6fZSTEBSBfkBF9BYSr6UDLR0UsaV1DYLpIJiJP8wbM/bD4hyIK2KQz7aHsUVkV69su1ecw8PtUy+6CtnsqqeEau3+0p8FZNuR1h4oPQnPloRjMVhsZunHylnZj9Ei/dCrwYLP32y8vvEDEJJzQNd0XdNb9Cf7efJ/5TVel3Uz+Sb8THrCz8uh6gr4laSznxXk5HLSE1eBqghQ94IKfIxqKSqPxollK1SkLHyGfQ0daAoHFjqwFLIfSQeRjP0g70jGfpDWgeETg6KfxiJrs8Pg9jTWomFPLVpH2aKnlNGEmJjYGFtCYpLNagwIMFoSYixRKqN/AB+OqWKojRZbTIzN6h9gjU/krP3y6z86s/nXLQdeD+qS3q8voPndE8/vXnHiQs7YIYOHwqhvvmsfM/rt2ov+V68HvT02Zl7vLm37dGrea8q3G/4yHD0S8PLEmBkDkIC6FTwVpgvHqQYHo1hkQ1XRbFFIrsboE7R2Qza7hkjX0tI1kep2Ypy9SlyR4hUKJpoOoplgqOZ5Zts94xw6XLTWnNYR6DaMZotrD4+jvzjKuT0P1zrisZtQDAmJVmoXlH9LVIzNJDFvsyXEUMHAp48i3T9hMhNiwdRt44xZGzbMmLp1Y5OvazRuMqYR1m+ZOm3zOvJw08ZmNWo2bFq9RhOCR+OTo/klkzZsmJ4ycf2aWap633zTsGG9Nm0b5GdPWbt2doMJG9ZNF+q2bdWoUf3WrVPfpPCDUxCH2lCp6YRjKJRaYGX0s1gx3sokVlFr12bTK2UNlVScEDoIKVScQDoIZIoTGcKUQSytCWE3LrI0u2lLR7KbQf5MZwhkt6BAA7sF6ILYXCFaR5ibTkWESX5To3XEgVJ8SVRpJEkxHVJDos2qVZvMsarIUkJ8EqiZgnH+pqSkRFl2bQas/KZOtn3Fvzv26QZB1f8ec5Hcb7mMNCdOuD2yLzkSMWxCUK/vImq0qd2gNUzvsWFI38X1N53cO6PDT41TyLZhC0jOb84umfcsLWFoQIfMHmO4ja3HNg5KalO1BXUygFpy+eAlea+Az/kul7MCr+AVu4WJZDjmEaBxpDJeqeqMtEgrqnV6yUb5OLtPHONPr08yqTCn1upN6hiMx416OaXS7K0esOnnSlNejcTNH8AKaFB7Tl/SkNxrQ/4k0aOm1oaG8AsCVJq+twV9r5691+Bf+F5fRoU/xurYRL3OpsWxsUkBer0JtxjxYWqlxVuXzImoNO7lOA9c8wbpRjbXmjoE/gviTRAAp2eETqtBjpHh2YzTENyEGyLYkS+KlDnlKae8pAzZQTRsBdo19K6JC6SzRScJnJWLNgkGNcfFQmNyPgkq+v3uB2USyZlT87aJ87mz7TZkQjuy8vvf2pF3GRBJHvVks9RF8/my/A7khUIQfRl9N9MBFbgZHvOhZqNZZ9GZbWadFW+BUWTSUzIBxjzlzDdIM3DcgEXsXaFkF6ShJ0iDgkSNpxeTB7NiwcddoWITmX9Sq1QrJiaXg2sAfciuph2m1t+/NeMCAtQAa3Br/AfiqFTpejpA4eEoAbi1Mwf7YM0xNuPUgrewEhDyRBYReXl/8r4qKioVC5bIfW5gOsz8QEIi+NdNTa1bq3EqoCbJVRulDmmCAOGCiZhI8diAqIDdYzD9tskC1sMHcfWDo1UVWBztU/CUj6I27EMllyJyoWF0dua6dC7b9aTf9KTfLNJSZrueWocOlF5NwaEWW6IwZ9PqrfF6Q6xkUWqd5JuS+KgnL5++4J68evGEyxk4YuhAbvCIzIEc7kFOkMOQBJXzIRmSyTly3v+Pg9sPkR1nT+0+zqS0HlHWhO1IhZJl0gRKjVASACGBscDHOTg3x4A59pRCHYtOsEVbccFrshRXieDnjfjjTwSoBUJ8TSqFINRc1AWHfFoBHX2rrsQUnE5CTzqtQ+M2RYD8FBWThdlsg0SXV6HBLLHQB4GZr5lfAe71aZ/ZLWtCzvBbC/55O3IWWYZXr8O6zF+a9R43d/TkC1kX9vV/sYRMRICa0ZUyUhrLoEGiumy5TzT6UbL8intXEfwYFxRXiREAg8QVAGni1/Q3u5/WoXZbOtA6SrsxYSwNLrcapVhQ6+dYCKBX3hJVyhWN2R9YYMrCgRP7D+w6JmfohUlXP47uNmw0ybn2F3mTM77/oAnTpvzANYDB/Xp/P6jDwF29rh3turl8GfuIYw9v7kkfNmzw96MQRgkI8e2o/npSn5GqDCBFDkRiUcPLLLqDDYaygKEs0UPlJUFd6a8YC0YLM/5YsIJZp+ZWbd+e45ypxkPynHNhtB6rj5J9UHchdzm/LU6PRIDGU3knUzrCUH8xODzik7yBzg+FxPjQgQ+zCNAq9E0NPow2dZwj2O2poA5mT320Dn+3pzp/9lQMC/aXCDUYqJviqIz1Rn9EpRtrDXBJl1nRlmacr3Nf6R5jsx8UoP+cIh+9nviO6j5w9IzhtTsm4r/wjb/I6mTy7tYN8vHOnoxBv86YvNRiRRhlUm6ShJ3IH0WgHqIx0swIMUrZRJFyF+eKKTO4c4VcXFFO2G8OY9GHjKsQhc4YLSqV+hMfiAYRZOYoCzTUxidqY7gu4WffmDJ3HP4PyfvnKnkFmdDpafPJEdMujxkn7DzNXT01kry8dIM8g9ogtIKxIDobftsodeXBleCxFgGqhxCfSNdHhaxKf1C0SowFQbkwyOUIACzMD/OJzj0FuJ7Tj3sllMm9xD87ijjU2+UTTciMyqGhoqZ8BRlV2IOz2bWUS2ZGOodRgY6ZWpbRGNlfl6GWVwYGKdafCy7DVtqvTLALpUS4yc+odUQr5OduYW4AhmOwT5Jh0W88HtB58EiSf/kKyRs1sFP/l2f/ePn3+H/Gjr4+MmLAnn799/TnK/VdV8m2a8ihW7cPZu6Jr7Su756rV/O39ps8qX/fcaOws/PIzB7ds7IQRmkFubyecm+k3PcSNVEWF+8BJdGcy0EyrgN0DKSNsgfEBSqwP8Ial6/UFz1lrIcpeKXxDNskz4J0Ri0SLDbqcTgaLmwuHrnwEasO3R1ycfZ1wGQZWRFmuXT/esNxlkl/jR6Du4wHn2tzH08gu8izuiSLdOVOc6fBr3Vq538d2zxp+vqCAjSBxthf+BYoBunzEFIjfUEe14I+r0ij/TT6PJY+uc+1QCqk1bNo8zVazU3im9KxSURqD8qDm5KFskgKghFsYIRE3DR/L1cPD72ZA5mHYUgOwmgedOdecBcRh9T0zVIemk2jpwO5yUCtdfDFYQHDJtyL/JVcJ/bDeZ9xzjmNGPZDa7ibSmqK4rpMTTSjxYYfOxdz6fm/4lF3XpBZh8msFwijrwrecEvoigYiC0oXNaWiXSsamo1K5rVRdBDFQEeoW4aOsqmDEHmkZd/UKuOet1YqKRilD1n+RqHRp2DhihVqtUrNMe115fadah8NLp32bZs+OfjZ0dO3loysjd+kfl2TZvoN4LfJy/eXrt6gU7curRznzu5ctXx4o7nkdLWGcuqPUQdSTXVFmIsSUW2arVarU5fRVE1rt1BuysbZrXFKqMIGHnTgwbRUsHpIBijdaOSk2bUjGbvZYLbdSt2Y25OyWofFbUijZ02sUFyKdGJVDI4lJeoZgyZOxWCOHpmjeKxW6Xk2MqlUzJPHGPT6UtZ4Xg8qCQsZmJBUf3jfOLC9unVq6vwf9dqxRwe0Ht82wTC550SVjhwmh46RP0WN90yION96Z82Y6uf7ELKwQycv7xsw/t1H6CXmcz6pLRLTwyvEx303C6tyyX9+btz45elVoPqhbG3nHyeubYFBMO0Ymf3sFVm1o3TU9NKVL539G2JAD9tfXyM9yKxpszu3gmeGPxFGeoSE2oIdqZEnaqDA68qihwKeihoeSxql0G/RU3rK9Jozs5hL79xR59ks8hHH3MGx5INzGaz9G1qRzbSy1BxH4I4IcWghQvwqKV8IQBFooIjlSIUZImXX8GxlFFYiMxOS4IuJ+l4T9b1+buR4+Jlc8EyrhD/h7kZo1Znj+SJsA3RIdTk2uhDeLISc94D79c4aTz6+JY8haOiUh+SvD1mTR054J9hPHOv+a/lIx6g/ruN5pGpWnzvCnr5d+0kZX08aU55QGwxDtUUuPKJkhUWhtKxUosTXwUp3yYABjrUlMHVCJkuMhA2MLoT9JID883ELeT+Xmw+6319BTGC+fsGcNQ68YdWixf5w9RHJWwOVTk87B8kbSe6LX2a+ejT+6YcpyxDCkvz/ovL3QkaaD+AAk0v6xi/JnYnR241eKmSfElLV0xoF5i2cziq7dSrLLYeh3Oo15PzxtWtOXsDnjgn238ixsw3PkxMb+bt59z8+avEsF4FEU2OJphZuiVEJPOilkvCgl9LN8lolPNQ6PJReV2c2un64B86NeG9+CudwNsZt8AxS84xgP0sGIBcNlSkNGlT7C3ahMAUFDapik1pcU15z7nByvzjTcSru4/yRTdcMAcqg2vKSaks4aid6RUR+0hYvOo9XCW3x+lI2JoZ7cYyk8DglPItW8bIOaRFdHJMFmyUNohlbEotC/Mtm5KG4k9z/iYOvICQHwsM+lCUfNzq4k44jLck/uPT+XhlrwXZuMKTC9y9vg/rts4FPSV47CDvkkpcQKK1ZE+WaKbJKhRYpV1OjQrIk3ZdPSuCY8Kz0ahUC852ZTieemY+nOocLdudK3InNvYpeVkgZcNgXSuXSu6ywIj9fsLNvVSh4yt2lv/qhSqIg1d+VyLgo/LPo6K1Mj3QMphWWJW34YT7Ju3j3Q/73/XtSuvK5P9/d/2NI5tSh7pLxRq0UmuQWqoqrVdHaM8kgSce2ZaARCKeJKnnUQ5WpwmmUFLUknSQwA5hx4hqncxZshHjnHfwVXbTMrSSZyumbzUCcI/MvuPQ6hlIjoDJf0GsHUqgOU10rzMOL8gc4z1Abkd+jypD89gCl2BQLoFhiRWhWdAdEQLzEFGQCZVEtjzLUI9R05OkaeY7wZAxrMNMHA1jAQO9wHVbDKmiQH0Rabietguja5q3mO+Y2h5t4Qt5yvotzLIkU7IXrYJIsurEInl5KhKdcDqXmKK1PxILcapFuTKmArQBQ9TQ5nUOZeubxmrz3lJAc3gdhFgmEcGrbWhROPSwvWbedZ3V/ZURQyspbkTPa+eLJFnOthSEhkqdVwARWgpENWm8TwheSZ787yJMf4UcwQHcwLAbnzvWrd+O9a9dvx+JFsn/zZqj5Z8sLUH/zJnLwgvAaMCl40volyQX0zhUX/pGycgNqJnr6SzmOp9bune1WwCyefIlewJV0ycxBGRTE6yxy2OUt0WYp0MaaYZ4TV3gDEeSBk/wNlabOmTuGnMZhzjuCnfx58fm/xw7Lmo1Zz6aAF4KlbMVCpekhYVvWM4nMVlZwlMpG05EgN4IoCowsJk21SR2tcguykkhj3EUaNDErdzU5U72+3SVWxzYmVrJr/ardePe6DVSs58mf7Y8ufOujFO07Qgoef/OUvCuS7A3JckyooygEBrm6DtrsLwUaP8zLEFaRoHuBX2FfL5vpiKlk1JHhDRjNUChqvIncd2KUD/rZY6ABeeU8Avy4uZMnkbe4svO8YL99cf5xm/NfPjh//MDMcZjZTiqNTzOo1GNRT1FXmiW1n8kNw+ggTLKQMKmA76sJkzy6MlphBZVilPS39rDiyXBCTCnWFaIroegJFSbInzpCs6eSX3ufhIh7S55Py/9h8qjpC6H1uXTy6MVy8n6Bc/VPkybD0PTeGbVGn7bfHXh+zODxGZ2b9+0xft3AHZcyz00fNa0viwQI8XYJBccpY5fSKau0yiCf7RIxi552kpxHavATKYwJ5e+eZTIbTWW2n75Vi6qLdO1KyEyRiimMXwmmQCeVU2zUy1OWI3U6fj+59D6XXM1fOBdK0WhjfUhegdcz7mx+/PyfIYE7gRBIyD5MqpZUcWWQSjyndH0KB4eAc5VMzKxoghfBYAhwvnnrfAdGqM5/n9tcigCVEFLdk+Jauij4+BafQelPv4BmFKmFPLcoyDfPQkoMVkoJ/W81gFXwvJlH7K/JE3Ivh9jzbkPAP9CbT8ltzsfmXaFedw9fHwGNboh/JOGRVkqySuIRRXxS04FapoRnJKjkG4dU7CaDFFk0hf/xdIiHUiQFjpAr5CStal+Fo6QBlOJWYl9nRWcUDnA+xjfwX2xV1JSqi5QqD1RZQZXb3AqqigiR52QRz4y/g2YQSAIJMUEQJljM7+18iAO5JWyG5nSGWVKUq4/cXvqF+C7yiCEKVp8Q3J5qBDV9Kgd/G6tVGGEC55l3DL9y+vMRZ86s5mue/ZXNOInsw6GqOZS3UlIjSV0CC3MKdabBkiFhHLpmDekNS4Tsjxv2qyXp+BdM5LoXdjJwnDusoF9kOuD/Eqe/FOwf/0aAvGn9dq00b6z01xBnxwoW7FAMhhtYvcWqs3iz7vi6dao5HyruV7VlM9vwFc4mWUuswlqKoly2CGqmjGwaIVtq2AFTyu3iOSi3Ccr+wa8lVnzJWQYB4gpqscVAHAp1e00JWCWw4s+S/L7cooMHEaDK/J+Y6hfimBwhTvQDSJPLSNv8uAgOp7mMQ+qiMTlSTdCcIa/ByP8JcQhh9C1FtHm0ahROtX+aaJJ6BnZTUWw0UTJMocW1XpFQY5Ok7l4mV2pFv67IqvVeLODU1HjrQ/Xl9V/p+TQ7ryxr0uTEonYH8DGxNK5KrtyqbCmYdP4mYzRLDmXnznFa7yHrV50DeLGoU3qrjJysf48+cJsr43SmjI2cOHVaWkT94Xumb97doHWPVjXbL213cDMJnN9Wt7V+tbOd2tRvxSQwivrceCpDPxRCI5VB7m4ZZNSiiSuCW6FfdEKCt+x9pNtncvNAJXZgFSE1A+Gs9q2Tul9qnZyZx986fiDD+3pOH/HE7ZxRWctr1loxeBTG+nxycXqmCjn/GkWukg9qu30GqT17429y14d7S9cwFDURUVi4susTqsQ1SjPmPPyk7rmfXOvSOgLcyWRytvpiqS6fgKj03YoIuGqHYfw9PutM5h0KUjzuHs5R3eOHdswaB2O3ZDTtsbUnxAAX9B7K3NqZNmzTllj7ZoQwo5TnqKx9URCVtSk4xKVtHJW1yq0oF6oE+8UrdJy3JGt2k2StV8rapOzrUyhmopK2MJ3CSQwCJOkYG80eHv0tI+e6d/8dB57kjM1cVK/OoqxxODoX4obhsrlo4CSIf71m92Q4N2Evo70Vpd2LStmIwtAUMUCqz9gD2NYhVEReaHHjCEaSaIPjth0MPh+M07Z1Dv4uGA/aFhEcx24vggvoTZwVDGkOb7WiOqJ1NyEPJGNW5QIJNMTLFXG9zmhmLSBWRWT9EzPdAIPbPyC3Rt+e+V+vnNW9fhm6rs/EWldWdx+pg/Meg/3B8jp8ZcEccp+QrlOWTR3dpS+3YtZo/YjRMrbBF1VG5I++EdXGADqzG4dR7r6gOLt2nmFShe4D255UvNRDS/dSo8KkpgthNLK2219r1pzaVjNFVdq25fp1bsq2btuO6Q94/J6+LX8Ek35L0ob3ptIPQqWo9KOiY5g8olgTDynUpsgqQ90RhF4eyO5M1iGpaqUsi4h+OvZUNEofMj8WptSsqJKaleTK62OT5G01xZSs5bNjuzO8rpH3t4beqfb9wNXDZ/XZeuDV68lZCxrUWzBsMo7Ohwrj++c9uPCuW/P5kyeObZgJFd+t2jsGro88wKLMcIS4DyqEtKiO6OlChNo4RWFf0Y5TeCUW3DwVjifRGslSYNnfsBS039Ad8K2Q06XT/JScHO7YDJLprI73DEybkJ+nYnIfjRDMFS5IO/e+Vu7cUxChbKhh5j6p9bpv4ZNrKW6b98bm5BDSYFIKLejzyRBUJTW1SlLDhggXbCeNYDKd0xsFoEYiZwp07TfQume/iphEl9e930B9AivTG+Mcfj5KVExXJ9YmLQ5XRMiINSvq1IipNJwzFlKT13PtVt0hzSR+VRFdwGTBJ6pQsaoMNQiF/X+pKuOhqMp4/PdVGbjeLyenMZSjIHEA7CcPIPs7skKF8md0hhakunM6AjQLIRirQsUqWFGfr2BRWasQ06dRCKmGUzsKQ8NEXvJhCvtxA5UK2w4tuTPL1dssWZfhQiQ4rjZKCFFZSw9kMMjELF+O5rIqqtQGi86lktBFPfjEleZZF3/finO+7d2qjxFyhAPzq+fwyYMmr1174rCzKj7UK719ijMYnzo4NP8ln/zJTihfWtRapHUaJV+fZcWXDnxLQHjw5WRtc3gpDMdUzHKgk3rYUWipymnfY0EKpW30PDLaacP7e3WbnE8oSXKsq04p8kPBqJ7oHRIqBysqAjflKR7oFKGMLwYbDHLz02TyZ60ixHbyFfb8m425u/Aa6Lxg5L3F98iznBnvps8ePnQWjl1RMJ3cf1T11/wZUJlo1u0/tHv1of0M9ZB0vpKLuoGiQaaOoR6Fjbn3rRXOVa8EQ/9P+Iepu6k4/uEr3T0k9s256dl314lbr8cPW1Sr9uIhE7E+j1zIdBYIVwdMoBlTrmrlgZEkcowUl5tRTjDlhGGK/kpM8eXIIFusvrj+KtDFF6CFWwCw6EpAixPbM3wv52RsPPI4Z+KQufXrzxkyGccQKDu2b24M5A+EuHdr94+Ep1l7ZJvE2ygHPqiBqPH1U8ZbRRgLVZaYJeSM3RMwL9fOhUL/Lpka/r2SdV1yzkNVu2UJUVxHj3HOUD55+GxfZjeNKHY8Q+eOQX1FTWxpNnfJJQ+lg1AJ6odKlRcs7T3WKDGKT4CWuTNvn1AfnGYP1TpKuX1oLiX5Os5sMOO0og28lLrilRoG/GNs8n4WfK3vh1Y7nu448iKnd5vmPTpB+Kpmr49Nzh7yVBjWLb07xNSqm1C63bpZ+w79VD8ttUaVGl+3HdF2/vb09V3apDVk3HkUPMWDhVrIn3oF5IZkDJQhQ4nQaWBhTe5j20HRebf7KFpCMsxhAYUhF2nZjSpLpI7hGh1sPniw8tdly7VqQpsjolCLfNzmXF0jyXOfCWy4xzZQI0BDqdTf88mSt3JF9SI3pKCreEApAvZSQMFsi02JMB/NhCgVf5hCUv3kvPset2/P2eSokXMvY8y5o3i/s/65sZwmT6r7BCDEXeWTP1/3UahcaIm6j+BebbFC7r08Mv1vMiUfEjhV3gnZN5sREs7SX5VVH+X7P6fsX676eMlVH/nm6eVGB8exqo/Bylt/e0aunHp49xS5/GzrjZ3QDD/JO4EfOIP4ZGcYvsNoi0CIe0hpU9Z8Qt1rPqFfrvl4yjUfz8/WfAwsmHMcu2I4B75kO7Qhby5fIq/pfQd444vQ3fnEeQ0Gkzk4GhulGkUj7iKlyA/VFJFWp8zmFKuhlxZAQmR+kuoKil0X8vSYIR4TzeQYsHh/HTjSstszW82KHdNCLGQSqKAjvpEXRV7o93F1mqXxNrbzGCHuEKVAWQ8K/R+pB43DNfPn42jnPa7ZkSMr8KVjP7NVqEKW4Hmq6siEkkS9VN1Gdm+3Yk4g5VSFmEOmCuAQ1G6ZkaCSJV2KsyVYbPE2G91aYmIpqppueA8w4S5khfrwYW67vdJm1Wb6nyzpBukXbom3/9l2I35WldzLtzp0vHMhtwoCtIWuyjf/7a5YYDjqm3XryGuVhMxDKM2ZlOZASrMQFCzR7BVXtGWd0awL9GI06+IcejeaBb1OotnEetxJMTYbSx7Y9nyrMYpeVeoQO79jB2+vtEM8cuT37deqFmQ/aNPm8fmCqrOs93afuiXeOr73npXRkAkT+etcHJVbLVHnkptfnMgFSkrBxdn9lH6Lk86WcMo+EdUdE3NmzPVWxK5iizU+HLN8hr9+YE7q6J/rxNRpcnjHwtTJ8+rE1mnN6e3/qTLd3Lv1pmvVJkUNbI0wmkIWwk98E8QhP5onqLU6WR2oN0VFzkxh0VQ+zK2qi28hYlU7g1mixhUhNv4ZSApAnVKrdkpK7VopeHEeEZKqNGpUJalRIySdTPHiPYUYFIk6iyHmKOXOXIUpl6h/eOpcPSr5JJBOOlrjHycG6jxdW9JCSlREVPIBE0xTb718AEWui3BqWhZp1n6Y6i5/fP6pnWfP7jy1fDd/V53V4b6WVkV6N5/2R+jjx1EQcT30AkRG3boZenlZeiY5lcJqI4A6IcSPEo6iCNRbDI40f+JCTwnXF+8tK4KTR7YYLujlBr6irkZzsHCt3S9bDJA/1tOWlhLV+qvNtFbAdu7G0tgVm5AY+Skem6i1OtU18S7Ie9Aytpz6X0s9cmHxw7d9OrXvpYEk3MY+9ZszZzTfddh98vWZx1d3de4zoffrk0jaHXhPaMa/QiGoNNVLXKasCzNEZCNlLNNm27VSBTayyDrY1rEYdbFgFquOTaLKkBSbJAGaJJOabRgzqcE/gELgRIom6B4pvvqKf59ZPn721O79586es/TQkaXz5izs23XmnPxhAw5cP9C///4bB/r3HTtm0tzpy46fWrNg7rzvMxfO+3HFmcPLZs/DI4edy8w69/xsZqbUifFCiE8Q7CgADRKRKbBkp0KZ2HmB1N8FZu5FW/kETrGVT+M29KH6xpbGLki7ljjpBBGwtFWu2tN6t7HwKAL7ZwUzNoMKfMimx4TWbsmf+eQsJJCzH8gG0HHNcBdn4pIZP5K/ocKPM5bgM2wdplF/1l/yZ2oUyDyaolHFGiblqLFRfMCQ4rR79+6R11xI/j3uFH7HKsMkhnYFjqE4VJ1WXCJrfM1Yi9TaK2UjymHRmS72qqqRavZpVeXpLVzV4AoKvu79R1/2VIyXvxKvdZR3+zA4vrw8jSPW7Wmp8rGyk/dXF252ZWBb7k1WxMyJyn0/XgEmo2Ni2W8RmP4d5WXTVPL68Tty8/WyacNnT9m770Dahlp1wXD/JXjnzBs2cuYwmHjkW+cfLRr367bo94rfT4OTu9p33735xJXzMGBY52ZNOiRZB/zcf9e38dO6bzx762zGuM4tW7ftPeinAcbQ0qNatImzaeMyW3Rh+s//h7MIZxEt2iELE5bop6b1PSy4VbzZ8sv6T5eAlSJYJSK68Je0Oll162bVgdPyXWgTX7du97p1K8s3lvO3pTsEbtPVCaY2lojmixFJVZjgItgJUHa1umzNSpfIymytQra9QpyIrdI2ZUz7AzgC4zRRU8Eqb6HZhjRaDX3go8Es79FiZfsVu62RvF23Aq3hexT9kZV2Yz0UOR47bKaE+EZ50aITcClLFI+1ej6ylD5a3o2glTcn8J22kkP7Dy5ftXlZx3Yde/Xu0P5bWLuYPF+1grxYthR0UBMMS3Jf7IVGMA5S9+4lu44cJjv34dZLVl7YNmjLhTWL0ltNy8rMmtKi6+S1ELZpNblJfiM3122EyHVn4NuTJ8la0o+sPX0KvkUYzca/czpJiqWoDH3kqqJP0a5Xfyo9f6bgXLS/HFFd21yBY2PRU7rR2GL3pzVONxlpPX3Y52e1kFbT4K0N1ZbXfqVtrO2o7acdpZ2l1aSJe7QwyM4pN5J6UpEqdo7GuoIga4MwAcbK4qRNELkHoqL6jdN1TUZlTVy/ueeQWg03b502/edg8mvp1iEZjdvgw3VbjuwzYLh1rLWSb+/x8yaRY11aTCgVNB2+qtwOFRSgtmgGN5nbgGJg/hOE1DAfWkpVorGQxR3hopGAQlh/Tj59q9wmx8iTnBN35JRzMlcHsoDfhBAva6brtFBllIz+JXpW+8oVZfXZ7FpZulqVu0KUUZpJRu+hkExg0VAM8+TkI7RiBOcp6T3V3whtBNXf+LAIya/EOULdvhAdGi99QWsvz8zDkeyuqgaFBhbTTmk/BIs2AQH+ASajJYYVXGJdvsfStrgiCrriyuqM/hGCfvptWK0EtedSn9pNlv9QL61B2mx8pZg6/ruYunYgW7mWU0dnfh323aq6Jm3Ur43rTKmRWL8aIEBLabklVdiIOBQkAi9I0QlL54mVe8W5VGcLvFXwXo4wGsttxTPpumiQAVUTkWt3TvGjHfJxVAErWxFYebbMdbTMIAkhSuUfAFMzfl7Sr//SX/ra6tXLSGkoHFt+fenS68vJsAa2hMaNe6cgjDoj4HL4fOSF/FAKa60pk2+N9rMn8uw+yugh+KpYIcFLCBFwmvK4HmMYL4O2ZMNlshR6XIb4/K1cC27iSTIKJp2E4XmUeQToK7wUi8JeZEIdRI/AIGV+pdjG5U9xVoCbUWMUIOV4fsjVLfNw+9BbeioapJskfXA7DiXtavfDZiw6l0HYoMSE5Np7Nkz9YVlG11nwPV46GoRedcraaicO+Wnc9317th2EACXhuXgDpbMUGieGS57JDUlHuvczKJ0imHyksxUQF7ijJjSHdOAGiXMB0pgAVW50auRTR6DYsy7qLRKACWFvkRof4Yolt8YXY0XtqtR8OtYVawHvFpMSa1SqtWfNhB9WTV3k+GHqpj31vvq6+pSOfP8uFoovu40a3meotcycjDFjB8XYksr2YJo8kHawU6QqtoWpsOiHIU32sdv8UASilSTMSnlBdk5qYJulKoORPDmqQoSdyptPq38RfDLSoy6ij8FfuSNTWc923z6jV9Z+lM6HiYx3Ryw+anlNdVKLTe4lygVMmITbZ6yvlvMfdccFw5u8pnWFSbMnDOf0eSfa9E0iNYSrSD6FxLWR9sWVE7Hb2c3PbhwUAXnImwR11BsxVGPW4UnN75P34HkfzNiDXLxQkNucvXcOrgcbuJb0vSbRw/VeHGeXXNvlkOtyxbjwJOic1CmNmtas1RifSW7aNLlaaip7Q39SC04jDvkim6jx00pvUMUpy+MqmhwVvlH0UfsyPQEfXzmxl/UgVvaGSVDDa/FvS9W1GzRoHsklhszvkzU9rmwFizBTOp9C7Q4LW9jZTBGKn5YpbnciL22VlHaCYGXIUbOzmXj3afjOQN+YXGn+UIZ1h2KRK08N3BsFo9qiRq5naxjEUm7vpR+5dl9/AeJIgossdpY+yWUCQw9C4qF9vyw/sDWtedMOkNasaRrf5dejR9amrDh6bJXQdUC/Ls27DOjfk8XXNBpff5Li6wINi68LYAxiz9sjJEwUNqFYOFpwBS+h94UQgjxADSf+F21vARjVEbWBzsy9dzdum83GiAueQEiCu1vQ4hDc3UMIHpzg7hS3ZNtSnKJFS6BQpYUipRRpS/DsTt6ZuTfJzobm7/+/92j3rmTljB/5znfIeYSQh9A1IA98phXzokH/wXvR38iBfzabrIPPnJH82WdEqBj/TH/4jEU5xr9/F//MBakmQvCZ8yiWrIPP2Orx8BlEUF06RdrOI63hqLfZQ0VLenhkltB6MhTeHCosJmbJh0KstEgykFRcMpCPh7ZTgj2t12mqYZxO1XgSE8FhZWCqcDybwmQciW/Sv3OvTh0H5ZC/znxzf13Xlk7krRquIytSlyQN6jmoe7c+bbOyLx3evq1b49HxuNBDQPLeQOd34LhtLzRJwOsVBy/31CHVe1NMdgBkFCAV9iJmN4inlpdOA/6GSvAfO7QM/IZDJX0HS5o7dTpMf5XqSfesKZ4kwvrQm6z68BxPDMDt6D4l8zwdcJ4m4P5kDltHLdB30jM5HTmjygh2RUj8kdQJbXZy5L5QWeJQSuwka3FTJdusl520BeGcDbMb40SMTRjrMW6Bq9Nzy3E1XH05Pccv9DweguviuivpSX6hJ1fiOvQU26MH5m1RwpQXyIRCUCnwU3iULlMwO9g1yj5bTOhPfw/uIw3nd5nhnC7DQ4yx+7PMSbbqo+yRyxwwkxjlyaC2POqi9zEo3ibM8bZKpWjswxG3YQBi/vzTmV12Lzm7Enubz2d02LlsA7bUb4TfdJgNWGZyqiw1tRy4WwM0N1v54izuX+82rn+wb0bOaXq22fWpUtX2AGt22DHKcieBwW81/G0axy16I9ADjD6aR8NdVJ/EYwRGAGn51W7qI7cYIUqNPexRm3EqwjmcodVZDgxsqnj2P6+wF32R8zIn583kJQtSlEz6x4uLX/9Fb8GjSOo//deZHG87B+KN63RGVBZ1M4eXKy/ur2FCyNb+yHFTjGqqb1agLczWqKgw46zSdtkVmhLgRozenHBFhT+oigAzx1XFR49TXj765tj3AQ186phb/3ih1d6oCuWmJPTs3PBA67SurQ7LcuvvXhzbXbPXyDrRZdstn9ts75Fov7OBkZ/Uq9BlzpxWHS+1aN3zLZt1jfOe6WbKrWDGVULVUbaZ1Kip9X+5bHatLGLVRE+ZthW5KCYemIwxZ7iAhmESw9ImPhcDYsyVEQ8fVo75PLhyTGUG0Kmcx+56VB7O7k5Vvl4ZbIwFlcGcDxHhOuE2Xyd0Gcflx9i8GRLn40UUT7TOxs6LKjD0TAkmSIzWgD0M2VNo9PlgDvIBt8bv1gV1vkvPvPjiyakeHbuMfmk9f3f4jIu3XlibOK5Onzu4RpOGNyyrq84pd27AhG5Smd5TPPC5od5bWrTLXL9xX6Mu/TvVNSw9Mms2odanc+dvrBq2o3Ltw9XK3CA9GtZJIo/nTQkamYII6g9zq7auLCqBysCq15ctp3l3S2o97wed7RdmHxpx1/up+HOzp7te4/zxxUKiZJiY7FpSWA4AavImajyQR75NUdwPCFMNPIBSNMeiaeeGVJemPVow737ayG9mLh1ZIe1qy31pW5u9yPq8ZQYOmdQybf7CYcPnKib6lg5vs4O+X5p2f86Kx5O77E6ZPXRUm9JnK86eMNTq5xVbedeKtF0X9yMJ1UPL5ET5Kse9+KEOZlmNK8vcSpFV7gvJPmUh0zFfUcqSbQ9DeHvBH0yudjZaoT2lZb/yZ3KixUV6RR0ZeUe9pvCvnvqINLyFzc1HNWs2qrmladXmzatWYZqcBGiD8YA2OMbRaZEwRnJUtCZvAJc33B51IMQRfWWOAwzhd8zJ55dtlz6S6euRGZrNhizcHpKg7cYArtFpm7RB3Zd12racwNAJgzo2WtLvHMATunVuvKTfNzm1cZmYKoBQcKxKfygTN2kuhyqEZWSvoV8BWCFo2fWVOGF9L9LT58TO5d2sOz2/YvvwdND2E3WIoxb6iagFEav5/wNWoShWU058cAawCjmDMs8/yJkxLh+q8JbeAKiCfrP1+/GA1Pyg7DhaiFWAdWQG+X1QKMowB6t588Gqlmr4N/k97PM6Ygy4m9mdXXyIgaMQYSLaxJdkFx3PpeB3zMfsw33MOiFDlLU7WPTmaBBJTw5riGcYvThjHC5ENcjmgypakgEnc3NzDloW58Mm5Yu5lRlgEusZfPLlnkWLLBttsJPBCCkb4Pw0IBMaKprbIrTTmwNSWQTGw5s/Ylg3riWY9IJbwIGpNczrphe3cSeuh7iymQrepkJKD7hBg2AQNUeBEjRlCmQGWlJTLZAbaJlI5lvHyge25r5iaYKyy1ZMOKPdVobPyEAIT5er2iGtAj+OtJqek6NGvRchJA9Wo97i0vuvaDGdmr6jg7NIF6MDlGiGDncTUnmcsBb8ZE2ExqnQsb+Gv3zZHrfCZWlPfIRewftoO7kqbYUzrTnWb5lkYRorhivqJqaTiRF2rM4fzEcAdBUijoBOMJI1Ej1wPiMeY3RifZ9o1PMUVn18Igi35c8/WTbg9OlWqX+jZY2sby6T2dHLoslKDSNAyusQckbNbEiFworwuchOxcoEbnUuAcjhkC9BuPb7a5cvz0lPz5Emxi+Nt/qRxTFLY8iv7LcX02aKI5+dA8w6b6PoQ/j3rBt75JBoNsui0eOKOKrIy00zejgUkWNG4+O1ZEDF8eTuhtXdSladZJ1msZApkPLu++UFz69dDleQjblPIU3lmezN5E2jzWQdWGj+YJ8ZAwL/A9aNd6aXPaEa9pVUv2yWu7gBGoV9QYXq2QhcCILr6jr6XOYX+NiOBlXdSlZL7TZwSTOY/Sv3fHfTGvD5Gc8LLpnkxwkj+lvucURcn7xn+nKcMyUcrTRj1bLEjDFFmIY2HSkm/tgba252IGnkxoOcMSC/oJqZ7Ld3YRMsITIxqQl9nqqVUZD2rahbIGeo0pezbNg5cSd9u5wswc67Ju2UurJccJYXnju594BRXbYcxGbvZdh1D666D3ut9Ib08Iu0dqCrXNnt+nF6+fQNJKEuoNO+lJNQECqNKqKNZr+4SlxD4vYPXMuL6DVx0xCgzCKnk+LAEcwxJg47j4G9IyYmhiHMY+wQ5iax8/z45zLDIBQpqGGZZbLZKY+YNmqjjmp0Fey8QJ4m70LyoUhNL+2C3e+9T6/z5dDvXlg/cV4ytlNGo6RG1ya8XZD+5gF9+TJ94vj02RPGzpF+az/BG38xkkS/wzFZ7bpjan02Z/7G0hU31qpzAPg3MXHcc/TIVztOHj06d6Lf8BSE0XyEyAqdEbmgOLPE/VACGFecI+Iy5NjzQty55/wzmbU6+ZWuuE1ef+is8Yjz0dwB7LRqrWXf+sDodDcjNfvWlP1vbmLe7apPWBERF0Wnn2LH0qCEQG5FKNNk9aDaAsYUMZ1XjoYODmVZFofpHXpCylbuXt25qlKF0MyfcFU8eCt9tHvlSS9rzFFvnIybzL33dyXDBffGdD79cvBZevbgrZ9OBB85hRDOe0ibkW91RmjHGLM3b4cNK1GY7c4WaJuQaY8yYqmWSGyFs9BGSCVleobRrnU4PH/X4NuGgPrXG+PIzEtffNo4wV1f32vC9u1nsmp08YuqtgFfktIt8ZlfeZ6SnA5Ilz/vBUNz3Gl/fzYyHWFk9ujKI18UBSMjc7yiqt2KvnHx0HB3zc+D9XEQIH2BItg2/F+zpfnsj49jnB/2Kb4ezOFQkN6btzWp+bGJqR1k62GWOX1k1277zOldrjOmf3ojfOddrzeUZU+rOb6abnhM3oVMKAza5h0ewRUhLRNLVB+0wCRXEmRvDRXlatM2bxgIsW0h9lq7bZOMKqDY0xZQPPnh8t/mxcfu7Ni/Fpn0eMUD+uxlAah4i3XuCsOgUemfRU7eWIJBi8tjzLHFO0+cULNYdTV0GEbpE7OLhowqOHgEVqiQIuBxF1+Nr83BQdilxSPJqIleNM11aPcvjp0Xcl3vOE3f8vA7R+t2+5RXFYeplJSXIT84SfXcwhPRSoJyKoIAXRliw2w08H0WMg0km2ijzuigpet42LN1gY4tgjOhKYmJSsmMrY90BRjNxnUUIi8zb3e2XLdFa87R123eHGGeH7GMa5ax2g5YbF6E6GLSFR7jeBk+vLNhZffoqqmQ8jDLfMbzlOtX8hBEUCfAp76Tk/gO2NPsoO6ADgwnJkZXROXdhUcuOHBPaDnrCJN46PrrhYgiMrIpGA38XupmqNMDeaYhfxNED7H3pJ/Sb/9F9jhnjP9kfsukhjeXfDLBQJuNlJPorTfBa3MXYoyfz5mzJTp+Y816luRFY9SzYrl8T6qnw8gBNWBxbLO7DEZTK3YZAReNBBpn+7GwWaasocA+d9cHMxIJSS9rCooC71B4/MkYDgZuPI6T6p1dueI0ds+QnzqvX++KuV42Cn6tEv+1yIJf46Fz+EocjFk2pox5T2ps04lxRhyOAdtzc2k2fbKSPv1G6bfOiT7Bvo4QJSiI8urQCMTRfvJVkqv8jpxRLPf8uku4G1N5dfD9umAdxMokISaZqdOopPPRGHF8fZPcTPpT5qFmM5sqv6etX59Wt0mTuozLUL6LZ0PWjSMKMksa14UD/IiDAF2xCSqFRU2rn1Yf/lc6xTeCOG/DhoigCfJCEqcrDd/ijcqiTAW+QMHdGLjJAEaqk3CGuDp9NKysz1cnwnT4k25TJyf3nDzFs275mDq1etXSlZ60Z8KEPZOyY+rUji1frx7L2qZt8BZUHbmjcLO7ipcVdF5bFBYoeMx7xvPk1DgDXtChaaOy5Y1NuvYY86py9wr1TYvKDuvyxRDW3ynyz1IH5TUyorqsv9VhO+TuEOwQ4yBBZ2u9y6a3uySomF6SAK80ivBK7txT3VYdpiRHVxlYxj8qfsWUHlW2VIpKUJ4MW+pZ3aVKeYdhKztX4Tm6TeQbED/M4ziu2v9jlDQTcdNYYcA6dXYwSfXwRz2fwgwgHSeFkwEv6Jvzi5/8ekTJozdxeXqT+1cG4Wd5J2GGmVAtlOmrAdlquyPJQwqRYqXaUispWdJ3g9OenaeOjqLd4GjT0yYbb1aijYY4fWDLJoMGNWk5sG9sWGi5cqFhsS+a9O7ZrGn35Mah5cuFRcTGIoQti+QbtJ8WFy7IbM6nA8Ye6tLVQExqYjPtV5jYjK3d5Rt5CUJcWVyLRePKNLQgrpyXZxkt/5zXCsZej7bnvmerz1pT/p2u0U1BbqgMx9LxrjUH62AzwRz1naW3OQJcsWboRTNW1PBElQ3VaG2tb1JnpX733paN5d+XKoHhjScN6Fi9pVMDhIjFRX6YV0l5wcc5kbXatsF8SNUfPcRWe4xO0lK92YDL8EY5P8WbDTDVZ9PbWEfCzr7+ID/ETqBlOLFWBNLlNCZvPnLQWId1titbycefWQPV0No/sLAHwbrG6IL8BN/X1QHZTOxz6uQT+xAmFZbuLlisq0N3wfv6AwruqO4gPHJBRlifoLOoo/Zvw5DprS4oQSiYaOpXK0VAcvjFo+lL6S7AxwFKjnyiQuV0B+l3MSJaLi8vP1JOdGgC30nXISQnckajssUx2Mma2iuyo8iJ1mSLtJ7RdsBXIIL8EFI2a9UZYv+N2UgE7TLvjjZBwGsTGYrJ8BxS88NE3J7co6sZ2d1l6RhS7UTFoJyDR94oDE00O6h6oQPH+8M1WIi42Z/IxMGDo0JIjO/nyWQEgfzjWFIb7syIAPcdxgLs1lc8soPtmSeV4gmEpG20Nv4Kj2A0Qpn0xRoJAnAqjZDly92cRgiU4Yln5jJ1eA+ufq0bi7pxtpu/sGJDJIQwCkFI8eLcChWKoQ4S4jxmJOECzguGll1NV4HCR1/jPPq3XD/3OOtU1qOwtcvlNVSsM2opQDGKyXBQHIhq4QkAJQe7zJtELbQrwW2IdMZSsw95Y3XqIK2x9L98WWpxQSp1VZt/ijdnj6nyX6PRcJh/lOUMRsVinWKRJ+bPR4waQQtb8GhlTaF1oi9FGH0l264pmXoOROaJGzge7rAUSMeS47kf8CWaKN23DsZzSLb1w+VVpC6ptfqqNY/1bVNo1wH4ZW8UALN1mNlRna2OvEqFI5utNvlXRWarl6pMe7HdxRyiPgmJETy84N4N4V8mQtkzg5m0gPn10MkcnB/BQkYRifHMfW0CnVeBSKonsMWmbsPy/AWUfmrdRen8RZgA+dmFzRvWbZXGbFmzfqNM5YxceubtQmX3bnnB202b6ULZbA1en6kjB5RDmzZ+obO21WepbPJI6QotNSFYSzYoMsGs8YEnPoI5WgQ5bnT24QYE31GNIkWiI2tUQgKzFXSI+duiUDQ89oEWxUnNZyy2SvTJG8vf9A/ZgjOmWkg908md+B+qe0Ov+9F5eKwJx7LZ77zhjK80BGE0GCH5F+UsigT7Us/jQ6iwMkmIGBNSn0TAkwj2xF0kZHLjaXL+ovfd04O5j8JB6MgEr3y0DOwNJphDcWq6REScxvGoB3w7uTtmEt6weNG6KeOp/ofBExZh5dPtWLd4/OBb1ON6CPZ4PPTyTz9e6/OUPg26fqU/Dt7Y6xAusWkjvf9F31X0Tv8rbO/9JO8pTP2WPKKSahNRMdjONMEnWiy3hMAD7WTgPlsjv8t0EW1qg/0G6cnpFzSnGLTWgyeH2oRPJKvU0NPJN6751vh+p88+eHjui/4GGpgybkHDhvNGT5GrWj5Mkj8P2rYVl3jnip1wwqoZ1lMb9wMMfdF51tKVdLw8CE4Cb1QS/NTRalZFtJph4y4S34g2dTTi8kfHCBmZuggeIERF/KFBQqsKWdw1xBu4DrA6tJ6aTscyRyqSgddf9u44cfrLG9tTXqb+iJuP7JY8reOGkXNT+k9qfEs594O5x7rYsiemX3vWllZWdo8+PYIO7TwubYDlUZu5w4YuwUfYrk97SK/BrnVgeYiOTmLOhYDlszdyzUgvF+T/gZA4jrg9y6UZOTQjF1cjebl/03icLTuzfmwHfpbKuhAUjMqgvmYfNZbtw3xIQpkNmxXM8ciiO9/NR9IAHaVsXi1Ryk39MvsgKfegG9V4tcnHq8DhApTdEMY2FOQyhOmyb33ZZGTSqoEtOx+/9ytJ+W3Fffri8FzSZcC4uRPHz14ydOJc+c8l230CzsbXqNStbhL982rgujezcTiWtueFKSXnWidvPX780IQrJp6jlgxtdZFboGi0yOxjz8EWaFeNxmxyjOTaggm0hdqmVibQFrJN9+Auy9cmuij5ck+xffavyYOtlUBXUIed4ZIZKcwkc2iQL8PtyqHekABsU21FSACOg2BdARKM53kkD+zVoee7m6fyXqZ06j4qeeDXN25O7tdr+ktquXKbvsMVu04JiZjYeOX2L5ZUT2pRq3qz/dKyWh061V131Iww6knTJMY8GYSaaz6MoitFBMWIABgciDRYjIPofcIcgmEy8WUBror4hOhols/sgRND46XLNPmThjWa/dIzKaXN5G5k2IBzTavgyDtWoK5dQp2GHh3crrNv3eBerRsdrdm3f8MaoQEVB7aaj0Nwa+tZNbrTk0d3PCE32MXLUEx0R1gSXvYxfSypSYDamWIfzgm3ieK4jD99aL+U033AyoYQvpmx6tz53PVy22EDUyx/sVimhEbDPGLoSlfuEUo1S7w3tawluAYUVwnE7CY58XnlxrRQtxFuTAt1qw13ZuQGSRBOYgDeTdiReIrEv9cNUULz6xgxTxGjTyr77sHdD8qb3++/UaxV8a2UkcNT8C1adtK98YSMoufoIVwHl3uC43FzePJteOw3V65881fp7BuXLyOMdue9Ij25Z62U4OgS6fvtONltE8Dx+oo1S5dp+gmFnGLLmxoJPOtb8uRZ1nkv5KZKLvJDbcxSvq8xRtAGCjV5Lbdfb8tNg3hyGY9rZyJ7jygMKYYZqfo1olnGMczIcJib2GvIhGC8N6JCiKdcutLQsWUuv6Fv8bQuYU3CAqRqSm77VrmnPtFj/JVTx+HE25oou//UTCKHPFheJR0nwdaNyiJY9RqizEeVuDQIWRoGWmAfcCjHzySHGGGrLKG+WkJEREY4qihnrC790DgjdB/L2jL5GHXc/RfP6Bz5HpGf3WWSZszrkDIHB85dQDdOw37Dw1uTSa1mxJevRa3Np4zbtnhYKiYP1kyWf4r4pNnhC/RBrzl1I30rD218rFqfKq1KhZerHxL/5fIl58qVXNRzx/mynM/3lXwdxtsbNCJne34AMXNUXF78/Ed6IUFFEUMirtlMTfLMVmEIAk2AikYIlXdvqlArKobNFvp5zl45VUq1HspnCmhrmSmlnkQETaXJcgXOb+EP4+CpYl48+blfTKBXAGI5Ij3zT3jaxaXECcTRVtoZj6RCf42RfHIv997pzwblYMkDsB6TU0f1Gy+3pFfoX+4v6SNgr5V+folDLbfH7v/s8PnTnN+vDZ0nPQGZw1CSOSA8QoyoCzEMhh3m/gu4CtM9MJxvvoH2GEkhm0wGXdg7f7bAZIlmQDFS+dzzh0OTR85YjssnV8BTmk+JK129zovneMIdueUvx3qOOb7Hf8a6T6q0rdv4VOW+iS3LliztnkhvRG/4MJczTcFel8bz7wNQS7Ne5YPTc42yMDAtbL1qLNq+cINBnA5+nPqTHRg6jVAtMRTbuMXkNPr6aMqvS+5TyEe8S+pYvp6VMnbajLHjZkvjluYuejYDl8WSywscTqw/7D52/MT6z7itVws89c84k0QzM9i/YjZLkRnsrklZ/KTljg5vTZ0NkXiS1zO6ukwcgO9aDaHPFHpA2i9NtGZWq+YD2ZtVSLvTDN8PmrgDz8QA6FHRTAwRHpElib+b7xH39GAdEiXF+Xh6ILaTeeJRW0YukYb9M5paHl+5gSHDYhy1Ptn8GJf4nd6nr+jp+z+QFWzc6tMwZZZcB1ZJOOppg1tnZ5NfjJAQLlDBCCa37WTTiiu6sq9gmeChQuA2AoE9w6LgemZhckUGBhcpnuGGBGgBiy+TvtRCH6SNXt24OVm7fGPqsmez6a/0dU7Oiu1k4ZhEt0CcmPcpVtoubXh8wJZrQWTq+KULc5fm0O/9aQWy3O/0qlWnGFgfJUHL2Iz0RQ3MSIunucYUriF7OJ8QbMGAkuLt0HFMlAunLUko6GOQ1zMCSWBWeiieUptlO5URLybS32hODsj+GufgEnCQTQ745tP72PsBfQ4vXvanFXF2EI7DTvg59aVbq0vTteoFunIgZQigJf1Dw+zGX8SeiLQyImcE4hucG4fx8LCB2V/xVc8KooUGuBGcP1E8iGZyeSTiR+n6nh27JOeSHp079tTP+mfh7St/dO36+5XvFgIC6snzE1c2LMcN6cFFq6+c+Asb/7BepDd//RWXJ5X/YDNoHKx8qIHCse3DzO4qtt2d4R5FO1mESUX4c5hURIyw4km22Vn9g06E10Twco7+QoIzNI0xVuh4LDPRUyvQCNa+piB7JiRyPwbfJ1ZXrf/h9reUPps+rNfQG3lIOr995/Fmpa17Jg+Wh1aqRzp4O4/9yYqVW7gEob9OzkifkRqFDV8F7L6afYx+4+KMw4dsDcEN1jZBOO83hOSN4BHwR/XMiJ8sojtUyJEyI5lnh4mQCqaNyBqDhCGhILrPrTD2IJqrm6TWzTIpyQ3rRrmWrBNMf7TQn0Nrl3GKqN60/+Sykh6/65Psf0ZpYB1sfUE8yKoGyumAPiwOGQdzqh3fU6LQKLODGu/n1U7RvyzoIrlcnsKWZ3bw1ECRLPnamM14jJwEDdMc7OHEx5Of2j7GgunlWSkRzmwMZNg6Pg214qPwQNduauLl4y+6dn1x4mLCcF0oPS/XsFyoLrdt1rUf/kB6d2vWVpqx8SBsV7fu38flcWDW+i+tls37s9afvLxqxR8vMlYx3TMs76XCKsv6opFmT77KbVDt9hWkCrUU9sQktlE2Oarl7ZiR5iTiADzE/Y33AN/vYZhkD5mncnE4ikZSvZgalo/Kxb70BcVzF+CMjPQJVpoqD5Mf0jFRf9NWz05NnDl+doh1jMpgzeti/QVrKBgQJ1JI6P+qhonZ5CIVGKCxptrMAE02jSi0Q83IhEfaWweB/6HqSWg+akl+AXVP3h2kr5dgqHvyeQ6OhLonyxdtyXTAuVTW792wbKU3/vEPVvwk4fqk66z4yZtn6xc9unn5l0ezNyDCuDEd6sAo+aEwNN7Gv+mfLWAcBK+SqNebkS9TfZnu7ysOj4fIZIpEh5MXP4cC+WixrAtZz2qDEKILD49PrEkSganYU6NrV1xxhTVPp9Cnj6yXaV1/997HN9Yu2aFHBadAaS8ulbYkI0Xagsfemv2NVZEfWq/Rd/SX9MuSw6Dvb5BL1ijrq2VjR2cQhAjzUzs04sjIQDTPjEsEaQFxb7usOsGpK7TWbgfxMKhNN29C4CiQXYk2UZG4ScoiQ42rvbUDIF5oq0rsHqoW+8Ba48PxKjLVgsusfzGFPsix3rNOtVikVGj10uWpUgMy2Hpz2JVZ196SFGu6kml1oL7pI4bPQIxLGSHlIrTViDoKyf/FDGWmt93C8/BW2yOqEdxiM+QvsxDZyFRsmzW2lHrOyMAuWG+ZvHZBuoXOk3vC8loX8OwRTcSX56cEWltoq2spxIZcOUN5Ew3wLroytI27uA0xi9hVPDVwTLQaS1hqJdOstJmVJgLa1F/+/UMruhpzTNxihOTTHDPsA7aSh8lX064ke+ymsPm6iP1DXJxU9glbU1DEn/LR5WOrzXCcP6nlstaeuPTmF6n06V/Wb6X18KzU1IwFqdBVm4ZdnnX1HeHj6TV/9LCpBBEUQdcqd3jNBG/U3+yl5mx5FTLGcqNb6DffovE/pj4RMSedq8jaASLSx4LoPCYjxSV4seUYF8pXqHL9b0udVw5jOwxwj5JWHsn9mYygHXwD6Frcj64lse1wnSskHXrbn/ajfTU+Nv06PhPThJxOm8UkoKiKrbwlwsU8HImKqrcrS2B28ED8D7wspgF5FOLKw1VUeVwBwFzO22bZQ9fR8/g2bYor4q4bLCtxJ1yBtsQ36AUyxrqA3SQ92W3dTJL5rZPlLcKoSd5zeQpoG6XQXHMk167EkRBhrc5iUcaSziZ+NpSM8YWizxhcSCVrl2QHRMkR7G5zyUy4M+tKshPEti6E2TOypJbTHmxrXkYGq020oRe3reoFSUe2JUvj40KkIcunDF1qmfnnwg/YOGFIyjR668Pa95Mt6yekb8uYt3crdpHDe40Z3WX80f4/neu9I7b03innHg87Oan7tLS+k4Zf1KrJuHKe/QZilPjfSffFEKfKsgYqMtFCx0zJYsh/2cNqtU7j9fdbya65ObB6X/J6RdoveoIdLnNfovjDYjhVVDCE7meahLN9PRbh9FFcLeJRw2WxP10QRlXATvyF5+I2LcpvV0S7Ru46TQtXOUh0wpFpdtW5FwR99bpwDmxjTHdkM47AflQp3+feAOJbY0jZStQNe5Mvyfvcxl3Muoty10lyhJo3dU7nqzzj53kZiOW5qPEAF6b1s2t4Nmd1840x+6hcbj48OhmpPokEV5e4NfiIh3Ykw2+Cts/DYphHv7yJrA+HGCXTU7iaAmk2WHN/w1BqM0464LMLG9asof/s8s/x3U2frVqNvfb45tDXu04c32fM8d117NheJWoVfbF3D/1nJT55chV2270Xe625QIffPPL5dcnN8vLmZ1/e5KfGFuUEPzWqF3tqFHNQ6AoPijgp/6DI9P4j94Z6UOQGWm/jHlrWyws+42qLU03YyMQKQG7YUQumKPZTDPwPETzmyaNo8gvL1kyaS19hC05bdeBTXhSwRqnf/8Df0Nj540qTnQij1QjpJe2MFCUQgQTiktNkKxoX503HvOXqDa/Exy34iOX9Cq3p/JxUI++r6Vb9fj632/Np899+XtCRiv48xIFZ3JsIcsAo2Miyx/vX978UipPrZb2Hu4McBPkipNzSzu2eZmzy1TQ4t2IzlwnSDupMJIakiUexR7fh40e3L5nNTu7J9MkL6y06Fp7xkxvO62+HXUoHZUx+br2Sf3JLTOvUdeQj6A7yDzcTP38uDXdPwdUknOBCvkixFcOQg7OqfdqDU8UzvLAFcdhGsYzGqwvVD6v8lcWSW1tthzRD0z9gOoo6CNeaeEu8YQd2U3UQN7aXiS0QqwMjR01OEQ0geEJFOT0LZFxoI6Mona1kGA0GO+0fbqdN1+w0EZkh8v46GgL54evIIjiOIxyZReZ4j93FOtaGOxAZjxS0pEDx9EY6iadqCrPJ7O7oou7eqnEWmg/+DU9AvJqWkQOOUDQe4L1q2fq9OislxCFr84IVXhZfHPnyM+yxDGfQV5nv6C0f/OPG9IffX/3h4YKNL7DDLnrx2qTr9OtdWPkDEbQZMo/0PPMoEk0ze6m5sV6c00Js9b8mEYjrw83J1S6iJSR9QDMDRGsm7KOpBVraXgLHRdjDqfR6BqTaSd9tdDtksXymW4vd95s/VpRtNQ48Yd0GwzvyEo7f/tHKbCEIyT04IsjIOD18TJqu5yTE7YotYefppJFhCBmICvbUUsi8bFvIFj+4SjwrRSTCJsVPNgaA6EV/p48BlNWAYsMb/JdVnjfv6dMFc0iI9R4ZPAF73nhCPrSSnkyaR1A6q+ILmkJ1nQH5oyjIJHCLLqmtngBb70+RrHPkqddsTD817BEg+uVD7cIexoLS416JalqBTs+KkpvUM5mvK5Jy9Q19/eguffHuzbzW5+rO2bF6U8CSZePSZ6ZMnDVLovSvP13+pL/ikhg1xN3x6rjAWgl905LCQz5dsuLspu3rDxzMXLANSSyTVK4qV0VuMA6BaJKZcIua107VdjYR8SAmGflgpNXPhvi8Tysftgp97sFdlrvetoitz8eL2AbYl1u1gXZgeAow1cg4uEaHZ+Avf/2jW5dBqXdv0HfY6dhJ+v7i9XPfylXXLWk2PsQnvcuqjfgazUmffSBlqszOvVkISS2gXSKeMvC/4SmlFrT0S3JRGmeZx6LNBEXTk/J53kveqJuN5SZna6zA2vcXR+2qpYK68FRQvYdmr8l2ez0MODfU1AxhA7PX9GRa3wZ6N/LXypfWpm8wHoeBzE3vdmbklY14o2WO1YLr0pNEJjuv0+8QRkEI6bqCrEY0Q4RWiHkkorPyP9pqnpqtZs7wwN3+FwYbp5s2cGXSwA22+Gk5U9/T73B/ug+Xej0qZ/QbXIruxwPpTfwZbcFuJI7oaQe8m92sFivzR7aAyNI5jh1ZbA6ywY5wuEiR3A+/SAc+N/3Y3PRr5cfmpt89uMvyscWO+PjlJ8boizDHS64GV6ICR2z+GOoXxKtHOYcGhJYJrRYqd1MTafi0LWKliZRrUmaHpKMvr6ReHfVyXOdOA7smH/h8W/c2rYa9/PvIpXuSV+OJEXWOrshqu2Zg3U5t6yU1PEhm1m2aVD3jy0/ZnE5HSPbiLNgNiqMUK8Za06vWmt7eWpNCXr6kHV8CWxiwkd+0loeYVnmk5pnLfTn6YOD/OWOcD4IOBuFb3QMdDEI9XVu4Mxt0eOR/SB23TsrJGYzL4LJ0It5Fz9mkjn+wXlWztGVvHhsFe9K+/q1YBcZWatGeFIGzoj0J5mQ0X5Sydw79xtuwN7MZrtiqiZM36ytpHJ1N/35+WXHe/wh/o/WYMpz3WCdx4/yPLPKi3iVSyjvwO25a8oHjEpI8XBvH5tDvttPbObgiLiO5wxhetVYCLGwsCKLNG0/OKJ9ug+0VGeWLr2rshDRK1lOO15mO1cNxuCOjonHMgztzD0c86vMYx1qOZJT5lCOGUlKOMez1DEdwimQ4boLX/70csuyZQ7vk5ODtORiyyGBsa+CzNnNdxCMH/p/wyLJXDu2cIy3I388xCkdIyubfXtHu24uvlZmp2JTLlLLplhy6nQWeLbOliaeRhNrRZGWKDnH21hjQ6/SxFbRYfQjf80t/vKqYOAZc9fMSHbt2nignAcqW6SGS/ZTkJNvlmIHMIZ/5RCEamIKXBomOLGANsQGEtrtxrHnNl7U/OfrtrS/bNnhZI+ngDUc5ccygcpGhcXcsR4cMguSY0gNGELCPcWIg2LjlQ+gVei+H/h5EP8E7/LH0oPqhr12tVZ1ws627ncglp9NsLOkpeTuff9VZApe4PsVd5b9a++k5eEfOMu9fLDchGDxHmgDHoBXXQRj1QEi6J1dDnqiJ5l8SDkExv1g0+l250Z8KR6Rvlmw3jwoyJFW6RekeQNN+/TNn4JBefXLwQJ/bX+Pm9PNxvUzERZ27Oom3t4m4GRVf1+i/2/sTcZsc3Pblhxla4+GWX9kijZ7Sfc73w+ZcNfmvP1+Mve/4MTN/pCrCEe9fPhzTpCgYBiYJZ1iR/4SHrsjIctZVDd/NvpiPcGQjl/w4lIsYh0Kike9g759XoQ4QVeO8qxpPGWn6YtaF/s/O0RL0IinzvFP/vp+Q+113DAPWZWncOesjuq3Tpz2wqgMrl/h4uSMTWPd6tZqxnlv3eh5bElepALopxrp3cyjeuheFz7fuNfHx9Hzxc+RGOTm5R4QWyFXZiBc0AhF+VofxVhiYZe9tFCx7G+nFLndy+IhlL9bHE2X0LCqfIJmtVJgxF0A1k5YoBE01e6gYDFF3EDY5BzE6E6QlCwUxFS6oVRBLgQ1CHNUrMVQvXLIC9P+WMQRMJCrC1+ht5Cl5BV51ntxrq6uphj7B7cc9GnN51B3sPPHOkkkXhz0a90m/NBdQUdu6pUnzByb1OTiA3rT4rbPM6X90bLfxa+bumpmBCFoCmIDK0EZvmPNzzEbuu8g0stljozQJu7uggBetV+ZpyGfO/Twb38Nw4DICXWZVicB4k2jSlxCHLCHCpjSXatnjwnR6PPNqAHa6kl+i6ybNMV6GY/jIvDdzFk6AlPrZ19/ll+mSb9HqMKo/aPn0zB5CSLrL17YPWO/eJl+NGUAWEYDFJUd5Iaym1gheGb3kxafjR2qth0vhBhV8KRWY73dfPnhsyesz+MmF432T/rrXaRBbFnghHY2/KL2+76rThG6u3x5X7syYJ36mzXjdwlBAnht5VgbKDBJst2KYaQ5tCjoYdCpI6maOCWJUV+wS6stN5VCR6or4yiKFjTY6IgUMC88DQ6kWPDfyUm4fobNRGa9CyXj6mldFPLKjYVX36GqTeHHEjRtzsLO8/wlUSLRQ8zlIlT9FnvM6ifL+vbt2IYRZZoH0ntfWm8zrg/73Oqx+7oXWU7BfjB8ZabvSzBIK4EtL8pZIN7syrWaDnw9fowa2RuFSTN1WgEF4kZqsQok04fKYh/QdFG796jUvUTJsshPuQnf4QZmSfpl9cDQmrHjr/UPJY5cv3EWfIcIt3bUwC31QMLTPUV13jsVzAthD0pFDPnuTcOLYpxdhcbE52FOyecZp+yM3GfSayYC12Em09OHd2UdPzlI/+rvRsOtgS1KxTSMnb5LzvOOAPp+AzjtbOr5p82nCzYmXLzDYEwcf4G+s5+npji0at8aIcJ0ii+OOAtAsMw4soXnNDWLVS9GuF6HcYsM9nTUmUFl9JMdw9k9xzhrEksje9pAHm2bz7SU/VoQngj6vNZlp92T18879+nQhm/C6/LbiX2i4XJU1sXOzhu0Qznuh1RX1RZMKODqMwvoU3Wpie04ZMaxNdnFnF193fvz52q1NWc+bKkYQEOei84W+tFmM4UXW4Hz6m01l0vnzc3Cw/MU/tuVJ5S/2bNnC9d213HZxRg1FfVfUwYQdsRgVsFD7CleVvx059IscaparqoofC9vLVTnf6lMd+PY5Q4ZOyy75eBKWkGdi71gWFQQdku2R2v7ZBXRhtnoxoCBD8x/oTr+/+WjoyCfXc6z9uw8chfHQ3j2HQTgo77sX27f/dVvGuZax06eNl6Vcy5gZUybKEmLM63lPledy1Y/KLybJBdrKH1i8/MZ/kV9XRH6bB8pz/NOJr5P7XTl8O6ddw7b9XnVNatoFpmvL03cWLfrlLDlobT1qyJBRhfeM0/keQnKozpev0TFmY2AJTQ+QbImawuxtfC93R/UgFKeq+iqJ0djrvNRQk7gkHYsuyYIFqXELFmxBZBv99e25R4++ol4HDuTgMPrr8y59e3eAzeeS9M2B/d/KctW9OI5es3ah0/t2aj+Q8Ohh3nPdNeU8ikRLzG42+Zk8C1OoACUGaLQnYfAkjGuZYRGaBzwY4ZFmhwiOqFWKrEN3DroPFbGcgcLZafblH+YKzscRdXE6VBjLwMu/cF6JHff+g6MAV7ds0Za9zvgJ9SG7tq5Y6W3xod++20ffLZM+B0hW0klcYh398NeG+b9cPfvby/T1T2juFlzpsnWMkslWNeS9H4WzNBytMLtyLPdHtLtweBL+0dK0nNGcR2rkgIJITW23Vm6E82bIAprB7ODmrKrvWe4CT68ATvQx5FfaC8rOV/jyK39pvaEduxFaZ0zc4I3lm6fVA/Znf5xKZzlNHpZ//H5Lrd4bYbMe+WseO2bp73vnLeKHL71Dq3K+vECEFBOPHrqhDv+ap14c2MvsqmatuxbB+7g5ENFjzDyAoZI0I+230Rn0A9G9Joh+gDBy2114D/2E3Xi0fQB+hwhyQkhuwPdcD0GywP+FZMRBkwyLkrmLkrF6D3CTovXkYbezXQa8xbsf471vadd3ffz8sIk+YTeuiJ7Duj59mG22DyF9LEct+qDJIlBRqKj2r/uYaCGI6E0jkYWEbZ2Yna5joXWzD9HSUXm/SlofG/ixDc/xLjwAl+E9vCjt/ijo79X0Z4uF9MJtd5P+UpMPrfL7HO+lUJHQchi/RwRtQEjnC71uQL5oqqCI2LQr8P/YLuSh2gKMnkMw/515IIWDPiFKZTZ5aU2L46U2tUEy8BnPhwkvpu/YCA3iozX0KJg5z/lYnSPjYJTUEdNGzTovf8ymQtvgyEL+qARKNQeo1fUDYBu2ZZgWx0xsjgiJNiM/mTdHBOhw4J6a12EOUN/hZ48g9uHJkbCsw7k+EqZjdwkJLKBpCJVT6D+KhYzLGKCzpGWMlSzSB+xOZwHOadETGiOVlH/8gS7EQ6YNd7YeJF2HpdHFeMhvP5M50NDdjF8HIaWPXNW+ldC1NlztottV0CuFVtpUyYhhQyQLURUO7YZWqu9Q7FoZx8pk4lDWWEaXEBVd0FgjtHI6OX+VPpVe0T8vnCQ5uPuoGPyy3MRkCc9aQb8zf3PTFf9MIzy//fqzrCmjiER74E+HpR4lA3EYG8ltCDl8BiMZgsLRGnOgmocTyJFUIupFBECIDRYVNdFy51OBO8r1mqNcRKrxs1ti1h7YJuZQ9U3OdjH4UIDza15xHPqxMYduIOer0U1wVMXS2fIjOjN/5BXLlCWjJeLwhJbHyVv6WtdC6H0SmWWdUDD4jtb9pOvIVLpEqoL3aN4i/Ti5qtYnJdQ+KWHXJ2LY4v/aJ84FfaL/9z5x/nifxCcIffKxqUFW4Hj6JRxb2+kzNkHOnyQvcffR5W0mSObyPrQjaDrR+EeYJbcufHSWlKS1pT36OSgaxaI9ZlKBl+ciKqN82ZjC1gqwUC/7pisiyiRK8eSHfRTDiEaBYVIbLp8nR42IIt1sffZml/AorbxnCVs4SlnIWy/rkVkqO7MU8BOVCi4FLrCSZVnoE6oeZsbGqHBR8F6pSFG1VgNL6ddDN1WC05/lIYZysGg+tRtZOSuFPsLG59h58jDsQt/+EZ+yus3MrSTr01qj5tLrc+dij+XLrtM/VwH7mxzafdDX178Ysa1sB3r+D6n34DprSn45JX0+wZP75nwtbcrnhmOZMbSxNEcXyPtvdTH9Fyj0n+1BwftPLHQU6aXw/otkylJkq0jotQi9Ta+p89ZL6LWiHVaqrNphhb3FlWR2EXurotZbFQt7a8zogfQhNt1517PDj2+yE9IWt56+kuzeEj9kPH2/ZMX9zRpP3jVCqzc6sn1h0viIuvtWHpR7Da6zJPbQiMmzcatay3dLXuuc6Z/Y5IQk1AP0SJNyDnkgEwpCA80yt3RUBn929bXHrwvni4vglzB7yy68f7xjfMXi/DwTIFDgNLTnSuIFG6KiJOb+9PFRTEVZkqyfbj7kQI47fL5502dO1vpOh4m5CFUS/uvvH39+kXv50a8//okkzhlag1fx94ETZZBZ5ieKWp6cXU2iT1Q8MAX+hgCtaQFs6ANaBcDQG/SCd8JkzyBq4+/0xGqzDGojGXnoT9jgjFXiUPx28CwPa57HzMGDZnkQ5DGLM4jSx39W0bhD6bKlc+csI7+smD59BcIwVkjOUc5AqxqZiRplFkmSRLiwyB/KlXSdPWWDKZHlppn04To9Y0gjPQMCHsavTylHfNtF09WvqBt2xfNHDSdv963C35PU3OUcz8lxU76ciwEk4fEt4ZwW/D9igqsZK27awetkL4mXliTHZYnDD7y9UzpfrxdtcgkJq+ZK33xLl+biYT174pM4zOcrXUJpy30e44G5PE4x6cojA4qGHEuFYzJY/dhQO/ZbMd6t4ymsHnAVockmOBCEIv3wPYxeAXECJQQMC4hnuCFW8iAaXtPxlGsTvAbbnGKiOU8u/EH/krDXkwt/Ylfr9AkXJs6aOenCxKnETH+i88PT0sLxaFyiPY7AKeEjR4XTdPqj7pvX4ck9w19fb/61NTK5R/ib65z5dg7M4s+hXZGos1lS0XkS14oEB46gsLI36DSyf/uQrDdvWgk7J4RBK9fMCYi0Es4YmlLQOt64pF9OHD71y91Th4/9Qlq16dy51eGkjp8kHSbRP+Go4GFDg+kPv3j+TH8sMXhIMI76he4M+mLVdHNwcnKoecWMA6EDEJK4Z+gLfS1UGtVADdFJc2yjxnxH5FgkuDYQsLeiUSJ63QTVT0vjz/Qq4in0t43iOHM9Pjyb1cUozV0ZCdmZCTGs8GXZmKwyDsLOXTGbVcqsIr5YNzuzbkxmw+zMhjEqs0Sh9ymaZTobGfmPmInLnegGo8pwaYTurMQKiGOWI8lPylffvMT/ZD8YNerBN3/LOdd79OvXY+Co13jkAPZoUGjbeadivQekP41seGk4LVVH2p1cDazNX6x//pK7ceOb2yTkF+vVRVOtz6cumjYeT6cTR09dNJUYpi7CD9LDmzkN8Ai7457kT2e3qT6gf4UJwWwMxoB364byQBuDz8yOfAyYIlQ1G67QOiTYTEJPQ6dpBIfOjDnT7Ojl/H/veF55V+z4ch/r+ASPzDrZmXWEjjcW7XijmHsaH198x1c9egff+uJ8z95nzN/Kd4416dK2Xqvu+Bnu3rpuuy5NTkS0nXe6rHHAbOj58yNoLO95udGjq++uPl6y5N55LF17fHZs6uvUsSMGXb48aAR/iB+nhzd35J3eMoDOyu90onpE9Z4oCEWhKWaditfU2bNziyYpN/l1Dq4cFiZGAVw5KtLIq7L7wwOeOB0Uw16PzAYdBaqNgaaXFWLTh1Hsx8At9D96TCPjQ02h0Fsf9ZxaqkjtMd3xRXEe1McpKVOmIKJ6UZUs3ub5Nm2OtG3zRx2oQfAk6H/wpjoYi3pTC9sfDKVsxfYHqxRsxXlcxfZ/1PNq2SBVlqn5i+I8sJZJk6D9GPWjC+RD4LP0Re3NJh5H+DdEcZHsOidOG+8k4lSJPS8JY72L5+UYQpAx3CNU3XtMcVKl3G/z0EKMt2GEgy30lwW7d8/bRBfgfiG40XvseRD7rqNvn+Cou8fp80N3McKoK50r5bC6GSCrH892F2P1xcvqzmX1EmX1s5eVxKu1qnxsaEpAWnI757NvJ/68NPXC8EdjOo6cnjZiNZ2LB4Xg8DuB6yxz+x8b1yXlxK6ALccIq8qJkLxMqYkM8B8oFMIEgV9R9JHgcIlMVPgtToLnpAsObUx/+eLgb/RuIxx5mf7aBIcf2fcQRzan9/DpfVP30NN40d6pe/GAvdP34oZ08N4pexC29JO35lVRrEiPvBDzlUg6gecqOjE02mS0mrIwCcNgi6XhF0PwHfjcaMWUN1RnRO4olue5cN7sLORguznCwgap2S7p4iAgrvkuBRWW9QyvGUGnvJgzKIHen18qeiL21RnvhHkMGI/T8XiEAI6o+NBRumSkIBfOh8tJcOE74uP0Jr110glcrY1yZ+bKEfXhvdvhveu19xYU6mYEvInRcUbr2zbV8AnFp/6IlTORw4cIeg6fUg7yaqHRKB7VRUmoKxqEpqDMBjGZbWMyk2OgBpzgORS4jhswhQquWc0dBYWqLduj4JrV2eZ1WKzJHpll2DWrv83rcARU9siq5WjbOZxaW5s4WGBHMxQ8K/In8VMf/wrhG9ifrJ6jT44ZERdbPg7/OqZbj7Ej48uXjWs8tluPMSPiu8bRK2P4o/Ll4qxJ+W+0thijPaK/5r8xfiz/LLxPzmk3YEC78onxsfRpuwH921eoBI8c2/cf0K5CpcTy1vfwV/6IPlTfl1he8Vcfie9r31/9LIJxakF74wXKBSQjR+TG/Z4lUBiMWAwCIABLxfOKYdMvAM6CmH9JovRia0YxwYqRomGx4ETFGAkrJl7BiZEmBeuV6EgpWoLoscmgl2grZ2CpqOoCF1LCFbegO3LHutLPcGdpPcG164OTNofQrxrgqDKey+tckJI9l9c9V92N7sc95a1uuA3dTD1dUns1qsYu+IDHmvoXLYs81zS4SB4S3LABvW15QOixRrgM4yReTtOUX/QRKArdQQjatAUH4ppYjzzkqXkXkMHO3+96J7YC+1Q6TZMfKj/Cp/5WP4VW5eWwT0mz7T4VqH2qMFbWi8fKxouxsmJyioV8UE8PMWLmKkbMXP634TLQT/7HcJmiWKkaLlOUvWazZbEWLNMqcv7Is7sDGBZZbRG3eIshDDb7SDi/XppIIuFtj3/hLh7YZOAENXARWWZbYnQiXmIl5V7h4LEpQ+dM3PM+cHEavYRjk6qOHkZKWB8omfTG6fGz+6xMxPXim45bSKjsM5X7t1NpshwLZ48B5u8Is0nljTDxym8CSFJQGoqj9PLQ8xpv/I7XRxOzXESfttYStY6dSaxjx1plSpBjhw0aPqDTCKhnd89p8OELv72cNoEVtGtYcdCwTmHE69WqlN4TEqCunfLTsOn0R/pBt/UkK2sXOqlP/44adr2S3gM5ogSb6gGC2V48fBiH80ruDKNcycGabCXmHPm5I6M0xskMaYmQ1EUZjfT/lwwTgFF2oT45+OlLFZSMqzAOZnpBhpp0nPvNXeN+c4wR0sFEZ6NBhMtJBr4CJJVlRS9MJ3s+A1bXxwNxchUSGZ5PIr4Lh+Hq9E0OnjGH0L3HOac47UGv0Wf0Ff3u6Gdn8CRH62zVE5FG70s/8zyT5mZnHxOX1knkgBJde9520no7qdJmeYiyGZle5c0p93gOBcfhN6RlmmCMQ7rvHd3+13WLWuaw9JxH9MMvyWcWljjQ9Na0VTxECfuRD13roICIUegnhJAe39MdQuz1ILqWI2Oj0Av1daUvf30dsDJMYe/H36ivy7H89QxAcZzh7/9HfV0ajXhtNoSUBD5KvYqBVwiTQIwzuju5aEVIN7ljIU3PjNVig0pBsUBHEop5ajZ3gqvlDxVXmor309P02zrbOlmtnbYl4gBw+HexvCZDnzyxLoPHaykl/bTc5wOcTbCbqPwLwySIZ0eU6eRatEywGTu6aWK6FYgp2YlpkFn15k/olR9i1nV4+bLDumigNbRS60W8z2xWkzi+/hrzmVQJId1WvnP2Ft1qgt4u9qhA4uKgI9xaEyO3OtGV7IIdtCiuCt/XMkykQ/stNJrcno/34wTqQoJpNhlhXSw/O2ddT/pYG1kdEQaLHSm7eP7X0GIyKIqR0NGJaCWxYxwx1D5zFNKnisqKHD8qa+1JL+kgMmcILo3L0Ql4Fz3PEmIAzcwzYt5br/FTfK3yM5//ZbX5vIDNZ45Kus3n8yttPqcjpHJA6GfwfOy5QmRanM/FxM0x0WlQsk0YIhzDMTTwLru4YzwKXoNHteDyeQyuhSFDJBWzOjdiqUZs7x1Vi9xpaSJ4CZkv9beugOqYVqvUhnQ/m2tgRTG1fQghpR/Hog6wkV+ECxUvv4uuAG7Lcbb/W/FG4u2kFd3G81jIeHz2nGWemsvC9/Rz+r9AUB80WOOoQXBkCuArIYAqhsCxUa/BE/Uggv7fCnVnGu0x5UW3d5WYf7KwwS9RefqlOnY7/NxC5v40+rvuKGf6A6SSZk07xAjFrQXGYmHLN2OTBq8UwLAme3Rv4YZfuOOzm+w0Getx2W6w548duH3tFDWNhyynub/2PLWoxP6SGf2nr6IJhXma/cH38T3HK1VEc80+cZU0Ju0oQau0LSxnrwVoxbmJXEJTJsFH7VYckDcrUrC/WeQJiGVj7Mtp50deVJcZT6hWS8czzcfooffhdQESPPPJg7+/+9nyL4/RW7ulyb8t6Jf2s7lCqfvPD5/JOdZ1kHVR395bkzu2625s1OgATjh16SAO2nLrtxOHv6fv9Vdw/St/43h6in64QH+67E38Zt5unIEdbx/Ye3ALIqgnZDBf4jyo5SGLUo6JFevViaFeTi9o7xASM4CJrDIhqGa1PXpU6KgwSeioSM45WKZoRyHeLUad6llMjIpXOQfhGe8lU0K81knypaPLUhY/ord+3lO72drJkRmHlq88Ma1FR+o2oXeNChWreSVUwXWxXPc6drksL5/UZMdVsuJ+yrE/866N/3a5J87YM6T37kmDZ08YBLtjKdg1w/iuWV3bHb/lu2Yw7JrRfNfsqr5OfkCcx4Zu0X3JeTVac+rLj0OhQuxrsBJBB+InqD1gR61sYgwtzLbBC+lm6STdRKZZMr0f596As+lc7q8FFCcIoyh6SqnKs35acGmEGIVAEiyJOxviBbR1Rarm6jxUScJBknAbSQJek7M/56deSePPnrU2y8/64VVtoBf38178TTt7uvNe7AG9+KlcDV5/r/Vue96LUxGSf+MMg63MCt9dRJVKRGQI0SzFTatvycRVRHY2T+5uBOJmnvqWyLOpdXoVO+CJJ5Ok+GHbhvSxWpNHbHvzAYOJVHZ1lWgFl6F3nPzITsCUVfd1evpI9+ddfI1JOQYh6TVI74PamHUmX7FmpXjQ2Jt37pgHMaH/fYXKFHKBhhdqI1qcZ4HE0uucBhW2HTqJX+Lp26pVgyQzN2XefEN2Fm5FM/cFY2f6l86NZ5vNREh+pGTyiKBiExHkMohAFnvoqYK1PsxyEzPx4zgrHEegcJtspnWzGeuwE7HitJWM5cZ6ptTjR7QCvg4cN9bOiCCfvCfAFXkOBaII1N/sExkl1jBQx81eGnOQWiA3KCbLS+ycIDb/7EuVwlIJK1KqlOfwmMAba4JnxlCjxhKswxoPu3SH3qR71u38YuFy7LARO+AwC3CtZu2rUO8HqpAha5cvyjThdrhMdd9bew6VPoADN2O6nh6ZGX/5+4bnS5aXhgQf/uoX5rG4ApHt+dxXyyqlh4SFa4Xpve396kILAxFXoAMhdTbweiBLnQ0cHkggRTYwBu7MGYEAB/krMA8eZ3nqhS4IVLtABL+a1K9ztSufqQDCM1rtiYQIfqKE+hT2QxT42sgPt+jv3tL09N0DgrH+2C//WGs4bxi/q//MOj/Rofi6w6jLKd65NyqWOL1sRex5yOektFf6+tmTew4mK71SJi/gNalPyc+5JjPAbNRWgUeMyNb0r4BQs14mfCHoQclCeg896cYLo4vxFb2QRyKkgvsgI9NnQjxJZChe4WC1jsRmXJGGPcGI/v0KY0dCD9B3ZKQ1Aybnp6SrdV4w/f49zaHfnsHDcYqO1z+nf8r1eL5IZ7OrqItpEXMxKCJmGHgb3TWoBaiJ3q28STeBPh55u+Uzx2i6DAtSFzSAXDt4vPue0e3vkYXzD7Bq6MD5T3qWerA/+eicwP2NLo+b5Zif2Q77ZTmapunwMPUQ88Cl5V2A10NpmvyIn0Yv1delOXkXuJbZTDFwm3Sc2Yl7DoohmhJUtMIh8+IsS14fr84lZgTyc8yjaIaCTQYTz1BfRaZYT+5uUN0toiarIA4jM4NM1kqIHyWrravydcxmsiO3UodrnPfFpM0WJ71UKH1t0uo/i60TxWb6fA4+uqMBS7VKBaVeTUrPnfXZaVaOFD/mqr3mL/1DtbS0UZrPR4l5RO+rlpY2SrP46/B+fQX+/grq68ot/noGTdPV4e/P0b7nIYwqq/r8lFd9LrbmaZGaVa5IhTH/TzVPXe1LI+dXehYLQOP8mqcjcW08dDN9sFsoAB2wA5dSKz8r5+gCemjwaXomCxcWgXZt+sGiFn/GnD2nGbQ/AA0zO3P/qGhwihFvYsdkSnjiZ4AzyUcFgfZk9uBPme5pwAJO3k9vVyrOhD9Oo0jyrEulJZimX/yJPvpz/v00y+wBExevWbIACE630STfP8+c/6P/qRk9pk7ps3zWPoRRNzpWbgijFYB65LcChBYsT1FwRAoFB7n/PxL7lXWdtADTOVe+p38+nftwUs7cISnL1y7LAGfAOlrP78mpM38OODUtedbUgStn7GWztRJM27l89mW1QSgKX/20FNLj33A8QnzHaSJt5XPwGahm0fhq3oa8FP535zzK9eNmSmsb/fg36aymHzeT29vox7+RrxGvWYCQPEPjGWtjllXGHJnFV0XtRHQ3ISxpkG/JPjfELiGZQULDeBWORAyPOFRGSrdaf9rwYio2PsWV6PepS+dPlNYR44dWY27NuWqRrDFEN3fsmCUSk28AQrpMrnmGol5mvXqa61lRBDHMIZ7megfE32efLmj2VP/gB1FHEdPk58FBTKFhEUxUrkgDzjkhKhoiD4zUKTJfeDLqGb3PJbc06z5EIaElXgdHETnnKs2i301evCjF+u03HyRizPUn8yY3/bF596sNblmky0Q3b8zYpRgR1D3vsW6KzpdXkUo3+6mskX4M+GHjsgqz7fFiKfDNiuTLU+jExBQP/qrZX/2jJGhkmYFCoX4b+gmdD291dJzJRw/5KDKnL4/WKq1wh3/3h2e39c0hLeuNmS7LtZ+ZYiQy+f4Cmtd+8JUj95zJgUYzRk9JGbewgY64sUpkE0jd3KSkgeTL3Sdvd/pyxq73s+QvP8PKr7j1gNPXNu4ZVZ+dK9XzHisQAEGlUD9zOGd3FclrxRwlXNpR81UgMWYklrzh4ZowUSvzD1PddYZ4FW8L69ZHZuaqwVjQch/ecl1UNFu/v+9cNpMCdwju8wHr8t4ouHpc31HQ7tf+ZQhJ+WneTrNDan/S6xoeOvbGNfzt1d/71KK0RZUm5NC2k7d7Xe6/+90seeeemsPSEEYxefdlCiswAjKx3bnejYS6+YLZJFTH0bux3QuU9RJaCMrbRgMtIXLQh3n78CZG6grbo9Op7QGGnLgEfgdap4ceFiImLTsnS3KdZ+V8sfzk+MbNDlt/J2eOXMnTYe8rDzOP6J52JBlTVu5On1rl6ktp5IzGU07IM1aeJTvo5aax+9jYNaZHeT3UMFidzlq9FlOMMHxCjpUZOwb85+ELsCOHM0Rr4xZdMG4cqxQNTQ1XR2wV/mbJNPqU/inh8n9h6eED6VqfzjMiKjtsqy6ljSFdz+LRw5+ele5cutuvEX2Tvq/3D81aVBnfpELWzJGzuA1Jd8v+clXeHp3WHl+b9gTaLz/sGJjfHv2/tscDYa0kjcGuPRWZ0NCeiiYf1iCTXYPCP8O/3Rzcm/4m45AHEwbtzyLHBrSfEVVZt6MMPovXfbaoadvTfTot3ZhU/WzEvr4/NWpRIy0paEa7HQijunlP9VP4yPQ1I7UlRX1rwfAkuEi6lavo/RAxsZnBwqiYTcGuqkLNSX0BmgEp1QaDipeyWVGAJpL1tKevW88j65uWTBngHigtal5r2BRZrvMmsBQhU+4tOHtBfmC9R9/Qb+eRy5LjXRxI7uYeb9Pn853Hfuj3db+duTNPn2BjVBvQYp1hjEJRX27fCZUCBJBUkfQHFzu/jliHMkgEbfsEaSSTtrnioRy2aLNJsqJZJvrW4Llrf1vCGafIb7h1g4792f7oEyuREV9PPvM1lsbQtfTJK0njoLKWadNn85ovLrbKSl33e+rJI9zDn/dYnw4jVgIsc2+Oxxb1RyGdSSAaEsKNQoTCEZl4jj+/g1lrR4fv6S3s+HyfyKd8Upxa1ByRxsaH7fKp9xcdO+tonW6xkDSAtx3/JJl8tuPYD2xTfztb/upsnnWVajewlozPe8C57QJRijmAMxX+r2jJuD9TPccLrdFs/T09Y9jQt4I7YRT9BaXD7JWfBqg1BG52u7ssSf60VU4OzswhbRp27yPJtZ/Cjg4jlUbnGfBRCnojrYdPWMu16Ud2LDn4TbdTPWGUHPBMpleCdnwMfNehqIkZ8dknnlaiH8dRdEsjuwNJix8pzOvMoWoavttoNzDk2D76dB1Zi037786plb51w/lzGyfPkKT419EGTKb9aVyPffdj94O4xMZOh+s/Pp6HDj0hs8asuJrVseP8a8PYmLTPeyo9lluiINTQbAgOsa9YJmr1YgFjZ4NKwSqSKUSCfJWgS/UcyK+h1zTxmSHSuXUDYnhagsg3v3hM76feX3osuXzveaPmLz9I6jUa339Bm82ZuMK7oFUf5tc9UfXEpyFrme0RCrpAZ14lI8ms+AcUsT3E2prkI8RfmT72BTe16aB6a72LHPT4Aa0pT6U1tdn+OqAM12lgtssPrl2zzG6XDMf5sR/gOAf1BWY6q+Gb90C+AvPbxKT09ROlFEMt/yal0U5Ko52UwvEtS3guPSbNp/vbNOjem03Xsn5Y/ucMnWvgzt2/2/UhM8cs25ialnj1JZumCKNpME/zYJ6WBF9DFK/5ioTSwsJ4C8lQET7OfNVFQDLU6AgIFSbDRWDG10mRbFfxiIzgGolYsDMgIkhtSn45Tp0cHgJqdSQ3A0JtAI6seB/c4ylfrkk/YFlIrZtpDj2F3cZNxzHYESaGdVvq4j047tCpDdvw6r5p07pPPznwyTlrhwo7ep3/eeDR8Z3Gju7948UR3C5qplgKPTH4N3kYt3tC4XWd5onhr0sTEI9AycPJd8r3SEGuKJwbhhx0WFA3n8O3M/VayXleHtbIMoqNPjDD4/GyEd/+3o3eypKat8qUV+NaRnoat+sxqWHjzifZrzYijqQduYZ0yBN97PlGMlReLVVADfHBe6j5tdrstelkqJKtvjYL9etXm0kp0WRpDUK84rgDMhNFKsOnCP8PSoMPklayG03e0H89G/PecgheqfOH95YwOzg6iScIsyl4I1kuCfdlJyRg/9Qu0m3cX+ffYtbi1fOSb7BviZMR7qtD+d8i7t5h+bE3pr5oYPGDqZ2l2wNl1GLG0o3z+vPvqEi/w33QZfgOv4LvgNRC2VVQf/jndbr9k9pLP+F+9LuWU5Yvm9UtG2HUFGRI5TL42Bh6tk3gIwFBJxwsdU5tMVCHNmakt6h5o/886Mshcgj5C/ohCs90ZKM+E3fi/V5bRuQrHYLXZ7my12fhLnw2VKRnyB6UhxyRFwoDLhxv1eqHdYoyDYLUYBgXCq7XmfK7IGsKa0JihXdTOso/9aNnWs7dcOnokFF96rRctPLKod6/cL0FITmI29rNReP1v0IVnIrlOWRnnRxE5+TQhXh0Dp4gjbIskkZdxOPoPMQxzMlyFZ7bniYmrhXPmaZhIYsjdBTiUm6isujI2XM9eaRKq2UTqsmrycxDaHIVJvciPIrdQHY6B27JePMZ8vk51oBz1uasDXOIjtSXfkauyGSW3JiflwN2ndjv/RBwh82p/BgkT32YM7FP/wnj+/eeSCSpx8SJvSK7jx/dDebBvLzX0nAM8wB5SYhhmFkASX1dKVnwejR/nf9dw2B0xk/xUPIcOcOsllxctd/PchRmNZdAFaBz4zp1GzeuW6cxGVy5adPKiU2aIKRDTYFTvAf4C40oHH6jEqqDWqLj5pJJrdisK+kBfP3sGsCvUfwaz6+NYDZGcMCqoAgKjlYpGwQyK9zDqu1gXhwt7xZj9vCSuK+Bs1yGsD9klSEC+qyizdMyHpmVIdXEI7MWq5yf1YDYOkuymhMRfAwnv9bxBckD2HYo4nE0NklafToOKlZsn2DbJ1LMvjkrW7ZckX5w97xVLVsun7fPGrBr1ry9e+fM2oPHTyZfT85Mqlm7acvUFvhr7UFuyxa1ajZvkdYM952+Z/jwnQsaTdszbNiedGnSjD175jacvnv3XEtAY3lUY0vl+h3aNAcmo3ZNmxY8In82aN++SeOGn3SA8cFoCJpH4qTdSIc8EJgOZqJXeOycHwOQbIrjcPW3O+k9HLKT+NGRON2A0zmLF3wuQPscAydIagK5xLZKbMSAI87FIfTezrdvpd00xUBTcAZezGutDJVGKtFIQo7sc/yHEqG79rCmDmVSs7kZT9aRk0qmpMcXECLrkMFO7XSFpcWkGEgWkDzlKHJH7cxOHp7/IcbALUJvW5yoN68C7aq5jpwkuyrQIZ6wgvNrQOOQZouxdF6Z3Dv6vLJv4mx6iTrin/Z3st6UQpDK9CmnKmdhpi81B/PMQ7E6nVi1JVpn0krOuxKhFCUYoYq4r0RzKH20lrhzyD08ODwmXAJFxeaDnvAnzj9hstNRwjUdJdTkrQ/Vh3KHECtHz2+VEkIKdBRIdoGEF6kizSa1yWGc+7hNdBmyfbO8fpXyAa/84/XAHh3763AtekGBiXGr/Oz2ly87Du+SuGTi4i2X//zpcI+B0wdsWTwRKYwBWZfEverBKBxFoVLolNmJe7tYjkhwNruG8msUv5a0rx0pdJrIXyEEix050kPRVBeG7uqWJUmi0SsJSQZOvDCVwqoagAis0ySejhAGuWicwMMP+hlUVp7/FsE6M7MUZ7Ixhhvhxgo9aQRccGNRNLjBYwV6E8eD0hStjP8B/llhauy3fAv/LNBXHXLpyOU5tP+LHhlkQYx1W5ky0vnNqzZTL/yC3eAhfkqN+Knl11WrVlFY2d/XRwStBg7Hqpw7KxLtMIeqGZ+hbCbYxPoFWznQFkYkoijtMV0l/lORW3OIwchjyjFCULQE50gIjMk0Crmx9hWcw8GZzIFTkKSnVsaKq+gJzPm6uFMVoaRz2xb0jwmBry5v/IAX3LL6jn15KrfH0le/bwaf+ac1KqsFnvvuPyZZAUpw9jOsp+/pfoze6nicK++ZQ3WuAyfwU6uDPArudXzm6eH1YH7elEHlUQX0zFy6YhxrRWl+OsA1jF+j+bUcv1YQa/UVxwHjQDhW1kFTozWmJJ0k0nbbPOX5W2x2OfDlCdqBj5ZVzzBH/vxxIH8cxN8Twt8Txh9H8MdR/HHJbHNp/tvmsqoITkx6c0zBk9hslXFGgomqh5uk/acudQn+YoAhSAxX4KZnExYeJoZLZ76taWk1Z1fopT/Hve+emvx+/IOzoVunJeXW+rHGb7TGKP8dpOVQ/y3PG/sb6MvgWqR1iWpyaZxOUzZv3Ww9TBqzGzxkr+B0a+Wt7J/1/fljxziiHyGdB0dCBqChZgcem2Jt8RD4EG1tXdE8t/MVi9W5RbNS8XTkhpqjp7rdFdTvZwuWB2fAlaWGViWXYwdITueBFNIo1uTgVoM64Vf4rzty1a+u0C9w3aG9LfM47fx31uc9B5AD1g7HbyMM0Yzncizs7uGMrTMisoiVKe5N4T5MHNitsxARnKWyuM5c+Lbtxq+8ku8hd0OwIcYAu7uHzQd9xGopBj5ZPNhk4RWz8+tQI0nbmhJQQf58qBH+kwZB3te21cN6BE6YmofoTw779u3b74rLWgfNCuzXd9VWR9ybrsd9iPuBfaFXS+AQTBZOXZiHA4Kvhe37dCEDRaFQrUqSP6yuCNjTH5td1D3dhc9fuIbza0mhbo8946qzsGWo6lltAwrxCAkJiQ2pHdIqJDlkRMjUEMduaibrocygr4Kygea0tjMK8ggKCYoNqh2kdMuKsllhsJKjY2q7x0bXjm4VnRw9Inpq9OJoveg5g6xXiYN4dPCLLFExy8vmG0B+OBD0/E9O8Da+UqO0ir02Gz5kvJhgZZn0cIGJhKOhayNhaw7F8KAi/s56GP6Rcvsxrv7wBMHHf0v4cAIbJetJUs96Av/dcBS9iF9RF1xhEsuEkYI3N96MHedM2xwVtnnyLHymZOM/qhFaLRFhVBIh2YX39gizj5qHKejC4g7lJzis2HHox5vgDWFLuHoIPBU6eEVTlLMcbUtMOGp4kXDYr/Vs98bGUBzNyYgTQ6PC4SL9+FOc++WKq3zuXMI36W9UwtYRM3ysvwNBQ4UfaE6CdEB+36zvoe0HPa13XUnrNd2aH1rHayIAUqk1P8uWmwNUj5yQRiUS8Ro8uRZqiIH+Bz2AVbTtJrQPDmkHXvLLxDdTZ36uG0TEnZHnW7nC63zzddcOfjEdXdE2C6OOyCzzRx+fGA83zzhjolHPbqwKeLzcmqykz82DF9yBf5bf4N8eM8nrdJOe3QuYmw5fd5jb4WIHXO37zhc7z+18sZM1l1jetWA1yRFS3LnvrJsZ+fqJ+qDI1WC/6wn9YXQ2CXRqQsUrNkN9kEHD64XD/maEx16Ml0IqeQ9Lcg6eNipn5PQcCct3c6RBpehS+uzU4fN/lbYOIitK53yddRR74xFlbnDGIZA4jiOqgtEks6/KX+vLGcb+PZfErFOPIF2MoERgDbMJGggkmOButru1dhAa+dFoYttGVrDgcGV51zaLjpfwgsmoVfAKleLoScs1+EfK/YND6ItX9BwrOYPLzVm8MJWee/z48ZXBV8jF3Oxb/0iDcULa5BGLJLaHjQCmm7ngKfRDUagSqoxWm/2rVGWy+3MyA7hG82sitDc+JjNRDO8VEk2q/m7NBHV1lFTahCwP0cY0ERv2YomfBxFc8ywRAw+yShMhtlmBCNlouhANZmybJA3Nz7c1+RtMmjGpQbTBkiJZm/LQ1o3Tp27ZUyehUt16g2pj3wOz5+zfSf/YuwdMyCYta9RsYc1NI1+nyZGjl+6c12j63uWj42uDkdigfb0K1trpO3YsbDR99865Sv0ObZtxo/EVN8wIag5+9cXKe2RCoTCjsYpQwEyTEYn9+ZxwQflzQm9zbhVBUOrg40XHXwEzWhceD4UNErTWEj0Ly0sJWmP15OffnvdM7pksmdfO2fe9ecCQWy06lAn5RDI+fWQ45oufnPru83VR++nu/i0WpZD6za72K1WrthnJLFdKf0b5CknIHZVA0Wi3VreH7fmY7/wyv+ZrKFHQoChh7LUnYkpQKDwJ9bAPNeq4Hu0aw/wcBPYxAqsAEwHwZCBC9NHfZsqERLDlZ44Mjirwl2Ow1z4+9jiUnVNwidOvsm4iPa3jTuLKp47SMycOdm2d1KVrq6Su9Gv6irq+ws74zUu8fgWJ2XT6qx0t1585s1WXPGRI79Y9hg7tlbtNdsp9A1GvHNkVEbDWl8sdeE00bzRMzIQSVoaQEWjGxvz0G+SIWRMkzF7gFZmwCmlg+bC8e/L9Wewld87b4JnNUcgYVFcW1TIYACut8lyCI/iP1Jqpw+dOmzVrOPWcN3YhXqA40vl4DF1AAukMPNn6EJ+gDfCxHoiglXDmLJFb8ipifW2qiPkI1Qfs9zI/NS3KD/JDnASUnsHFhsafv4lZTT5OtrsWc/8QnlJRkTHDhfLMURymh8hclOz95bElr2Yvfjdz1oOZkhWNX3tuH128KoUEju4+agPGyzKwtGl+zuKa9PCwFKl0Cn2Kg0YyW6cTeOquKGtQND6b9yNJh/vlKBchrMeXpVCEkIcwLiAGfKZd3mvdAOVzeO95VIIsZ5/Bu7TPnOSfEQLk/DNd4DNdlV3w3q+RC1nGP7NA+4yZf0aASfHPdITP+Cvb4L2XUBhZxD8Tp31mBP+MwFIHbhuCekG0pp7ymu/B3c0GlQ3EwFRZHpwQGSqd82uhE/WRs52hKkKbDHYgZFzRxFGDEM+OU7GEWvzOq7BwHRybpPKB8f7nZ6bOL1F9WAZ2xdEpD5Y/oDn01aRZrHadz3xZnnzmUfyXfmVpSzoqHtIcd+KIt653sdeZnZ+uzcw+3745z3nYkRcgv4LVoodzNFMWE3u1Otn2Gb1Kfl7Rq1fWNcC78Ui59aGsbgX3odMc+TRfe4nc9Su40SXhe1iUzUFki9ezJcS00niMWZwNSxnWF1L93CkkyZolN7K8IV6gk44+u4pcJBdWn7WORpjFaqS/IC4jMaYLIqQuqtuP9JfloNSaDD3H5KuGkLwU5HNANWCdO9lil4uF0umF7A4mJedIjQ8ldfCEH6np/A83cH9cRp4FWQ91ziOQpjt4ke9ynHtpVAWNMeurVuNfxK1kuFa0ZXArUqRZ5jqiT4xZ7yNzhiLYX2LM3vyJGNDjKULRNk/L86MgMZufx9zNTjjEjy/xEINXKFvmen4e6fQQpeETSlHhIInxUdHc/ro79ffFC5+030PvZjyaNu3hIhyxezeOWPRwGv5racqnw0q6u5cfvGniig/dlk4auK+M3r3ksE8nLiWeq62Lt+2khxblrTGuxiiDHsGNMqyr5LUXLjWtG9Gg/dmzW5UNZz9b7B9Rt+mls6yaxEHajOzSGZER1TITnv1sk+cgoOwgxCFELtzswDpKAWo60bNSfqTbiBcf2lO3llfZyHnkK3OtTn6lK25LyjxkOOG6QX712VnjEefDTIPsi7FslD6AFGVQqtlDxfx5MAsRwabKNSaeH+MAj7l2KOCh+cT2KsJv5KfRGmkO/SCRycxPwPgxQ7oMjBjjskswmTR3VBgkI+gZPedHX+0bO7Num+brG7ae2bfflNYNVye1qzs7NnZq3XZJqxu2nt2334zWDdc3b1N3Zqy0qGJlEtYyJO3HQSHNI0jd6lfgeURz/rxlGDxHGC1BU6W/5LPIgGAADPak0myn0/MrnHbudnV4eAqOMzfpYc+CJZEYCjdmbYbqYfFZ708d2i0Th6bRnsQjfVjvE/TGZLwP93lYc8elu5ef1zx4+S7sydWRt7RQHoz6M2Y+NL82qrIW6fHBvI3WnfDXqfDXe/yvYcJf71t3IoJYue+nsKYV5Igqm3VOzlyHs6uiUmRh65BaDI7fMR8UxuEYSwYD/vQcnkGnnqdp+LfnL58BaibaWop8j7+jpWkp/D073bagvfi4omcRKFjfh5Ce3ct6RFBvMoXUlKvwiHAlM3LgioMiFpcQ44nwJqKBdWWeKqaVL0IbNuCaGzaQKQzvgo8ijBrk9cedsQ45MB4cuYAHx5Qfpj0/tYl0Cbdd02L0pD5J3Y6qNaJlE6wuEwpAY82OqifLsRCdy7ebMNtwoZiyKMCYREJavkVBHpWPaDw52lEkxHEvRE0CuoUGPeEe6VBo4Ynt2/GgM3NaLUuKnDdqeJ/bt0n/nBwp/fOmUw51DfO/FNuzZ/3PLSlyVbXavVwW2uEDOpGXTeYYD6uFiVFRcSMV8She4gHk5qFlDjoL8xkGASTlgmpeFKbPK8CGXaVf03N37uSA4N+fS8H1c5Raboe7gJAgdc8vz8Z+CECEyapbBrKWRGXRYbN3ufJaTZ/S2UKg3Eay/Cdl4EmZQFvdXCSi/Ng4lYQnJbV2qgU885+Uhiel2ZNQEVwMfllsv4GxEyWw6LAVbqPG0KJjCKPIx/Hm9u0XP6/dWFcy/gAeo41o1JzRbERz6AL5Gz6ovT8/53XS4bNkcXCldD7ACBf0WjTaZTaULCXmBvIOErtO7AaRZIVbMvlPouFJtIdgBhedyLZKg33XGIWuYRp/FIu8fLSP1HnCY2+FfST2jzpx1HlEF9j0jDqBtBnFewbBfO9ER+mfKQeQK/KHGZWIaqB6qAlKQp+gzqg76oX6oUFoGBqHUlAamo7S0Ty0CF80e2Qs1k4wxB2uAfway6/V+bUmvzbk16b82opfO/BrF37tya+9+bU/vw7l1xH8Op5fJ/HrFH6dya9z+HUBzPYaql7VEPq5IbOwJteXyphTJ8JlwjS4TK0CF6eGNbhRoh2yqoMv00k7aMzD3dRkseGQ99nK2caWaTVcs2WCnIVjONLmqbvGXwwrnClF5WOyKtn8tYZH5uBsaBc0EHojq5ZL4Z/6ZmcOzIbGsr6qwskbG3pkNbJ5A/QPdFRT9npmcnZm1+zMjtmZzbIz63tktuQbSmubH2rkkdmDpwePs3lxAu+uiR6Zs7IzU3mnTfbInJudOZV1XeY0j8yFXH/j6pvqUDEZPDlugdd1DseqAa2ZA1jNGWOpLfwpuALh9GVUTBBEAK+UMZKhRuOxkVeBNjDVWrthm8cGFe0cjvN9WHCLtHksJU7r028qSRvQdyqpd7zXqHYVK2XTjKZ1ajdtWrd2E+lo14FtOg7tNqBUwvtzI88pJb8e/m4ojj+nPMMJwy1d0/r3uoJ9rF2w0doVexOnwsfHu42rWr2b5Z+R/J8+bDj/h2/1mjih+9geqRO6089IZJMW7UJcG5Zbhxs3aNmywQh2wUk0vWW31m27JJS1XMLVLo8ceZme1wXjEmN27x4D+VWWQ7vbtpGlpmP4v/eV1e+XzrUqFUS/taR9sBjfp6l3SEFdrbf13zuMRhIKRCEoAtZac85EFqkds7CLav6QEILU6CL3iWkBNbMr0spxqA5ss172ZtqFn7daU8FRUioBXlCrGaeHaLY6ljoIYIcbefCL3WRf6ZSljqW+7B4U0bTrzhWLN5MrpGqZKpW7dYm5fPlyM1kmsqxrY6lgqSBd/6dqVd/o2U2nrpo/Ja5S7Uo9qtfp2rzLHmtz2WmjjDDLLyJmKQSZUBezg6+fWLPM3w4vlOVj48IhPoj7P9zZHZu4DsSWUsWd/dHI7xhYKB6LpZmN3u4klJit63GJkQmVqtY9unt2xvpBvRbg0ZOx0r9e6fi6CWPWTB09uF+HkWrmOiGSAelQRRur298+AKNopINZEhELiurjI+MIOXIJDzeQqrFLxzNtvlnea7IHWu4KbW9slnjbmd7uYetD8bdnU3Yq4gk1Fj7V1mKBczMaaA7BtwcKOdmzcfHSTRuXLN58bOwoafxwGdfctGfPxtUbDuzf6LJ70+HdaxFGiSDRbonNq+nmoMgoEevvb6dlmZHJlW96CFDVrVAyIiMPTUWL0WYkdWPON53NaDghnVbnL8LmVa8IPnIMU0E+gvuEZS4OmFZyuzAzDsKsLq1nJtSMrXN0+/SMbbNXZGXM3nu0QfVaNdK74ps9wwGK0Tt14sDxcaUWDUqbMjIqPrF0X4wIikeInJSMyAm5oaY2Kqa/fSVk7ChrWRmECDEe7mODCs2sWWZX/i4NyACGRTRmuAU96dGjxzG61hEPPUHnH3XDVVdt2zYRv6eRL31Y/AL6+gDI4A+xW9eAQBH76y8SCnEfmWTTR3riqiamZfnavKr4cvoY0fFp9jSoKVy+BjVpyQC7qL4QWwbYYK2j9b0q4Wd0n3fNRjMWbFswbT85oowaW69uvXg8Ba9cuTwgPWXCmpm920yuXL8kIqgFyH9ECkMGFASeJu/gEE1/dLG1ZvyLRPs9bHy0to5sbyKUuvQX5jRwqNhIzCe3xOxNbz4LSMUlc10bDR47e1f6sr1//7qyXF33KfH1pbA1PXo1WJQyfs3OdRVu/kE7RJgiljRMGIMQZrgG3vc6FCesZtFdyYsT2AiLZEUdZhzO/DXkAN1/DrelzckEss/ajkxZiaSCNW3gzAhrzHq+itSqsqpPxSY252/PqRemV8tHhMX4Hpoatjhsc5jU7fNWYclhwCCAwjzYXe2wVmGstH3YPXiW5We7HYaxDQRq6YWpvyh0qSfEAIQuLVxMlRKj1N0CUn8Zbs7bx1ApjIdDyKqRM7csWvDpzJHrpk1fRx/G164zqHbtVefikiuQOmMSa0wdlDJx8NQaiWMGjhtnvRfXOTa2cxze+8kn0bGxbH9rmPeWbON9EcyqhoaEajPEwdbC8LeHgBAPh/ysbs4XYNMIIrbJwX6a8OaoSgjLfoIQR0J0xURtE/H2wY/rdk6bvWfm/K3kzj1DxsTeLcPrVoqrUx0nVJk3ecKnO1ZV+/5HvKzNvkoNGtdpWSWR5xQuJrOlcrZeO/uEXamctTfZQGbvQfCelXJjslW3gsc/AlArzs3il8383Xob2lV+PqvHdW13d+icGFQLJaEeaDjSMy4qUDH9YL/35QtZIGeFwLHeBhaaqG6DvH34+O+vV0wf1rL5kIFJrQf3rhQZERsbEVlJt+LMry379G3RtHevZpEVKkRGx8Ux/gCElFju/eyEimd0KLbOP6xbc/B/qutP6u2zWObjfZxyLUSlXFMybRjXlssD8W5dmf+EONeHwyDjqBm1CP62va5M26Gp6bM6HWIzbqx8S0K6NOSKPFF37tfVZYOQtZ3ddcG6GF0tXZJO6cahiAU0wzZxJB0Pj3hqyj0MjVuwW4xbLbcktx5uw91gaDzZ2ewHU9UXBBFOosg4U7iEDq5ckZXVvEmj5nT5l6OmKlk9U1N6V6pevdK1rxCxbJCP0+90C5ABmdA4G9lcC2XrodMx6Vjs3ZGJk+XqIBz0Hg6C786g4Z1SwTz3re3o7hPsE+NTy0fupup2h2p5J3n38IYdxN07GELpmsx8MUSzWcQlj4Y5Rb/r0bDyjFLBpfv3aFh2UekSZeecPbRQmd58YMOKkYHNhjasEPnsFiIoRX4sz9ctRjrkhLrwFnA2ZG0mO+bPZJm3gUBHwRI2y5K6w8NTXYxvYes4pviQuz5YH6OXujFnjxO8xYl3bZwSHq1nJdfC8YYtOPzWpk23pbhff9ig/PZh0SK8m75m/CzN5Z+krroZNtLI8AVyjG9B7oXEgwI4v6Md8zta7mYmkk5TtlRvqR4+ooePOKgxdRDMKdgpxklincZkiQSRpDip6+1Nm27h8C109obvf5F/WrToQ1fszOfdY9lJdwVkMaKenCdayv64RLzLmCxKsBKj1FK4LIoWteN9ok5Gs4OenfBZbjqb4i8O7HgvkMjE6dPCE9XiNnqp6+nPzKexz7Ej+lqVp+nnLmhSGcuPt279MGay4lui5sBOzRLr6KshVVrouRsgrT/K+F9Lq/A4A+sl+EMtpySnHk7DneRuXGy2aFyDXWNca7kmufZwHe4Ki8aJw2s9OLOat05ARZpsnnoztF5B2xI/MlO1BpZedrRTjQqTIgJKde5UvfSUKP+y8uNFi57frdmjbtkA39rJdcoF8jZ++/9uJ+Ay/+tO4MG2Cr9MT3En0NaT7U7Q99DuqUpm/kbwzVdq/98mb/QOIFugNnP5wINsfDXU0ifpi8qm12RjD7hUmgHn7ubN5onRxUaB5s6IIoKJ04W8Obhk6cH9reo3aHHXoXGtpfqNm1rWx0pmL0hvqFSlapzfOGLyT0huVT+mqgNnP2lGFpI9ymFJj88hRFYjgx3NvgeMnoovXw348v0avnx1UXy59r4k+L4D/H1f8/d9LALaAt5zRDkK77mofZfoKPfWviuBrNa+6xJ/X5HIqCD/Zf4ePzuQlF8229+DtW9sSDLINv7uK9ovC0cjn6vqWGaTt7o7yAWFoLTi5pmjOM8APeViM884OLG2q4pOrGVIMvQw6Pgs48E1Fnr1dxDq3peweeqvIRU5cEEbbcNHFhB5m0l/zTzYvGHjpot7NKo8rXRw6QE9G8TMKRtUVsnsO2lS3/iq1eOwe7PBjSpGBrQY0qhihJrvsxYnoS9UDUjW0BbqxqpFAZJycuhaEoBwXiZthhehazCzYwryatxsaoGx2JiT6Njmkxqi+57e+kJaHrxoRJcVDSu7RdRIvUbfXuyV5HnBxYyVvLw84NnEy+SqRIfWI1T0OWOBxtPlqkiHFvK/59Ku/HkUew6vfnrTSXyXbV4d4Xl1iOS9RUj+W8nkKJZZZg+1ppUHgzeKE0tE5UhIUfM0zNcl3M1cS8IjzcPZJZhdNrHX3CU8KovohcQCJAblFBGMKgGmiTtxNbAWrx0ks3KX+fgUeGQ+dgwfOI3LfLqdXj9f69G2K7e/OZf1iCzYQ1L20XNXm1ynF/aQ/6e864Cvqsj6Z257CSUVEwKPGkjBAEKQAJJIAOlNkGYDuwYLRdpKs9CbsthgJQYE1qAYYpfPpVoWI9KxRHrbpRMNKLx7v7lnJidvcl9+u3y9bBHv4f/+99yp55w5MzPPzgpc6HL2d7v//4MvZM4eACMO7xcfd/33i/8TV4tH/sOrxROjQ14tnq6NOhl0s/iWLSUnja/sgHKz+Ff5CxfK9aQCrKU+UPnhyIWRImMmUqqonDlo8Yla3UpXDXUT6kSLbcLp+qffXd29284ynrfbfafHXDunx+SzlKIi+3tgzinnjDbdzAY/X5sDuQufzuLwVzykvDZaXbXVnFnDlYiEU2k0xnNrwKeszkarZVlb7oPAw39wg4i6/0HGe9m7GzZ8/32LW5vc6G552LWrsNDMtn/7YGW+XZKVgfscWFz+yg+Yz+3nMQBmR19rLQkaA3BRZ5bIWkNsBR+oGt504EWPZZsRrXaQ6go6g9DLYEsI7kgFnUbolfAFy4BwHGHjFIxGmBw4xxnjKjDGFBfU5jVK+MWEX8GGsBy5BhtVXHBDMGqdQIGPfcvuZX4uf9hub5w2t3J5siuHieyvzlXHwXsOevkyuTxVlBmcYpkQq+RFUSl40GPZzBDoCAWdRehlMCsEOkpBhxM6B97n6LgK6NjiAj9+qfM1R72JujQVmjuvIru6GcWU7CsAtMlB6LFwM6LVfW6WQDuuVfAH1FyglzkZIbjDJHoDR09HzQU6x7kfNVfRVYvRoBFfasZj62gpW8c50TpMvi1I6vuwc8asi60zXbbldtje1FTi+l60rJcfEK0e5dJAQWcQehn8GII7UUGnEXolFLMMD3dDBa0ROoeZ2KpV7qTiguaiLCY7Z4zPUfO28jujWWuPVRmD7F70WFbA0WI/ZKyCySDMMlgXgvEGBa0ROgeKUV8VXbO4oIHQ1wdg7EMNMqkHEDvlblWV7Hc6Z/SrFnD0bbJ3vQvA0Woq+41etOTuxdHheFRSmoJhEmPBst5evmbBWLOUsCv7Mg+2qYItImzOBIC4CtgWxQXtsBSkFveSpivgCLTy4JsXF2QE4ychHkclOOWcdL0Eu73+q9GHy7vKUSkTR6UBvFaqYkl0l+WWB+C5faYe6u5Fj2UdsNw4UvQQwjDEYLlle/kaBmPNIsLmPE5lQdjGxQXNxDj0AcfMM3/j6PmI7vz8b8pI4adRCC1T7bEg7NgGHKteQklj0Mcc+7D5O2LFGJToeJhpDFrD0aPMLwid4/Th6DgVHTQGTQTQr2Db6C/axkAG4ejh+AWjuPsVS3WArIOPqA7IxqoUPZYNBJAzXh0FwxCDdTDIy1cvGIv6CezKIUyyJSmIInpjDjwLoMyfok4xo43jx/M2eBk1HCq/5z36HrogW440XvRY1kd8jyVHGsIwxOD39PXy3RCMRW0FNgfzKlRs+ShTze6p78O33yPfHifezpqThohBxnsEY0diRDvXZYwvdn1HsgusY2Q9jIS/sHZe20gZDdbSaDCymyHHoSaK9eInvjwoDWEPRSh8JwQfoqcBhB6LQIMYu7/ZEXfSJHDrPgHP9ylIwOxzddcgXXsSVXGllmYb7pMq+5iZjAIXxuMRePzlwfmbhQlxNcoWgSwLV1bj5SqK3kBvwPg/9NpactbgHl3Tmt3Q/e5hT788JlA0zuY9+n62aje/U7Rfm3tbdI5fkPbkXfPvZ91tfnz6tae0u92vutPur181+kBTaAP5hfFi70x8FJ8IQ+xsSuUPqTHKeqV6YhldbRBvcJ7CqvhHQVW0vCODj7mq6noyHcKrxfhj0mLax/BQXipfptWVvN1m6q2jLZXtREnJogQapaeXL9jiKkx0jfgbKhST7l4dKtZjNKdq9af/vGI7Y+dfvnf4gJyScd9M/ssRPbVJeeGN6za1/vMzZ93jS7ht4mez3/206x0PDegwdOmQDe/aNRcNjqainMfCutxSdO+gLgOEhWGc9vUUliz2jY2sJ4TjNpr65WOD/iv2n64Skyr6T2RzMcIQTy/iWQabOI/HwlIYGTJiX29C7Zd6m8qcSszL2Wp2h4c5KZjZPCCYER0F4R7uxpVonQvf09c3rETX3Oyyb28QZGvvQvs2RbI8wjLl+FKrnMW8y9IgCbq5GPaZwYxrYAFvgTiioL1unSZ7fSQ8z7K9noMyp66lOXVke0PO0HUV+z+R+PJgfQhvIVLhO0F8eU975/MGCnNtYl7OnmRdPMw1FOYDghnRyRCucsvaw9P47P5GLzyv4YXCaH8d785mqsVQvZlGr8JaYjiqpV56VEPNFNUxgauKrmRM1vTcZVNx6HJl/P/6yUC+tv6p8u43M/BHfV2glzZIm2N32Ea9bcYws6DIfhJAgwH2E0ZVPmYlwo18t1e0yEiPdvfWg+foBBpvlYBBoRadIDY6Bw/DhSkJ0a40pfkH9VKap/CF7w0p36Xwy/0XpjB+qH7KU67ofIrD/1hXx6esczdg5SyJgiWhwlEKjS1fhRLgvUUcPEdn6eN1+Xz/iv5791HlJdLvO/uqNfnIXHmg/urH7C8efCbaPVD/k5x0KqCH+1dnsfvbLXcWlJ2srw2aN5kfrB/C582F3BCtOLoSqzR3iLRbqS/ncMQF7O83ylHqLzRK0TZxaun97UFGNeTrKUapDuCxL5MV5hbEnAcXvcyoBzGbJ4g5b4yXOUVhTiXm5ewtdoeHOVlhPiCYEZ0E4R7upmXcgRIe2dwquIGPSuyoPY++/O0yFvYdS4Yp0qJNLR8HzJpYN2myLI+wTMViC45HoIXsc32cXhLNt1K7jFFkATrvA2gv+tLJ81/ptGVZnqiCT6JzOXqSeV7Y6Ihu7PzuMvKIe6TEfOtirNPEONJpybIri2o4n3L0o+ZqZBTouk6gMu/DOcjRD/kSiTvPyQkR1fAFxUBuNw8it0AP8vgfhIZ4ewjLNQuQGyPx5ywuBbs/e9Hcy6W9hRT3LbzB+Vb4apMey8HPuijMwbboCueMlWQWgGD2QTOtI6Dnzu1fzg2cG+V9tKoob8pb3xr0/5uJemOPstbetSVkxxUGbQR+5Z8E2klxDihztT+ovy62O5s18Suby9b3hv0z6tLcaI32Rl8pb2p/LUeDJIwW3CSjTqmeGCP5cDAHQLvf9xJH95PoWuwlpTU15GiLdNENXi6CG9/5hP0nLh9o62yqBciCcohCOepirpO6cLlWxVgDUWrkGWf2eQDaSZz5+wkkm29ck0jKficbIEgH3ne3BfZIhtMWIIOQPxh4jyJfrSnyNZadZq09q2/Vgnsgfkl/ieZ/yj4dW1YKAceMRw1aylIotl9zf2vr+hWMLPSX8mxRCqhBBmmQy3SpgcfKIA0Yecm5OeL9FKdzViJCRwSWlTPcCECUum0AywojY+iBpUt7aS9r57U3Fe92Lfm/I283pP9bW4m0+Ykvj1UPEcVrqPCdQD5Ew+wQ3nxdhftm4l7FHpBRMTWeWNAYvUvJ7hD7KjgYwhevI/1b0W4OYDtoLWt2FOfH7yP7cxKAJmz4QQKDsbNw3OgaFdQHDmDtt5a1/CTWcl9b1z7A2h8k5FAF5eK9GfTeXJhN7/VLzjYA2u8Ww99inX8p30qedw/+tXNQ+wyp/QLBEl7uH/fkNvg21H6wxLQDkJhUhSeDeJbBwhCRSpWRISPO7beAgnVLmJjtbGMOzpIZMq72BiCH3UbfhuUyWMo7O5ddfOA3wotynG0vcvGB84QX8pvsWSE0z4VVVAJpleib2x8EguKdTQPXjAKsvTaSfbz9MpeHBX7TRpvZXD5EyOFr1Kap3ZnwQvu5oLt4O1tbKfEoh2L8WlxfQy3bSC1fo/L1eihhXN9k63mgt7JvzckUIU6jCPFKeF/EvymvkeYTivOUUpxn5e1MiZX7CSuZrWPEPBLeYe1kNDta4VtLfCN7GMoX+D3RcT/x5cGxEO1J1fQEMgv0c954mKqrbzFxr2BdxOoT1zWO1qiQ07qXOFfAMWjloixCEdfNxLUK1zbilBLFlZ54YjWamQ6xroLvASRrrFj5Asbn4NnG53h+Gb+nC7NRofw+DM/FnLRVryb3UQzMoV4XHuRYxar7rWqK3BEWXcPjW9SHm93LkuLc8w6Nz6dPyexb5k20doDf6L74RdaIR4FavnYsM3VohvAgBt7Gqp3Wv73WctES1kr/EhiM59Ghy0Y7rv2jhbVIe4oKeS5KopMy1Eu815lB31BP7l8qiFG3+seLJfkGFT4E4zz4LVzI/9CPlDtGi8wRXxR8WLJmXVZJeVTmvvunbN+ifR7osn2qHn71S8dxrQDrOPa4W6Tt9WfPnESzK56KVYQjxF0SXQVA8RPI9qKVF5c7k1YTK1l5oQgqo+josnhvvKaGwqwJZrnySO2RrBK+xpog2mM/jp+H43+WHNufJ03IjyArpj+AvhFngnslurannxFactcg7uUsh93q4Y4J5jYPILdAaxDujWkr3BnEnQtLcdTmyIIIRVuGjDhqp4OKcEoBfIN9HTniWfE92nrWseKoSnHvbtx6fwH5Zkj0KGAylnyrxDzm5JkNfdM45nmBYYfYNM8Im0aWzHhua9gcPVuib3JsjyWTEhyntrLlergFazdwqX3S9dJRmoozxlq7AbjyCxxdE+VpUt4E5SUALNfqhB6LkDcFjZfFam4ntbSygdtJNYT8MOL5P812KM98UMhru3KnEMC4iPLPJP4Mymc6v2g/Wks4/xb8pvec+s5p8CteCK4PRGH+SYOgmD6fDy3326R1swKfk+i5Fz6nAtU/PmcB+cP4nAZyjZzl4nPTCn/fvOzZysHnFvT38fjcEshqNLfy53R6/x78+1bl8zE+twHqd/icic+p/Plv+Nwern9d/fr78SDntDERa3s94teyfsJGi+VnTMn2M5zPPdUQs0FiEgAq2Hr8TAHDQswmiUkkP6WGxLzNa/g+K03WMG+HkafFTE+j4TSuTZi1nCO+QcR7dUrAX+Gox7p8tsNzNZLxC/BG+BGYH7cAyMo3+vDnAfi8yB5u1MO/H4fPcQD6j/h8JwAwyLK7Gw8ZPfh7cgpjZe6P8kLyU/3eUKaMXvKHQgMiMUVJvV0qVkiBX4Sm3Gfj7iKNTWexcfHxGT4rOSk5WdcTmZ6UyG+02fTw/JajD/9q5355c6/UlJQmrZfcVXvKlSts0qqOIztpHY0ejz5t22x7IMXOeiaM6V9Gmb4P2rB6NujV2JTXzM9iebsp4mW9yPyYelOO85RzWslBEKM/zoJlJW9uoJLPebyEo9WCqFVckBjk62BtD5C13VBd6aS6bIWMAlPdKcH6VjI8rKZWS47ZLjBamnNRYhL/bTkxsJTjMzDLZZ0cG59jmcrYSPEGYMKKN7dCMjxcGJ2S6r2jhA7ExUBuHTwkNCJcHt+gHCiqKSeTFTZErHsyW2OmnACe1CgZl5KCr3eIM+SleI3K8lv1+TPtNx/9itU7/tq5WdcWTp80ezG7Y/tw+2/nl9mX/xh46/UXprPxwx/NyZ7814JjI7+bMvrZnGH9Rjz07OqRH+0fu332pFkjvKPZdY4mGEfSj+Hvm2HfkbtqNIttLx8d0QpoLsv6SW9sh3p3W94ifsbY2wFpbf/AMhWLBGsS0f94ZMd6xud13pFe6lYd31YsYwN16G00EpLn4x3XaV7wjuuyJGrg33/kGedpjQrxyd5x3zPOy9VhHLVuA4qK43N3fJ7B8THmD/xrLsiye9UpUVdk6Gu8Y+AkPgbehM934JiHq2NGH/BDb8p3VMxCYq14w40ehpuOYyPD5GAXp6w68KXP9AhN3HgO7vpoYhJus3bXQtveNcE4bozbNvaoXcrCjm0qsY4b4+8eN41NXZvT56H3HmZJTE+4zFIPf3zPhDVrkwveJRsWR+t7xO2MAPopfL4brjtPBaYD6L3NEo4+I+Mpm50Sj90UFuy9Y6kNFtFWAIzkWtAbrjvfRGZyT8ff9ynL5DYeMi/x31+Uvaezc8mjTaSS63CCrPm8Hl5rHvsO+SCtyQfprIWx1p7VhwjFBwHyQTqzHI8PQmgP91htdWj/xsuN6HAABU3fSNwaceew3WS9kN40a0l2rP27JP5mAAXvJ7wnc01menpjr1UU/wmoxDuP95Q4eWb99WusqgW6BVVRA/UaGLmXgOMe0n/ROiDO4rg09fAf9UfhUWKnRdCvFzqX9K9xHcBEG9zUcGx01vEI/pigCH6uc6tzoEIURd5Vo1lsOtCIh2XRQtbMi1QWNBfQrydx9EQsi9sl+k2y7+pLTIz9BI7YMu8WVrM/YGzqTnsUjm0880XI4V3wXXfeLY7niC4WaNbDO56T73sd2XM0upbg6CrQW72jK3F3BjDvxrH7U2Fx2g3NKTgmfYvPUZytxLqmJbEEZHvH6M4ilLwkUbIyX9m5yPE1zR0cX0vg9ePOEYGnA4coFoTv6xn2IB+90foCH9xjCMv3Ybtn+N3mVi5PF3JzBsq72+2MqeYW/nU/uXJ2iC1y3uTy3vYt+lajN5efl/K2Th7yZFGetJDvc97C92ZRpqKQ9+Byrw9T3x7GcW55fB7Sp4oD8C3FmflHMZdpcmZWIusJsrTrAlh348x3TqDZTKdEQfsJrb7rPzVH6/qz168rv1TGGPBLngWKIhj9+PMM+M/NFcFbuq2feHscIr9rM4tUvAE1f3ko/64rRl+uGUbYxbP5LX/XG+I7H2MeX4J+LVtDOLWGHO0Glqmus4h1kyTEy/awgdpDDpvqlCh4v4Lv7pw1pvrisfUjHlawnp45hcodenPtt2ItnRfa98FaolO9ZFZvG4HGUck6TaPSSDjOsr2jkjLO5OE4g5HsYZc9kaqqyngXTsw5TJaLwhxdjBv1iHsDciMeFlK5UB0T/vqz1K8313QY5493LWAWr/rlrCY+49/7LN7K4uX7Y1m7f+b9rKaolzHq21VLbwRHX/TV5NqelNoeZb0EXkbARf4F3nqBbf6Mfgq/zhHsQ712ZEpxQQuBRk8Ga/2ArPU8li1zx6IUe20tWQ8jYwwVIf2hcGLJgZ0s0zNPUP7q9WS7Ent7Yl/FmnvZ3RWJmHL2UtNBdsTDm+DlRzzFXc6h9odl/UVKflpLx3G5oKFsDwD6IWyfvwntHxGtk9buCC29eGuIrwokwYmqAMnQ1PhUvmUzy/L03vrFeM2OsKnNv5ob+O9scH833+gqf/e0U6L8Tsz/BSnlrUt3rSPoBsKWeVWxZd41q0tbZinZMig3OoCP5oL1NBesMU3WXkZE1J0Q0/G3iDEWghUip7iHb10ZD9sFG1gDiFc96nUR4b+gUyFZjT3WJMlqsV3dz0CcZ8YqSBffGYV6riX+3bCV3Yj8NGdJ/ljB7yxBrScS/+4+paH4WwbvvTpA/HtgC4v1zIkRohVJ7QdbbxP7nt4HPOw3Ur8T7PuIfS/X3uR4Nd5QTVhWVOJ5xL63z45Q7K0QjXVO+9sgWexvY7LuQ++Kky2CdqNAkrsbhcl2UemulJgKtbAPzrOb5D42XjYJpL1S8vsmXoVq2FqayvnHy7Tjn2LaURlTWBYx7UdrJiSTL4yY9k+ASphqEtNBuMjae9uAahdZR4jz4DOWp5bSxPxMteSnWkKLTqkl9S1US2TZiV9Ng8rrKY1yK5ZhTEmukXD0N1DFtabsxRidQWsK5QuDbLLNAo89fBvrJHdMVFM8k+n4W4F5HqyQecDpxLMS5rAsyROvWHSlZNGt7MSQRc31i/R9IlhwLHmBpUC8uo62LpL3dd5diPNrHEuQk+3KlGOJYiXKyLuzF7X8kPh3w2zWEvnJAkV+GqucBfjtE4l/d8fSUPxJ5Rkyi3zHiX8PzGK1EK9auDhUSe17Wm8T+57sAx72epSvI8r4Z2Lfy7WvFoo9TrKj7nnEvrfjDq/ucj4RLYdyYCFZ7PtksgWF3v8p2hXlwuJYkg1Mtq5QO7VoV2c0trmmoj3pE1gnmVFplO+5YgFrCkaqBOZBLlUxi+0lbDVlL/K36hPA4vIJ9jLKXxTyu6EKeomLMSKK9iPOkHWkN7wI7TzpnXLt33BssjfXI17MkH7W3hM3UvY+WdORBdHGa2CFyP66D+fKdNm+97EGHguykbANJOfP1iTkxNbdX7ZuJfuroJFAJ6O+a4l9N/zEbvT4JQ2pN6xAjScS++7BpaHYE4Ot7wPEvgd+ZLEe3evLviB0H269Tex7Bh3wsPvJehLs+4h9L9fd9LIrJZNp5RH73sE7vOyy54iap72zkCz2zjLZAkLuoaV2IXe+YdseBAxbh3flmtaQhvDvyMdx8DUZId3N0j2RgtSgNrMeYz6vS/QQAA9340q4O7NWIbhTvNwCDZ+G4G6kcH9C3GvMONbWw32zwj2duNcYS8HycCcq3KnEvZK3+lYe7ibB3GYpcuMscRfzMCeVMfN6zbeaCWbs0Zbs0XON9cafkQPlxhLMmJvMR6vPccRoK+WXED/eXuzm8WCukpB3hPL8qfUCj99ZwtqHyvXCshgqMS+Jfm8JjOSxMjH7Yoms5/2YfaGmOtUuZzRTzDMcvVSiBztnOFq90t9fCXdn1ga51ZN0anm5BRo+QW41FlFb4f6KuNeYtVg3j97JwdzWKOJew0v9kkfvFIW7DXGv5H2yk4fbr+h9BLmxVdx51sNcp4zZnmuJfrtEtooE57KoZTPF+CNyoFxGIX32WxgNxBg7yr+EKPQvI3ElB/1L5OniPEMx+fUCL22m9tJTDlci8dPxtwIzFCzVm5Y8aZJH2EwZElND8clLkQe/O4FJRG0apdYahRaIHV+QzIrYdK0jZ+sErztPQAwUNvezewrr+d3DYPi/iVVSe4mSw3lIw/UhSLSX6Dvwi0uFnJ1A+QKOP4f4wxL/nYiIcPwh4xb0kAX+S5Qv5fgMxK+Tch/Kp3N8b+Q/I+RwBuVxdifzX9yZmfWS/Gedt93dDHYXY647M7PekudX552gHHMLXLzm7ADAm2NiwQ+j5Pogt4KUXCT1ctjC2Kgq4so99QgZIdWay5sqY/FgL/eMS/Xu2BvUS2BvcO9FwSvbys6T0aPlzW3aE4dYkzfPTbJPnw/s3rgxcOgQS522cN4ko+vWJ7dNL7qiGV3zN2wIfGXHzB3z5DTt/9rXMOeCWPWG6tATKj/KsrB6mDgE23NeTnVcVFIv+wk6LAePytHml15bs0b/U2B4qZYbuE/LzdceKbIfAuYcAXBbXIW3+/+9b29Ab+f/1abaVy6tWKF9bTdhYWyn3ZztzGcbtl51v/4ogNmZf30NGOf5erUySRn1QqgIoVmEssWw0CekvubK7ao+PCnRcOu6MIZF0JGfshrxxB5x9Ofgd64VFV3bu7fC8Z/GrflffZVfUnYCqLMWwOhuQQXtG3ouTqhc+6jQ2keVae+7Hu3lwaWs9KlLJ09e2rr1MRbJ/HYuW2ifYD/Yycb6/KVL8wOH2TI7OvAhACtb54EIGFxYJdJ9qacSKCbnueIxLMR1fmxHYRVR9Jbbl0hBqVi6vmWvve0P9iMsgfXl/61pPzJDMwLXNCNf1wJ9tMJrNrCy1Sau1YNerZTrgJXCjVFP/lL3pa6zgvp9laqArXkHqmiWqejeLMdVHF5csn25vf5qyZmr9r+8x+zh7M18/aUA05xrTwEry/OAaHgQ1PKh7GulsDyXd0ZXxQKKVsciQ0h9eKJf+I7C6vjsFqAouqAy/Gkme9n+wf7K/tL+kb3y7Bj7OdaIteT/bWQ/P1F7OTBCiwv8XXs5XxsVuKRFBFxXsSzLooLWfs/1LpVrHRFS64gKWkeUa63rUuvYWFfrwS+zJPuX7/fbl1jjOc/Z51m1bdtZhH1uHttvp7LR9gK2P5996t45bHelHEW+lmnBBpwDNQCjBc6ZTXCuK3JG249x+XPaE+YOvQV0Ye9Nh4cf7lC+V7Mn7dUcyz5nPeV+F3VXKeDeSoG5lda/kxHj3dnVmfUKsdeiqndnl0DD++hRqOtkMUrEsAHFl98xxrN0xUeTkc8o4aNVx7XGMxjvEnjm2N7YJ62udMNoSArGKwS+vVyNUdfiC6IFnrnREOTvLvD6r8SvRFsSEW+XAmh1kb+pwGt/l/zqns6CcIE/wvFVzGMYsRD4fU6pgvcTnjxeLJ90qf8Clu71eMm7j3M9XtR/gMRXcWyvz0urKS3dXVPI31rik0KUf0JZponjbh3/APkHyfK5X/LTWp8Suxrl+kbI31byPyT5lTOgKBoV6fpJyD9U4vUQ/IS33wEwNcy63iGysQMnoCzCuQL7SZK01j/F6M4k7vO1xNbZRcq/cS5L/C7Ep0j5YsT35b6gjvhuUv6B5NcJL3YUdRO70wK/EV7sr3zUXgTV4CP3fu5+/L7usiia3GuaJljNJHzbRHuZ7Du95NvyUB46HxGjRrQSPhnAaI15JH0lZgTLVDH8vQdpj6vg/xv0RF9oG+1xFfKJ0FroSXtAqRRl7Gwu7UOVsTOBt3IQ30J+1z5R6lw+EWNnt0v5DxK/hHZ4CnkKWLIcaIcnvnc+4kVvOEjxn52myQYovUHGrm4uj4XuQa+3lSyT0ayjGN3orD7MITQvc8wdEvOGc1meulEnKF5OexFRn89Qn9H2MtqLKMphEMp72Itpz53A75V79ObSnjshn4Str6n9KnlaQr5F7n5bTLvlhLxGecQBy6GtKAejmA2QO7ZqiXiWHFvroO/cTnqOBayTctKQzBo3z3LMncJzrHmlAiKGt9U6qFs7qcN5/MY4exnmm+MvUT4Y5Tfxuj6O+FtknZ5AeQPOU4T4u6S8D8r78bKdh/gsybMJ5f05/0bE3yvlD7hy28/bwIPmfuBtoAuXs1HciBN6DlRWNt9iz8mVzaG0soly+FBkadl30xqIwHeQayD9aQ1EyA3kxzaP+swvb/P/CsDl/scAAAB42n3JAW4cRwwF0RE/q8he3/+GOUikGWWhGLBfAY1P9HVdH9eVf86vvq6qioyVNPfzVgX0qoIGWf+7Vqiu7gAQqKL22aGHJhULpOzpZjokoVPpnplexAXQgsjZMt5nf6qkO9ctBBUZ5Vvg2TMDM75eo3NQZzxnVldoB2CgB2YdGGAXdtiRnZ3XoUWeS7xuI0LL2VHG8fjsdZD7eb52BFrce545I+rYHE6qqPr4uBKn61M6kLZO0mlmXzMM6PTR2R0ETgGQFOxe5+StY/UF0J1H17coxG8A+eQbP9Un3rrlf8mb71LfLZRQFCEigk/5Ct7ylbxjh+axK2LUKBjXZwAEoAkwQIJfwH2G3BqaqqJ3vqIrVO0KgiOvXyCQMxHZBeEM+LO+Ywf/0O9SKflLb/QdLfSA3hOBERFIiRH8EbUrigGibe/ACNR1/QvBqhS/AAAAAQAAAAIjEr5GOXRfDzz1ABkIAAAAAADE8BEuAAAAANUBUuz6JP3VCVwIcwAAAAkAAgAAAAAAAHjaY2BkYGDP+cfDwMCZ/UvlnyNnDFAEBTA/AAB3DAWZeNo0lQO0ZEkQRG/Xy6rXH2uPPf1np3ds27Zt2za+dnuMtW3btm3b7I3F9DlxspAVicjzOtrJRP7/Jf4SBFedYreXSfYeY033/h0m+PIMTgynv3uMte45UtE2ytoiOibuo5w7hy6uJVuiWjj5TxMuEfoJfYSGwjphkdBJmCqMchVZn/iYM+w42thySq0Wa6MPaBmnGOEHcLzPJ+ObMdk3J2ObhUnaz2e6v5qMa8/5No+0z9P5QDJxQndXCZvlXx5Z5f2X7l6gu70uvyas8mmOj3Op64+lwN4htmfp6+qxMRrKibL50QwaRQeJXIZ64hxu61hpdZX/RqEHA9xLpG0b/RV3mctjlUtkb7S0bB47w0/yXcAyK5Kv3tkO+rhnZCvTw11K0uazJPqRk/13VLZAxehD8mX7u6tp6hxXyZb1/VjkKrDZVjHRbmS0P8Qoa0te4g+22i8MjzYxKnRkSFRKYfQeQ2wWa/7dv86BKJc11p0x7idaCk3cAeba7ZwZfUkn9arIHcssna+NLmaJ3o7yzzAsnE7fMIQp6nn7eFP2J+tIL79R2j1Gxj5ma7iXrnYxU6yUDrZVde1hvX1JH38NFV0Zim0vRTaRKq4Plf1ZlMhndXwDE+PmjHD57PBb6eeeyX7gtzPUDuvdBayy71jiaqhvLRkWfUQmuob50RvKf6Vqz2Odu46lrhcF0SssjyrSzc1kPfxRBH+Oll0g21o2X7acG8VD4pniVJ/m8IC/m9P8cs1OUypZCTP9tRyQ7eK/pru/jI5+BDOk5WB7iN12tHy2MtDGak7KMM6Uu53LAncZl9p0TrYTpMH3pHW+1ppI8xIhTRv5r/XPiOtR+oQMk+16FtuK7LthHg38X1Txw5ia3Eo6WcyBMIJ6inumT1ISAtXi88T7Et38JWT8paR9Ls3CGPXlV/lsoyg+wN74V/aGMpwaflU9MSW+LzPigZxjPyvfVYywYoqj4Wyyn6gZFlPBTqaXdNhss6XHfiqHSHaP9jrTvFX1z6vG57WfzJhQxObwBav9KVQMc+Q3VWhJv7CRUptLTZuXfV37geFZKoQP9GZb9isTT9xNs9BH8zQl+06cUn4JNvt8yqkXuXF7rgiNORS+VF8+Yn1Ofc5XDcVWiVT0jXqynDGm2fFlONbU8yP7uJM4O7LwCLfuJ2t+R1qWWdJ38v9arxAuhN+qCb1CLfWtrPJSHv4E9E1gpbQqjs6Vdt9xQDFXJ8txcnieCv4J7X+j2NemxC6nKOyioeavVUiJ4yjV9IzsZfLvIp1+ZLW4pyj2ON+MAutMxbie9JlLDf8bRfYGY/xC1toCFvrNbAzVpOP92cd9ZXEvFXdKvuWp7K9WzK3iaiTuMoqxmkxYqhy20s8uYoQwyh6mYXS1/KcozkIq+pj+4VumhjcZHQbQ0qeoYyvoaq3Vm7toHw7RNv5TPIdZ4k3vazNIeVdWvI5+EOtCN3G1pnJUW/mfCMkCOGLdrUIuJEaCrQFXFxLnCQDPCoA7ly5O8AXSsC7r9P2LEvcwIXEHDRJPUT9xCd2jE5kZlaVtlKS+jaKt7WOke5yt0W9s9xexPfEIw+OL6e7mM9NNY6A40u4nGkUjmWY3au7mai5vYW/yLNWR0nqndNvJaP8jla0hKTtP9YzWjKwi5T9gbvQePZNnaPZzmOVPZLf6OUz90VwyIpzHUCtlvN/NRfaqctnAYbuOFslOjHbp7NVWxKR//0uOo6XVkmb5VHMjONftVU3f0sku4VS7g3RcVRAAknUZlmzEyP+/nWuFHkIToZHQR+glNP7/vHN0KyXuOnZLqwPOk9H8LYI/Dlkeyy3v787LGlhrKIjCeSHBrcHp6WnQBnd3atzdKXGrcXd3qChxhxa3DnfIsl/mPzP/3JkA7xU7J373rp0T6+s4F+M6xntF3+J+xWlfu6GdYC7m1sK5t4X9BOFiuDUdaV+xZIM9gM/ig/YGjiwyeBPOLLe4s12BNx2vu10SX4YGV5YbXAkfFhkcCT+WW9zczsARjufdDosbQ4MXyw1exNgD3w6RfbFeIbbPe28A+8WPfyF6Ak4vQrQGfO/xOu372O540/Gi42NHj2PUxHkrctxa/XS02+ttKbqEPKJN0AfoE39mdQmHgd5za3N8Ha0lD8QnxGS27SUfxClEtA36ooQ6b4veQXP8E6khdEk53o1qkm/y8L+InkLTUCPkTboKbRMiGgNNgcbIOYGcLs9ep8ezd3Hn7GO6yfanXbOn6XQ7FR+yFdKA5IpvSPcR11Dv4T9ro+2obY7hevidmQyvw91oFuKHNkKPocV8rRvc4zoIr7MmmoJ4sSbfJK/0POvD3fKP53geXscv/MQv9Ae+UZv4h2/UMHUHr7KeNCaxwxfuwe/kCI1J76Az4XeeUbyFYfzR5+h259INXoMnmeP4hD5VD8lX+ZFro6viaHtfc3Y0oNbkaBxaBX2h3mINOJx4oGXQHxyHPao8q8fgP/Qepvf0bfzAB6HqWzpBiA5CqxB39hki+gmNg25C26DZC2YI2DAZapt0XlX894yxh0kfW190n9gxIx2ZCwsKeh1slay33UX3pa//iUHvSo//C1VbITpvD6Cu0ZmKP71A/UojMTvTGnYHS+bau2qj7Vna0Z4nXe2Y6invC2qfXh0bxegQzV/NwlLM63nsenrsKnxefImbZ89KMWicZFHr+I5N873N9L01SB5nR+hN+gtOoB6Emumaz8GcXqB+0dqaMf4tzdtZ4RzV/yUzRaje1PxLb2Qtw9rx/C/4A9xFoiAAAHjaPMEDbCQAAACws23btu3wbdu2bdu2bdvmbNtGuBYAAAzvegjwBhgCvgQNATWDKeAAeBr4JPg9uBgChCggfshuyEsoBboe+hlmhh2GfYAn4Lfgz+Cf4MUIEsKI2I+MIdcha1Bx1A7ULzQKPQl9Af0a3YjxY0ZhHmMasb2wx3AA3EDcB1wt3owfjb+FbyfoCeMJWwinCR8JVUQMUUu8SsKTRpNeku3kFeQ2ipcyj/KKiqJKqTuoyTQlbSutgq6lH6YXMvSMYYwrjHqmnTmdeYv5kYVh9WBtY1Wz+7EfcNgcF+cfF8m9zNPwHLy+fARfxB/JP8tvFkwRbBFkCNFCjXCkcIcwVVgoAok4IpvouBgmjoifS0iSZdKA9IGMKFsty5UPlz+TJyvkihmKa0q4cpSySLVWdU/NUa9WV2v6aS5r4VqH9rD2l7ZFB9aZdH10W3WPdB16i36B/oD+gf6lvsYgNQQNAw3HDecN3wxtxvnGs8ZCE93U2/TBLDZvsYAssyxnrRzrIWu9LWC7bcu2u+2X7e2O/o67Tqyzp3Ons8PV03XLrXEvdld7+njeeD3emz6IL+g76Gvwj/LnBDiBsYErQX6wT3Bv8HeIG5oXSg0rw8cjgsiiSG60e3Re9EvMFXsYq4lH4pvjfxOdfMEzABtRAADQ2na71Fbm2m1sm//CQ5wc49xdbds2p9q27S61sQ99TzDJPokTthNKhFOEZ0UtRT7RKXEbcUn8R2KUXJGOke6T9ZVNkZ2W95Oz8g+KtOKHcpJyrqq2ClU9VevUDzV+bUPtYl0TXVJ3SF9bD+tvGOYb1cZzJqlppemLeYB5khk3zzCvs+CW19a61i7WqvWRTWljbBvsNe1Su9HutaN2wn7F0cuRdJxz3HI8c453znJ+dIldd92QO+am3Sc8jT3tPd09Cc8xbwNv2vvNZ/Jt9R30nQC9QA5MAQvAGrAD6gQR0C3oJfTVX8ffwu/wnwqoAseCguC84K9QIHQ9PDS8PlI3YohsjPyCYzAN8/DB/zwCn4GvwQ/gL0gnZBhiQbJIGZmJHEfrogDl0LnoWvQ0tgDbg13GnmHfoqOjx2JQ7HO8Vvx0QpDYlgTJ8ylhakW6VXp7pnVmQ7ZBNpQtZZdlD2Sv4qNxCF+O78PfETRxhBxHFsiZ5AryDvmSakcNpmZSr+gC04JpkTuaH5in8xvyHwqgsL7YsAiKs0qdSnhpZulFWVBWl5dXalWElamV51VDdQ1bk23L9mWHsnLWyaZYnv3FtebGcRJOw1k4wMH/JrmXvJE/yP+e7J6c+UsQPACAjQMAAHzMtm3btm3btm3VbdQkDWbbtm3btrc7wzGWGtuN88Yj453xy0xh5jerme3MoeYcMzK3mMfMu+YXK5GV06potbB6WROtwFppHbAuWS/sf+00dhG7gl3H7mwPtWfb3N5oH7fv2d+ceE5Wp7hT12nnDHPmOqGzzjnqXHfeuXHctG4Rt7a73mvl9fHGeY63xNvtXfKeeF/9eH46v6hfzW/rD/Zn+SxIECwKdgangofBd5AU5AaVQEvQFQwH8wAFG8AhcBN8gPFgVlgAloaNYDvYC06EPhRwJTwAr8PH8D2KjTKgPKgEqo86or5oJFqAGFqPjqHr6B2Og7PgMrge7oD74BF4FoZ4Gd6Bz+On+CP5hyQgaUg+Up7UJs1JZ9KfTCMmWUR2kFPkAfkeJg1zhKXDxmG3cB/NQcvTZrQvnUwhXU0P0Zv0A4vJUrGCrDJrxQayMWwGsxllS9lGtpfdYA/YC/aB/eD/8/g8OU/Ps/P8vDgvz6vz+rw7H88NHvF1fD+/yR/yl/wj/xn1jiZHIFoabY9ORg+jH6KfGCbmCVcQsU4cFWfFVXFXPBV/ZGyZWKaWmWVuWViWlpVlbdlY9pKD5Ch5Ql6QN+R7FVclVWlVUVVWNVG91ETlqxVqv7qu3uu4OrMurpvpTnqIHqMtLfUqvU2f1U/034LgAcqOGAAAYG3btm3btm3btm039t9NUj/Utm3bvpv5D9KCrCAvqAragp5gKJgI5oKVYCuAQAIHzoIn4A2MBTPCkrABbAE7wOFwLtwKITwIr8K3KA7KjEqhBqgHmoBWIIIM2osuohcoCqfDBXBF3BIPwDPwBmzwCfwER5H4JDXJTkqS2qQLGU2WkN3kALlMXtOYNAstRxvSznQYnUFXU0gP0av0A0vE0rFcrAyrxzqwgWwW28gCdoo9Yj95Cp6f1+Jd+DA+gy/hGzjghp/gt/gnkUDkEOVFc9FPTBNrhRGnxSPxUyaX+WRV2UYOljPlUrlRQhmRR+Q1+VbFVplUSdVAdVfj1BK1QQFl1EF1Xj1Un3VsnVUX1GV1Td1Ud9R99Ug9Vc/Vb01rs8pcjpSMrIzcDQoH84IHwYvgS/AvTB7mDCuEzcP+4fRwfajDE+GD8IdNbvPb6ra9HW4n2/l2td1uud1jT9vr9rH96uK5VC6bK+TKuVqumevk+rlpboXb5ZTb7467y+6+e+3++eQ+hy/iK/g6voXv4gf4MX6GX+I3eOBNND3Rtz4AAAABAAAD4ACPABYATgAFAAEAAAAAAA4AAAIAAjAABgABeNpiYGDgYEhjYGZgZOEEsuOAGMJmZJAC8iBsJgY+hgoomxlJnAWJzcqgxtAGZbMBxddA2ECdIQzHAFXOQ3ZEARQE0LuUv4DYmMS2xlHb7t59ahKdemY51NE101dTUTVUWLFkOSic6gQVTSWFc20fFhT2NYPCw8/WQDIlg2jfOPbTQiod79FhtHAtVTUjLZlVSdT0pu9FKXagpqMtDCxYtmrT7g+fzX/X5v9dC4Oga8diMBFY8KYb/Ui3lKyjr5JuUy21krZwjS66cu7QsRuPsfPy3dIXKA819AAAAHjaY2BmAIP/WQwpDFgAACofAdEAeNo9zkN6REEUhuGqtm1bsW07mcbGJMYkzjzYSNBcRpbSS+g+f2vyPl+dewu/qrpfVseSXCOo40ktJ3Pa3uawU8dkdSzHuxtDDj1lTrA43Bo0o4TTfY1+E0pUm4mbY16LBiXZWxlqcKKkw+2VvbK12d64HSV/21/sDaIUd7vznX6U8utuvTxT3W7PdbpR6vqQy6RCaca66rwGKpbUaaT0WN/Ew4ltPPls4lfJX7Bs4tfJZzDkouUWeAJNLpotgTPwAX5AAXhd/CY5BLbAE9D6aNuZD0tUHnh99PMW+AD/oACG8F9TADtAU4IYIopYQFmp",
};

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
const fontsMap = {
    Roboto: {
        normal: 'roboto-all-400-normal.woff',
        bold: 'roboto-all-500-normal.woff',
        italics: 'roboto-all-400-italic.woff',
        bolditalics: 'roboto-all-500-italic.woff'
    },
};
function openReportPdf(report, orientation) {
    createReportPdf(report, orientation).then(pdf => {
        pdf.open();
    });
}
function createReportPdf(report, orientation) {
    return new Promise(resolve => {
        loadReportImages(report).then(images => {
            let width = 595.28 - 40 * 2; // A4 page width - margins
            if (orientation === 'landscape') {
                width = 841.89 - 40 * 2;
            }
            const pdfDef = reportToPdf(report, images, width);
            pdfDef.pageOrientation = orientation;
            resolve(createPdf(pdfDef, undefined, fontsMap, vfsFonts));
        });
    });
}
function reportToPdf(report, images, width) {
    const stack = [];
    if (report.header != null) {
        stack.push(containerToPdf(report.header, images, width));
    }
    if (report.content != null) {
        stack.push(containerToPdf(report.content, images, width));
    }
    if (report.footer != null) {
        stack.push(containerToPdf(report.footer, images, width));
    }
    return { content: { stack } };
}
function containerToPdf(container, images, width) {
    return { stack: container.content.map(w => widgetToPdf(w, images, width)) };
}
const marginBetweenWidgets = 10;
function widgetToPdf(widget, images, width) {
    switch (widget.widget.widgetType) {
        case AjfWidgetType.Layout:
            return layoutToPdf(widget, images, width);
        case AjfWidgetType.PageBreak:
            return { text: '', pageBreak: 'after' };
        case AjfWidgetType.Image:
            return imageToPdf(widget, images, width);
        case AjfWidgetType.Text:
            return textToPdf(widget);
        case AjfWidgetType.Chart:
            const chart = widget;
            const dataUrl = chart.canvasDataUrl == null ? '' : chart.canvasDataUrl();
            if (dataUrl === '') {
                return { text: '[chart with no attached canvas]' };
            }
            return { image: dataUrl, width, margin: [0, 0, 0, marginBetweenWidgets] };
        case AjfWidgetType.Table:
            return tableToPdf(widget);
        case AjfWidgetType.Column:
            const cw = widget;
            return { stack: cw.content.map(w => widgetToPdf(w, images, width)) };
        case AjfWidgetType.Formula:
            const fw = widget;
            return { text: fw.formula, margin: [0, 0, 0, marginBetweenWidgets] };
        default:
            return { text: '' };
    }
}
function layoutToPdf(lw, images, width) {
    const columns = [...lw.widget.columns];
    while (columns.length < lw.content.length) {
        columns.push(1);
    }
    const childWidth = width / (columns.length || 1);
    const children = [];
    for (let i = 0; i < lw.content.length; i++) {
        let child = widgetToPdf(lw.content[i], images, childWidth);
        // Children of Layout widgets are supposed to be Columns. If they aren't,
        // we must wrap them to avoid problems like images having an 'auto' width.
        if (child.stack == null) {
            child = { stack: [child] };
        }
        child.width = columns[i] === -1 ? 'auto' : '*';
        children.push(child);
    }
    return { columns: children };
}
function imageToPdf(image, images, width) {
    if (image.widget.imageType !== AjfImageType.Image) {
        // Can't get icons to work, pdfs with multiple fonts don't seem to be working
        return { text: '' };
    }
    const dataUrl = images[image.url];
    if (dataUrl == null) {
        return { text: '' };
    }
    return { image: dataUrl, width, margin: [0, 0, 0, marginBetweenWidgets] };
}
function textToPdf(tw) {
    const text = {
        text: stripHTML(tw.htmlText),
        margin: [0, 0, 0, marginBetweenWidgets],
    };
    if (tw.htmlText.startsWith('<h1>')) {
        text.fontSize = 20;
        text.margin = [0, 10, 0, marginBetweenWidgets];
    }
    else if (tw.htmlText.startsWith('<h2>')) {
        text.fontSize = 15;
        text.margin = [0, 5, 0, marginBetweenWidgets];
    }
    return text;
}
function tableToPdf(table) {
    if (table.data == null || table.data.length === 0) {
        return { text: '' };
    }
    const body = [];
    for (let i = 0; i < table.data.length; i++) {
        const dataRow = table.data[i];
        const bodyRow = [];
        for (let j = 0; j < dataRow.length; j++) {
            const cell = dataRow[j];
            bodyRow.push({ text: table.dataset[i][j], colSpan: cell.colspan });
            // pdfmake wants placeholder cells after cells with colspan > 1:
            for (let k = 1; k < (cell.colspan || 1); k++) {
                bodyRow.push({ text: '' });
            }
        }
        body.push(bodyRow);
    }
    return { table: { headerRows: 0, body }, margin: [0, 0, 0, marginBetweenWidgets] };
}
function stripHTML(s) {
    return s.replace(/<\/?[^>]+(>|$)/g, '');
}

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

export { AjfAggregationSerializer, AjfAggregationType, AjfBaseWidgetComponent, AjfChartType, AjfDatasetSerializer, AjfGetColumnContentPipe, AjfReportContainerSerializer, AjfReportRenderer, AjfReportSerializer, AjfReportStringIdentifierPipe, AjfReportWidget, AjfReportsModule, AjfWidgetExport, AjfWidgetHost, AjfWidgetSerializer, AjfWidgetService, AjfWidgetType, chartToChartJsType, createAggregation, createReportInstance, createReportPdf, createWidget, createWidgetInstance, openReportPdf, widgetToWidgetInstance };
//# sourceMappingURL=reports.js.map
