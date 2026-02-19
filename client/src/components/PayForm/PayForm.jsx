
import React from 'react';
import Cards from 'react-credit-cards-2';
import { Form, Formik } from 'formik';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { connect } from 'react-redux';
import styles from './PayForm.module.sass';
import { changeFocusOnCard, clearPaymentStore } from '../../store/slices/paymentSlice';
import PayInput from '../InputComponents/PayInput/PayInput';
import Schems from '../../utils/validators/validationSchems';
import Error from '../Error/Error';

const PayForm = (props) => {
  const changeFocusOnCard = (name) => {
    props.changeFocusOnCard(name);
  };

  const pay = (values) => {
    props.sendRequest(values);
  };

  const { focusOnElement, isPayForOrder, paymentError, clearPaymentError } = props;

  return (
    <div className={styles.payFormContainer}>
      {paymentError && (
        <Error
          data={
            paymentError.data && typeof paymentError.data === 'string' && paymentError.data.trim().startsWith('<')
              ? 'The server is unavailable. Please try again later.'
              : paymentError.data?.message || paymentError.data || 'Payment error.'
          }
          status={paymentError.status}
          clearError={clearPaymentError}
        />
      )}

      <span className={styles.headerInfo}>Payment Information</span>
      <Formik
        initialValues={{
          focusOnElement: '',
          name: '',
          number: '',
          cvc: '',
          expiry: '',
        }}
        onSubmit={pay}
        validationSchema={Schems.PaymentSchema}
      >
        {({ values }) => {
          const { name, number, expiry, cvc } = values;

          return (
            <>
              <div className={styles.cardContainer}>
                <Cards
                  number={number || ''}
                  name={name || ''}
                  expiry={expiry || ''}
                  cvc={cvc || ''}
                  focused={focusOnElement}
                />
              </div>
              <Form id="myForm" className={styles.formContainer}>
                <div className={styles.bigInput}>
                  <span>Name</span>
                  <PayInput
                    name="name"
                    classes={{
                      container: styles.inputContainer,
                      input: styles.input,
                      notValid: styles.notValid,
                      error: styles.error,
                    }}
                    type="text"
                    label="name"
                    changeFocus={changeFocusOnCard}
                  />
                </div>
                {!isPayForOrder && (
                  <div className={styles.bigInput}>
                    <span>Sum</span>
                    <PayInput
                      name="sum"
                      classes={{
                        container: styles.inputContainer,
                        input: styles.input,
                        notValid: styles.notValid,
                        error: styles.error,
                      }}
                      type="text"
                      label="sum"
                    />
                  </div>
                )}
                <div className={styles.bigInput}>
                  <span>Card Number</span>
                  <PayInput
                    isInputMask
                    mask="9999 9999 9999 9999"
                    name="number"
                    classes={{
                      container: styles.inputContainer,
                      input: styles.input,
                      notValid: styles.notValid,
                      error: styles.error,
                    }}
                    type="text"
                    label="card number"
                    changeFocus={changeFocusOnCard}
                  />
                </div>
                <div className={styles.smallInputContainer}>
                  <div className={styles.smallInput}>
                    <span>* Expires</span>
                    <PayInput
                      isInputMask
                      mask="99/99"
                      name="expiry"
                      classes={{
                        container: styles.inputContainer,
                        input: styles.input,
                        notValid: styles.notValid,
                        error: styles.error,
                      }}
                      type="text"
                      label="expiry"
                      changeFocus={changeFocusOnCard}
                    />
                  </div>
                  <div className={styles.smallInput}>
                    <span>* Security Code</span>
                    <PayInput
                      name="cvc"
                      classes={{
                        container: styles.inputContainer,
                        input: styles.input,
                        notValid: styles.notValid,
                        error: styles.error,
                      }}
                      type="password"
                      inputMode="numeric"
                      label="cvc"
                      changeFocus={changeFocusOnCard}
                    />
                  </div>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
      {isPayForOrder && (
        <div className={styles.totalSum}>
          <span>Total: $100.00 USD</span>
        </div>
      )}
      <div className={styles.buttonsContainer}>
        <button form="myForm" className={styles.payButton} type="submit">
          <span>{isPayForOrder ? 'Pay Now' : 'CashOut'}</span>
        </button>
        {isPayForOrder && (
          <div onClick={() => props.back()} className={styles.backButton}>
            <span>Back</span>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  paymentError: state.payment?.error, 
});

const mapDispatchToProps = (dispatch) => ({
  changeFocusOnCard: (data) => dispatch(changeFocusOnCard(data)),
  clearPaymentStore: () => dispatch(clearPaymentStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PayForm);