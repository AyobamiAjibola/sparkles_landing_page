export const customStyles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#A5A5A5",
        fontSize: "10px",
        fontWeight: 400,
        paddingLeft: "23px",
      };
    },
  
    control: (base, state) => ({
      ...base,
      background: "#fff",
      // match with the menu
      borderRadius: "10px",
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#FAA21B" : "#CACACA",
      height: "40px",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "#FAA21B" : "#CACACA",
      },
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
      fontFamily: 'montserrat'
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    }),
  
    control: (provided, state) => ({
      ...provided,
      background: "white",
      height: "40px",
      borderRadius: "10px"
    }),
  };
  