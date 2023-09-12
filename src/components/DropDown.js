import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


function DropDown({ value, setValue, options, label, Useroptions }) {

    const handleChange = (event) => {
        console.log("value is ", event.target.value);
        setValue(event.target.value);
    };

    return (
        <div>
            <Box sx={{ minWidth: 120, width:'100%' }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value }
                        label={label}
                        onChange={handleChange}
                        className="text-black focus:text-slate-400 focus:ring-slate-400 bg-slate-100 rounded-xl"
                    >
                        {Useroptions ?
                            (Useroptions.map((item, index) => (
                            <MenuItem value={item._id} key={index}  >{item.name}</MenuItem>
                         ))) :
                            (options?.map((item, index) => (
                                <MenuItem value={item} key={index}  >{item}</MenuItem>
                            )))}
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}

export default DropDown
