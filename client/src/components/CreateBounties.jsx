import React, { useState, useEffect } from "react";

export default function CreateBounties(props) {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    alive: true,
    bountyPrice: 0,
    type: "",
  });

  // Update inputs state when props change
  useEffect(() => {
    setInputs({
      firstName: props.firstName || "",
      lastName: props.lastName || "",
      alive: props.alive || true,
      bountyPrice: props.bountyPrice || 0,
      type: props.type || "",
    });
  }, [props]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setInputs((prev) => ({ ...prev, [name]: checked }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.submit(inputs, props._id);
    setInputs({
      firstName: "",
      lastName: "",
      alive: true,
      bountyPrice: 0,
      type: "",
    });
    props.setEditToggle(false); // Call the function to toggle editToggle in the parent component
  }

  return (
    <div className="form-container-container">
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="firstName"
          value={inputs.firstName}
          onChange={handleChange}
          placeholder="first name"
          className="form-container-inputs"
        />

        <input
          type="text"
          name="lastName"
          value={inputs.lastName}
          onChange={handleChange}
          placeholder="Last name"
          className="form-container-inputs"
        />

        <input
          type="number"
          name="bountyPrice"
          value={inputs.bountyPrice}
          onChange={handleChange}
          placeholder="Price"
          className="form-container-inputs"
        />

        <span className="alive-txt"> Alive? </span>
        <input
          type="checkbox"
          name="alive"
          checked={inputs.alive}
          onChange={handleChange}
          className="form-container-check"
        />

        <select
          name="type"
          value={inputs.type}
          onChange={handleChange}
          className="form-container-inputs"
        >
          <option value="">Select Faction</option>
          <option value="jedi">Jedi</option>
          <option value="sith">Sith</option>
        </select>
        <button type="submit" className="form-container-inputs">
          {props.btnTxt}
        </button>
      </form>
    </div>
  );
}
