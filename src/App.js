import {React, useState} from "react";
import {useFormik} from 'formik'
import styled from 'styled-components'
import './App.css';

const Button = styled.button`
  display: block;
  color: #001f3f;
  background-color: #7FDBFF;
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #001f3f;
  border-radius: 3px;
`;

function App() {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validateOnChange: validateAfterSubmit,
    onSubmit: values => {
      console.log('form:', values);
      if (values.name && values.password){alert("Login successful");
      setValidateAfterSubmit(true);
      }
    },
    validate: values => {
      let errors = {};
      if(!values.name) errors.name = 'Field Required';
      if(!values.password) errors.password = 'Field Required';
      if(!values.email) errors.email = 'Field Required';
      if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Invalid email address';
      return errors;
    }

  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
          <div className="label">Name</div>
          <input name="name" type="text" onChange={formik.handleChange} value={formik.values.name}/>
          {formik.errors.name ? <div style={{color:'red'}}>{formik.errors.name}</div> : null}
          <div className="label">Email</div>
          <input id="emailField" name="email" type="text" onChange={formik.handleChange} value={formik.values.email}/>
          {formik.errors.email ? <div id="emailError" style={{color:'red'}}>{formik.errors.email}</div> : null}
          <div className="label">Password</div>
          <input id="pswField" name="password" type="text" onChange={formik.handleChange} value={formik.values.password}/> 
          {formik.errors.password ? <div id="pswError" style={{color:'red'}}>{formik.errors.password}</div> : null}
          <Button id="submitBtn" type="submit">Submit</Button>    
      </form>
    </div>
  );
}

export default App;
