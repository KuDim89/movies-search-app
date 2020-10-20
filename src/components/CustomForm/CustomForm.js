import React from 'react';
import Input from "../Input/Input";
import ButtonMain from "../ButtonMain/ButtonMain";

export default function CustomForm({pageState, formFunction, buttonName}) {

  return (
      <form>
        {Object.keys(pageState.formControls).map((formControlName, index) => {
          const control = pageState.formControls[formControlName];
          return (
              <Input
                  key={index}
                  type={control.type}
                  value={control.value}
                  valid={control.valid}
                  touched={control.touched}
                  label={control.label}
                  placeholder={control.placeholder}
                  onChange={e => formFunction.onChangeHandler(e.target.value, formControlName)}
              />
          )
        })}
        <ButtonMain
            additionalClasses={'btn-block py-2 my-4'}
            onClick={formFunction.onClick}
            disabled={!pageState.isFormValid}
        >
          {buttonName}
        </ButtonMain>
      </form>
  );
};