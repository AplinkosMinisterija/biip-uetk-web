import Select from "react-select";
import styled from "styled-components";
import Icon from "../other/Icons";
import FieldWrapper from "./components/FieldWrapper";
import MultiTextField from "./components/MultiTextFieldInput";
import OptionsContainer from "./components/OptionsContainer";
import { filterSelectedOptions, handleRemove } from "./utils/functions";
import { useSelectData } from "./utils/hooks";

export interface SelectOption {
  id?: string;
  label?: string;
  [key: string]: any;
}

export interface SelectFieldProps {
  id?: string;
  name?: string;
  label?: string;
  values?: any;
  error?: string;
  showError?: boolean;
  editable?: boolean;
  options: SelectOption[] | string[];
  left?: JSX.Element;
  right?: JSX.Element;
  padding?: string;
  onChange: (option: any) => void;
  handleLogs?: (data: any) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  backgroundColor?: string;
  hasBorder?: boolean;
  getOptionLabel?: (option: any) => string;
  getOptionValue?: (option: any) => any;
  isSearchable?: boolean;
}

const MultiSelect = ({
  label,
  values = [],
  error,
  options = [],
  onChange,
  disabled = false,
  getOptionLabel = (option) => option.label,
  getOptionValue = (option) => option.id
}: SelectFieldProps) => {
  const {
    suggestions,
    input,
    handleToggleSelect,
    showSelect,
    handleBlur,
    handleClick,
    handleOnChange
  } = useSelectData({
    options,
    disabled,
    onChange: (option) => onChange([...values, option]),
    getOptionLabel
  });

  return (
    <FieldWrapper
      onClick={handleToggleSelect}
      label={label}
      error={error}
      handleBlur={handleBlur}
    >
      <MultiTextField
        values={values}
        input={input}
        error={error}
        onRemove={({ index }) => {
          handleRemove(index, onChange, values);
        }}
        disabled={disabled}
        handleInputChange={handleOnChange}
        getOptionLabel={getOptionLabel}
      />
      <OptionsContainer
        values={filterSelectedOptions(suggestions, values, getOptionValue)}
        getOptionLabel={getOptionLabel}
        showSelect={showSelect}
        handleClick={handleClick}
      />
    </FieldWrapper>
  );
};

const StyledSelect = styled(Select)<{ error?: string | string[] }>`
  .Select__value-container {
    border-color: ${({ theme, error }) =>
      error ? theme.colors.error : theme.colors.border};
    border-radius: 4px;
    box-sizing: border-box;
    padding: 2px;
    min-height: 38px;
    cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "text")};
  }
  .Select__indicator {
    padding: 0 9px 0 9px;
  }
  .css-1pahdxg-control {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => `${theme.colors.primary}33`};
    border-width: 1px;
  }
  .css-1pahdxg-control:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => `${theme.colors.primary}33`};
    border-width: 1px;
  }
`;

const Label = styled.label`
  text-align: left;
  font-size: 1.4rem;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.colors.label};
  opacity: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ErrorMessage = styled.label`
  display: inline-block;
  width: 100%;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledIcons = styled(Icon)`
  color: #cdd5df;
  font-size: 2.4rem;
`;
export default MultiSelect;
