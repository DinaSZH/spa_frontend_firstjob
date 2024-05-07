import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerHR,
  setSignupSuccess,
} from "../../store/slices/authSlice";
import {
  Box,
  Container,
  InputBase,
  Loader,
  Text,
  TextInput,
  Button,
} from "@mantine/core";
import Success from "../../components/Success/Success";
import ErrorMessage from "../../components/Error/ErrorMessage";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IMaskInput } from "react-imask";

export default function SignupHR() {
  const { loading, errorState, success, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [errors, setError] = useState([]);

  useEffect(() => {
    if (success) {
      form.reset();
      dispatch(setError(null));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSignupSuccess(false));
  }, []);

  const form = useForm({
    clearInputErrorOnChange: true,
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      phone: "+7",
      birthdate: null,
      company: "",
      url: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      firstname: (value) =>
        value.length < 1 ? "Name must have at least 1 letters" : null,
      lastname: (value) =>
        value.length < 1 ? "Last name must have at least 1 letters" : null,
      phone: (value) => (value.length < 1 ? "Phone required" : null),
      birthdate: (value) => (value.length < 1 ? "Birth date required" : null),
      company: (value) => (value.length < 0 ? "Company name required" : null),
      url: (value) => (value.length < 0 ? "Rrl name required" : null),
    },
  });

  const handleSignup = async () => {
    try {
      const formattedBirthdate = new Date(form.values.birthdate)
        .toISOString()
        .split("T")[0];
      const newErrors = [];
      const hrData = {
        email: form.values.email,
        firstname: form.values.firstname,
        lastname: form.values.lastname,
        firstname: form.values.firstname,
        phone: form.values.phone,
        birthdate: formattedBirthdate,
        company: form.values.company,
        url: form.values.url,
      };

      console.log(hrData);
      await dispatch(registerHR(hrData));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <main>
      <Container size="lg" py="xl">
        <Container size={600} bg="#f0f8ff" py="xl" px="xl">
          <Text size="lg" fw={700}>
            Регистрация для менторов
          </Text>
          {!success && (
            <Text c="blue" fz={16} fw={700} mt={20}>
              В завершении на почту придёт пароль
            </Text>
          )}
          {success && <Success />}
          {!success && (
            <Box mx="auto">
              <form
                onSubmit={form.onSubmit(handleSignup)}
                onReset={form.onReset}
              >
                <TextInput
                  mt="sm"
                  label="Email"
                  placeholder="Input email"
                  {...form.getInputProps("email")}
                  required
                />

                <TextInput
                  mt="sm"
                  label="First name"
                  placeholder="Input first name"
                  {...form.getInputProps("firstname")}
                  required
                />
                <TextInput
                  mt="sm"
                  label="Last name"
                  placeholder="Input last name"
                  {...form.getInputProps("lastname")}
                  required
                />

                <InputBase
                  mt="sm"
                  label="Phone number"
                  name="phone"
                  component={IMaskInput}
                  mask="+70000000000"
                  placeholder="Input phone number"
                  {...form.getInputProps("phone")}
                  required
                />

                <DatePickerInput
                  mt="sm"
                  label="Birth date"
                  name="birthdate"
                  placeholder="Pick date"
                  {...form.getInputProps("birthdate")}
                  required
                />

                <TextInput
                  mt="sm"
                  label="Company name"
                  placeholder="Input Company name"
                  {...form.getInputProps("company")}
                  required
                />

                <TextInput
                  mt="sm"
                  label="Url"
                  placeholder="Input url"
                  {...form.getInputProps("url")}
                  required
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
                {error && Array.isArray(error) && error.length > 0 ? (
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
                ) : (
                  error && (
                    <ErrorMessage title={error} text={error} className="mt2" />
                  )
                )}

                <Button type="submit" mt="lg" disabled={loading}>
                  {loading ? <Loader color="blue" /> : "Sign up"}
                </Button>
              </form>
            </Box>
          )}
        </Container>
      </Container>
    </main>
  );
}
