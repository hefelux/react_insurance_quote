import React from 'react';
import styled from '@emotion/styled';
import { primerMayuscula } from '../helpers';
import PropTypes from "prop-types";

const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: white;
    margin-top: 1rem;
`;

const Resumen = ({ datos }) => {

    const { marca, year, plan } = datos;
    if(marca === '' || year === '' || plan === '') return null;
    return (
        <ContenedorResumen>
            <h2>Resumen Cotización</h2>
            <ul>
                <li>
                    <b>Marca:</b> {primerMayuscula(marca)}
                </li>
                <li>
                    <b>Plan:</b> {primerMayuscula(plan)}
                </li>
                <li>
                    <b>Año del Auto:</b> {year}
                </li>
            </ul>
        </ContenedorResumen>
    );
};

Resumen.propTypes = {
    datos: PropTypes.object.isRequired
}

export default Resumen;