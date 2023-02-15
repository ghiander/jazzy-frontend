import {Ketcher} from "ketcher-react";
import {useEffect} from "react";
import {ExportableKetcherFormat, getKetcherStructure} from "../get-ketcher-structure";

export function useSketcherChangeListener(ketcher: Ketcher | undefined, onStructureChange?: (data: string) => void, format: ExportableKetcherFormat = 'mol') {
    useEffect(() => {
        if (ketcher && onStructureChange) {
            // pull the structure out __almost__ immediately on change
            const handleKetcherChange = () => getKetcherStructure(ketcher, format).then(onStructureChange);

            ketcher.editor.subscribe('change', handleKetcherChange);
            return () => { ketcher.editor.unsubscribe('change', handleKetcherChange); }
        }
    }, [ketcher, onStructureChange])
}
