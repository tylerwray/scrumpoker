import React, { useEffect, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";

type Props = {
  defaultValue: string;
  onChange(value: string): void;
};

export function ColorPicker({ defaultValue, onChange }: Props) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(value);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [value, onChange]);

  return (
    <RgbaStringColorPicker
      style={{ width: "auto" }}
      color={value}
      onChange={setValue}
    />
  );
}
