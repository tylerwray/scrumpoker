import React, {
  useMemo,
  useState,
  ReactNode,
  useContext,
  useCallback
} from "react";
import noop from "../lib/noop";
import IconCheckCircle from "./icon-check-circle";

// --------- Context ----------
interface Context {
  value?: string;
  setValue: (value: string) => void;
}

const SelectContext = React.createContext<Context>({
  value: "",
  setValue: noop
});

SelectContext.displayName = "SelectContext";

// --------- Body ----------
interface BodyProps {
  children: ReactNode;
}

function Body({ children }: BodyProps) {
  return <div className="grid grid-fit-lg">{children}</div>;
}

// --------- Label ----------
interface LabelProps {
  children: ReactNode;
}

function Label({ children }: LabelProps) {
  return (
    <div className="pl-2">
      <h4 className="uppercase">{children}</h4>
      <hr className="bg-gray-700" />
    </div>
  );
}

// --------- Option ----------
interface OptionProps {
  children: ReactNode;
  value: string;
}

function Option({ children, value }: OptionProps): JSX.Element {
  const { value: selectedValue, setValue } = useContext(SelectContext);

  const selected = value === selectedValue;

  return (
    <div className="p-4 text-center flex justify-center items-center">
      <button
        className={`hover:shadow-selected bg-gray-900 relative rounded-lg overflow-hidden focus:outline-none ${
          selected ? "shadow-selected" : ""
        }`}
        onClick={() => setValue(value)}
      >
        {selected && (
          <div className="absolute right-0 p-1">
            <IconCheckCircle fill="#48BB78" />
          </div>
        )}
        {children}
      </button>
    </div>
  );
}

// --------- Select ----------
interface SelectProps {
  children: ReactNode[];
  initialValue: string;
  onChange(value: string): void;
}

function Select({ children, initialValue = "", onChange }: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const setValue = useCallback(
    (value: string) => {
      onChange(value);
      setSelectedValue(value);
    },
    [onChange]
  );

  const context = useMemo(
    () => ({
      setValue,
      value: selectedValue
    }),
    [selectedValue, setValue]
  );

  return (
    <SelectContext.Provider value={context}>
      <div className="p-6">{children}</div>
    </SelectContext.Provider>
  );
}

// --------- SelectCompoundComponent ----------
interface CompoundComponents {
  Body: (props: BodyProps) => JSX.Element;
  Label: (props: LabelProps) => JSX.Element;
  Option: (props: OptionProps) => JSX.Element;
}

type SelectType = (props: SelectProps) => JSX.Element;
type SelectCompoundComponent = SelectType & CompoundComponents;

Select.Body = Body;
Select.Label = Label;
Select.Option = Option;

export default Select as SelectCompoundComponent;
