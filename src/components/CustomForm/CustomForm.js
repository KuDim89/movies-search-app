import React from 'react';
import Input from "../Input/Input";
import ButtonMain from "../ButtonMain/ButtonMain";

const CustomForm = (props) => {

  return (
      <form>
        {Object.keys(props.pageState.formControls).map((formControlName, index) => {
          const control = props.pageState.formControls[formControlName];
          return (
              <Input
                  key={index}
                  type={control.type}
                  value={control.value}
                  valid={control.valid}
                  touched={control.touched}
                  label={control.label}
                  placeholder={control.placeholder}
                  shouldValidate={!!control.validation}
                  onChange={e => props.formFunction.onChangeHandler(e.target.value, formControlName)}
              />
          )
        })}
        <ButtonMain
            additionalClasses={'btn-block py-2 my-4'}
            onClick={props.formFunction.onClick}
            disabled={!props.pageState.isFormValid}
        >
          {props.buttonName}
        </ButtonMain>
      </form>
  );
};

export default CustomForm;