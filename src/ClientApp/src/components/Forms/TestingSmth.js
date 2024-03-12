import React, { useState } from 'react';
import Select from 'react-select';

const FormComponent = ({ translationData }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleMultiSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted!');
    console.log('Selected Options:', selectedOptions);
  };

  const options = translationData && translationData.countries ? translationData.countries : [];
  return (
    <form onSubmit={handleSubmit}>
      <Select
        options={options}
        isMulti
        onChange={handleMultiSelectChange}
        value={selectedOptions}
        placeholder="Select options..."
      />
      {/* Render other data as needed */}
    </form>
  );
};

export default FormComponent;
