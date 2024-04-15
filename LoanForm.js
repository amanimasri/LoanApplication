import { useState } from "react";
import "./LoanForm.css";
import LoanModal from "./LoanModal";

export default function LoanForm() {
  const [formInputs, setFormInputs] = useState({
    inputName: "",
    inputPhone: "",
    inputAge: "",
    checkEmployee: false,
    selectSalary: "L",
  });

  const [modalInfo, setModalInfo] = useState({
    modalMessage: "Your Loan Submitted Successfully",
    modalColor: "green",
  });
  let buttonAttributes = {
    "data-bs-toggle": "modal",
    "data-bs-target": "#LoanModal",
  };

  function handleInput(e) {
    setFormInputs({
      ...formInputs,
      [e.target.id]: e.target.value,
    });
  }

  function handlecheckEmployee(e) {
    setFormInputs({
      ...formInputs,
      checkEmployee: e.target.checked,
    });
  }

  function handleButtonDisabled() {
    if (
      formInputs.inputName === "" ||
      formInputs.inputPhone === "" ||
      formInputs.inputAge === ""
    ) {
      return true;
    }
    return false;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setModalInfo({
      modalMessage: "Your Loan Submitted Successfully",
      modalColor: "green",
    });
    const { inputAge } = formInputs;
    const { inputPhone } = formInputs;
    if (inputAge < 18 || inputAge > 100) {
      setModalInfo({
        modalMessage: "Your Age is not Allowed",
        modalColor: "orange",
      });
    } else if (inputPhone.length < 10 || inputPhone.length > 12) {
      setModalInfo({
        modalMessage: "Your Phone Number is not Allowed",
        modalColor: "orange",
      });
    }
  }

  return (
    <div className="container main-section shadow">
      <h4 className="h-title">Requesting a Loan</h4>
      <hr style={{ color: "red" }} />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            value={formInputs.inputName}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPhone" className="form-label">
            Phone Number:
          </label>
          <input
            type="tel"
            className="form-control"
            id="inputPhone"
            value={formInputs.inputPhone}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputAge" className="form-label">
            Age:
          </label>
          <input
            type="number"
            className="form-control"
            id="inputAge"
            placeholder="between 18 and 100"
            value={formInputs.inputAge}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="checkEmployee"
            checked={formInputs.checkEmployee}
            onChange={handlecheckEmployee}
          />
          <label className="form-check-label" htmlFor="checkEmployee">
            Are you Employee?
          </label>
        </div>
        <div>
          <label className="form-label" htmlFor="selectSalary">
            Salary
          </label>
          <select
            className="mb-3 form-select"
            id="selectSalary"
            value={formInputs.selectSalary}
            onChange={handleInput}
          >
            <option value="L">Less than 500$</option>
            <option value="B">Between 500$ and 2000$</option>
            <option value="A">Above 2000$</option>
          </select>
        </div>
        <button
          {...buttonAttributes}
          type="submit"
          className="btn btn-primary btn-submit"
          style={{
            backgroundColor: handleButtonDisabled() ? "#6c757d" : "#0eb1d2",
          }}
          id="btn-submit"
          disabled={handleButtonDisabled()}
        >
          Submit
        </button>
      </form>
      <LoanModal
        userName={formInputs.inputName}
        modalMsg={modalInfo.modalMessage}
        modalColor={modalInfo.modalColor}
      />
    </div>
  );
}
