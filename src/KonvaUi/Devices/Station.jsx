import React from 'react';
import Node from '../Constructors/Node';
import station from '../../assets/Devices/Station.svg'
import { useNet3Layers } from '../../Context/Netlayers';
const Station = ({id,text}) => {
  return (
    <Node id={id} Image={station} text={text} />
  );
};

export default Station;
