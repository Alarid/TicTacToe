import React from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const SortOrder = (props) => (
  <div className="sort-order mb-2">
    <label className="mr-2">Sort order:</label>
    <ButtonGroup toggle>
      {[{val: 'asc', label: 'Asc'}, {val: 'desc', label: 'Desc'}].map((radio) => (
        <ToggleButton
          type="radio"
          key={radio.val}
          variant="secondary"
          size="sm"
          name="sort"
          value={radio.val}
          checked={props.sort === radio.val}
          onChange={() => props.toggleSort()}
        >
          {radio.label}
        </ToggleButton>
      ))}
    </ButtonGroup>
  </div>
);

export default SortOrder;