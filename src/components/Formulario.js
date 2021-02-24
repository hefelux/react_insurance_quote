import React, { useState } from "react";
import styled from "@emotion/styled";
import { calcularMarca, obtenerDiferenciaYear, obtenerPlan } from '../helpers';
import PropTypes from 'prop-types';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;
const Label = styled.label`
    flex: 0 0 100px;
`;
const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;
const InputRadio = styled.input`
    margin: 0 1rem;
`;
const Boton = styled.button`
    background-color: #00838f;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #ffffff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color ease 0.3s;
    margin-top: 2rem;

    &:hover {
        background-color: #26c6da;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`;

const Formulario = ({ guardarResumen, guardarCargando }) => {
    // States
    const [datos, guardarDatos] = useState({
        marca: "",
        year: "",
        plan: "",
    });
    const [error, guardarError] = useState(false);

    //Extraer valores del state
    const { marca, year, plan } = datos;
    //Leer datos de formulario y guardar en el state
    const obtenerInformacion = (e) => {
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        });
    }
    // Persistencia
    const cotizarSeguro = (e) => {
        e.preventDefault();
        if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);

        // Valor Base del seguro
        let resultado = 2000;

        //Obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);
        //Por cada año hay que restar el 3%
        resultado -= ((diferencia * 3) * resultado) / 100;
    
        //Americano 15%
        //Asiatico 5%
        //Europeo 30%
        resultado = calcularMarca(marca) * resultado;

        //Básico aumenta 20%
        //Completo aumento 50%
        const incrementoPlan = obtenerPlan(plan);
        //Total
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

        //Activar spinner
        guardarCargando(true)

        //Emulamos tiempo de llamada con setTimeout
        setTimeout(() => {
            //Mandar resumen a componente padre
            guardarResumen({
                cotizacion: resultado,
                datos,
            });
            //Desactivar spinner
            guardarCargando(false);
        }, 3000);
        
    };

    return (
        <form onSubmit={cotizarSeguro}>
            { error ? <Error>Todos los campos son obligatorios.</Error> : null }
            <Campo>
                <Label htmlFor="marca">Marca</Label>
                <Select
                    name="marca"
                    id="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiático</option>
                </Select>
            </Campo>
            <Campo>
                <Label htmlFor="year">Año</Label>
                <Select
                    name="year"
                    id="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Tipo de Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerInformacion}
                />
                Básico
                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerInformacion}
                />
                Completo
            </Campo>
            <Boton type="submit">Cotizar</Boton>
        </form>
    );
};

Formulario.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
};

export default Formulario;
