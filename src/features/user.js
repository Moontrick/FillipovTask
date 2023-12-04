import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { removeCookie } from 'react-cookie';
import {DATA} from './fuzziness_custom'
  export const fetchData = createAsyncThunk('users/takephoto', async (search, thunkAPI) => {
	try {
	
		// const body = JSON.stringify({
		// 	query: {
		// 	  bool: {
		// 		should: [
		// 		  {
		// 			bool: {
		// 			  must: [
		// 				{
		// 					span_multi: {
		// 					  match: {
		// 						fuzzy: {
		// 						  Title: {
		// 							value: search,
		// 							boost: 5.0
		// 						  }
		// 						}
		// 					  }
		// 					}
		// 				  },
		// 				  {
		// 					span_multi: {
		// 					  match: {
		// 						fuzzy: {
		// 						  Paragraph1: {
		// 							value: search
		// 						  }
		// 						}
		// 					  }
		// 					}
		// 				  },
		// 				  {
		// 					span_multi: {
		// 					  match: {
		// 						fuzzy: {
		// 						  Paragraph2: {
		// 							value: search
		// 						  }
		// 						}
		// 					  }
		// 					}
		// 				  },
		// 				  {
		// 					span_multi: {
		// 					  match: {
		// 						fuzzy: {
		// 						  Paragraph3: {
		// 							value: search
		// 						  }
		// 						}
		// 					  }
		// 					}
		// 				  }
		// 				],
		// 			  }
		// 			},
		// 		  {
		// 			bool: {
		// 			  must: [
		// 				{
		// 				  span_multi: {
		// 					Title: {
		// 					  query: search
		// 					}
		// 				  }
		// 				}
		// 			  ],
		// 			  filter: {
		// 				exists: {
		// 				  field: "Title"
		// 				}
		// 			  }
		// 			}
		// 		  },
		// 		  {
		// 			bool: {
		// 			  must: [
		// 				{
		// 				  match_phrase: {
		// 					Paragraph1: {
		// 					  query: search
		// 					}
		// 				  }
		// 				}
		// 			  ],
		// 			  filter: {
		// 				exists: {
		// 				  field: "Paragraph1"
		// 				}
		// 			  }
		// 			}
		// 		  },
		// 		  {
		// 			bool: {
		// 			  must: [
		// 				{
		// 				  match_phrase: {
		// 					Paragraph2: {
		// 					  query: search
		// 					}
		// 				  }
		// 				}
		// 			  ],
		// 			  filter: {
		// 				exists: {
		// 				  field: "Paragraph2"
		// 				}
		// 			  }
		// 			}
		// 		  },
		// 		  {
		// 			bool: {
		// 			  must: [
		// 				{
		// 				  match_phrase: {
		// 					Paragraph3: {
		// 					  query: search
		// 					}
		// 				  }
		// 				}
		// 			  ],
		// 			  filter: {
		// 				exists: {
		// 				  field: "Paragraph3"
		// 				}
		// 			  }
		// 			}
		// 		  }
		// 		],
		// 	  }
		// 	},
		// 	size: 10000
		//   });
		  

		  
	

		// const body = JSON.stringify({
        //     query: {
        //         multi_match: {
        //             query: search,
        //             fields: ["Title", "Time", "Paragraph1", "Paragraph2", "Player_img", "Paragraph3", "Author"],
        //             fuzziness: "AUTO",
        //         }
        //     },
        //     size: 10000
        // })


        const searchWords = search.split(" ");




        let combinedResults = [];
		let combineSearch = "";
		let NotcombineSearch = "";
		let flag = false;
		for(let i = 0; i < searchWords.length; i++) {
			DATA.syn.map((resu, index) =>{
				if(searchWords[i].search(resu.str_find) >=0){
					flag = true;
					combineSearch = combineSearch + searchWords[i] + " "
				}else{
					//это я для тестов делал, решил не убирать, мало ли пригодиться
					NotcombineSearch = NotcombineSearch + searchWords[i] + " "
				}
			})
		}

		let body = null;
		let body1 = null;
			console.log(combineSearch)
			if(flag == true){
				 body = JSON.stringify({
					query: {
						multi_match: {
							query: combineSearch,
							fields: ["Title", "Time", "Paragraph1", "Paragraph2", "Player_img", "Paragraph3", "Author"],
						}
					},
					size: 10000
				});
				body1 = JSON.stringify({
					query: {
						multi_match: {
							query: search,
							fields: ["Title", "Time", "Paragraph1", "Paragraph2", "Player_img", "Paragraph3", "Author"],
							fuzziness: "AUTO:0,2",
						}
					},
					size: 10000
				});
			}else{
				body = JSON.stringify({
					query: {
						multi_match: {
							query: search,
							fuzziness: "AUTO",
							fields: ["Title", "Time", "Paragraph1", "Paragraph2", "Player_img", "Paragraph3", "Author"],
						}
					},
					size: 10000
				});
			}		
            const res = await fetch('http://localhost:9200/final_index4/_search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });
            const data = await res.json();
            if (res.status === 200) {
				if(flag == true){

					const res1 = await fetch('http://localhost:9200/final_index4/_search', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: body1,
					});
		
					const data1 = await res1.json();
					if (res1.status === 200){
						let resultconcat = [];
						const hit1 = data.hits.hits
						const hit2 = data1.hits.hits
						const result = [];
						console.log(hit2)
						hit2.forEach(element => {
							let flag1 = true; 
							hit1.forEach(el =>{
								if(element._id == el._id){
									flag1 = false;						
								}
							});
							if(flag1 == true){
								result.push(element)
							}				
						});		
						resultconcat = resultconcat.concat(hit1, result)
						return resultconcat
					}
				}else
				{
                return data.hits.hits;
				}
            } else {
                return thunkAPI.rejectWithValue(data);
            }

    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data);
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
				console.log(action.payload)
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
