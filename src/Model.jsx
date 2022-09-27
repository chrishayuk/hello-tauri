import {useGLTF} from "@react-three/drei"

function Model(props){
    const gltf = useGLTF('chrishayuk.glb');
    return <primitive object={gltf.scene} {...props} />
}

export {Model}