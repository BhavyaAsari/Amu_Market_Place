
export const getCountries = () => 

    Object.entries(locationData).map(([key,val]) => ({

        label: val.name,
        value:key
    }));

    export const getStates = (country) => 

        country && locationData[country] 
        ? Object.entries(locationData[country].states).map(([key,val]) =>( {

            label: val.name,
            value: key
        }))
        : [] ;



    export const getCities = (country,state) => 
        country && state 
        ? locationData[country]?.states[state]?.cities.map((city) => ({

            label:city.name,
            value:city.name
        }))
        : [];

    export const getPostalCodes = (country,state,city) => {

        return (

            locationData[country]
            ?.states[state]
            ?.cities.find((c) => c.name === city)
            ?.postalCodes || []
        );
    };

export const locationData = {
  india: {
    name: "India",
    states: {
      gujarat: {
        name: "Gujarat",
        cities: [
          { name: "Surat", postalCodes: ["395003", "395007"] },
          { name: "Ahmedabad", postalCodes: ["380001", "380015"] }
        ]
      },
      maharashtra: {
        name: "Maharashtra",
        cities: [
          { name: "Mumbai", postalCodes: ["400001", "400050"] },
          { name: "Pune", postalCodes: ["411001", "411057"] }
        ]
      },
      karnataka: {
        name: "Karnataka",
        cities: [
          { name: "Bangalore", postalCodes: ["560001", "560034"] }
        ]
      }
    }
  },

  usa: {
    name: "United States",
    states: {
      california: {
        name: "California",
        cities: [
          { name: "Los Angeles", postalCodes: ["90001", "90012"] },
          { name: "San Francisco", postalCodes: ["94102", "94110"] }
        ]
      },
      texas: {
        name: "Texas",
        cities: [
          { name: "Houston", postalCodes: ["77001", "77010"] }
        ]
      }
    }
  },

  uk: {
    name: "United Kingdom",
    states: {
      england: {
        name: "England",
        cities: [
          { name: "London", postalCodes: ["EC1A", "W1A"] },
          { name: "Manchester", postalCodes: ["M1", "M2"] }
        ]
      }
    }
  },

  germany: {
    name: "Germany",
    states: {
      bavaria: {
        name: "Bavaria",
        cities: [
          { name: "Munich", postalCodes: ["80331", "80333"] }
        ]
      },
      berlin: {
        name: "Berlin",
        cities: [
          { name: "Berlin", postalCodes: ["10115", "10117"] }
        ]
      }
    }
  },

  brazil: {
    name: "Brazil",
    states: {
      saopaulo: {
        name: "São Paulo",
        cities: [
          { name: "São Paulo", postalCodes: ["01000", "01001"] }
        ]
      },
      riodejaneiro: {
        name: "Rio de Janeiro",
        cities: [
          { name: "Rio", postalCodes: ["20000", "20010"] }
        ]
      }
    }
  },

  canada: {
    name: "Canada",
    states: {
      ontario: {
        name: "Ontario",
        cities: [
          { name: "Toronto", postalCodes: ["M5H", "M4B"] }
        ]
      },
      bc: {
        name: "British Columbia",
        cities: [
          { name: "Vancouver", postalCodes: ["V5K", "V6B"] }
        ]
      }
    }
  },

  australia: {
    name: "Australia",
    states: {
      nsw: {
        name: "New South Wales",
        cities: [
          { name: "Sydney", postalCodes: ["2000", "2001"] }
        ]
      },
      victoria: {
        name: "Victoria",
        cities: [
          { name: "Melbourne", postalCodes: ["3000", "3001"] }
        ]
      }
    }
  },

  japan: {
    name: "Japan",
    states: {
      tokyo: {
        name: "Tokyo",
        cities: [
          { name: "Tokyo", postalCodes: ["100-0001", "100-0002"] }
        ]
      },
      osaka: {
        name: "Osaka",
        cities: [
          { name: "Osaka", postalCodes: ["530-0001", "530-0002"] }
        ]
      }
    }
  },

  uae: {
    name: "UAE",
    states: {
      dubai: {
        name: "Dubai",
        cities: [
          { name: "Dubai", postalCodes: ["00000"] }
        ]
      },
      abudhabi: {
        name: "Abu Dhabi",
        cities: [
          { name: "Abu Dhabi", postalCodes: ["00000"] }
        ]
      }
    }
  },

  southafrica: {
    name: "South Africa",
    states: {
      gauteng: {
        name: "Gauteng",
        cities: [
          { name: "Johannesburg", postalCodes: ["2000", "2001"] }
        ]
      },
      westerncape: {
        name: "Western Cape",
        cities: [
          { name: "Cape Town", postalCodes: ["8000", "8001"] }
        ]
      }
    }
  }
};