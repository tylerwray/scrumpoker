import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { navigate } from "gatsby";
import { storage } from "./storage";
import { api } from "./api";

type Errors = {
  name?: string;
};

type Touched = {
  name: boolean;
};

type Values = {
  name: string;
  description: string;
};

function validate(values: Values): Errors {
  let errors: Errors = {};

  if (!values.name) {
    errors.name = "Must include name";
  }

  return errors;
}

export function RegisterHost() {
  const [values, setValues] = useState<Values>({ name: "", description: "" });
  const [touched, setTouched] = useState<Touched>({
    name: false,
  });
  const [errors, setErrors] = useState<Errors>(() => validate(values));

  const isValid = !errors.name;

  function handleNameBlur(e: React.FocusEvent<HTMLInputElement>) {
    setErrors(validate({ ...values, name: e.target.value }));
    setTouched({ ...touched, name: true });
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValues: Values = { ...values, name: e.target.value };
    setErrors(validate(newValues));
    setValues(newValues);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newValues: Values = { ...values, description: e.target.value };
    setErrors(validate(newValues));
    setValues(newValues);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValid) {
      return;
    }

    const player = await api.createPlayer(values.name);
    storage.setName(player.name);
    storage.setPlayerId(player.id);
    storage.setToken(player.token);

    const game = await api.createGame(values.description);
    storage.setCode(game.code);

    if (game.description) {
      storage.setDescription(game.description);
    }

    navigate("/game");
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
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={values.description}
            onChange={handleDescriptionChange}
          />
        </FormControl>
        <Button type="submit" disabled={!isValid} colorScheme="green">
          Start Game
        </Button>
      </Grid>
    </form>
  );
}
