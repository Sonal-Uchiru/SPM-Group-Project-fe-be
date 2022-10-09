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
import {App_Routes} from "../../constant/appRoutes";
import {Link} from "react-router-dom";
import {setRoleToLocalStorage} from "./roleHandling";

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

    const navigateToPage = async (role) => {
        await setRoleToLocalStorage(role)
        if (role === "company") {
            navigate(App_Routes.VIEW_ALL_COMPANY_OWN_JOBS);
            return
        }

        if (role === "user") {
            navigate(App_Routes.VIEW_ALL_JOBS);
            return
        }

        if (role === "admin") {
            navigate(App_Routes.USER_LIST);
        }
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
          await setTokenToLocalStorage(login.data.token)
          setLoading(false)
          await navigateToPage(login.data.role);
      }

    } catch (error) {

      setLoading(false)
      // console.log(error)
      if (error.response.status === 401) {
        await ErrorAlert("Invalid Email or Password!");
        setLoading(false)
        return;
      }
      await ErrorAlert("Something went wrong!");
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
            <Link id="clickme" to={App_Routes.USER_SIGN_UP}>Join Now</Link>
            <br id="clikmeBr"/>
            <Link id="clickme" to={App_Routes.COMPANY_SIGN_UP}>Start Hiring</Link>
          </span>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
