# 3D Models Directory

Place your 3D model files here for AR visualization.

## Supported Formats

- **GLB** (recommended) - Single binary file, best for AR
- **GLTF** - JSON format with separate texture files
- **OBJ + MTL** - Easiest to find, widely supported

## File Structure Examples

### GLB Format (Recommended)
```
models/
  sofa.glb
  table.glb
  lamp.glb
  plant.glb
```

### OBJ Format (Easiest)
```
models/
  sofa.obj
  sofa.mtl
  sofa_texture.jpg
  table.obj
  table.mtl
  table_texture.jpg
```

### GLTF Format
```
models/
  sofa/
    sofa.gltf
    sofa.bin
    textures/
      color.jpg
      normal.jpg
```

## How to Add Models

1. Export your 3D models from tools like Blender, SketchUp, or download from sites like Sketchfab
2. Place them in this `public/models/` directory
3. Reference them in your code as `/models/your-model.glb`

## Tips

- Keep file sizes under 5MB for faster loading
- Use GLB for best mobile performance
- Test on actual device for accurate AR preview
