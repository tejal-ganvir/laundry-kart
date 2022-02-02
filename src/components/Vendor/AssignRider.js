import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AssignRider = () => {
  const [assign, setAssign] = React.useState('');

  const handleChange = (event) => {
    setAssign(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="assign-rider">Assign Rider</InputLabel>
        <Select
          labelId="assign-rider"
          id="rider-select"
          value={assign}
          label="Assign Rider"
          onChange={handleChange}
        >
          <MenuItem value={1}>Rider 1</MenuItem>
          <MenuItem value={2}>Rider 2</MenuItem>
          <MenuItem value={3}>Rider 3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
export default AssignRider;