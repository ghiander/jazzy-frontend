import React, {memo, Suspense, useCallback, useEffect, useRef} from "react";
import {ComponentProps, Streamlit, withStreamlitConnection} from "streamlit-component-lib";

const KetcherListener = React.lazy(() => import('./ketcher-listener').then(({KetcherListener}) => ({default: KetcherListener})));

const App: React.FC<ComponentProps> = memo((props) => {
    console.log('sketcher render', props);
    const {args} = props;

    const heightPx = args.height || 700;
    useStreamlitConnection(heightPx);

    const format = args.output_format;
    const handleChange = useCallback(data => {
        console.log('sketcher output', data);
        Streamlit.setComponentValue(data);
    }, []);

    return <div style={{position: 'relative', height: heightPx, width: '100%', minWidth: 650 }}>
        <Suspense fallback={"Loading Ketcher widget..."}>
            <KetcherListener onStructureChange={handleChange} format={format}/>
        </Suspense>
    </div>;
})

function useStreamlitConnection(heightPx: number) {
    const initSent = useRef(false);

    useEffect(() => {
        if(!initSent.current) {
            Streamlit.setComponentReady();
            initSent.current = true;
        }
    },[]);

    useEffect(() => {
        Streamlit.setFrameHeight(heightPx);
    }, [heightPx])
}

export default withStreamlitConnection(App);
