import React, {useState} from "react";
import "../authentication/loginPage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import Loading from "../external_components/spinners/loading";
import {useNavigate} from "react-router";
import {userLogin} from "../../api/managements/userApi";
import {SuccessAlert} from "../../sweet_alerts/success";
import {ErrorAlert} from "../../sweet_alerts/error";
import {setTokenToLocalStorage} from "./tokenHandling";

const eye = <FontAwesomeIcon icon={faEye}/>;
const sleye = <FontAwesomeIcon icon={faEyeSlash}/>;

export default function Login() {

  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Password toggle handler
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  function navigateToPage(role) {

    (role === "company") ? (alert("Company")) : (role === "user") ? (alert("User")) : (alert("admin"))
    //
    // if (role === "company") {
    //   // navigate("/adminHome");
    //   alert("company");
    //   return
    // }
    //
    // if (role === "user") {
    //   alert("user")
    //   return
    //   // navigate("/userHome");
    // }
    //
    // alert("admin")
    // // navigate("/companyHome");
  }

  async function UserLogin(e) {
    try {
      e.preventDefault();
      setLoading(false);

      const content = {
        email: document.getElementById("email").value,
        password
      }

      setLoading(true)

      const login = await userLogin(content)

      if (login) {
        await SuccessAlert("Successfully!")
        await setTokenToLocalStorage(login.data.token)
        navigateToPage(login.data.role);
      }
      setLoading(false)

    } catch (error) {
      console.log(error)
      // if (error.response.status === 401) {
      //   await ErrorAlert("Invalid Email or Password!");
      //   return;
      // }
      // await ErrorAlert("Something went wrong!");
    }

  }

  return (
      <div className="container login">
        <div className="card">
          <div className="card-body">
            <br/>
            <div className="logo text-center">
              <img
                  src="./images/SPMLogo.png"
                  width="420"
              height="320"
              className="img-fluid logoImage"
              alt="Logo"
            />
          </div>
          <br />
            <br/>
            <form onSubmit={UserLogin}>
              <div className="mb-3 input">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                />
            </div>

            <div className="mb-3 input">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                  type={passwordShown ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
              />
              <span className="p-viewer">
                <i
                    id="eyeIcon"
                    className={`fa ${
                        passwordShown ? "fa-eye" : "fa-eye-slash"
                    } password-icon`}
                    onClick={togglePasswordVisibility}
                >
                  {" "}
                </i>
              </span>
            </div>
              <div className="text-center">
                {loading && <Loading/>}
                <button type="submit" className="btn btn-primary loginButton">
                  Log In
                </button>
              </div>
          </form>

          <span className="text-center" id="links">
            <a id="clickme">Join Now</a>
            <br id="clikmeBr" />
            <a id="clickme">Start Hiring</a>
          </span>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
