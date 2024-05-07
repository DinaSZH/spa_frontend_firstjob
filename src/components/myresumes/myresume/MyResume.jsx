import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteResumeById,
  downloadResumeById,
} from "../../../store/slices/resumeSlice";
import { Chip, Flex, Group, Paper } from "@mantine/core";
import { IconDownload, IconEdit, IconFileDescription, IconTrash } from "@tabler/icons-react";
import { Toaster, toast } from "react-hot-toast";
export default function MyResume({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Paper withBorder shadow="xl" p="xl" my={20}>
      <Group justify="space-between" mb={40}>
        <Flex mih={50} gap="md" justify="center" direction="row" wrap="wrap">
          <IconFileDescription size={70} color="gray"/>
          <Link className="h2 link" to={`/resumes/${item.id}`}>
            {item.position}
          </Link>
        </Flex>
        <Flex mih={50} gap="sm" align="center" direction="row" wrap="wrap">
          <Chip
            icon={<IconDownload style={{ width: 16, height: 16 }} />}
            variant="light"
            size="md"
            onClick={() =>   dispatch(downloadResumeById(item.id)).then(() => {
              toast.success("Resume downloaded successfully!");
            })}
            defaultChecked
          >
            Download
          </Chip>
          <Chip
            color="gray"
            variant="light"
            size="md"
            defaultChecked
            icon={<IconEdit style={{ width: 16, height: 16 }} />}
            onClick={() => navigate(`/resumes/edit/${item.id}`)}
          >
            Edit
          </Chip>
          <Chip
            icon={<IconTrash style={{ width: 16, height: 16 }} />}
            color="red"
            variant="light"
            size="md"
            onClick={() => dispatch(deleteResumeById(item.id)).then(() => {
              toast.success("Resume deleted successfully!");
            })}
            defaultChecked
          >
            Delete
          </Chip>
        </Flex>
      </Group>
      <Flex mih={50} mt={40} gap="sm" direction="row" wrap="wrap">
        {item.skills &&
          item.skills.map((skill, index) => (
            <Chip size="md" key={index}>
              {skill}
            </Chip>
          ))}
      </Flex>
      <Toaster/>
    </Paper>
  );
}
