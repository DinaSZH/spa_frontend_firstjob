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
    //     <div className="modal">
    //         <div className="modal-backdrop" onClick={close}></div>
    //         <div className="modal-inner">

    //             <h2>Образование</h2>
    //             <h4>Начало обучения</h4>

    //             <YearPickerInput
    //                 label="Pick date"
    //                 value={startYear}
    //                 onChange={(date) => setStartYear(date)}
    //                 className='mb10'/>

    //             <h4>Конец обучения</h4>

    //             <YearPickerInput
    //                 label="Pick date"
    //                 value={endYear}
    //                 onChange={(date) => setEndYear(date)}
    //                 className='mb10'/>

    //             <h4>Название учебного заведения</h4>
    //             <input className="input" placeholder="Название учебного заведения" type="text" onChange={onChangesetInstanceName} value={instanceName}/>

    //             <h4>Специализация</h4>
    //             <input className="input" placeholder="Специализация" type="text" onChange={onChangeSpecialization} value={specialization}/>

    //             <h4>Уровень образования</h4>
    //             <input className="input" placeholder="Уровень образования" type="text" onChange={onChangeLevel} value={level}/>

    //             <div className="modal-actions">
    //                 <button className="button button-primary-bordered" onClick={close}>Отменить</button>
    //                 <button className="button button-primary" onClick={save}>Сохранить</button>
    //              </div>

    //         </div>
    // </div>
  );
}
