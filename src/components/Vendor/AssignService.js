import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AssignService = () => {
  const [assign, setAssign] = React.useState("");

  const handleChange = (event) => {
    setAssign(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='assign-service'>Select Service</InputLabel>
        <Select
          labelId='assign-service'
          id='service-select'
          value={assign}
          label='Select service'
          onChange={handleChange}>
          <MenuItem value={1}>Press</MenuItem>
          <MenuItem value={2}>Dry Cleaning</MenuItem>
          <MenuItem value={3}>Laundry Service</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
export default AssignService;
