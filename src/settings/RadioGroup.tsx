import React, { ReactElement } from "react";
import {
  Heading,
  useRadioGroup,
  useColorModeValue,
  useRadio,
  Grid,
  Box,
} from "@chakra-ui/react";

type Props = {
  options: string[];
  name: string;
  value: string;
  label: string;
  onChange: (nextValue: string) => void;
  children: (value: string) => ReactElement;
};

export function RadioGroup({
  name,
  value,
  label,
  options,
  onChange,
  children,
}: Props) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    value,
    onChange,
  });

  const group = getRootProps();

  return (
    <>
      <Heading as="h2" size="md" mb="4">
        {label}
      </Heading>

      <Grid
        templateColumns="repeat(auto-fit, minmax(100px, 1fr))"
        gap="4"
        mb="12"
        {...group}
      >
        {options.map((value) => {
          const radioProps = getRadioProps({ value });
          return (
            <Radio key={value} {...radioProps}>
              {children(value)}
            </Radio>
          );
        })}
      </Grid>
    </>
  );
}

function Radio(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const background = useColorModeValue("gray.200", "gray.800");

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="md"
        bg={background}
        _checked={{
          boxShadow: "greenOutline",
        }}
        _hover={{
          boxShadow: "greenOutline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}
