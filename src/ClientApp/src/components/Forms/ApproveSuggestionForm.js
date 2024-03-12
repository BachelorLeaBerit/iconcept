import React, { useState } from "react";
import { Collapse, Button, CardBody, Card, Form, Input, FormGroup, Label } from "reactstrap";
import TranslationDetailsTable from "../Tables/TranslationDetailsTable";
import axios from 'axios';

function ApproveSuggestionsForm({ translation, onTranslationUpdated  }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleApprove = async () => {
    const confirmed = window.confirm("Are you sure you want to approve?");
    if (confirmed) {
      try {
        await axios.put(`/api/suggestions/${translation.id}`);
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
        if (translation.status === 2)
        {
          await axios.delete(`/api/suggestions/${translation.id}`);
        } else {
          await axios.put(`/api/suggestions/editNotApproved/${translation.id}`)
        }
        onTranslationUpdated();
      } catch (error) {
        console.error("Error deleting translation:", error);
      }
    }
  };

  return (
    <>
      <Button
        color="primary"
        onClick={toggle}
        style={{ marginBottom: "1rem" }}
      >
        {translation.termName}
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <Form>
              <TranslationDetailsTable translation={translation}></TranslationDetailsTable>
              <Button color="success" onClick={handleApprove}>Approve</Button>
              <Button color="danger" onClick={handleDelete}>Decline</Button>
            </Form>
          </CardBody>
        </Card>
      </Collapse>
    </>
  );
}

export default ApproveSuggestionsForm;