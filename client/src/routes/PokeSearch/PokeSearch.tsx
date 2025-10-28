import { Alert, TextField, Button, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import type { PokePayload } from "../../types/Poke";

export const PokeSearch = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const baseUrl = "http://localhost:5243/pokemon/";

  useEffect(() => {
    if (!url) return;
  }, [url]);

  const handleSubmit = () => {
    const input = inputRef.current;
    setUrl(`${baseUrl}${input?.value}`);
  };

  const { data, loading, error } = useFetch<PokePayload>(url);

  useEffect(() => {
    if (error) {
      setAlertVisible(true);
    }
  }, [error]);

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="pokeCard">
            {loading ? (
              <CircularProgress />
            ) : data ? (
              <>
                <img src={data?.sprites?.front_default} alt={data.name} />
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="searchForm">
            <p className="searchFormTitle">Search Pokémon by Name or ID</p>

            {error ? (
              alertVisible && (
                <Alert
                  severity="error"
                  onClose={() => {
                    setAlertVisible(!alertVisible);
                  }}
                >{`Could not find Pokémon: ${inputRef.current?.value}`}</Alert>
              )
            ) : (
              <></>
            )}
            <TextField
              required
              label="Search Pokémon"
              variant="outlined"
              inputRef={inputRef}
              className="input"
              style={{ marginBottom: 10, marginTop: 10 }}
            />
            <Button
              variant="contained"
              onClick={() => handleSubmit()}
              className="searchButton"
              style={{
                backgroundColor: "#f6ff00ff",
                color: "red",
                fontWeight: "800",
              }}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
