import os

import streamlit.components.v1 as components

COMPONENT_NAME = "ketcher"
COMPONENT_DEV_URL = "http://localhost:3000"
CLIENT_BUILD_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                 "../ketcher/build")

# _COMPONENT_FUNC = components.declare_component(COMPONENT_NAME,
#                                                url=COMPONENT_DEV_URL)
_COMPONENT_FUNC = components.declare_component(COMPONENT_NAME,
                                               path=CLIENT_BUILD_PATH)


def render_sketcher_iframe(output_format="smiles", height=700):
    _component_function = _COMPONENT_FUNC

    sketcher_output = _component_function(output_format=output_format, height=height)

    return sketcher_output
