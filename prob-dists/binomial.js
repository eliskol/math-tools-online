import { combinations } from "../math.min.js";
class BinomialDistribution {
    inputs = ['n', 'p'];
    name = 'Binomial Distribution'
    constructor (n, p) {
        this.n = n;
        this.p = p;
    }

    atPoint = (X) => {
        const binomialCoeff = combinations(this.n, X);
        const secondTerm = this.p ** X;
        const thirdTerm = (1 - this.p) ** (this.n - X);
        return binomialCoeff * secondTerm * thirdTerm;
    }

    lessThan = (X) => {
        let total = 0;
        for (let x = 0; x < X; x++) {
            console.log(x);
            total += this.atPoint(x);
        }
        return total;
    }

    lessThanOrEqualTo = (X) => {
        let total = 0;
        for (let x = 0; x <= X; x++) {
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

export BinomialDistribution;