import { Alert, TextField, Button, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import type { PokePayload } from "../../types/Poke";

export const PokeSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [alertVisible, setAlertVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, loading, error, setShouldFetch } = useFetch<PokePayload>(
     `http://localhost:5091/api/pokemon/${searchValue}`
    
  );

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
                <img src={data?.image} alt={data.name} />
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
                >{`Could not find Pokémon: ${searchValue}`}</Alert>
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
              onClick={() =>{
				  setSearchValue(inputRef.current?.value || "")
				  setShouldFetch(true)
			  } }
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
