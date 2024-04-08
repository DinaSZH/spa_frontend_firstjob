import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerMentor,
  setError,
  setSignupSuccess,
} from "../../store/slices/authSlice";
import { Loader, Text, Textarea } from "@mantine/core";
import { useForm } from "react-hook-form";
import Success from "../../components/Success/Success";
import ErrorMessage from "../../components/Error/ErrorMessage";
import PhoneInput from "react-phone-number-input/input";
import { DatePickerInput } from "@mantine/dates";

export default function SignupHR() {
  const { loading, errorState, success, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (success) {
      dispatch(setError(null));
      reset();
    }
  }, [dispatch, reset]);

  useEffect(() => {
    dispatch(setSignupSuccess(false));
    setError(null);
  }, []);

  const handleSignup = async () => {
    try {
      const formattedBirthdate = new Date(birthdate)
        .toISOString()
        .split("T")[0];
      const newErrors = [];

      if (firstname.trim() === "") {
        newErrors.push("Firstname cannot be empty");
      }
      if (!/^[a-zA-Z]+$/.test(firstname)) {
        newErrors.push("Firstname can only contain letters");
      }

      // Validation for lastname
      if (lastname.trim() === "") {
        newErrors.push("Lastname cannot be empty");
      }
      if (!/^[a-zA-Z]+$/.test(lastname)) {
        newErrors.push("Lastname can only contain letters");
      }

      // Validation for phone
      const phoneRegex = /^\+7\d{10}$/;
      if (!phoneRegex.test(phone)) {
        newErrors.push("Invalid phone number format, include only 11 digits ");
      }

      if (
        !description ||
        typeof description !== "string" ||
        description.trim() === ""
      ) {
        newErrors.push("Company cannot be empty");
      }

      if (newErrors.length > 0) {
        setErrors(newErrors);
        return;
      }

      await dispatch(
        registerMentor({
          email,
          firstname,
          lastname,
          phone,
          birthdate: formattedBirthdate,
          description,
        })
      );
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <main>
      <section className="signup-container">
        <div className="login-container ">
          <Text size="lg" fw={700} className="mb20">
            Регистрация для менторов
          </Text>
          {!success && (
            <h3 className="link">В завершении на почту придёт пароль</h3>
          )}
          {success && <Success />}
          {!success && (
            <form onSubmit={handleSubmit(handleSignup)} className="form-signup">
              <label>Email</label>
              <input
                className="input"
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>First name</label>
              <input
                className="input"
                placeholder="Enter first name"
                onChange={(e) => setFirstname(e.target.value)}
                required
              />

              <label>Last name</label>
              <input
                className="input"
                placeholder="Enter last name"
                onChange={(e) => setLastname(e.target.value)}
                required
              />

              <label>Phone</label>
              <PhoneInput
                name="phone"
                className="input"
                placeholder="Enter phone number"
                onChange={(value) => setPhone(value)}
                required
              />

              <label>Date</label>
              <DatePickerInput
                name="birthdate"
                placeholder="Pick date"
                onChange={(date) => setBirthdate(date)}
                required
                className="mb10"
              />

              <label>Description</label>
              <Textarea
                placeholder="Input description about yourself"
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mb10 mb20"
              />

              {errors && Array.isArray(errors) && errors.length > 0 && (
                <>
                  {errors.map((errorItem, index) => (
                    <ErrorMessage
                      key={index}
                      title={"Error"}
                      text={errorItem}
                      className="mt2 mb10"
                    />
                  ))}
                </>
              )}
              {error && Array.isArray(error) && error.length > 0 && (
                <>
                  {error.map((errorItem, index) => (
                    <ErrorMessage
                      key={index}
                      title={errorItem.field}
                      text={errorItem.description}
                      className="mt2"
                    />
                  ))}
                </>
              )}

              <div className="login-footer">
                <button
                  className="button-primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <Loader color="blue" /> : "Sign up"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
