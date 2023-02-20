import { BinomialDistribution } from "./distributions/binomial.js";
import { NegativeBinomialDistribution } from "./distributions/negative-binomial.js";

const DISTRIBUTIONS = [BinomialDistribution, NegativeBinomialDistribution];

let distributionSelector = document.querySelector('#distributionSelector');
let distributionInputContainer = document.querySelector('#distributionInputContainer')
let mainDistributionInput = document.querySelector('#mainDistributionInput');
let currentDistributionClass;
let distribution;

mainDistributionInput.addEventListener('input', () => {
    if (!currentDistributionClass) return;
    alert(distribution.atPoint(mainDistributionInput.value));
});

const createDistributionOptionElement = (distribution, indexOfDistribution) => {
    let distributionOption = document.createElement('option');
    distributionOption.value = indexOfDistribution;
    distributionOption.textContent = distribution.name;
    return distributionOption;
};

for (const distribution of DISTRIBUTIONS) {
    let distributionOption = createDistributionOptionElement(distribution, DISTRIBUTIONS.indexOf(distribution));
    distributionSelector.appendChild(distributionOption);
}

const createDistributionInputElement = (inputName) => {
        let inputElement = document.createElement('input');
        inputElement.placeholder = inputName;
        inputElement.type = 'number';
        inputElement.className = 'distributionInitializationInput';
        inputElement.addEventListener('input', () => {
            let distributionInputElements = document.querySelectorAll('.distributionInitializationInput');
            let distributionInitializationInputArray = [...distributionInputElements].map((element) => element.value);
            createDistribution(distributionInitializationInputArray);
        });
        return inputElement;
};



const createDistribution = (distributionInitializationInputArray) => {
    distribution = new currentDistributionClass(...distributionInitializationInputArray);
}

distributionSelector.addEventListener('change', () => {
    let distributionSelected = DISTRIBUTIONS[distributionSelector.value];
    currentDistributionClass = distributionSelected;
    for (const inputName of distributionSelected.inputs.reverse()) { // reversed because prepend will reverse back to correct order
        let inputElement = createDistributionInputElement(inputName);
        distributionInputContainer.prepend(inputElement);
    }
});
