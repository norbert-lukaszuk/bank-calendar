import React from "react";

const AddEvent = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Event title" />
        <input type="text" placeholder="amount" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddEvent;
