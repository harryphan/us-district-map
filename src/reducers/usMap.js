import produce from 'immer';

let initialState=[]

const usMap = (state=initialState, action) =>{
  return produce( state, draft =>{
    const {payload} = action;
    switch (action.type) {
      case 'some-action':
        break;
      default:

    }
  })
}

export default usMap;
