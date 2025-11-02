# 🎉 Sziget Festival Surprise

A fun interactive surprise to reveal an upcoming trip to Sziget Festival! Features 3D fireworks, floating balloons, and a wandering camper van.

## What it does

Click the surprise button to reveal the festival announcement with continuous 3D animations:
- Fireworks blowing up
- Balloons floating 
- A 3D camper van (the exact model I actually own :D) that drives back and forth

## Running it locally

You'll need Node.js installed, then:

```bash
npm install
npm run dev
```

Open your browser to `http://localhost:5173` and click the surprise button!

## Tech used

- React + TypeScript
- Three.js for 3D animations
- Tailwind CSS for styling
- Framer Motion for smooth transitions

## TODOs

I also wanted to include a wandering camper (which is actually the same exact model of camper I own!) but ran out of time. The code is working and the camper is correctly rendered but some work needs to be done on the camper materials for it to look good, so eventually I removed it.

You can show it by uncommenting the line

```
      {/* <CamperVan isActive={showCamper || false} /> */}
```

inside `ThreeBackground.tsx`

## Credits

[Fiat Ducato 3D model](https://sketchfab.com/3d-models/fiat-ducato-1989-b52eea677b32415e893e39c2fcb76163)