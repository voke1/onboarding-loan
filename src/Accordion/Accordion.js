/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Container, Header, Content, Accordion,
} from 'native-base';
import { View } from 'react-native';
import LoanForm from '../components/loanForm';


// const Loan = () => <LoanForm />;
const dataArray = [
  { title: 'Apply for Loan', content: 'Loan application process/form  \n will be render here' },
  { title: 'Savings', content: 'Savings application process/form  \n will be render here' },
  { title: 'Investment', content: 'Investment application process/form  \n will be render here' },
];


export default class AccordionExample extends Component {
  render() {
    return (
      <Container>
        {/* <Header /> */}
        <Content padder>
          <Accordion dataArray={dataArray} expanded={0} />
        </Content>
      </Container>
    );
  }
}
