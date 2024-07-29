"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatistics = void 0;
const getStatistics = (transactions) => {
    const data = {
        totalSale: 0,
        soldItemsCount: 0,
        unsoldItemsCount: 0,
    };
    for (let transaction of transactions) {
        if (transaction.sold) {
            data.totalSale += transaction.price;
            data.soldItemsCount += 1;
        }
        else {
            data.unsoldItemsCount += 1;
        }
    }
    data.totalSale = Math.ceil(data.totalSale);
    return data;
};
exports.getStatistics = getStatistics;
//# sourceMappingURL=getStatistics.js.map