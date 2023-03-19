import React from 'react';
import Node from '../Constructors/Node';
import switch_img from '../../assets/Devices/Switch.svg'

const Switch = ({text,id}) => {
  return (
    <Node id={id} Image={switch_img} text={text}/>
  );
};

export default Switch;
