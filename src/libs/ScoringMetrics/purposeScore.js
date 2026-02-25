import { purposeWeights } from "./purposeWeights";


export function calculatePurposeScore(metric,purpose) {

    const weights = purposeWeights[purpose];

    if(!weights) return 0;

    let totalScore  =0;
    let totalWeight =0;

    Object.keys(weights).forEach(key => {

        const metricValue = metric[key];
        const weight = weights[key];

        if(metricValue !== null && metricValue !== undefined) {

            totalScore +=metricValue*weight;
            totalWeight +=weight;
        }
    });

    if(totalWeight === 0);

    return totalScore/totalWeight;




}