import React, { ReactElement } from "react";
import {
  Heading,
  useRadioGroup,
  useColorModeValue,
  useRadio,
  Grid,
  Box,
  UseRadioProps,
} from "@chakra-ui/react";

type Props = {
  children: (value: string) => ReactElement;
  label: string;
  mb?: string;
  name: string;
  onChange: (nextValue: string) => void;
  options: string[];
  value: string;
};

export function RadioGroup({
  children,
  label,
  mb = "12",
  name,
  onChange,
  options,
  value,
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
        mb={mb}
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

type RadioProps = UseRadioProps & {
  children: React.ReactNode;
};

function Radio(props: RadioProps) {
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
