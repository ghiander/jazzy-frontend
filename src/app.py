import streamlit as st

from header_image import create_header_image
from image_output import create_image_output
from sketcher_data import render_sketcher_iframe

# Streamlit Globals
st.set_page_config(page_title='Jazzy',
                   layout='wide',
                   page_icon='static/fav_icon.ico',
                   initial_sidebar_state='auto')

# Hide hamburger menu
hide_streamlit_style = """
<style>
#MainMenu {visibility: hidden;}
footer {visibility: hidden;}
</style>

"""
st.write(hide_streamlit_style, unsafe_allow_html=True)

# Sidebar
with st.sidebar:
    st.image(create_header_image(), width=200)
    st.title("Thresholds")
    sdc_threshold = st.slider('Carbon Donors', 0.0, 1.5, 0.6, 0.1)
    sdx_threshold = st.slider('Hetero Donors', 0.0, 2.0, 0.3, 0.1)
    sa_threshold = st.slider('Acceptors', 0.0, 2.0, 0.3, 0.1)

    with st.expander('Display settings'):
        column_ratio = st.slider('Column Ratio', 0.0, 1.0, 0.4, 0.05)
        sketcher_height = st.slider('Sketcher Height', 500, 900, 550, 10)

# Columns
# actual ratio interval is [0.7, 5]:1
# Default scale inferred for 1280w viewport (1920w@150%)
# Min scale inferred for 1920w@100%
# Inference limiting factor is that Sketcher column should be at least 650px width

# Transform [0,1] -<x4.3>-> [0,4.3] -<+0.7>-> [0.7, 5].
# Default should be x2.4 => value is (2.4 - 0.5 / 4.5) ~= # 0.42 ~= 0.4
# Min should be x0.725 ~ 0.7

col1, col2 = st.columns([column_ratio * 4.3 + 0.7, 1])
# Reduce global metrics for some paddings set with relative units ('rem')
st.write("<style>html {font-size: 0.7rem;}</style>", unsafe_allow_html=True)


# - Pass arguments to client widget, wait for updated output
with col1:
    sketcher_result = render_sketcher_iframe("smiles", sketcher_height)

with col2:
    image = create_image_output(sketcher_result, (sdc_threshold,
                                                  sdx_threshold,
                                                  sa_threshold))
    with st.container():
        st.empty()
        if image:
            html = f'<img src="data:image/svg+xml;base64,{image}" style="width: 100%"/>'
            st.write(html, unsafe_allow_html=True)
