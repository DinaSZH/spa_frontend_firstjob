import { Button, Group, Modal, Text, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
export default function ModalAddExp({ close, addWorkingHistory, opened }) {
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");

  const onChangeCompanyName = (e) => {
    setCompany(e.target.value);
  };

  const onChangePosition = (e) => {
    setPosition(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const save = () => {
    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];

    const workingHistory = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      position,
      company,
      description,
    };

    console.log(workingHistory);
    addWorkingHistory(workingHistory);
    setStartDate(Date.now());
    setEndDate(Date.now());
    setCompany("");
    setPosition("");
    setDescription("");
  };

  return (
    <Modal
      size="xl"
      opened={opened}
      onClose={close}
      title="Job experience"
      centered
    >
      <Text c="blue" fw={700} size="xl" mt="sm">
        Job experience
      </Text>
      <Text fw={600} size="md" mt="sm">
        Start of work:
      </Text>
      <DatePickerInput
        placeholder="Pick date"
        onChange={(date) => setStartDate(date)}
        mt="sm"
      />

      <Text fw={600} size="md" mt="sm">
        End of work:
      </Text>
      <DatePickerInput
        placeholder="Pick date"
        onChange={(date) => setEndDate(date)}
        mt="sm"
      />
      <Text fw={600} size="md" mt="sm">
        Company:
      </Text>
      <TextInput
        mt="sm"
        placeholder="Input company"
        value={company}
        onChange={onChangeCompanyName}
        // {...form.getInputProps("company")}
      />
      <Text fw={600} size="md" mt="sm">
        Position:
      </Text>
      <TextInput
        mt="sm"
        placeholder="Input position"
        value={position}
        onChange={onChangePosition}
        // {...form.getInputProps("position")}
      />
      <Text fw={700} size="md" mt="sm">
        Responsibilities at work:
      </Text>
      <Textarea
        mt="sm"
        placeholder="Input responsibilities"
        value={description}
        onChange={onChangeDescription}
        // {...form.getInputProps("about")}
      />
      <Group justify="flex-end" mt="xl">
        <Button variant="outline" onClick={close}>
          Cancel
        </Button>
        <Button variant="light" onClick={save}>
          Save
        </Button>
      </Group>
    </Modal>
  );
}
