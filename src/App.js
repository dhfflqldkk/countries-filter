import { useState } from "react";
import Country from "./components/Country";
import data from "./data/countries.json";
import "./styles.css";

function sortAlpha() {
  const countries = data.countries;
  return countries.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
}

function sortAsc() {
  const countries = data.countries;
  return countries.sort(function (a, b) {
    return a.population - b.population;
  });
}

function sortDesc() {
  const countries = data.countries;
  return countries.sort(function (a, b) {
    return b.population - a.population;
  });
}

function filter(list, option) {
  if (option === "all") return list;

  if (
    ["asia", "africa", "europe", "north america", "south america"].includes(
      option
    )
  ) {
    return list.filter(function (country) {
      return country.continent.toLowerCase() === option;
    });
  }

  let populationLimit;
  switch (option) {
    case "1":
      populationLimit = 100000000; // 100M
      break;
    case "100m":
      populationLimit = 100000000; // 100M
      break;
    case "200m":
      populationLimit = 200000000; // 200M
      break;
    case "500m":
      populationLimit = 500000000; // 500M
      break;
    case "1B":
      populationLimit = 1000000000; // 1B
      break;
    default:
      return list;
  }

  return list.filter(function (country) {
    return country.population >= populationLimit;
  });
}

function shuffleArray(array) {
  let curId = array.length;
  while (0 !== curId) {
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}

export default function App() {
  const [filterOption, setFilterOption] = useState("all");
  const [sortOption, setSortOption] = useState(">");

  function handleSort(e) {
    setSortOption(e.target.value);
  }

  function handleFilter(e) {
    setFilterOption(e.target.value);
  }

  function sort(option) {
    if (option === "alpha") {
      return sortAlpha();
    } else if (option === "shuffle") {
      return shuffleArray([...data.countries]);
    } else if (option === ">") {
      return sortDesc();
    } else if (option === "<") {
      return sortAsc();
    } else {
      return data.countries;
    }
  }

  const sortedCountries = sort(sortOption);
  const filteredCountries = filter(sortedCountries, filterOption);

  return (
    <div className="App">
      <h1>World's largest countries by population</h1>
      <div className="filters">
        <label>
          Sort by:
          <select value={sortOption} onChange={handleSort}>
            <option value=">">Population Desc</option>
            <option value="<">Population Asc</option>
            <option value="alpha">Alphabetically</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </label>
        <label>
          Filters:
          <select value={filterOption} onChange={handleFilter}>
            <optgroup label="By continent">
              <option value="all">All</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
            </optgroup>
            <optgroup label="By population">
              <option value="1">less than 100M</option>
              <option value="100m">100M or more</option>
              <option value="200m">200M or more</option>
              <option value="500m">500M or more</option>
              <option value="1B">1B or more</option>
            </optgroup>
          </select>
        </label>
      </div>
      <div className="countries">
        {filteredCountries.map(function (country) {
          return <Country key={country.id} details={country} />;
        })}
      </div>
    </div>
  );
}
