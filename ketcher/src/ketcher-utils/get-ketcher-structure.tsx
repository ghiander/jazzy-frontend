import {Ketcher} from "ketcher-react";

export type ExportableKetcherFormat = 'mol' | 'mol2000' | 'mol3000' | 'smiles' | 'smarts' | 'rxn' | 'rxn2000' | 'rxn3000' | 'graph';

export async function getKetcherStructure(ketcher: Ketcher, format: ExportableKetcherFormat) {
    switch (format) {
        case 'mol2000':
        case 'mol': {
            return ketcher.getMolfileAsync('v2000');
        }
        case 'mol3000': {
            return ketcher.getMolfileAsync('v3000');
        }
        case 'smiles': {
            return ketcher.getSmilesAsync();
        }
        case 'smarts': {
            return ketcher.getSmilesAsync(true);
        }
        case 'rxn':
        case 'rxn2000': {
            return ketcher.getRxnAsync('v2000')
        }
        case 'rxn3000': {
            return ketcher.getRxnAsync('v3000')
        }
        case 'graph': {
            return ketcher.getGraphAsync();
        }
    }
}
