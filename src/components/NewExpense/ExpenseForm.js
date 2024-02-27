import React from 'react';
import { Subject, combineLatestAll } from 'rxjs';

import './ExpenseForm.css';

const ExpenseForm = (props) => {
  const title$ = new Subject();
  const amount$ = new Subject();
  const date$ = new Subject();
  
  const formData$ = combineLatestAll(title$, amount$, date$);
const {enteredTitle,enteredAmount,enteredDate}=''
  formData$.subscribe(([enteredTitle, enteredAmount, enteredDate]) => {
   const  expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };
    // Trigger function to save expense data (e.g., onSaveExpenseData(expenseData))
    props.onSaveExpenseData(expenseData);
  });

  //title handler,amouthandler,datehandler
const titleChangeHandler = (event) => title$.next(event.target.value);
const amountChangeHandler = (event) => amount$.next(event.target.value);
const dateChangeHandler = (event) => date$.next(event.target.value);

  const submitHandler = (event) => {
    event.preventDefault();
    //props.onSaveExpenseData(expenseData);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input
            type='text'
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input
            type='date'
            min='2019-01-01'
            max='2022-12-31'
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
