const initialState = {
  state: 'featured',
};

function filterStateReducer(state = initialState, action) {
  switch (action.type) {
    case 'FEATURED':
      return { state: "featured" };
    case 'NEWEST':
      return { state: "newest" };
    case 'PRICEDESC':
      return { state: "priceDesc" };
    case 'PRICEASC':
      return { state: "priceAsc" };
    default:
      return state;
  }
}

export default filterStateReducer;
