import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';

type TaskHomeComponentProps = {
  assignee: string;
  deadline: string;
  task: string;
  status: string;
  project: string;
}

const TaskRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr 1fr;
  gap: 10px;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  margin-top: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Assignee = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

const Deadline = styled.div``;

const TaskDescription = styled.div``;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StatusDot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const StatusText = styled.div`
  color: #000;
`;

const ProjectName = styled.div``;

const SeeDetails = styled.div`
  display: flex;
  align-items: center;
  color: #000000;
  cursor: pointer;
  svg {
    margin-left: 5px;
  }
`;

const PictureTaskTake = styled.div`
  background-color: #3b3b3b;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getStatusColor = (status: string) => {
  if (status === 'In Progress') return 'orange';
  if (status === 'Review') return 'blue';
  if (status === 'Done') return 'green';
  return 'black';
};

const TaskHomeComponent: React.FC<TaskHomeComponentProps> = ({ assignee, deadline, task, status, project }) => {
  const statusColor = getStatusColor(status);

  return (
    <TaskRow>
      <Assignee>
        <PictureTaskTake></PictureTaskTake>
        <span>{assignee}</span>
      </Assignee>
      <Deadline>{deadline}</Deadline>
      <TaskDescription>{task}</TaskDescription>
      <Status>
        <StatusDot color={statusColor} />
        <StatusText>{status}</StatusText>
      </Status>
      <ProjectName>{project}</ProjectName>
      <SeeDetails>
        See details <FaChevronRight />
      </SeeDetails>
    </TaskRow>
  )
}

export default TaskHomeComponent;
