import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import cx from 'classnames';
import { addEvent} from '../../../store/slices/eventSlice';
import Schema from '../../../utils/validators/validationSchems';
import styles from './EventsForm.module.sass';
import EventsList from '../EventsList/EventsList';
import EventsBadges from '../EventsBadges/EventBadges';


const EventsForm = ({ addEvent, defaultNotification }) => {
  const initialState = {
    eventName: '',
    eventDateTime: '',
    notificationTime: defaultNotification / (60 * 1000),
  };

  const submitHandler = (values, actions) => {
    addEvent(values.eventName, values.eventDateTime, values.notificationTime);
    actions.resetForm();
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date();

    currentDate.setHours(currentDate.getHours() + 1);
    return currentDate.toISOString().slice(0, 16);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPart}>
        <Formik
          initialValues={initialState}
          onSubmit={submitHandler}
          validationSchema={Schema.EventSchema}
        >
          {(formikProps) => {
            return (
              <Form>
                <div className={styles.wrapper}>
                  <div className={styles.box}>
                    <label className={styles.titel}>Event name *</label>
                    <Field
                      className={cx(styles.eventInput, {
                        [styles.inValidInput]:
                          formikProps.errors.eventName &&
                          formikProps.touched.eventName,
                      })}
                      type="text"
                      name="eventName"
                      id="eventName"
                      placeholder="Add new event"
                    />
                    <ErrorMessage
                      className={styles.error}
                      name="eventName"
                      component="p"
                    />
                  </div>

                  <div className={styles.box}>
                    <label className={styles.titel}>
                      Event date and time *
                    </label>
                    <Field
                      className={styles.eventInput}
                      type="datetime-local"
                      name="eventDateTime"
                      id="eventDateTime"
                      min={getCurrentDateTime()}
                    />
                    <ErrorMessage
                      className={styles.error}
                      name="eventDateTime"
                      component="p"
                    />
                  </div>

                  <div className={styles.box}>
                    <label className={styles.titel}>
                      Notify me (minutes before) *
                    </label>
                    <Field
                      className={styles.eventInput}
                      type="number"
                      name="notificationTime"
                      id="notificationTime"
                      min="1"
                      max="1440"
                      step="1"
                    />
                    <ErrorMessage
                      className={styles.error}
                      name="notificationTime"
                      component="p"
                    />
                  </div>

                  <button type="submit">Add event</button>
                </div>
              </Form>
            );
          }}
        </Formik>

        <EventsBadges />
      </div>

      <EventsList />
    </div>
  );
};

const mapStateToProps = (state) => ({
  defaultNotification: state.event.defaultNotification,
});

const mapDispatchToProps = (dispatch) => ({
  addEvent: (name, eventDateTime, notificationTime) => {
    return dispatch(addEvent(name, eventDateTime, notificationTime));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsForm);
