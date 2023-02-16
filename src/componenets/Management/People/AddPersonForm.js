import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  addGraduate,
  addFaculty,
  getDepartment,
} from "../../../functions/databaseFunctions";

import FormError from "../../Errors/FormError";

import SelectDepartment from "../../Layout/SelectDepartment";

import { c } from "../../../functions/utils";
import styles from "./AddPersonForm.module.css";

// keeps track of where scroll is when selecting department
let scrollY;

function AddPersonForm(props) {
  const queryClient = useQueryClient();

  const addGraduateMutation = useMutation({
    mutationFn: addGraduate,
    onSuccess: () => queryClient.fetchQuery(["getGraduates"]),
  });
  const addFacultyMutation = useMutation({
    mutationFn: addFaculty,
    onSuccess: () => queryClient.fetchQuery(["getFaculty"]),
  });

  const [enteredFistName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredDep, setEnteredDep] = useState(-1);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPlatinum, setEnteredPlatinum] = useState(false);

  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [depTouched, setDepTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [selectDepTouched, setSelectDepTouched] = useState(false);
  const [depName, setDepName] = useState();

  // input refs
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();

  // validity
  const firstNameValid =
    enteredFistName.length < 70 && enteredFistName.length >= 3;
  const lastNameValid =
    enteredLastName.length < 70 && enteredLastName.length >= 3;
  const depValid = enteredDep !== -1;
  const emailValid = enteredEmail.includes("@");

  async function formSubmitHandler(e) {
    e.preventDefault();

    setAllTouched(true);

    if (!firstNameValid || !lastNameValid || !depValid || !emailValid) {
      return;
    }

    props.type === "student"
      ? addGraduateMutation.mutate({
          firstName: enteredFistName,
          lastName: enteredLastName,
          departmentId: enteredDep,
          email: enteredEmail,
          platinum: enteredPlatinum,
        })
      : addFacultyMutation.mutate({
          firstName: enteredFistName,
          lastName: enteredLastName,
          departmentId: enteredDep,
          email: enteredEmail,
        });

    // clear fields
    clearAllFields();
    setAllTouched(false);

    firstNameRef.current.focus();
  }
  // get selected department name
  useEffect(() => {
    async function getDepName() {
      const fetchDepName = (await getDepartment(enteredDep)).department;
      console.log(fetchDepName);
      setDepName(fetchDepName);
    }

    if (enteredDep === -1) return;
    getDepName();
  }, [enteredDep]);

  // reset form fields on type change
  useEffect(() => {
    clearAllFields();
    setAllTouched(false);
  }, [props.type]);

  /*************************** Helper Functions ********************************/

  function setAllTouched(touched) {
    setFirstNameTouched(touched);
    setLastNameTouched(touched);
    setEmailTouched(touched);
    setDepTouched(touched);
    setSelectDepTouched(touched);
  }
  function clearAllFields() {
    setEnteredFirstName("");
    setEnteredLastName("");
    setEnteredEmail("");
    setEnteredDep(-1);
    setEnteredPlatinum(false);
  }

  /*************************** Form change handlers ********************************/
  function firstNameChangeHandler(e) {
    setEnteredFirstName(e.target.value);
  }

  function firstNameBlurHandler(e) {
    setFirstNameTouched(true);
  }
  function lastNameChangeHandler(e) {
    setEnteredLastName(e.target.value);
  }

  function lastNameBlurHandler(e) {
    setLastNameTouched(true);
  }

  function emailChangeHandler(e) {
    setEnteredEmail(e.target.value);
  }

  function emailBlurHandler(e) {
    setEmailTouched(true);
  }

  function selectDepartmentHandler(e) {
    e.preventDefault();

    scrollY = window.scrollY;
    //reset seleced department
    setEnteredDep(-1);
    setSelectDepTouched(true);
  }

  function selectDepartment(id) {
    setEnteredDep(id);
    setDepTouched(true);

    window.scrollTo(0, scrollY);
  }

  function platinumChangeHandler() {
    setEnteredPlatinum(!enteredPlatinum);
  }

  return (
    <React.Fragment>
      <form action="#" className={c("dataForm")}>
        {/*************************** Name *******************************/}
        <input
          name="firstName"
          type="text"
          ref={firstNameRef}
          value={enteredFistName}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          placeholder="first name..."
          className={c("textField", "input")}
        />
        {!firstNameValid && firstNameTouched && (
          <FormError
            title="Error first name Invalid"
            message="Name must be more than 2 letters and less than 71"
          />
        )}

        <input
          name="lastName"
          type="text"
          ref={lastNameRef}
          value={enteredLastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          placeholder="last name..."
          className={c("textField", "input")}
        />
        {!lastNameValid && lastNameTouched && (
          <FormError
            title="Error last name Invalid"
            message="Name must be more than 2 letters and less than 71"
          />
        )}
        {/*************************** email *******************************/}
        <input
          name="email"
          type="email"
          ref={emailRef}
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          placeholder="email..."
          className={c("textField", "input")}
        />
        {!emailValid && emailTouched && (
          <FormError
            title="Error Email Invalid"
            message="Email must be a vaild email address!"
          />
        )}
        {/*************************** Department *******************************/}
        <button
          onClick={selectDepartmentHandler}
          className={c("input", "coolBtn")}
        >
          {enteredDep === -1 ? "Select Department" : depName}
        </button>
        {selectDepTouched && !depValid && (
          <SelectDepartment selectDepartment={selectDepartment} />
        )}
        {!depValid && depTouched && (
          <FormError
            title="Error Department Invalid"
            message="Please select department"
          />
        )}
        {/*************************** Platinum *******************************/}
        {props.type === "student" && (
          <div className={c("input", styles.plat)}>
            <label htmlFor="platinum" className={c(styles.label)}>
              Platinum Performer
            </label>
            <input
              id="platinum"
              type="checkbox"
              onChange={platinumChangeHandler}
              className={c(styles.checkBox)}
            />
          </div>
        )}

        <button
          type="submit"
          onClick={formSubmitHandler}
          className={c("input", "coolBtn", styles.submitBtn)}
        >
          Add
        </button>
      </form>
    </React.Fragment>
  );
}

export default AddPersonForm;
