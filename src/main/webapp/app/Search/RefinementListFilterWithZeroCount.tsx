/* tslint:disable */
import {FacetFilter} from "searchkit";

export class RefinementListFilterWithZeroCount extends FacetFilter {

    getAccessorOptions() {
        const {
            field, id, operator, title, include, exclude,
            size, translations, orderKey, orderDirection, fieldOptions
        } = this.props;

        return {
            id: id,
            operator: operator,
            title: title,
            size: size,
            include: include,
            exclude: exclude,
            field: field,
            translations: translations,
            orderKey: orderKey,
            orderDirection: orderDirection,
            fieldOptions: fieldOptions,
            min_doc_count: 0
        };
    }

}
