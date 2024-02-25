import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  password: Yup.string().required("Required").min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  dob: Yup.date().required("Required"),
  skills: Yup.array().of(Yup.string()).min(1, "Please select at least one skill"),
});

const FormikForm = () => (
  <div>
    <h1>Sign Up</h1>
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        gender: "",
        password: "",
        confirmPassword: "",
        dob: "",
        skills: [],
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        console.log(values);
        // You can perform your CRUD operations here
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" />
            <ErrorMessage name="firstName" component="div" />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" />
            <ErrorMessage name="lastName" component="div" />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <Field name="gender" as="select">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Field>
            <ErrorMessage name="gender" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field name="confirmPassword" type="password" />
            <ErrorMessage name="confirmPassword" component="div" />
          </div>
          <div>
            <label htmlFor="dob">Date of Birth</label>
            <Field name="dob" type="date" />
            <ErrorMessage name="dob" component="div" />
          </div>
          <div>
            <label htmlFor="skills">Skills</label>
            <Field name="skills" as="select" multiple>
              <option value="javascript">JavaScript</option>
              <option value="react">React</option>
              <option value="node">Node.js</option>
              <option value="python">Python</option>
            </Field>
            <ErrorMessage name="skills" component="div" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default FormikForm;
