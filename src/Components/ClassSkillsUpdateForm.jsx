import { useEffect, useState } from "react";
import { Button, Form, FormLabel } from "react-bootstrap";
import {getSkills} from '../Services/skillsServices'

const ClassSkillsUpdateForm = ({ initialSkills = [], onSkillsUpdate }) => {

    const [selectedSkills, setSelectedSkills] = useState(initialSkills);
    const [selectedSkillId, setSelectedSkillId] = useState("");
    const [skills, setSkills] = useState([]);

      // for skills.map in the select menu
      const fetchSkills = async () => {
        try {
          const res = await getSkills();
          setSkills(res.data);
        } catch (error) {
          console.error("error fetching skill", error);
        }
      };

    const addSkill = () => {
    const skill = skills.find((s) => s.idSkills === parseInt(selectedSkillId));
        if (skill && !selectedSkills.some((s) => s.idSkills === skill.idSkills)) {
            setSelectedSkills([...selectedSkills, skill]);
            onSkillsUpdate([...selectedSkills, skill]); // Met à jour les compétences dans ClassCard
            setSelectedSkillId("");
        } else {
        alert("Cette compétence a déjà été ajoutée.");
        }
    };

    const removeSkill = (id) => {
        const updatedSkills = selectedSkills.filter((skill) => skill.idSkills !== id);
        setSelectedSkills(updatedSkills);
        onSkillsUpdate(updatedSkills); // Met à jour les compétences dans ClassCard
    };

        useEffect(() => {
        fetchSkills();
        }, [selectedSkills]);

    return ( 
        <>
        <div>
            <Form.Select
                value={selectedSkillId}
                onChange={(e) => setSelectedSkillId(e.target.value)}
            >
                <option value="">Choisissez une compétence</option>
                {skills.map((skill) => (
                <option key={skill.idSkills} value={skill.idSkills}>
                    {skill.skillsName}
                </option>
                ))}
            </Form.Select>
            <Button onClick={addSkill}>Ajouter</Button>
            <div>
                {selectedSkills.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedSkills.map((skill) => (
                        <tr key={skill.idSkills}>
                        <td>{skill.skillsName}</td>
                        <td>{skill.skillsDesc}</td>
                        <td>
                            <Button onClick={() => removeSkill(skill.idSkills)}>
                            Supprimer
                            </Button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                )}
            </div>
        </div>
        </>
     );
}
 
export default ClassSkillsUpdateForm;