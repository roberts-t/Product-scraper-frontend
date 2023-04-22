import { requestPrivate } from '../../utils/request';
import { IProduct, IProductSortTypes } from '../../types';

export const searchProducts = async (query: string) => {
    const response = await requestPrivate.post('/products/', {
        sites: ['rimi', 'barbora', 'top', 'nuko', 'lats', 'pienaveikals', 'orkla'],
        query: query
    });

    return response.data;
}

export const convertPriceToFloat = (price: string | number | undefined) => {
    if (price) {
        if (typeof price === 'string') {
            return parseFloat(price);
        } else {
            return price;
        }
    } else {
        return Infinity;
    }
}

export const sortProducts = (products: IProduct[], sortType: keyof IProductSortTypes, query: string | null) => {
    if (sortType === 'priceAsc') {
        return products.sort((a, b) => {
            return convertPriceToFloat(a.price) - convertPriceToFloat(b.price);
        });
    } else if (sortType === 'priceDesc') {
        return products.sort((a, b) => {
            return convertPriceToFloat(b.price) - convertPriceToFloat(a.price);
        });
    } else if (sortType === 'nameAsc') {
        return products.sort((a, b) => {
            return a.name!.localeCompare(b.name!);
        });
    } else if (sortType === 'nameDesc') {
        return products.sort((a, b) => {
            return b.name!.localeCompare(a.name!);
        });
    } else if (sortType === 'relevance' && query) {
        // Experimental sorting type
        const stringSimilarity = require("string-similarity");
        return products.sort((a, b) => {
            return stringSimilarity.compareTwoStrings(b.name?.toLowerCase(), query) - stringSimilarity.compareTwoStrings(a.name?.toLowerCase(), query);
        });
    }

    else {
        return products;
    }
}

export const productSortTypes: IProductSortTypes = {
    priceAsc: 'Cena (augošā secībā)',
    priceDesc: 'Cena (dilstošā secībā)',
    nameAsc: 'Nosaukums (augošā secībā)',
    nameDesc: 'Nosaukums (dilstošā secībā)',
    relevance: 'Atbilstība meklēšanai'
}

const productsService = {
    searchProducts,
    convertPriceToFloat,
    sortProducts
}

export default productsService;