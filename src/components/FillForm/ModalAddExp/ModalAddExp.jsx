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
    //     <div className="modal">
    //         <div className="modal-backdrop" onClick={close}></div>
    //         <div className="modal-inner">

    //             <h2>Опыт работы</h2>
    //             <h4>Начало работы</h4>

    //             {/* {testdate.toLocaleDateString()} */}
    //             <DatePickerInput
    //                           placeholder="Pick date"
    //                           onChange={(date) => setStartDate(date)}
    //                           className='mb10'/>

    //             <h4>Конец работы</h4>

    //             <DatePickerInput
    //                 placeholder="Pick date"
    //                 onChange={(date) => setEndDate(date)}
    //                 className='mb10'/>

    //             <h4>Организация</h4>
    //             <input className="input" placeholder="Название компании" type="text" onChange={onChangeCompanyName} value={company}/>

    //             <h4>Должность</h4>
    //             <input className="input" placeholder="Должность" type="text" onChange={onChangePosition} value={position}/>

    //             <h4>Обязанности на рабочем месте</h4>
    //             <textarea className="textarea" placeholder="Опишите что вы делали на работе" type="text" onChange={onChangeDescription}>{description}</textarea>
    //             <div className="modal-actions">
    //                 <button className="button button-primary-bordered" onClick={close}>Отменить</button>
    //                 <button className="button button-primary" onClick={save}>Сохранить</button>
    //          </div>
    //         </div>

    // </div>
  );
}
