import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
  loading: false,
  error: null,
  defaultNotification: 30 * 60 * 1000,
};



const eventSlice = createSlice({
  initialState,
  name: 'events',
  reducers: {
    addEvent: {
      reducer: (state, { payload }) => {
        const newEvent = {
          id: uuidv4(),
          name: payload.name,
          eventDateTime: payload.eventDateTime,
          notificationOffset: payload.notificationOffset,
          createdAt: new Date().toISOString(),
          isNotified: false,
          isActive: true,
          timeLeft: payload.eventDateTime - Date.now(),
        };
        state.events.push(newEvent);
        state.events.sort((a, b) => {
          return a.eventDateTime - b.eventDateTime;
        });
        saveEventsToLocalStorage(state.events);
      },

      prepare: (name, eventDateTime, notificationOffset) => {
        return {
          payload: {
            name,
            eventDateTime: new Date(eventDateTime).getTime(),
            notificationOffset: notificationOffset * 60000,
          },
        };
      },
    },

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

    removeEvent: (state, { payload }) => {
      const eventIndex = state.events.findIndex((event) => {
        return event.id === payload;
      });
      if (eventIndex !== -1) {
        if (state.events[eventIndex].isNotified && state.notifications > 0) {
          state.notifications--;
        }
        state.events.splice(eventIndex, 1);
        saveEventsToLocalStorage(state.events);
      }
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

    loadEvents: (state) => {
      const events = loadEventsFromLocalStorage();
      const now = Date.now();

      events.forEach((event) => {
        event.timeLeft = event.eventDateTime - now;

        if (event.timeLeft <= 0) {
          event.isActive = false;
          event.timeLeft = 0;
        }

        if (!event.isNotified && event.timeLeft <= event.notificationOffset) {
          event.isNotified = true;
          state.notifications++;
        }
      });

      state.events = events.sort((a, b) => a.eventDateTime - b.eventDateTime);
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});



export const selectEventBadges = (state) => {
  const events = state.event.events;
  const defaultNotification = state.event.defaultNotification


  let expired = 0;
  let lessDefault = 0;
  let acting = 0;

  events.forEach((event) => {
    if (event.timeLeft < 0 || event.timeLeft === 0) {
      expired++;
    } else if (event.timeLeft > 0 && event.timeLeft < defaultNotification) {
      lessDefault++;
    } else {
      acting++;
    }
  });
  return { expired, lessDefault, acting };
};



const { reducer, actions } = eventSlice;

export const {
  addEvent,
  updateTimers,
  removeEvent,
  clearNotifications,
  markEventAsInactive,
  loadEvents,
  clearError,
  setDefaultNotification
} = actions;



export default reducer;
