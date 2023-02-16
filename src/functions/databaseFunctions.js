import axios from "axios";

const PATH = `${process.env.REACT_APP_SERVER_URL}/index.php`;

/*********************** Get ************************/

// arrays

// master function
async function getArray(method) {
  let data;
  await axios
    .get(PATH, {
      params: { method },
    })
    .then((response) => {
      console.log(response);
      data = response.data;
    })
    .catch((err) => {
      console.error(err.message);
      throw new Error("Something went wrong with request: " + err.message);
    });
  return data;
}

export async function getGraduates() {
  return getArray("GET_GRADUATES");
}

export async function getDepartments() {
  return getArray("GET_DEPARTMENTS");
}

export async function getAttendees() {
  return getArray("GET_ATTENDEES");
}

export async function getManagers() {
  return getArray("GET_MANAGERS");
}

export async function getFaculty() {
  return getArray("GET_FACULTY");
}

//predictions

export async function getMatchingGraduates(enteredName) {
  let data;
  await axios
    .get(PATH, { params: { method: "GET_MATCHING_GRADUATES", enteredName } })
    .then((response) => {
      console.log(response);
      data = response.data;
    })
    .catch((err) => {
      console.error(err.message);
      throw new Error("Something went wrong with request: " + err.message);
    });

  return data;
}
export async function getMatchingFaculty(enteredName) {
  let data;
  await axios
    .get(PATH, { params: { method: "GET_MATCHING_FACULTY", enteredName } })
    .then((response) => {
      console.log(response);
      data = response.data;
    })
    .catch((err) => {
      console.error(err.message);
      throw new Error("Something went wrong with request: " + err.message);
    });

  return data;
}

// individuals

// master function
async function getIndividual(method, id) {
  let data;
  await axios
    .get(PATH, {
      params: { method, id },
    })
    .then((response) => {
      console.log(response);
      data = response.data;
    })
    .catch((err) => {
      console.error(err.message);
      throw new Error("Something went wrong with request: " + err.message);
    });

  return data;
}

export async function getGraduate(id) {
  return (await getIndividual("GET_GRADUATE", id))[0];
}

export async function getFacultyMember(id) {
  return (await getIndividual("GET_FACULTY_MEMBER", id))[0];
}

export async function getDepartment(id) {
  return (await getIndividual("GET_DEPARTMENT", id))[0];
}

export async function getManager(email) {
  return (await getIndividual("GET_MANAGER", email))[0];
}

/*********************** Add ************************/

export async function addGraduate(data) {
  const firstName = data.firstName;
  const lastName = data.lastName;
  const departmentId = data.departmentId;
  const email = data.email;
  const platinum = data.platinum ? 1 : 0;

  return axios
    .post(PATH, {
      firstName,
      lastName,
      departmentId,
      email,
      platinum,
      action: "ADD_GRADUATE",
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err.message);
      throw new Error("Something went wrong with request: " + err.message);
    });
}
export async function addFaculty(data) {
  const firstName = data.firstName;
  const lastName = data.lastName;
  const departmentId = data.departmentId;
  const email = data.email;

  return axios
    .post(PATH, {
      firstName,
      lastName,
      departmentId,
      email,
      action: "ADD_FACULTY",
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err.message);
      throw new Error("Something went wrong with request: " + err.message);
    });
}

export async function addAttendee(data) {
  return axios
    .post(PATH, {
      id: data.id,
      type: data.type,
      action: "ADD_ATTENDEE",
    })
    .then((response) => console.log(response))
    .catch((err) => {
      console.error(err.message);
      throw new Error("Something went wrong with request: " + err.message);
    });
}

export async function addManager(data) {
  return axios
    .post(PATH, {
      email: data.email,
      password: data.password,
      admin: data.admin ? 1 : 0,
      action: "ADD_MANAGER",
    })
    .then((response) => console.log(response))
    .catch((err) => {
      console.error(err.message);
      throw new Error("Something went wrong with request: " + err.message);
    });
}

export async function AddDepartment(data) {
  return axios
    .post(PATH, {
      name: data.name,
      action: "ADD_DEPARTMENT",
    })
    .then((response) => console.log(response))
    .catch((err) => {
      console.error(err.message);
      throw new Error("Something went wrong with request: " + err.message);
    });
}

/*********************** Remove ************************/

//master functions
async function removeItem(id, action) {
  return axios
    .post(PATH, {
      id,
      action,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err.message);
      throw new Error("Something went wrong with request: " + err.message);
    });
}
async function removeAllItems(action) {
  return axios
    .post(PATH, {
      action,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err.message);
      throw new Error("Something went wrong with request: " + err.message);
    });
}

export async function removeGraduate(data) {
  await removeItem(data.id, "REMOVE_ATTENDEE_BY_PERSON_ID");
  return removeItem(data.id, "REMOVE_GRADUATE");
}
export function removeAttendee(data) {
  return removeItem(data.id, "REMOVE_ATTENDEE");
}
export function removeManager(data) {
  return removeItem(data.id, "REMOVE_MANAGER");
}
export function removeDepartment(data) {
  return removeItem(data.id, "REMOVE_DEPARTMENT");
}

// Remove all data in tables

export function removeAllGraduates() {
  return removeAllItems("REMOVE_ALL_GRADUATES");
}
export function removeAllFaculty() {
  return removeAllItems("REMOVE_ALL_FACULTY");
}
