import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import entities from './entities'
import CameraMovement from './systems/camera-movement'
import AiControl from './systems/ai-control'
import Game from './systems/game'
import CameraRenderer from './camera-renderer'
import useKeyPress from './systems/key-press-register'
const background = require('./assets/floor.png')

export default function App() {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)

  useKeyPress(['w', 'a', 's', 'd'], event => {
    if (gameEngine) {
      gameEngine.dispatch({ type: 'keypress', key: event.key })
    }
  })


  // Only runs once on Load
  useEffect(() => {
    setRunning(false)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {/* Hud */}
      <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20 }}>{currentPoints}</Text>

      {/* Game */}
      <GameEngine
        ref={ref => { setGameEngine(ref) }}
        systems={[CameraMovement, AiControl, Game]}
        renderer={CameraRenderer}
        entities={entities()}
        running={running}
        onEvent={e => {
          // console.log(e.points)

          switch (e.type) {
            case 'game_over':
              setRunning(false)
              gameEngine.stop()
              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 1)
              break;
            default:
              break;
          }
        }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      {/* TODO: CSS REPEATING IMAGE BACKGROUND */}
      <View style={{
        absolute: true
      }}></View>

      {/* Menu */}
      {!running ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
            onPress={() => {
              setCurrentPoints(0)
              setRunning(true)
              gameEngine.swap(entities())
            }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
              START GAME
            </Text>
          </TouchableOpacity>
        </View> : null}
    </View>
  );
}
