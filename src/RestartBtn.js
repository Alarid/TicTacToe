import React from 'react';
import Button from 'react-bootstrap/Button';

const RestartBtn = (props) => {
  if (props.winner || props.isGameADraw) {
    return (
      <Button
        variant="secondary"
        className="mt-3 mx-auto d-block"
        onClick={() => props.onClick()}
        > Restart Game </Button>
    );
  }
  return '';
}

export default RestartBtn;