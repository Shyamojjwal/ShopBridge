import { FormGroup, FormControl } from '@angular/forms';

export function checkFormValidation(form: FormGroup, listValidationMessage: any) {
    let showValidationMessages: any = {};

    for(const _key of Object.keys(form.controls)){
        let cur_control = form.get(_key);
        if(cur_control instanceof FormControl) {
            showValidationMessages[_key] = '';
            if (cur_control.invalid && (cur_control.dirty || cur_control.touched)) {
              let errors = cur_control.errors;
              for(const _err of Object.keys(errors)) {
                showValidationMessages[_key] = listValidationMessage[_key][_err];
              }
            }
        }
    }
    return showValidationMessages;
}

export function checkApiValidation(form: FormGroup, apiErrors: any, listValidationMessage: any) {
    let showValidationMessages: any = {};
    let _errors: any = {}
    if(apiErrors.error && apiErrors.error != undefined && apiErrors.error.errors.length > 0) {
        _errors = apiErrors.error.errors[0].message;
    }
    for(const _key of Object.keys(form.controls)){
        let cur_control = form.get(_key);
        if(cur_control instanceof FormControl) {
            showValidationMessages[_key] = '';
            if(Object.keys(_errors).includes(_key)) {
                let _errorObj: any = {}
                _errorObj[_errors[_key].rule] = true;

                cur_control.markAsDirty();
                cur_control.setErrors(_errorObj);

                let errors = cur_control.errors;
                for(const _err of Object.keys(errors)) {
                    showValidationMessages[_key] = listValidationMessage[_key][_err];
                }
            }
        }
    }
    return showValidationMessages;
}

export function noWhitespaceValidator(control: FormControl) {
    if(typeof(control.value) !== 'object') {
        const isWhitespace = control ? control.valid ? control.value.length === 0 : false : false;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }
    else {
        return null;
    }
}

export function removeWhiteSpace(control: FormControl) {
    if(typeof(control.value) !== 'object') {
        control.setValue(control.value.trim());
        // const isWhitespace = control ? control.valid ? control.value.length === 0 : false : false;
        // const isValid = !isWhitespace;
        // return isValid ? null : { 'whitespace': true };
        return null;
    }
}

export function getFromValidatedFields (form: FormGroup) {
    let _validFields = [];
    Object.keys(form.controls).forEach(async(key: any) => {
        let _curControl = form.get(key);
        if(_curControl instanceof FormControl && _curControl.status.toLowerCase() == 'valid') {
            await _validFields.push(key);
            _validFields = await _validFields.filter((item, i, ar) => ar.indexOf(item) === i)
        }
    });
    return _validFields
}

export function makeAllFormControlAsDirty(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
        form.get(key).markAsDirty();
    });
}

export function checkPositiveNumberValue(control: FormControl) {
    var regex=/^[0-9]+$/;
    if(typeof(control.value) !== 'object' && control.value && control.value != undefined) {
        if(control.value.match(regex)) {
            return null
        } else {
            return { 'acceptIntValue': true }
        }
    } else {
        return null;
    }
}