import React, { useState } from "react";

export interface CheckBoxProps {
  className?: string;
  label: string;
  onChange(label: string): void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  label,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onChange(label);
  };

  return (
    <div className={className}>
      <label>
        <input
          type="checkbox"
          value={label}
          checked={isChecked}
          onChange={toggleCheckboxChange}
          data-testid="checkbox"
        />

        <span className="checkmark">{label}</span>
      </label>
    </div>
  );
};
