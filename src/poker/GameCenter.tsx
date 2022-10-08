import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
} from "@chakra-ui/react";
import { Link, navigate } from "gatsby";
import { storage } from "./storage";
import { api } from "./api";

type Errors = {
  name?: string;
  code?: string;
};

type Touched = {
  name: boolean;
  code: boolean;
};

type Values = {
  name: string;
  code: string;
};

function validate(values: Values): Errors {
  let errors: Errors = {};

  if (!values.name) {
    errors.name = "Must include name";
  }

  if (values.code.length !== 4) {
    errors.code = "Code must be 4 characters";
  }

  return errors;
}

export function GameCenter() {
  const [values, setValues] = useState<Values>({ name: "", code: "" });
  const [touched, setTouched] = useState<Touched>({ name: false, code: false });
  const [errors, setErrors] = useState<Errors>(() => validate(values));

  const isValid = !errors.name && !errors.code;

  function handleNameBlur(e: React.FocusEvent<HTMLInputElement>) {
    setErrors(validate({ ...values, name: e.target.value }));
    setTouched({ ...touched, name: true });
  }

  function handleCodeBlur(e: React.FocusEvent<HTMLInputElement>) {
    setErrors(validate({ ...values, code: e.target.value }));
    setTouched({ ...touched, code: true });
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValues: Values = { ...values, name: e.target.value };
    setErrors(validate(newValues));
    setValues(newValues);
  }

  function handleCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValues: Values = { ...values, code: e.target.value.toUpperCase() };
    setErrors(validate(newValues));
    setValues(newValues);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValid) {
      return;
    }

    const player = await api.createPlayer(values.name);
    storage.setCode(values.code);
    storage.setName(player.name);
    storage.setPlayerId(player.id);
    storage.setToken(player.token);
    navigate("/cards");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid gap="6">
        <FormControl isInvalid={touched.name && !!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            value={values.name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={touched.code && !!errors.code}>
          <FormLabel>Code</FormLabel>
          <Input
            placeholder="J5TV"
            value={values.code}
            onChange={handleCodeChange}
            onBlur={handleCodeBlur}
            maxLength={4}
          />
          <FormErrorMessage>{errors.code}</FormErrorMessage>
        </FormControl>
        <Button type="submit" disabled={!isValid} colorScheme="green">
          Join Game
        </Button>
        <Grid templateColumns="auto 1fr auto">
          <Box w="full" />
          <Box>or</Box>
          <Box w="full" />
        </Grid>
        <Button variant="link" as={Link} to="/host">
          Host a Game
        </Button>
      </Grid>
    </form>
  );
}
