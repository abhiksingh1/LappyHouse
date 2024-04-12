const initialData = {
  laptops: [],
};

export const laptopsReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_ALL_LAPTOPS": {
      return {
        ...state,
        laptops: action.payload,
      };
    }

    default:
      return state;
  }
};
