import React from 'react'
import { Field, Form, Formik, ErrorMessage, FieldArray, FastField } from 'formik'
import * as yup from "yup"
import TextError from './TextError';

const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
      facebook: '',
      twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
};

const onSubmit = values => {
  console.log('form values', values);
};


const validationSchema = yup.object({
  name: yup.string().required('Required'),
  email: yup.string().email('Invalid email format').required('Required'),
  channel: yup.string().required('Required')

})

const validationComments = value => {
  let error

  if(!value){
    error = 'Required'
  }
  return error;
}

const YoutubeForm = () => {

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {
        formik => {
          console.log('formik', formik);
          return (
            <Form>
              <div className='form-control'>
                <label htmlFor='name'>Name</label>
                <Field type='text' id='name' name='name' />
                <ErrorMessage name='name' component={TextError}/>
              </div>

                <div className='form-control'>
                  <label htmlFor='name'>E-mail</label>
                  <Field 
                    type='text' id='email' name='email' />
                  <ErrorMessage name='email'>
                    {
                      (errorMsg) => <div className='error'>{errorMsg}</div>
                    }
                  </ErrorMessage>
                </div>

                <div className='form-control'>
                  <label htmlFor='channel'>Channel</label>
                  <Field 
                    type='text' 
                    id='channel' 
                    name='channel'
                    placeholder="Youtube channel name"
                  />
                  <ErrorMessage name='channel'/>
                </div>

                <div className='form-control'>
                  <label htmlFor='comments'>Comments</label>
                  <Field as="textarea" id="comments" name="comments" validate={validationComments}/>
                  <ErrorMessage name='comments' component={TextError}/>
                </div>

                <div  className='form-control'>
                  <label htmlFor='address'>Address</label>
                  <FastField name="address">
                    {
                      (props) => {
                        const {field, form, meta} = props
                        console.log('field render...');
                        return (
                        <div>
                          <input id='address' {...field}/>
                          {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                        </div>
                        )
                      }
                    }
                  </FastField>
                </div>

                <div className='form-control'>
                    <label htmlFor='facebook'>Facebook profile</label>
                    <Field type="text" id="facebook" name="social.facebook"/>
                </div>

                <div className='form-control'>
                    <label htmlFor='twitter'>twitter profile</label>
                    <Field type="text" id="twitter" name="social.twitter"/>
                </div>

                <div className='form-control'>
                    <label htmlFor='primaryPh'>Primary phone number</label>
                    <Field type="text" id="primaryPh" name="phoneNumbers[0]"/>
                </div>

                <div className='form-control'>
                    <label htmlFor='secondaryPh'>Secondary phone number</label>
                    <Field type="text" id="primaryPh" name="phoneNumbers[1]"/>
                </div>

                <div className='form-control'>
                    <label>List of phone numbers</label>
                    <FieldArray name='phNumbers'>
                      {(fieldArrayProps) => {
                        const {push, remove, form} = fieldArrayProps
                        const {values} = form
                        const {phNumbers} = values
                        console.log('form errors', form.errors);
                        return <div>
                          {phNumbers.map((phNumber, index) => (
                              <div key={index}>
                                <Field name={`phNumber[${index}]`}/>
                                <button type='button' onClick={() => remove(index)}> - </button>
                                <button type='button' onClick={() => push('')}> + </button>
                              </div>
                          ))}
                        </div>
                      }}
                    </FieldArray>
                </div>
                
                <button type='button' onClick={() => formik.validateField('comments')}>Validate Comments</button>
                <button type='button' onClick={() => formik.validateForm}>Validate all</button>
                <button type='submit' disabled={!formik.isValid}>Submit</button>
            </Form>
          )
        }
      }
        
    </Formik>
  )
}

export default YoutubeForm