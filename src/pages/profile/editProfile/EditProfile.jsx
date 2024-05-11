import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Center,
  Container,
  Divider,
  Group,
  InputBase,
  Loader,
  Paper,
  TextInput,
  Title,
} from "@mantine/core";
import {
  clearSuccess,
  editProfile,
  getProfile,
  setError,
} from "../../../store/slices/profileSlice";
import { DatePickerInput } from "@mantine/dates";
import ErrorMessage from "../../../components/Error/ErrorMessage";
import { IMaskInput } from "react-imask";

export default function EditProfile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [loader, setLoader] = useState(true);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, loading, success } = useSelector((state) => state.profile);

  const getProfileInfo = () => {
    try {
      setFirstname(profile.firstname);
      setLastname(profile.lastname);
      setEmail(profile.email);
      setPhone(profile.phone);
      setBirthdate(profile.birthdate ? new Date(profile.birthdate) : null);
    } catch {
      console.log("Error with fetching the data");
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, [profile]);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    if (profile) {
      setLoader(false);
    }
  }, [dispatch, profile]);


  const handleEditProfile = async () => {
    try {
      const formattedBirthdate = birthdate
        ? new Date(
            birthdate.getTime() - birthdate.getTimezoneOffset() * 60000
          ).toISOString()
        : null;

      const newErrors = [];

      if (firstname.trim() === "") {
        newErrors.push("Firstname cannot be empty");
      }
      if (!/^[a-zA-Z]+$/.test(firstname)) {
        newErrors.push("Firstname can only contain letters");
      }

      if (lastname.trim() === "") {
        newErrors.push("Lastname cannot be empty");
      }
      if (!/^[a-zA-Z]+$/.test(lastname)) {
        newErrors.push("Lastname can only contain letters");
      }

      const phoneRegex = /^\+7\d{10}$/;
      if (!phoneRegex.test(phone)) {
        newErrors.push("Invalid phone number format");
      }

      if (newErrors.length > 0) {
        setErrors(newErrors);
        return;
      }

      await dispatch(
        editProfile({
          firstname,
          lastname,
          phone,
          birthdate: formattedBirthdate,
        })
      );
      navigate("/profile");
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <main>
      <Container size="lg" py="xl">
        <Group justify="flex-end">
          <Button
            onClick={() => navigate("/profile")}
            variant="filled"
            color="rgba(51, 44, 44, 1)"
            mb={10}
          >
            Back to profile
          </Button>
        </Group>
        <Paper
          mih={500}
          mt={20}
          radius="md"
          withBorder
          p="lg"
          color="#228BE6"
          shadow="xs"
        >
          {loader ? (
            <Center h={500}>
              <Loader color="blue" size={100} />
            </Center>
          ) : (
            <div>
              <Title order={2}>Profile Information</Title>
              <TextInput
                mt="sm"
                label="Name"
                placeholder=""
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                required
              />
              <TextInput
                mt="sm"
                label="Lastname"
                placeholder=""
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                required
              />
              <div className="divider"></div>
              <Title order={2}>Profile Details</Title>
              <InputBase
                mt="sm"
                label="Phone number"
                name="phone"
                component={IMaskInput}
                mask="+70000000000"
                onAccept={(value) => setPhone(value)}
                placeholder="Input phone number"
                value={phone}
                required
              />
              <DatePickerInput
                label="Pick date"
                placeholder="Pick date"
                value={birthdate}
                onChange={(date) => setBirthdate(date)}
                mt="sm"
                required
              />
              {errors && (
                <>
                  {Array.isArray(errors) ? (
                    errors.map((errorItem, index) => (
                      <ErrorMessage
                        key={index}
                        title={"Error"}
                        text={errorItem}
                      />
                    ))
                  ) : (
                    <ErrorMessage title={"Error"} text={errors} />
                  )}
                </>
              )}

              <Divider mt={40} mb={20} />

              <Button onClick={handleEditProfile} type="submit">
                Edit profile
              </Button>
            </div>
          )}
        </Paper>
      </Container>
    </main>
  );
}
