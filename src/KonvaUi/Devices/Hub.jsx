import React from 'react';
import Node from '../Constructors/Node';
import hub_img from '../../assets/Devices/Hub.svg'
const Hub = ({text,id}) => {
  return (
    <Node id={id} Image={hub_img} text={text}/>
  );
};

export default Hub;
  