import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function AutoSuggestField(props) {
    const { options, selectedOption, id, label, onChange, name } = props;
    return (
        <Autocomplete
            id={id}
            options={options}
            getOptionLabel={selectedOption}
            style={{ width: 300 }}
            size='small'
            renderInput={(params) => <TextField {...params} name={name} onSelect={onChange} label={label} variant="outlined" />}
      />
    )
}
