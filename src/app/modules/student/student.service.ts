import { Student } from "../student.models";
import { TStudent } from "./student.interface";
// import { StudentModel } from "../student.models";

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("User already Exists");
  }

  // const student = new Student(studentData); //create instance
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error("User already Exists");
  // }
  // const result = await student.save(); // built in instance method
  const result = await Student.create(studentData); //built in static method
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentsFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentsFromDB,
};
