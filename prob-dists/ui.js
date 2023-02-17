import { BinomialDistribution } from "./distributions/binomial.js";
import { NegativeBinomialDistribution } from "./distributions/negative-binomial.js";

const DISTRIBUTIONS = [BinomialDistribution, NegativeBinomialDistribution];

let distributionSelector = document.querySelector('#distributionSelector');

for (const DISTRIBUTION of DISTRIBUTIONS) {
    let distributionOption = document.createElement('option');
    distributionOption.value = DISTRIBUTION.name;
    distributionOption.textContent = DISTRIBUTION.name;
    distributionSelector.appendChild(distributionOption);
}