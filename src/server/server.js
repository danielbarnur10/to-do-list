
  function hydrateStateWithLocalStorage(id) {
    // for all items in state
    for (let key in id.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          id.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          id.setState({ [key]: value });
        }
      }
    }
  }

  function saveStateToLocalStorage(id) {
    // for every item in React state
    for (let key in id.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(id.state[key]));
    }
  }

  export {saveStateToLocalStorage, hydrateStateWithLocalStorage}