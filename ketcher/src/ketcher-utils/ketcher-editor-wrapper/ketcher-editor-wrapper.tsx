import {Editor, Ketcher} from "ketcher-react";
import React, {useMemo} from "react";
import {StandaloneStructServiceProvider} from "ketcher-standalone";

import "miew/dist/miew.min.css";
import "ketcher-react/dist/index.css";

type Props = {
    onInit: (ketcher: Ketcher) => any
};

export const KetcherEditorWrapper: React.FC<Props> = ({onInit}) => {
    const structServiceProvider = useMemo(() => new StandaloneStructServiceProvider(), []);

    return <Editor
        staticResourcesUrl=""
        structServiceProvider={structServiceProvider}
        onInit={onInit}
    />;
};
