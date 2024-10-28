// components/SearchForm.js
import React,{useState,FC} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setIsDarkMode, setIsSidebarCollapsed , setCapsules ,addCapsule,deleteCapsule } from "../../../state";
import {convertUtcToZonedTime , convertZonedTimeToUTC} from '../../../utility/DateTimeFormatter'
import { FieldProps } from 'formik';

type Form= {
    capsule_id:string;
    original_launch:string;
    status:string
}
interface AddOrEditFormProps {
    onSubmit: (data: any) => void; // Replace `any` with the actual type of data you're submitting
    onCancel: () => void; // Function to handle cancel action
    formValues: Form
}

const AddOrEditForm: React.FC<AddOrEditFormProps> = ({ onSubmit, onCancel, formValues }) => {
   
   
    // Define the initial form values
      const initialValues = {
        capsuleId: formValues ? formValues.capsule_id : '',
        originalLaunchDate: formValues ? formValues.original_launch : null,
        status: formValues ? formValues.status : ''
    };

    // Define the validation schema
    const validationSchema = Yup.object({
        capsuleId: Yup.string()
            .min(2, 'Minimum 2 characters required')
            .required('capsuleId is required'),

         originalLaunchDate: Yup.date().nullable().required('Date is required'),

         status: Yup.string().required('Status is required'),

    });

    // Handle form submission
    const handleSubmit = (values: any, { setSubmitting,resetForm }: any) => {
        onSubmit(values);
        setSubmitting(false);
        resetForm()


    };
    

    interface DateFieldProps extends FieldProps {
        // Extend any additional props specific to your DatePicker if needed
        placeholderText?: string;
    }

    const DateField: FC<DateFieldProps> = ({ field, form, ...props }) => {
        return (
            <DatePicker
                selected={field.value}
                onChange={(date) => form.setFieldValue(field.name, date)}
                {...props}
            />
        );
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="space-x-4 flex flex-col gap-10 w-full border-0">
                      <div>User Details</div>
                    
                       <div className="flex flex-col w-[80%] gap-20" >
                                <div className="flex flex-row gap-40 boder-2 w-full">
                                    
                                     <div className="flex flex-col gap-2">
                                        <label htmlFor="capsuleId">Capsule ID</label>
                                        <Field
                                            type="text"
                                            name="capsuleId"
                                            placeholder="capsule id..."
                                            className="border rounded px-3 py-2 w-full"
                                        />
                                        <ErrorMessage
                                            name="capsuleId"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                                <label htmlFor="status">Status</label>
                                                <Field
                                                    as="select"
                                                    name="status"
                                                    className="border px-3 py-2 rounded w-full"
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="active">active</option>
                                                    <option value="retired">retired</option>
                                                    <option value="destroyed">destroyed</option>
                                                </Field>
                                                <ErrorMessage
                                                    name="status"
                                                    component="div"
                                                    className="text-red-500 text-sm"
                                                />
                                        </div>

                                    
                                </div>

                                <div className="flex flex-col border-0 w-full gap-2">
                                    <label htmlFor="originalLaunchDate">Original Launch Date</label>
                                        <Field
                                            name="originalLaunchDate"
                                            component={DateField}
                                            className="border px-3 py-2 rounded w-full "
                                            placeholderText="Select a date"
                                        />
                                        <ErrorMessage
                                            name="originalLaunchDate"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                </div>

                        </div>



                  
                  
                        <div className="flex flex-row gap-10 justify-center">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        {isSubmitting ? 'submitting...' : formValues ? 'Edit User':'Add User'}
                                    </button>
                                    
                                    <button onClick={onCancel}>
                                        Cancel
                                    </button>
                        </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddOrEditForm;
