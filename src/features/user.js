import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { removeCookie } from 'react-cookie';
  export const fetchData = createAsyncThunk('users/takephoto', async (search, thunkAPI) => {
	try {
		const res = await fetch('http://localhost:9200/final_index4/_search', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: {
					multi_match: {
						query: search,
						fields: ["Title", "Time", "Paragraph1", "Paragraph2", "Player_img", "Paragraph3", "Author"],
						fuzziness: "AUTO"
					}
				},
				size: 10000
			}),
		  });

		const data = await res.json();

		if (res.status === 200) {
			return data;
		} else {
			return thunkAPI.rejectWithValue(data);
		}
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});
const initialState = {
user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: builder => {
		builder
			.addCase(fetchData.pending, state => {
				state.loading = true;
			})
			.addCase(fetchData.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.isAuthenticated = true;
			})
			.addCase(fetchData.rejected, state => {
				state.loading = false;
			})

	},
});

export default userSlice.reducer;
