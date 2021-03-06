import PHOTO_SELECT_OPTIONS from 'constants/values';
import InputField from 'customfields/InputField';
import PhotoField from 'customfields/PhotoField';
import SelectField from 'customfields/SelectField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import './PhotoForm.scss';

PhotoForm.propTypes = {
    onSubmit: PropTypes.func,
    itemEditPhoto: PropTypes.object,
    isAddMode: PropTypes.bool,
};

PhotoForm.defaultValue = {
    onSubmit: null,
    itemEditPhoto: null,
    isAddMode: true,
};

const photoSchema = Yup.object().shape({
    title: Yup.string().required('This field is required'),
    category: Yup.number().required('This field is required').nullable(),
    photo: Yup.string().required('This field is required'),
});

function PhotoForm(props) {
    const { onSubmit, itemEditPhoto, isAddMode } = props;
    const initialValues = {
        title: itemEditPhoto ? itemEditPhoto.title : '',
        category: itemEditPhoto ? itemEditPhoto.category : null,
        photo: itemEditPhoto ? itemEditPhoto.photo : '',
    };

    return (
        <div className="photo-form">
            <Formik
                initialValues={initialValues}
                validationSchema={photoSchema}
                onSubmit={onSubmit}
            >
                {(formikProps) => {
                    const { isSubmitting } = formikProps;

                    return (
                        <Form>
                            <FastField
                                name="title"
                                component={InputField}
                                label="Title"
                                placeholder="Eg: Wow animal..."
                            />

                            <FastField
                                name="category"
                                component={SelectField}
                                options={PHOTO_SELECT_OPTIONS}
                                label="Category"
                                placeholder="Select your category photo"
                            />

                            <FastField
                                name="photo"
                                component={PhotoField}
                                label="Photo"
                            />

                            <FormGroup className="photo-form__group">
                                <Button color="primary" type="submit">
                                    {isSubmitting && (
                                        <Spinner size="sm" children="" />
                                    )}
                                    {isAddMode
                                        ? 'Add to album'
                                        : 'Update a photo'}
                                </Button>
                            </FormGroup>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default PhotoForm;
