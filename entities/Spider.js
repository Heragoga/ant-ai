import Matter from 'matter-js'
import React from 'react'
import { View } from 'react-native'

const Spider = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    const color = props.color;

    return (
        <View style={{
            borderWidth: 1,
            borderColor: color,
            borderStyle: 'solid',
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }} />
    )
}

export default (world, pos, size) => {
    const initialSpider = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        { label: 'Spider' }
    )

    Matter.World.add(world, initialSpider)

    return {
        body: initialSpider,
        health: 30,
        color: 'red',
        pos,
        renderer: <Spider />
    }
}

