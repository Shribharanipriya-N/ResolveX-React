import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchStarredIssues = createAsyncThunk(
    "starred/fetchStarredIssues",
    async ({ userId, token, email }) => {
        console.log(userId, token, email)
        const res = await axios.get("http://localhost:8080/issue/starred", {
            headers: {
                Authorization: token,
                email,
            },
            params: { id: userId },
        });

        return res.data.map((item) => item.issue.issueId);
    }
);

export const toggleStarBackend = createAsyncThunk(
    "starred/toggleStarBackend",
    async ({ issueId, userId, token, email }, { getState }) => {
        const isStarred = getState().starred.issueIds.includes(issueId);

        if (isStarred) {
            await axios.delete("http://localhost:8080/issue/starred", {
                headers: { Authorization: token, email },
                params: { userId, issueId },
            });
        } else {
            await axios.post(
                "http://localhost:8080/issue/starred",
                { user: { userId }, issue: { issueId } },
                { headers: { Authorization: token, email } }
            );
        }

        return issueId;
    }
);
const starredSlice = createSlice({
    name: "starred",
    initialState: {
        issueIds: [],
        loading: false,
        error: null
    },
    reducers: {
        toggleStarLocal(state, action) {
            const issueId = action.payload;
            if (state.issueIds.includes(issueId)) {
                state.issueIds = state.issueIds.filter((id) => id !== issueId);
            } else {
                state.issueIds.push(issueId);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStarredIssues.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStarredIssues.fulfilled, (state, action) => {
                state.loading = false;
                state.issueIds = action.payload;
            })
            .addCase(fetchStarredIssues.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(toggleStarBackend.fulfilled, (state, action) => {
                const issueId = action.payload;
                if (state.issueIds.includes(issueId)) {
                    state.issueIds = state.issueIds.filter((id) => id !== issueId);
                } else {
                    state.issueIds.push(issueId);
                }
            });
    },
});

export const { toggleStarLocal } = starredSlice.actions;
export default starredSlice.reducer;