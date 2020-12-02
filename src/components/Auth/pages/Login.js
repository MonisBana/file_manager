import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { login, loadUser } from "../../../redux/actions/auth";
import classes from "./Login.module.css";

const initialValues = {
  username: "Monis",
  password: "abcd",
};

function Login(props) {
  const [loading, setLoading] = useState(false);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        props
          .login({ username: values.username, password: values.password })
          .then(props.loadUser())
          .catch(() => {
            disableLoading();
            setSubmitting(false);
          });
      }, 1000);
    },
  });

  return (
    <div className={classes.login_form} id="kt_login_signin_form">
      {/* begin::Head */}
      <div className={classes.login_head}>
        <h3>Sign In</h3>
        <p>Enter your username and password</p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.form_group}>
          <label>Username</label>
          <input
            placeholder="Username"
            type="text"
            name="username"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.username}</div>
            </div>
          ) : null}
        </div>
        <div className={classes.form_group}>
          <label>Password</label>
          <input
            placeholder="Password"
            type="password"
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className={classes.submit_div}>
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Sign In</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login, loadUser })(Login);
