import React from 'react';
import { Controller } from 'react-hook-form';
import DropzoneUI from './DropzoneUI'; 

function ImgdropzonewithController({ name, control, label ,...resprops}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DropzoneUI field={field} error={error} label={label} {...resprops}/>
      )}
    />
  );
}

export default ImgdropzonewithController;