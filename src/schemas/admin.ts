import * as yup from "yup";

export const adminSchema = yup.object().shape({
  password: yup.string().min(6).max(32).required(),
  admin: yup.object().shape({
    name: yup
      .object()
      .shape({
        firstName: yup.string().required("First name is required"),
        middleName: yup.string().optional(),
        lastName: yup.string().required("Last name is required"),
      })
      .required(),
    email: yup.string().email().required("Email is required"),
    designation: yup.string().required("Designation is required"),
    dateOfBirth: yup.string().required("Date Of Birth is required"),
  }),
});

export const updateAdminSchema = yup.object().shape({
  password: yup.string().min(6).max(32).optional(),
  admin: yup.object().shape({
    name: yup
      .object()
      .shape({
        firstName: yup.string().optional(),
        middleName: yup.string().optional(),
        lastName: yup.string().optional(),
      })
      .optional(),
    email: yup.string().email().optional(),
    designation: yup.string().optional(),
    dateOfBirth: yup.string().optional(),
    bloodGroup: yup.string().optional(),
    gender: yup.string().optional(),
    contactNo: yup.string().optional(),
    emergencyContactNo: yup.string().optional(),
    presentAddress: yup.string().optional(),
    permanentAddress: yup.string().optional(),
    department: yup.string().optional(),
    profileImage: yup.string().optional(),
  }),
});
