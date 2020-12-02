import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../../redux/actions/auth";
import classes from "./Registration.module.css";

const initialValues = {
  firstname: "Monis",
  email: "",
  lastname: "Bana",
  password: "",
  changepassword: "",
  acceptTerms: false,
};

function Registration(props) {
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
      props
        .register({
          username: values.username,
          email: values.email,
          password: values.password,
        })
        .catch(() => {
          setSubmitting(false);
          disableLoading();
        });
    },
  });

  return (
    <div className={classes.form} style={{ display: "block" }}>
      <div className={classes.head}>
        <h3>Sign Up</h3>
        <p>Enter your details to create your account</p>
      </div>

      <form id="kt_login_signin_form" onSubmit={formik.handleSubmit}>
        {/* begin: Alert */}
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}
        {/* end: Alert */}

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
        {/* begin: Email */}
        <div className={classes.form_group}>
          <input
            placeholder="Email"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        {/* end: Email */}

        {/* begin: Password */}
        <div className={classes.form_group}>
          <input
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        {/* end: Password */}

        {/* begin: Confirm Password */}
        <div className={classes.form_group}>
          <input
            placeholder="Confirm Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "changepassword"
            )}`}
            name="changepassword"
            {...formik.getFieldProps("changepassword")}
          />
          {formik.touched.changepassword && formik.errors.changepassword ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                {formik.errors.changepassword}
              </div>
            </div>
          ) : null}
        </div>
        {/* end: Confirm Password */}

        <div className={classes.submit_div}>
          <button type="submit" className={classes.submit_btn}>
            <span>Submit</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>

          <Link to="/auth/login">
            <button type="button" className={classes.cancel_btn}>
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { register })(Registration);
