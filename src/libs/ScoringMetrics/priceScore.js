import { referenceRanges } from "./refernceRanges";

export function calculatePriceScore(price) {

    const {min,max} = referenceRanges.price;

    const score = ((max - price) / (max - min))*10;

    return Math.max(0,Math.min(score,10));
}

