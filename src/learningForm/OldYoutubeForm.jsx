import React from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"

const initialValues = {
    name: '',
    email: '',
    channel: ''
};

const onSubmit = values => {
  console.log('form values', values);
};

const validate = values => {

  // values.name values.email values.channel
  // errors.name errors.email error.channel
  let errors = {}

  if(!values.name){
    errors.name = "Required";
  }

  if(!values.email){
    errors.email = "Required";
  }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid Email Format"
  }

  if(!values.channel){
    errors.channel = "Required";
  }

  return errors;
}

const validationSchema = yup.object({
  name: yup.string().required('Required'),
  email: yup.string().email('Invalid email format').required('Required'),
  channel: yup.string().required('Required')

})

const OldYoutubeForm = () => {

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema
    // validate: validate
  });

  console.log("visited fields", formik.touched);

  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
          <div className='form-control'>
              <label htmlFor='name'>Name</label>
              <input 
                type='text' 
                id='name' 
                name='name' 
                onChange={formik.handleChange} 
                value={formik.values.name}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null}
            </div>

            <div className='form-control'>
              <label htmlFor='name'>E-mail</label>
              <input 
                type='text' 
                id='email' 
                name='email' 
                onChange={formik.handleChange} 
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
            </div>

            <div className='form-control'>
              <label htmlFor='channel'>Channel</label>
              <input 
                type='text' 
                id='channel' 
                name='channel'
                onChange={formik.handleChange}
                value={formik.values.channel}
                onBlur={formik.handleBlur}
              />
              {formik.touched.channel && formik.errors.channel ? <div className='error'>{formik.errors.channel}</div> : null}
            </div>

            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default OldYoutubeForm;