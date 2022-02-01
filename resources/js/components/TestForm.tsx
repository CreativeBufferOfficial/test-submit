import React, {useEffect} from 'react';
import {withFormik, FieldArray, FormikProps, Field, ErrorMessage} from 'formik';
import {redirectToSuccessPage} from '../services/Router';
import {postData} from '../services/Form';
import {incrementformviewcount} from '../services/Stats';
import * as Yup from 'yup';
import { IDefaultInterface, IFormValues } from '../interfaces/ITest';


const TestSchema = Yup.object().shape({
    messages: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Name required"),
          color: Yup.string()
            .required("Color required")
            .matches(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, "Hex code is required")
        })
      ).min(2)
  });

  
const TestForm = (props:FormikProps<IFormValues>) => {
    const {values, handleSubmit, errors} = props;
    const init:IDefaultInterface = {name:'',color:''};
    useEffect(() => {
        // Imaginary call to increment the view count when this form first loads
        incrementformviewcount();
    });

    return (
        <form className="divide-y space-y prose prose-sm max-w-none" onSubmit={handleSubmit}>
            <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <h3 className="">Data sets</h3>

                <FieldArray name="messages" render={arrayHelpers => (
                        <div>
                        {values.messages && values.messages.length > 0 ? (
                        values.messages.map((item:IDefaultInterface,index:number) => (
                            <div key={index} className="mb-4 flex">
                                <Field type="text" placeholder="Name" name={`messages.${index}.name`} className="
                                    pt-2
                                    pb-2
                                    pl-2
                                    pr-2
                                    mr-4
                                    block
                                    w-full
                                rounded-md
                                border
                                border-gray-300
                                shadow-sm
                                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                "/>
                                <ErrorMessage name={`messages.${index}.name`} component="div" className="invalid-feedback" />
                                <Field type="text"  placeholder="Color"  name={`messages.${index}.color`} className="
                                    pt-2
                                    pb-2
                                    pl-2
                                    pr-2
                                    mr-4
                                    block
                                    w-full
                                rounded-md
                                border
                                border-gray-300
                                shadow-sm
                                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                "/>
                                <ErrorMessage name={`messages.${index}.color`} component="div" className="invalid-feedback" />

                                <button type='button' onClick={() => arrayHelpers.remove(index)} className="text-white bg-red-500 rounded p-2 px-4 hover:bg-red-600 font-bold">
                                    Delete set
                                </button>
                            </div>
                        ))
                    ): null}

                        <button type='button' onClick={() => arrayHelpers.push(init)} className="bg-gray-100 rounded p-2 px-4 hover:bg-gray-200" style={{fontWeight: 600}}>Add
                                    another set
                        </button>

                        {errors.messages? (
                            'Min length shoud be 2'
                        ) : null}
                    </div>
                )}
                />

            </div>

            <footer className="px-4 py-5 sm:p-6">
                <button type='submit' className="text-white bg-teal-500 rounded p-2 px-4 hover:bg-teal-600 font-bold">
                    Submit sets
                </button>
            </footer>
        </form>
    );
}

export default withFormik<IFormValues, IFormValues>(
    {
        mapPropsToValues: () => ({ messages: [] }),
        validationSchema:TestSchema,
        handleSubmit: (values, {props}) => {
            console.log(values);
            
            // Post data to the backend
            postData(values);

            // Imaginary redirection on success
            redirectToSuccessPage();
        },
    }
)(TestForm);
