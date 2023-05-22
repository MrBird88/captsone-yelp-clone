import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { login } from "../../store/session";

import "./LoginForm.scss";
import FormInput, { toInput } from "../FormElements/FormInput";
import DefaultButton from "../FormElements/DefaultButton";

function LoginFormPage() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validations
  useEffect(() => {
    setErrors({});
    const errorsObj = {};

    if (!credential) errorsObj.credential = "Must provide a Username or Email";
    else if (credential.length > 40)
      errorsObj.credential =
        "Username or Email must be less than 40 characters";

    if (!password) errorsObj.password = "Password required";
    else if (password.length > 50)
      errorsObj.password = "Password must be less than 50 characters.";

    setErrors(errorsObj);
  }, [credential, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitted(true);

    if (Object.values(errors).length === 0) {
      const data = await dispatch(login({ credential, password }));

      if (data) {
        const errorsObj = {};

        for (const error of data) {
          const [name, message] = error.split(" : ");
          errorsObj[name] = message;
        }

        return setErrors(errorsObj);
      }

      closeModal();
    }
  };

  return (
    <div className="login-form">
      <h1>
        Log In to&nbsp;<span>W</span>help...
      </h1>

      <form onSubmit={handleSubmit}>
        <FormInput
          input={toInput(
            "Username/Email",
            credential,
            setCredential,
            isSubmitted,
            errors.credential
          )}
        />

        <FormInput
          input={toInput(
            "Password",
            password,
            setPassword,
            isSubmitted,
            errors.password,
            "password"
          )}
        />

        <DefaultButton text={"Log In"} />
      </form>
    </div>
  );
}

export default LoginFormPage;
