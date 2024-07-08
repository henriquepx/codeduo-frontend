import styled from 'styled-components';
import { FiMessageCircle } from "react-icons/fi";
type Props = {
    title: string,
    work: string
}

const ContactPersonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 250px;
    padding: .4rem 1rem;
    background-color: #ffffff;
    border-radius: 10px;
    svg {
        margin-top: 7px;
    }
`
const ContactPerson = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`
const ProfilePic = styled.div`
    background-color: #ececec;
    width: 40px;
    height: 40px;
    border-radius: 50%;
`
const NameWork = styled.div`
    display: flex;
    flex-direction: column;
    h1 {
        font-size: 1rem;
    }
    h3 {
        font-size: .7rem;
        margin-top: -5px;
    }
`

const ContactHomeComponents: React.FC<Props> = ({ title, work }) => {
    return (
        <ContactPersonContainer>
            <ContactPerson>
                <ProfilePic></ProfilePic>
                <NameWork>
                    <h1>{title}</h1>
                    <h3>{work}</h3>
                </NameWork>
            </ContactPerson>

            <div>
                <FiMessageCircle size={24} style={{ cursor: 'pointer' }} />
            </div>
        </ContactPersonContainer>
    )
}

export default ContactHomeComponents
