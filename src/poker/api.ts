type PlayerResponse = {
  id: string;
  name: string;
  token: string;
};

async function createPlayer(name: string): Promise<PlayerResponse> {
  // TODO: Use an environment variable for the URL
  const res = await fetch("http://localhost:4000/players", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  const body = await res.json();

  return {
    id: body.id,
    name: body.name,
    token: body.token,
  };
}

type GameResponse = {
  code: string;
};

async function createGame(): Promise<GameResponse> {
  // TODO: Use an environment variable for the URL
  const res = await fetch("http://localhost:4000/games", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const body = await res.json();

  return {
    code: body.code,
  };
}

export const api = { createPlayer, createGame };
