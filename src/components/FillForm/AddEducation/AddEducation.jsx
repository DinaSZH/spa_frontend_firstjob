import { YearPickerInput } from "@mantine/dates";
import { Button, Group, Modal, Text, Textarea, TextInput } from "@mantine/core";
import { useState } from "react";
export default function ModalAddExp({ openedEdu, closeEdu, addEducation }) {
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [instanceName, setInstanceName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [level, setLevel] = useState("");

  const onChangesetInstanceName = (e) => {
    setInstanceName(e.target.value);
  };

  const onChangeSpecialization = (e) => {
    setSpecialization(e.target.value);
  };

  const onChangeLevel = (e) => {
    setLevel(e.target.value);
  };

  const save = () => {
    const formattedStartYear =
      startYear instanceof Date ? startYear.getFullYear() : null;
    const formattedEndYear =
      endYear instanceof Date ? endYear.getFullYear() : null;

    const education = {
      startYear: formattedStartYear,
      endYear: formattedEndYear,
      instanceName,
      specialization,
      level,
    };

    console.log(education);
    addEducation(education);
    setStartYear(null);
    setEndYear(null);
    setInstanceName("");
    setSpecialization("");
    setLevel("");
  };

  return (
    <Modal
      size="xl"
      opened={openedEdu}
      onClose={closeEdu}
      title="Education"
      centered
    >
      <Text c="blue" fw={700} size="xl" mt="sm">
        Education
      </Text>
      <Text fw={600} size="md" mt="sm">
        Start of education:
      </Text>
      <YearPickerInput
        label="Pick date"
        value={startYear}
        onChange={(date) => setStartYear(date)}
        mt="sm"
      />
      <Text fw={600} size="md" mt="sm">
        End of education:
      </Text>
      <YearPickerInput
        label="Pick date"
        value={endYear}
        onChange={(date) => setEndYear(date)}
        mt="sm"
      />
      <Text fw={600} size="md" mt="sm">
        The name of the university:
      </Text>
      <TextInput
        mt="sm"
        placeholder="Input university"
        onChange={onChangesetInstanceName}
      />
      <Text fw={600} size="md" mt="sm">
        Specialization:
      </Text>
      <TextInput
        mt="sm"
        placeholder="Input specialization"
        onChange={onChangeSpecialization}
      />
      <Text fw={600} size="md" mt="sm">
        The level of education:
      </Text>
      <TextInput
        mt="sm"
        placeholder="Input level of education"
        onChange={onChangeLevel}
      />
      <Group justify="flex-end" mt="xl">
        <Button variant="outline" onClick={closeEdu}>
          Cancel
        </Button>
        <Button variant="light" onClick={save}>
          Save
        </Button>
      </Group>
    </Modal>
  );
}
