import base64

from jazzy.api import atomic_strength_vis_from_smiles
from rdkit.Chem import MolFromSmiles

IMAGE_SIZE = (500, 500)


def create_image_output(sketcher_result, st_params, image_size=IMAGE_SIZE):
    if sketcher_result is not None and sketcher_result != "":
        if MolFromSmiles(sketcher_result) is not None:
            # st.write(sketcher_result)
            smiles = sketcher_result
            image_svg = render_smiles_to_img(smiles,
                                                    st_params,
                                                    image_size)

            return base64.b64encode(image_svg.encode("utf-8")).decode("utf-8")


def render_smiles_to_img(smiles, st_params, image_size=IMAGE_SIZE):
    sdc_threshold, sdx_threshold, sa_threshold = st_params

    image_svg = atomic_strength_vis_from_smiles(smiles,
                                                minimisation_method="MMFF94",
                                                sdc_threshold=sdc_threshold,
                                                sdx_threshold=sdx_threshold,
                                                sa_threshold=sa_threshold,
                                                fig_size=image_size,
                                                encode=False,
                                                flatten_molecule=True,
                                                highlight_atoms=True,
                                                rounding_digits=2)

    return image_svg
