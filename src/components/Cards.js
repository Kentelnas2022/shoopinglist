import React from "react";

function Cards(props) {
  return (
    <div className={`card-wrapper ${props.checked ? "checked" : ""}`}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onCheck}
      />
      <div className="product-info">
        <h5>{props.name}</h5>
        <p>₱{props.price.toFixed(2)}</p> 
      </div>
      <div className="buttons">
        <button className="edit-button" onClick={props.onEdit}>
          Edit
        </button>
        <button className="delete-button" onClick={props.onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Cards;
