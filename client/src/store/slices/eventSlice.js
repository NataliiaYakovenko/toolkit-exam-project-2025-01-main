import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const EVENTS_SLICE_NAME = 'events';

const loadEventsFromLocalStorage = () => {
  try {
    const events = localStorage.getItem('dynamicBrandingEvents');
    return events ? JSON.parse(events) : [];
  } catch (error) {
    return [];
  }
};

const saveEventsToLocalStorage = (events) => {
  localStorage.setItem('dynamicBrandingEvents', JSON.stringify(events));
};

const initialState = {
  events: loadEventsFromLocalStorage(),
  notifications: 0,
  isFeatching: true,
  error: null,
  defaultNotification: 30 * 60 * 1000,
};

export const loadEvents = createAsyncThunk(
  `${EVENTS_SLICE_NAME}/loadEvents`,
  async () => {
    const events = loadEventsFromLocalStorage();
    const now = Date.now();
    let notificationsCount = 0;

    const processedEvents = events.map((event) => {
      const timeLeft = event.eventDateTime - now;
      const updatedEvent = { ...event, timeLeft };

      if (timeLeft <= 0) {
        updatedEvent.isActive = false;
        updatedEvent.timeLeft = 0;
      }

      if (
        !updatedEvent.isNotified &&
        updatedEvent.timeLeft <= updatedEvent.notificationOffset
      ) {
        updatedEvent.isNotified = true;
        notificationsCount++;
      }
      return updatedEvent;
    });

    return {
      events: processedEvents.sort((a, b) => a.eventDateTime - b.eventDateTime),
      notificationsCount,
    };
  }
);

export const addEvent = createAsyncThunk(
  `${EVENTS_SLICE_NAME}/addEvent`,
  async ({ name, eventDateTime, notificationOffset }) => {
    const eventTime = new Date(eventDateTime).getTime();

    return {
      id: uuidv4(),
      name,
      eventDateTime: eventTime,
      notificationOffset: notificationOffset * 60000,
      createdAt: new Date().toISOString(),
      isNotified: false,
      isActive: true,
      timeLeft: 0,
    };
  }
);

export const removeEvent = createAsyncThunk(
  `${EVENTS_SLICE_NAME}/removeEvent`,
  async (eventId, { getState }) => {
    const state = getState();
    const eventIndex = state.event.events.findIndex(
      (event) => event.id === eventId
    );

    if (eventIndex !== -1) {
      const updatedEvents = state.event.events.filter(
        (event) => event.id !== eventId
      );
      saveEventsToLocalStorage(updatedEvents);
      return { eventId, event: state.event.events[eventIndex] };
    }

    throw new Error('Event not found');
  }
);

const reducers = {
  updateTimers: (state) => {
    const currentTime = Date.now();
    let notificationsCount = 0;

    state.events.forEach((event) => {
      if (event.isActive) {
        event.timeLeft = event.eventDateTime - currentTime;

        if (!event.isNotified && event.timeLeft <= event.notificationOffset) {
          event.isNotified = true;
          notificationsCount++;
        }

        if (event.timeLeft <= 0) {
          event.isActive = false;
          event.timeLeft = 0;
        }
      }
    });

    if (notificationsCount > 0) {
      state.notifications += notificationsCount;
    }
  },
  setDefaultNotification: (state, { payload }) => {
    state.defaultNotification = payload * 60 * 1000;
  },

  clearNotifications: (state) => {
    state.notifications = 0;
    state.events.forEach((event) => {
      if (event.isNotified) {
        event.isNotified = false;
      }
    });
    saveEventsToLocalStorage(state.events);
  },

  markEventAsInactive: (state, { payload }) => {
    const event = state.events.find((event) => event.id === payload);
    if (event) {
      event.isActive = false;

      if (event.isNotified && state.notifications > 0) {
        state.notifications--;
      }
      saveEventsToLocalStorage(state.events);
    }
  },

  clearError: (state) => {
    state.error = null;
  },

  clearEventsList: (state) => {
    state.events = [];
    state.notifications = 0;
    saveEventsToLocalStorage([]);
  },
};

const extraReducers = (builder) => {
  builder.addCase(loadEvents.pending, (state) => {
    state.isFeatching = true;
    state.error = null;
  });
  builder.addCase(loadEvents.fulfilled, (state, { payload }) => {
    state.isFeatching = false;
    state.events = payload.events;
    state.notifications = payload.notificationsCount;
  });
  builder.addCase(loadEvents.rejected, (state, { error }) => {
    state.isFeatching = false;
    state.error = error.message;
    state.events = [];
  });

  builder.addCase(addEvent.pending, (state) => {
    state.isFeatching = true;
    state.error = null;
  });
  builder.addCase(addEvent.fulfilled, (state, { payload }) => {
    state.events.push(payload);
    state.events.sort((a, b) => a.eventDateTime - b.eventDateTime);
    saveEventsToLocalStorage(state.events);
  });
  builder.addCase(addEvent.rejected, (state, { error }) => {
    state.isFeatching = false;
    state.error = error.message;
  });

  builder.addCase(removeEvent.pending, (state) => {
    state.isFeatching = true;
    state.error = null;
  });
  builder.addCase(removeEvent.fulfilled, (state, { payload }) => {
    state.isFeatching = false;
    const eventIndex = state.events.findIndex(
      (event) => event.id === payload.eventId
    );
    if (eventIndex !== -1) {
      if (state.events[eventIndex].isNotified && state.notifications > 0) {
        state.notifications--;
      }
      state.events.splice(eventIndex, 1);
    }
  });
  builder.addCase(removeEvent.rejected, (state, { error }) => {
    state.isFeatching = false;
    state.error = error.message;
  });
};

const eventSlice = createSlice({
  initialState,
  name: EVENTS_SLICE_NAME,
  reducers,
  extraReducers,
});

export const selectEventBadges = (state) => {
  const events = state.event.events;
  const defaultNotification = state.event.defaultNotification;

  let expired = 0;
  let lessDefault = 0;
  let acting = 0;

  events.forEach((event) => {
    if (!event.isActive || event.timeLeft <= 0) {
      expired++;
    } else if (event.timeLeft <= defaultNotification) {
      lessDefault++;
    } else {
      acting++;
    }
  });
  return { expired, lessDefault, acting };
};

const { reducer, actions } = eventSlice;

export const {
  updateTimers,
  clearNotifications,
  markEventAsInactive,
  clearError,
  setDefaultNotification,
  clearEventsList,
} = actions;

export default reducer;
