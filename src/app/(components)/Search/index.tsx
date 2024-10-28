import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SearchForm = ({ onSubmit }) => {
    const initialValues = {
        query: ''
    };

    // Define the validation schema
    const validationSchema = Yup.object({
        query: Yup.string()
            .min(2, 'Minimum 2 characters required')
            .required('Search query is required')
    });

    // Handle form submission
    const handleSubmit = async(values, { setSubmitting }) => {
      await  onSubmit(values.query); // Pass the search query to the parent component
        setSubmitting(false);

    };

    return (
        <Formik
            initialValues={initialValues}
            //validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {
                    ({ isSubmitting }) => (
                        <Form className="space-x-4 flex flex-row ">
                            <div>
                                <Field
                                    type="text"
                                    name="query"
                                    placeholder="Search..."
                                    className="border rounded px-3 py-2 w-full"
                                    //onBlur={()=>{alert("dj")}}
                                    
                                />
                                <ErrorMessage
                                    name="query"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                                {isSubmitting ? 'Searching...' : 'Search'}
                            </button>
                        </Form>
                    )
            }
        </Formik>
    );
};

export default SearchForm;
