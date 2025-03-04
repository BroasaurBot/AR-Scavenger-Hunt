# AR Scavenger Hunt

This is an open and engaging scavenger hunt platform that leverages web AR technology and web hosting.

Players can enter the competition by scanning the QR codes on the posters, discovering the projected AR objects, and competing for the most points.

## Features

- **AR camera functionality** (implemented using [react-three-arjs](https://github.com/artcom/react-three-arjs))  
- **Collect points** for discovering markers  
- **Persistent points & leaderboard** (implemented with Firebase)  
- **Clues & info page**  
- **Code to generate filled posters**  

## Demonstration
https://github.com/user-attachments/assets/58443548-bb4a-4d94-a021-7491d687fefc


## Instructions for Further Use

1. **Obtain 3D models** (`.gltf` format) → Place in `camera/public/js/models`
2. **Write descriptions, clues, and arrange models** (trial & error) → Edit `info.js` (in both `/camera` & `hunt-website`)
3. **Link Firebase API** for hosting & real-time database  
4. **Set up Firestore database** with several collections:  
   - `admin`  
   - `leaderboard`  
   - `players`  
5. **Generate posters** → Located in `/posters`  
6. **Place posters** in designated areas  
