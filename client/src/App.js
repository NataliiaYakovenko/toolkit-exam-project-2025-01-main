import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { loadEvents, updateTimers } from './store/slices/eventSlice';
import Router from './router';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import Home from './pages/Home/Home';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import CONSTANTS from './constants';
import browserHistory from './browserHistory';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import Layout from './pages/Layout/Layout';
import OnlyNotAuthorizedUserRoute from './components/Routes/OnlyNotAuthorizedUserRoute/OnlyNotAuthorizedUserRoute';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';
import HowItWorksPage from './pages/HowItWorksPage/HowItWorksPage';
import EventsPage from './pages/EventsPage/EventsPage';
import ModeratorPage from './pages/ModeratorPage/ModeratorPage';
import OnlyForModerator from './components/Routes/OnlyForModerator/OnlyForModerator';
import OnlyForCreatorAndCustomer from './components/Routes/OnlyForCreatorAndCustomer/OnlyForCreatorAndCustomer';

class App extends Component {
  componentDidMount() {
    const { loadEvents, updateTimers } = this.props;

    loadEvents();
    const notifiedEventIds = new Set();
    this.intervalId = setInterval(() => {
      updateTimers();
      const notifiedEvents = this.props.events.filter(
        (event) => event.isNotified && event.isActive && !notifiedEventIds.has(event.id)
      );

      if (notifiedEvents.length > 0) {
        toast.info(
          `Remainder ${notifiedEvents.length} events for which the reminder time has arrived!`,
          {
            toastId: 'notified-events-count',
            className: 'toast-red',
            bodyClassName: 'toast-red-body',
            onClose: (reason) => {
              if (reason) {
                this.props.events.forEach((event) => {
                  if (event.isNotified && event.isActive) {
                    notifiedEventIds.add(event.id);
                  }
                });
              }
            },
          }
        );
      }
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <Router history={browserHistory}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
          c
        />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route element={<OnlyNotAuthorizedUserRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="/payment" element={<Payment />} />
              <Route path="/startContest" element={<StartContestPage />} />
              <Route
                path="/startContest/nameContest"
                element={
                  <ContestCreationPage
                    contestType={CONSTANTS.NAME_CONTEST}
                    title="Company Name"
                  />
                }
              />
              <Route
                path="/startContest/taglineContest"
                element={
                  <ContestCreationPage
                    contestType={CONSTANTS.TAGLINE_CONTEST}
                    title="TAGLINE"
                  />
                }
              />
              <Route
                path="/startContest/logoContest"
                element={
                  <ContestCreationPage
                    contestType={CONSTANTS.LOGO_CONTEST}
                    title="LOGO"
                  />
                }
              />
              <Route element={<OnlyForCreatorAndCustomer />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contest/:id" element={<ContestPage />} />
              </Route>
                <Route path="/account" element={<UserProfile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/events" element={<EventsPage />} />
            <Route element={<OnlyForModerator />}>
              <Route path="/moderator/offers" element={<ModeratorPage />} />
            </Route>
          </Route>
          <Route path="/howItWorks" element={<HowItWorksPage />} />
        </Routes>
        <ChatContainer />
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.event.events,
});

const mapDispatchToProps = {
  loadEvents,
  updateTimers,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

