import React, { useState } from 'react';
import { Form, Button, Input, FormGroup, Row, Label } from 'reactstrap';

const SuggestTranslationForm = ({ data, onSubmit }) => {
    const { terms, feelings, religions, regions, countries } = data

    const [formData, setFormData] = useState({
        termName: "",
        countries: [],
        religions: [],
        feelings: [],
        regions: [],
        context: "",
        norwegianDefinition: "",
        translation: "",
        comment: ""

    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name == "countries" || name == "religions" || name == "feelings" || name == "regions")
        {
            setFormData(values => ({...values, [name]: [...values[name], Number(value)]}))
        }else {

            setFormData(values => ({...values, [name]: value}))
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        onSubmit(formData);
    };

    return (
        <div className="container">
            <Form onSubmit={handleSubmit}> 
                <FormGroup controlid="begrep">
                    <Label>Begrep</Label>
                    <Input type="text" name="termName" placeholder="Enter Begrep" maxLength={50} value={formData.termName || ""} onChange={handleChange} required/>
                </FormGroup>
                <Row>
                    <FormGroup controlid="land" className="col-md-6">
                        <Label>Land</Label>
                        <Input as="select" type="select" name="countries" value={formData.countries || []} onChange={handleChange} multiple>
                            <option>Velg land</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country.id}>{country.countryName}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup controlid="region" className="col-md-6">
                        <Label>Region</Label>
                        <Input as="select" type="select" name="regions" value={formData.regions || []} onChange={handleChange} multiple>
                            <option>Velg region</option>
                            {regions.map((region, index) => (
                                <option key={index} value={region.id}>{region.regionName}</option>
                            ))}
                        </Input>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup controlid="religion" className="col-md-6">
                        <Label>Religion</Label>
                        <Input type="select" as="select" name="religions" value={formData.religions || []} onChange={handleChange} multiple>
                            <option>Velg religion(er)</option>
                            {religions.map((religion, index) => (
                                <option key={index} value={religion.id}>{religion.religionName}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup controlid="feeling" className="col-md-6">
                        <Label>Følelse</Label>
                        <Input type="select" as="select" name="feelings" value={formData.feelings || []} onChange={handleChange} multiple>
                            <option>Velg følelse(er)</option>
                            {feelings.map((feeling, index) => (
                                <option key={index} value={feeling.id}>{feeling.feelingName}</option>
                            ))}
                        </Input>
                    </FormGroup>
                </Row>
                <FormGroup controlid="konseptoversettelse">
                    <Label>Konseptoversettelse</Label>
                    <Input type="textarea" placeholder="Enter Konseptoversettelse" required name="translation" value={formData.translation || ""} onChange={handleChange}/>
                </FormGroup>
                <FormGroup controlid="kontekst">
                    <Label>Kontekst</Label>
                    <Input type="text" placeholder="Enter Kontekst" name="context" value={formData.context || ""} onChange={handleChange}/>
                </FormGroup>
                <FormGroup controlid="kommentar">
                    <Label>Kommentar</Label>
                    <Input type="text" placeholder="Enter Kommentar" name="comment" value={formData.comment || ""} onChange={handleChange}/>
                </FormGroup>
                <FormGroup controlid="norskdef">
                    <Label>Norsk definisjon</Label>
                    <Input type="text" placeholder="Enter Kommentar" name="norwegianDefinition" value={formData.norwegianDefinition || ""} onChange={handleChange}/>
                </FormGroup>


                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
export default SuggestTranslationForm;