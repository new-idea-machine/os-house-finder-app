import React, { useState } from 'react';

const Dropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Select city:</label>
      <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
        <option value="">-- Select --</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p>Selected option: {selectedOption}</p>
    </div>
  );
};

export default Dropdown;