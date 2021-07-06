import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { translocoConfig, TranslocoModule, TRANSLOCO_CONFIG, TRANSLOCO_LOADER, TRANSLOCO_MISSING_HANDLER } from '@ngneat/transloco';
export { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { of } from 'rxjs';

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
const en = {
    'Drop your file here or click to select': 'Drop your file here or click to select',
    'Delete': 'Delete',
    'Upload image': 'Upload image',
    'Camera': 'Camera',
    'Save': 'Save',
    'Errors': 'Errors',
    'Drop image': 'Drop image',
    'Drop your image here!': 'Drop your image here!',
    'Edit choices origin': 'Edit choices origin',
    'Close': 'Close',
    'Name': 'Name',
    'Label': 'Label',
    'Add value': 'Add value',
    'Value': 'Value',
    'delete': 'delete',
    'Edit condition': 'Edit condition',
    'Choices': 'Choices',
    'Identifier': 'Identifier',
    'New..': 'New..',
    'Properties': 'Properties',
    'Visibility': 'Visibility',
    'Visible': 'Visible',
    'Always': 'Always',
    'Never': 'Never',
    'Condition...': 'Condition...',
    'Branches': 'Branches',
    'Repetitions': 'Repetitions',
    'Min repetitions': 'Min repetitions',
    'Max repetitions': 'Max repetitions',
    'Field size': 'Field size',
    'Size': 'Size',
    'Hint': 'Hint',
    'Description': 'Description',
    'Default value': 'Default value',
    'Formula': 'Formula',
    'Not empty': 'Not empty',
    'Min value': 'Min value',
    'Max value': 'Max value',
    'Min digits': 'Min digits',
    'Max digits': 'Max digits',
    'Validation': 'Validation',
    'No conditions': 'No conditions',
    'Not empty warning': 'Not empty warning',
    'Warnings': 'Warnings',
    'No warnings': 'No warnings',
    'Go to next slide condition': 'Go to next slide condition',
    'Choices origins': 'Choices origins',
    'Choices filter': 'Choices filter',
    'Force expanded selection': 'Force expanded selection',
    'Force narrow selection': 'Force narrow selection',
    'Trigger selection': 'Trigger selection',
    'No trigger condition': 'No trigger condition',
    'Edit identifier': 'Edit identifier',
    'Show': 'Show',
    'All': 'All',
    'First': 'First',
    'Last': 'Last',
    'Error message': 'Error message',
    'Warning message': 'Warning message',
    'Invalid condition! Please check syntax.': 'Invalid condition! Please check syntax.',
    'Drop here': 'Drop here',
    'Main Data': 'Main Data',
    'Edit': 'Edit',
    'Remove': 'Remove',
    'add dataset': 'add dataset',
    'add data': 'add data',
    'Add Main Data': 'Add Main Data',
    'data': 'data',
    'CSS style': 'CSS style',
    'height': 'height',
    'margin': 'margin',
    'border': 'border',
    'padding': 'padding',
    'content': 'content',
    'margin top': 'margin top',
    'margin right': 'margin right',
    'margin bottom': 'margin bottom',
    'margin left': 'margin left',
    'padding top': 'padding top',
    'padding right': 'padding right',
    'padding bottom': 'padding bottom',
    'padding left': 'padding left',
    'border width': 'border width',
    'border width top': 'border width top',
    'border width right': 'border width right',
    'border width bottom': 'border width bottom',
    'border width left': 'border width left',
    'border radius': 'border radius',
    'border radius top left': 'border radius top left',
    'border radius top right': 'border radius top right',
    'border radius bottom left': 'border radius bottom left',
    'border radius bottom right': 'border radius bottom right',
    'font size': 'font size',
    'Font size': 'Font size',
    'Font style': 'Font style',
    'Normal': 'Normal',
    'Italic': 'Italic',
    'Oblique': 'Oblique',
    'Align': 'Align',
    'Center': 'Center',
    'Left': 'Left',
    'Right': 'Right',
    'properties of': 'properties of',
    'Column': 'Column',
    'Add column': 'Add column',
    'paste a link': 'paste a link',
    'Set image': 'Set image',
    'Choose type of Chart': 'Choose type of Chart',
    'Labels': 'Labels',
    'Border width': 'Border width'
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
const es = {
    'Drop your file here or click to select': 'Suelta tu archivo aquí o haz clic para seleccionar',
    'Delete': 'Borrar',
    'Upload image': 'Cargar imagen',
    'Camera': 'Cámara',
    'Save': 'Ahorrar',
    'Errors': 'Errores',
    'Drop image': 'Soltar imagen',
    'Drop your image here!': '¡Suelta tu imagen aquí!',
    'Edit choices origin': 'Editar origen de opciones',
    'Close': 'Cerca',
    'Name': 'Nombre',
    'Label': 'Etiqueta',
    'Add value': 'Añadir valor',
    'Value': 'Valor',
    'delete': 'Eliminar',
    'Edit condition': 'Editar condición',
    'Choices': 'Elecciones',
    'Identifier': 'Identificar',
    'New..': 'Nuevo..',
    'Properties': 'Propiedades',
    'Visibility': 'Visibilidad',
    'Visible': 'Visible',
    'Always': 'Siempre',
    'Never': 'Nunca',
    'Condition...': 'Condición...',
    'Branches': 'Sucursales',
    'Repetitions': 'Repeticiones',
    'Min repetitions': 'Repeticiones mínimas',
    'Max repetitions': 'Repeticiones máximas',
    'Field size': 'Tamaño del campo',
    'Size': 'Tamaño',
    'Hint': 'Insinuación',
    'Description': 'Descripción',
    'Default value': 'Valor por defecto',
    'Formula': 'Fórmula',
    'Not empty': 'No vacío',
    'Min value': 'Valor min',
    'Max value': 'valor máximo',
    'Min digits': 'Dígitos mínimos',
    'Max digits': 'Dígitos máximos',
    'Validation': 'Validación',
    'No conditions': 'Sin condiciones',
    'Not empty warning': 'Advertencia no vacía',
    'Warnings': 'Advertencias',
    'No warnings': 'Sin advertencias',
    'Go to next slide condition': 'Ir a la siguiente condición de diapositiva',
    'Choices origins': 'Orígenes de las elecciones',
    'Choices filter': 'Filtro de opciones',
    'Force expanded selection': 'Forzar selección ampliada',
    'Force narrow selection': 'Forzar selección estrecha',
    'Trigger selection': 'Selección de gatillo',
    'No trigger condition': 'Sin condición de activación',
    'Edit identifier': 'Editar identificador',
    'Show': 'Show',
    'All': 'Todas',
    'First': 'Primero',
    'Last': 'Último',
    'Error message': 'Mensaje de error',
    'Warning message': 'Mensaje de advertencia',
    'Invalid condition! Please check syntax.': '¡Condición inválida! Compruebe la sintaxis.',
    'Drop here': 'Caer aquí',
    'Main Data': 'Datos principales',
    'Edit': 'Editar',
    'Remove': 'Eliminar',
    'add dataset': 'agregar conjunto de datos',
    'add data': 'agregar datos',
    'Add Main Data': 'Agregar datos principales',
    'data': 'datos',
    'CSS style': 'Estilo CSS',
    'height': 'altura',
    'margin': 'margen',
    'border': 'frontera',
    'padding': 'relleno',
    'content': 'contenido',
    'margin top': 'margen superior',
    'margin right': 'margen derecho',
    'margin bottom': 'margen inferior',
    'margin left': 'margen izquierdo',
    'padding top': 'acolchado superior',
    'padding right': 'acolchado a la derecha',
    'padding bottom': 'fondo acolchado',
    'padding left': 'relleno a la izquierda',
    'border width': 'ancho del borde',
    'border width top': 'ancho del borde superior',
    'border width right': 'ancho del borde derecho',
    'border width bottom': 'ancho del borde inferior',
    'border width left': 'ancho del borde a la izquierda',
    'border radius': 'radio de borde',
    'border radius top left': 'radio del borde arriba a la izquierda',
    'border radius top right': 'radio del borde arriba a la derecha',
    'border radius bottom left': 'radio del borde abajo a la izquierda',
    'border radius bottom right': 'radio del borde abajo a la derecha',
    'font size': 'tamaño de fuente',
    'Font size': 'Tamaño de fuente',
    'Font style': 'Estilo de fuente',
    'Normal': 'Normal',
    'Italic': 'Itálico',
    'Oblique': 'Oblicuo',
    'Align': 'Alinear',
    'Center': 'Centrar',
    'Left': 'Izquierda',
    'Right': 'Derecha',
    'properties of': 'propiedades de',
    'Column': 'Columna',
    'Add column': 'Añadir columna',
    'paste a link': 'pegar un enlace',
    'Set image': 'Establecer imagen',
    'Choose type of Chart': 'Elija el tipo de gráfico',
    'Labels': 'Etiquetas',
    'Border width': 'Ancho del borde'
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
const fr = {
    'Drop your file here or click to select': 'Déposez votre fichier ici ou cliquez pour sélectionner',
    'Delete': 'Effacer',
    'Upload image': 'Télécharger une image',
    'Camera': 'Caméra',
    'Save': 'Sauvegarder',
    'Errors': 'les erreurs',
    'Drop image': 'Déposer l\'image',
    'Drop your image here!': 'Déposez votre image ici !',
    'Edit choices origin': 'Modifier l\'origine des choix',
    'Close': 'Fermer',
    'Name': 'Nom',
    'Label': 'Étiqueter',
    'Add value': 'Ajouter de la valeur',
    'Value': 'Valeur',
    'delete': 'effacer',
    'Edit condition': 'Modifier la condition',
    'Choices': 'Les choix',
    'Identifier': 'Identifier',
    'New..': 'Nouveau..',
    'Properties': 'Propriétés',
    'Visibility': 'Visibilité',
    'Visible': 'Visible',
    'Always': 'Toujours',
    'Never': 'Jamais',
    'Condition...': 'État...',
    'Branches': 'Branches',
    'Repetitions': 'Répétitions',
    'Min repetitions': 'Nombre minimum de répétitions',
    'Max repetitions': 'Nombre maximal de répétitions',
    'Field size': 'Taille du champ',
    'Size': 'Taille',
    'Hint': 'Indice',
    'Description': 'La description',
    'Default value': 'Valeur par défaut',
    'Formula': 'Formule',
    'Not empty': 'Pas vide',
    'Min value': 'Valeur minimale',
    'Max value': 'Valeur max',
    'Min digits': 'Min chiffres',
    'Max digits': 'Nombre maximum de chiffres',
    'Validation': 'Validation',
    'No conditions': 'Aucune condition',
    'Not empty warning': 'Avertissement pas vide',
    'Warnings': 'Mises en garde',
    'No warnings': 'Aucun avertissement',
    'Go to next slide condition': 'Passer à la condition de diapositive suivante',
    'Choices origins': 'Origines des choix',
    'Choices filter': 'Filtre de choix',
    'Force expanded selection': 'Forcer la sélection étendue',
    'Force narrow selection': 'Forcer la sélection étroite',
    'Trigger selection': 'Sélection de déclencheur',
    'No trigger condition': 'Aucune condition de déclenchement',
    'Edit identifier': 'Modifier l\'identifiant',
    'Show': 'Spectacle',
    'All': 'Tout',
    'First': 'D\'abord',
    'Last': 'Durer',
    'Error message': 'Message d\'erreur',
    'Warning message': 'Message d\'alerte',
    'Invalid condition! Please check syntax.': 'État invalide ! Veuillez vérifier la syntaxe.',
    'Drop here': 'Déposer ici',
    'Main Data': 'Donnée principale',
    'Edit': 'Éditer',
    'Remove': 'Supprimer',
    'add dataset': 'ajouter un jeu de données',
    'add data': 'ajouter des données',
    'Add Main Data': 'Ajouter des données principales',
    'data': 'Les données',
    'CSS style': 'Style CSS',
    'height': 'la taille',
    'margin': 'marge',
    'border': 'frontière',
    'padding': 'rembourrage',
    'content': 'contenu',
    'margin top': 'marge supérieure',
    'margin right': 'marge à droite',
    'margin bottom': 'marge inférieure',
    'margin left': 'marge gauche',
    'padding top': 'haut de rembourrage',
    'padding right': 'rembourrage à droite',
    'padding bottom': 'bas de rembourrage',
    'padding left': 'rembourrage à gauche',
    'border width': 'largeur de la bordure',
    'border width top': 'largeur de bordure en haut',
    'border width right': 'largeur de bordure à droite',
    'border width bottom': 'largeur de bordure en bas',
    'border width left': 'largeur de bordure à gauche',
    'border radius': 'rayon de la frontière',
    'border radius top left': 'rayon de la bordure en haut à gauche',
    'border radius top right': 'rayon de la bordure en haut à droite',
    'border radius bottom left': 'rayon de la bordure en bas à gauche',
    'border radius bottom right': 'rayon de la bordure en bas à droite',
    'font size': 'taille de police',
    'Font size': 'Taille de police',
    'Font style': 'Font style',
    'Normal': 'Normal',
    'Italic': 'Italique',
    'Oblique': 'Oblique',
    'Align': 'Aligner',
    'Center': 'Centre',
    'Left': 'La gauche',
    'Right': 'Droite',
    'properties of': 'propriétés de',
    'Column': 'Colonne',
    'Add column': 'Ajouter une colonne',
    'paste a link': 'coller un lien',
    'Set image': 'Définir l\'image',
    'Choose type of Chart': 'Choisissez le type de graphique',
    'Labels': 'Étiquettes',
    'Border width': 'Largeur de la bordure'
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
const it = {
    'Drop your file here or click to select': 'Trascina qui il tuo file o fai clic per selezionare',
    'Delete': 'Elimina',
    'Upload image': 'Carica immagine',
    'Camera': 'telecamera',
    'Save': 'Salva',
    'Errors': 'Errori',
    'Drop image': 'Rilascia immagine',
    'Drop your image here!': 'Lascia qui la tua immagine!',
    'Edit choices origin': 'Modifica origine scelte',
    'Close': 'Chiudi',
    'Name': 'Nome',
    'Label': 'Etichetta',
    'Add value': 'Aggiungere valore',
    'Value': 'Valore',
    'delete': 'Elimina',
    'Edit condition': 'Modifica condizione',
    'Choices': 'scelte',
    'Identifier': 'Identificatori',
    'New..': 'Nuovo..',
    'Properties': 'Proprietà',
    'Visibility': 'Visibilità',
    'Visible': 'Visibile',
    'Always': 'Sempre',
    'Never': 'Mai',
    'Condition...': 'Condizione...',
    'Branches': 'rami',
    'Repetitions': 'ripetizioni',
    'Min repetitions': 'Ripetizioni minime',
    'Max repetitions': 'Ripetizioni massime',
    'Field size': 'Dimensione del campo',
    'Size': 'Dimensione',
    'Hint': 'Suggerimento',
    'Description': 'Descrizione',
    'Default value': 'Valore predefinito',
    'Formula': 'Formula',
    'Not empty': 'Non vuoto',
    'Min value': 'Valore minimo',
    'Max value': 'Valore massimo',
    'Min digits': 'Cifre minime',
    'Max digits': 'Cifre massime',
    'Validation': 'Convalida',
    'No conditions': 'Nessuna condizione',
    'Not empty warning': 'Avviso non vuoto',
    'Warnings': 'Avvertenze',
    'No warnings': 'Nessun avviso',
    'Go to next slide condition': 'Vai alla condizione della diapositiva successiva',
    'Choices origins': 'Origini delle scelte',
    'Choices filter': 'Filtro scelte',
    'Force expanded selection': 'Forza selezione espansa',
    'Force narrow selection': 'Forza selezione stretta',
    'Trigger selection': 'Selezione trigger',
    'No trigger condition': 'Nessuna condizione di trigger',
    'Edit identifier': 'Modifica identificatore',
    'Show': 'Mostrare',
    'All': 'Tutti',
    'First': 'Primo',
    'Last': 'Scorso',
    'Error message': 'Messaggio di errore',
    'Warning message': 'Messaggio di avviso',
    'Invalid condition! Please check syntax.': 'Condizione non valida! Si prega di controllare la sintassi.',
    'Drop here': 'Rilascia qui',
    'Main Data': 'Dati principali',
    'Edit': 'modificare',
    'Remove': 'Rimuovere',
    'add dataset': 'aggiungi set di dati',
    'add data': 'aggiungi dati',
    'Add Main Data': 'Aggiungi dati principali',
    'data': 'dati',
    'CSS style': 'Stile CSS',
    'height': 'altezza',
    'margin': 'margine',
    'border': 'confine',
    'padding': 'imbottitura',
    'content': 'soddisfare',
    'margin top': 'margine superiore',
    'margin right': 'margine destro',
    'margin bottom': 'margine inferiore',
    'margin left': 'margine sinistro',
    'padding top': 'padding superiore',
    'padding right': 'padding a destra',
    'padding bottom': 'padding inferiore',
    'padding left': 'padding a sinistra',
    'border width': 'larghezza del bordo',
    'border width top': 'larghezza del bordo in alto',
    'border width right': 'larghezza del bordo a destra',
    'border width bottom': 'larghezza bordo inferiore',
    'border width left': 'larghezza bordo sinistra',
    'border radius': 'raggio di bordo',
    'border radius top left': 'raggio del bordo in alto a sinistra',
    'border radius top right': 'raggio del bordo in alto a destra',
    'border radius bottom left': 'raggio del bordo in basso a sinistra',
    'border radius bottom right': 'raggio del bordo in basso a destra',
    'font size': 'dimensione del font',
    'Font size': 'Dimensione del font',
    'Font style': 'Stile carattere',
    'Normal': 'Normale',
    'Italic': 'Corsivo',
    'Oblique': 'Obliquo',
    'Align': 'Allineare',
    'Center': 'Centro',
    'Left': 'Sinistra',
    'Right': 'Giusto',
    'properties of': 'proprietà di',
    'Column': 'Colonna',
    'Add column': 'Aggiungi colonna',
    'paste a link': 'incolla un link',
    'Set image': 'Imposta immagine',
    'Choose type of Chart': 'Scegli il tipo di grafico',
    'Labels': 'etichette',
    'Border width': 'Larghezza del bordo'
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
const langs = {
    en,
    es,
    fr,
    it
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
class TranslocoHttpLoader {
    constructor() { }
    getTranslation(lang) {
        const lang$ = of(langs[lang] != null ? langs[lang] : langs['en']);
        return lang$;
    }
}
TranslocoHttpLoader.ɵprov = i0.ɵɵdefineInjectable({ factory: function TranslocoHttpLoader_Factory() { return new TranslocoHttpLoader(); }, token: TranslocoHttpLoader, providedIn: "root" });
TranslocoHttpLoader.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
TranslocoHttpLoader.ctorParameters = () => [];

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
class MissingHandler {
    handle(key) {
        return key;
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
const ɵ0 = translocoConfig({
    availableLangs: ['en', 'es', 'fr', 'it'],
    defaultLang: 'en',
    reRenderOnLangChange: true,
    prodMode: false,
});
class AjfTranslocoModule {
}
AjfTranslocoModule.decorators = [
    { type: NgModule, args: [{
                exports: [TranslocoModule],
                providers: [
                    {
                        provide: TRANSLOCO_CONFIG,
                        useValue: ɵ0
                    },
                    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
                    { provide: TRANSLOCO_MISSING_HANDLER, useClass: MissingHandler }
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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfTranslocoModule, MissingHandler, TranslocoHttpLoader, langs, ɵ0, en as ɵgc_ajf_src_core_transloco_transloco_a, es as ɵgc_ajf_src_core_transloco_transloco_b, fr as ɵgc_ajf_src_core_transloco_transloco_c, it as ɵgc_ajf_src_core_transloco_transloco_d };
//# sourceMappingURL=transloco.js.map
