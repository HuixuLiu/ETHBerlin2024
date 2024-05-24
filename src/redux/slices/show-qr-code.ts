import { createSlice} from '@reduxjs/toolkit';


const initialState = false;


export const showQRCodeSlice = createSlice({
  name: 'showQRCodeSliceContent',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // ShowQRCodeTrue: (state) => ({
    //     state: true;
    //    // return action.payload;
    // }},
    ShowQRCodeTrue: () => true,
    // ShowQRCodeFalse: (state) => {
    //     state = false;
    //    // return action.payload;
    // },
    ShowQRCodeFalse: () => false,
  },
});


export const { ShowQRCodeFalse, ShowQRCodeTrue } = showQRCodeSlice.actions;
export default showQRCodeSlice.reducer;
