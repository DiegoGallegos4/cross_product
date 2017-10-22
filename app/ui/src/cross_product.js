import React, { Component } from 'react';
import { render } from 'react-dom';
import update from 'immutability-helper';
// Components
import TextInput from './components/text_input.js';


export default class CrossProduct extends Component{
  state = {
    form: {
      vector1: '',
      vector2: ''
    },
    result: '',
    requestError: '',
    validationErrors : {
      vector1: '',
      vector2: ''
    },
    loading: false
  }

  onChange(field, value){
    this.setState({
      form: update(this.state.form,{
        $merge : {
          [field]: value
        }
      })
    });
  }

  _validateForm(form){
    const errors = {};
    Object.keys(form)
      .forEach((key, _) => {
        if(form[key] !== ''){
          try {
            const arr = JSON.parse(form[key])
            if(arr.length !== 3){
              errors[key] = 'Array must be of length 3';
            }
          } catch(err) {
            errors[key] = 'Input must be an array.'
          }
        } else {
          errors[key] = 'Input cannot be empty.'
        }
      });
    return errors;
  }

  request(url, options){
    return new Promise((resolve,reject) => {
      fetch(url,options)
      .then(response => {
        return new Promise((resolve, reject) => response.json()
          .then((json) => resolve({
            status: response.status,
            ok: response.ok,
            json,
          }))
          .catch(err => reject(err))
        );
      })
      .then(response => {
        if(response.ok){
          return resolve(response.json)
        }
        return reject(response.json)
      })
      .catch(err => {
        return reject({ err })
      })
    })
  }

  onSubmit(e){
    e.preventDefault();

    const errors = this._validateForm(this.state.form);
    this.setState({
      validationErrors: errors,
      requestError: ''
    });

    if(Object.keys(errors).length){
      return;
    }

    this.setState({loading: true});

    this.request('/cross_product/api/compute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        vector1: JSON.parse(this.state.form.vector1),
        vector2: JSON.parse(this.state.form.vector2)
      })
    })
    .then(response => this.setState({
      result: response.result,
      loading: false
    }))
    .catch(err => {
      let errorMessage = '';
        Object.keys(err).forEach(key => {
          errorMessage += `${key}: ${err[key]} \n`
        });
      this.setState({
        requestError: errorMessage,
        loading: false
      });
    });
  }

  render(){
    return(
      <div className='container'>
        <div className="row my-5">
            <h3>Enter values</h3>
        </div>
        <div className="row mx-auto my-5">
          <div className='col-sm-6'>
            <form>
              <TextInput
                label='Vector 1'
                value={this.state.vector1}
                onChange={e => this.onChange('vector1', e.target.value)}
                errorMessage={this.state.validationErrors.vector1 || ''}
              />
              <TextInput
                label='Vector 2'
                value={this.state.vector2}
                onChange={e => this.onChange('vector2', e.target.value)}
                errorMessage={this.state.validationErrors.vector2 || ''}
              />
              <button
                disabled={this.state.loading}
                className='btn btn-primary'
                onClick={e => this.onSubmit(e)}> 
                Compute
              </button>
            </form>
          </div>
          <div className='col-sm-6'>
            <div>
              Result: 
                {
                  this.state.result && 
                  <span>{JSON.stringify(this.state.result)}</span>
                }
            </div>
            { 
              this.state.requestError !== "" &&
                <div className="alert alert-danger">
                  {this.state.requestError}
                </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

if(process.env.NODE_ENV !== 'test')
  render(
    <CrossProduct/>,
    document.getElementById('root'),
  );