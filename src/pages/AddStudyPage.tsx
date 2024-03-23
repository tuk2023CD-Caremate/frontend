import styled from 'styled-components'
import AddStudyModal from "../components/AddStudyModal";


const Container = styled.div`
  display: flex;
  height: calc(100vh - 220px);
  align-items: center;
  justify-content: center;
  flex-direction: column;
`


function AddStudyPage() {
    return (
        <div>
        <Container>
            <AddStudyModal/>
        </Container>
        </div>
    )
}
  export default AddStudyPage