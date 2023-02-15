import React, {useCallback, useState} from "react";
import {Ketcher} from "ketcher-react";
import {initialData} from "./initial-data";
import {useSketcherChangeListener} from "./ketcher-utils/ketcher-editor-wrapper/use-sketcher-change-listener";
import {KetcherEditorWrapper} from "./ketcher-utils/ketcher-editor-wrapper/ketcher-editor-wrapper";
import {ExportableKetcherFormat} from "./ketcher-utils/get-ketcher-structure";

type Props = {
    onReady?: () => void,
    onStructureChange?: (data: string) => void,
    format?: ExportableKetcherFormat
}

export const KetcherListener: React.FC<Props> = ({onReady, onStructureChange, format = 'mol'}) => {
    const [ketcher, setKetcher] = useState<Ketcher>();
    const [isLoading, setIsLoading] = useState(true);

    const handleKetcherInit = useCallback((ketcher: Ketcher) => {
        ketcher.setMolecule(initialData);
        setKetcher(ketcher);
        setIsLoading(false);
        onReady?.();
    }, []);

    useSketcherChangeListener(ketcher, onStructureChange, format);

    return <>
        {isLoading ? 'Loading Ketcher widget...' : null}
        <KetcherEditorWrapper onInit={handleKetcherInit}/>
    </>;
};
