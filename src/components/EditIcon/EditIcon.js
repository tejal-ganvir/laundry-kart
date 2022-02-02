import React from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const EditIcon = ({action}) => {
  return (
    <div className='cust_edit_icon'>
        <ModeEditOutlineIcon
            onClick={action ? () => action() : null}
        />
     </div>
  );
};

export default EditIcon;
