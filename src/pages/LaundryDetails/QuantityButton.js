import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';


const QuantityButton = ({quantity, handleIncrement, handleDecrement}) => {
    
    const displayCounter = quantity > 0;

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
        <Button disabled={!displayCounter} onClick={() => handleDecrement()}>-</Button>
        <Button sx={{color: '#32203b', pointerEvents: 'none'}}>{quantity}</Button>
        <Button onClick={() => handleIncrement()}>+</Button>
    </ButtonGroup>
  );
};

export default QuantityButton;
