import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import cx from 'classnames';
import { addEvent } from '../../../store/slices/eventSlice';
import Schema from '../../../utils/validators/validationSchems';
import styles from './EventsForm.module.sass';

const EventsForm = ({addEvent, error}) => {
  const initialState = {
    eventName: '',
    eventDateTime: '',
    notificationTime: 30,
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
      <Formik
        initialValues={initialState}
        onSubmit={submitHandler}
        validationSchema={Schema.EventSchema}
      >
        {(formikProps) => {
          return (
            <Form>
              <Field
                type="text"
                name="eventName"
                id="eventName"
                placeholder="Add new event"
              />
              <ErrorMessage name="eventName" component="p" />

              <Field
                type="datetime-local"
                name="eventDateTime"
                id="eventDateTime"
                min={getCurrentDateTime()}
              />
              <ErrorMessage name="eventDateTime" component="p" />

              <Field
                type="number"
                name="notificationTime"
                id="notificationTime"
                min="1"
                max="1440"
                step="1"
              />
              <ErrorMessage name="notificationTime" component="p" />

              <button type="submit">Add event</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.event.error,
});

const mapDispatchToProps = (dispatch) => ({
  addEvent: (name, eventDateTime, notificationTime) => {
    return dispatch(addEvent(name, eventDateTime, notificationTime));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsForm);
