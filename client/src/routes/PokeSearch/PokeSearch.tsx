import { TextField, Button, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import type { PokePayload } from "../../types/Poke";

export const PokeSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    data,
    loading,
    //  error
  } = useFetch<PokePayload>(`http://localhost:5243/pokemon/${searchValue}`);

  useEffect(() => {
    // console.log("Search value changed:", searchValue);
    console.log(data?.name);
  }, [data?.name]);

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
              <p>Could not find Pokémon: {searchValue}</p>
            )}
          </div>
          <div className="searchForm">
            <p className="">Search Pokémon by Name or ID</p>
            <TextField
              required
              label="Search Pokémon"
              variant="outlined"
              inputRef={inputRef}
              className="input"
              style={{ marginBottom: 10 }}
            />
            <Button
              variant="contained"
              onClick={() => setSearchValue(inputRef.current?.value || "")}
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
