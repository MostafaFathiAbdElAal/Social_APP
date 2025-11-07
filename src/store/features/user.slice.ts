import { getUserDetails } from "@/actions/getUserData.action";
import { userState } from "@/types/user.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getDataUser = createAsyncThunk("details/user", async () => {
    const data = await getUserDetails()
    return data
})

const initialState: userState = {
    data: {

        message: null,
        user: {
            _id: "",
            createdAt: "",
            dateOfBirth: "",
            email: "",
            gender: "",
            name: "",
            photo: "https://linked-posts.routemisr.com/uploads/default-profile.png"
        }
    }
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: function (builder) {
        builder.addCase(getDataUser.fulfilled, (state, action) => {
            state.data = action.payload?.data
            
        })
        builder.addCase(getDataUser.rejected, (_, action) => {
            console.log("error", action.error);
        })
    }
})
export const userReducer = userSlice.reducer