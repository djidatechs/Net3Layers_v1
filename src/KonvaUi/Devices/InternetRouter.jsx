import React from 'react';
import Node from '../Constructors/Node';
import internet from '../../assets/Devices/Internet.svg'
const InternetRouter = ({text,id}) => {
  return (
    <Node id={id} Image={internet} text={text} />
  );
};

export default InternetRouter;
