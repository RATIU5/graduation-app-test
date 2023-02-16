import { getDepartments, getFaculty, getGraduates } from "./databaseFunctions";

export function getDepartmentId(departments, departmentName) {
  if (!departments) return null;

  for (const department of departments) {
    if (department.department === departmentName) {
      return department.id;
    }
  }
}

export async function getGraduateIdByName(firstName, lastName) {
  let data;
  const graduates = await getGraduates();

  graduates.forEach((element) => {
    if (element.firstName === firstName && element.lastName === lastName) {
      data = element;
    }
  });

  return data;
}
