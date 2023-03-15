class NegativeBinomialDistribution {
    static parameters = {'r': 'Number of successful trials', 'p': 'Probability of success for each trial'};
    static variable = { 'X': 'Number of trials'};
    static name = 'Negative Binomial Distribution';
    constructor (r, p) {
        this.r = r;
        this.p = p;
    }

    atPoint = (X) => {
        const binomialCoeff = math.combinations(X - 1, this.r - 1);
        const secondTerm = (1 - this.p) ** (X - this.r);
        const thirdTerm = this.p ** this.r;
        return binomialCoeff * secondTerm * thirdTerm;
    }

    lessThan = (X) => {
        let total = 0;
        for (let x = this.r; x < X; x++) {
            total += this.atPoint(x);
        }
        return total;
    }

    lessThanOrEqualTo = (X) => {
        let total = 0;
        for (let x = this.r; x <= X; x++) {
            total += this.atPoint(x);
        }
        return total;
    }

    strictBetween = (a, b) => {
        let total = 0;
        for (let x = a + 1; x < b; x++) {
            total += this.atPoint(x);
        }
        return total;
    }

    greaterThan = (X) => {
        return 1 - this.lessThanOrEqualTo(X);
    }

    greaterThanOrEqualTo = (X) => {
        return 1 - this.lessThan(X);
    }
}

export { NegativeBinomialDistribution };