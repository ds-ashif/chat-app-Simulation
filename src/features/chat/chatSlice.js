import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMessages, sendMessage } from '../../api/mockApi';

const initialState = {
  messages: [],
  status: 'idle',
  error: null,
  isSending: false,
  sendError: null
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessageOptimistically: (state, action) => {
      state.messages.push(action.payload);
    },
    revertMessage: (state, action) => {
      state.messages = state.messages.filter(
        msg => msg.tempId !== action.payload.tempId
      );
    },
    confirmMessage: (state, action) => {
      const index = state.messages.findIndex(
        msg => msg.tempId === action.payload.tempId
      );
      if (index !== -1) {
        state.messages[index] = action.payload;
      }
    },
    clearError: (state) => {
      state.error = null;
      state.sendError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMessages.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(loadMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(sendNewMessage.pending, (state) => {
        state.isSending = true;
        state.sendError = null;
      })
      .addCase(sendNewMessage.fulfilled, (state) => {
        state.isSending = false;
      })
      .addCase(sendNewMessage.rejected, (state, action) => {
        state.isSending = false;
        state.sendError = action.error.message;
      });
  }
});

export const {
  addMessageOptimistically,
  revertMessage,
  confirmMessage,
  clearError
} = chatSlice.actions;

export const loadMessages = createAsyncThunk(
  'chat/loadMessages',
  async () => {
    const response = await fetchMessages();
    return response;
  }
);

export const sendNewMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message, { dispatch, getState }) => {
    const tempId = Date.now();
    const user = getState().auth.user;
    
    dispatch(addMessageOptimistically({
      ...message,
      tempId,
      userId: user.id,
      timestamp: new Date().toISOString(),
    }));
    
    try {
      const response = await sendMessage(message);
      dispatch(confirmMessage({
        ...response,
        id: response.id || tempId,
        tempId,
      }));
      return response;
    } catch (error) {
      dispatch(revertMessage({ tempId }));
      throw error;
    }
  }
);

export default chatSlice.reducer;