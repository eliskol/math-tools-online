import { BinomialDistribution } from "./distributions/binomial.js";
import { NegativeBinomialDistribution } from "./distributions/negative-binomial.js";

class UI {

    constructor(distributions, distributionSelector, distributionInputContainer, distributionParameterContainer, distributionValueDisplayTable, mainDistributionInput, submitButton) {
        this.distributions = distributions;
        this.distributionSelector = distributionSelector;
        this.distributionInputContainer = distributionInputContainer;
        this.distributionParameterContainer = distributionParameterContainer;
        this.distributionValueDisplayTable = distributionValueDisplayTable;
        this.mainDistributionInput = mainDistributionInput;
        this.currentDistributionClass;
        this.distribution;

        submitButton.addEventListener('click', () => {
            if (!this.distribution || this.mainDistributionInput.value == '') return;
            this.updateDistributionValueDisplays(this.mainDistributionInput.value);
        });

        for (const distribution of this.distributions) {
            let distributionOption = this.createDistributionOptionElement(distribution, this.distributions.indexOf(distribution));
            distributionSelector.appendChild(distributionOption);
        }

        distributionSelector.addEventListener('change', () => {
            let distributionSelected = this.distributions[distributionSelector.value];
            this.changeSelectedDistribution(distributionSelected);
        });
    }

    updateDistributionValueDisplays = (valueToEvaluateDistributionAt) => {
        this.distributionValueDisplayTable.innerHTML = ''; // clear table

        let tableRow = document.createElement('tr');
        let dataCell = document.createElement('td');

        dataCell.textContent = `P(X = ${valueToEvaluateDistributionAt}): ${this.distribution.atPoint(valueToEvaluateDistributionAt)}`;
        tableRow.appendChild(dataCell);
        this.distributionValueDisplayTable.appendChild(tableRow);

        tableRow = document.createElement('tr');
        dataCell = document.createElement('td');

        dataCell.textContent = `P(X < ${valueToEvaluateDistributionAt}): ${this.distribution.lessThan(valueToEvaluateDistributionAt)}`;
        tableRow.appendChild(dataCell);
        this.distributionValueDisplayTable.appendChild(tableRow);

        tableRow = document.createElement('tr');
        dataCell = document.createElement('td');

        dataCell.textContent = `P(X ≤ ${valueToEvaluateDistributionAt}): ${this.distribution.lessThanOrEqualTo(valueToEvaluateDistributionAt)}`;
        tableRow.appendChild(dataCell);
        this.distributionValueDisplayTable.appendChild(tableRow);

        tableRow = document.createElement('tr');
        dataCell = document.createElement('td');

        dataCell.textContent = `P(X > ${valueToEvaluateDistributionAt}): ${this.distribution.greaterThan(valueToEvaluateDistributionAt)}`;
        tableRow.appendChild(dataCell);
        this.distributionValueDisplayTable.appendChild(tableRow);

        tableRow = document.createElement('tr');
        dataCell = document.createElement('td');

        dataCell.textContent = `P(X ≥ ${valueToEvaluateDistributionAt}): ${this.distribution.greaterThanOrEqualTo(valueToEvaluateDistributionAt)}`;
        tableRow.appendChild(dataCell);
        this.distributionValueDisplayTable.appendChild(tableRow);
    }

    changeSelectedDistribution = (distributionSelected) => {
        this.currentDistributionClass = distributionSelected;

        if (this.distributionParameterContainer.hasChildNodes) this.distributionParameterContainer.innerHTML = '';

        for (const inputName of distributionSelected.parameters) {
            let parameterInputElement = this.createParameterInputElement(inputName);
            this.distributionParameterContainer.appendChild(parameterInputElement);
        }
    }

    createDistributionOptionElement = (distribution, indexOfDistribution) => {
        let distributionOption = document.createElement('option');
        distributionOption.value = indexOfDistribution;
        distributionOption.textContent = distribution.name;
        return distributionOption;
    };


    createParameterInputElement = (inputName) => {
        let inputElement = document.createElement('input');
        inputElement.placeholder = inputName;
        inputElement.type = 'number';
        inputElement.className = 'distributionParameterInput';
        inputElement.addEventListener('input', () => {
            let distributionParameterInputElements = document.querySelectorAll('.distributionParameterInput');
            let distributionParameterInputArray = [...distributionParameterInputElements].map((element) => element.value);
            this.updateDistributionParameters(distributionParameterInputArray)
        });
        return inputElement;
    };

    updateDistributionParameters = (distributionParameterInputArray) => {
        if (distributionParameterInputArray.filter((value) => value != '').length != distributionParameterInputArray.length) {
            this.distribution = null;
            return;
        }
        this.createDistribution(distributionParameterInputArray);
    }

    createDistribution = (distributionParameterInputArray) => {
        this.distribution = new this.currentDistributionClass(...distributionParameterInputArray);
    }

}


const DISTRIBUTIONS = [BinomialDistribution, NegativeBinomialDistribution];

let distributionSelector = document.querySelector('#distributionSelector');
let distributionInputContainer = document.querySelector('#distributionInputContainer')
let distributionParameterContainer = document.querySelector('#distributionParameterContainer');
let mainDistributionInput = document.querySelector('#mainDistributionInput');
let submitButton = document.querySelector('#submit');
let distributionValueDisplayTable = document.querySelector('#distributionValueDisplayTable');
new UI(DISTRIBUTIONS, distributionSelector, distributionInputContainer, distributionParameterContainer, distributionValueDisplayTable, mainDistributionInput, submitButton);