import React, { useState } from "react";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  Form,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import TranslationDetailsTable from "../Tables/TranslationDetailsTable";
import axios from "axios";

function ApproveSuggestionsForm({ translation, onTranslationUpdated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    norwegianDefinition: translation.norwegianDefinition,
    conceptTranslation: translation.translation,
    Id: translation.id,
    context: translation.context,
    comment: translation.comment
  });

  const toggle = () => setIsOpen(!isOpen);

  const handleEditedValues = ( { name, value }) => {
    setEditedData(values => ({...values, [name]: value}));
  };

  const handleApprove = async () => {
    console.log(editedData);
    const confirmed = window.confirm("Are you sure you want to approve?");
    if (confirmed) {
      try {
        await axios(`/api/suggestions/`, {
          method: "PUT",
          data: editedData,
        });
        onTranslationUpdated();
      } catch (error) {
        console.error("Error approving translation:", error);
      }
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      try {
        if (translation.status === 2) {
          await axios.delete(`/api/suggestions/${translation.id}`);
        } else {
          await axios.put(`/api/suggestions/editNotApproved/${translation.id}`);
        }
        onTranslationUpdated();
      } catch (error) {
        console.error("Error deleting translation:", error);
      }
    }
  };

  return (
    <>
      <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
        {translation.termName}
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <Form>
              <TranslationDetailsTable
                translation={translation}
                onChange={handleEditedValues}
              ></TranslationDetailsTable>
              <Button color="success" onClick={handleApprove}>
                Approve
              </Button>
              <Button color="danger" onClick={handleDelete}>
                Decline
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Collapse>
    </>
  );
}

export default ApproveSuggestionsForm;
