import by from 'sort-by';

/**
 * @param {Object} options
 * @return {Function}
 */
export default options => {
    const catalogue = options.fromJson(options.fromPublic('/catalogue.json')).sort(by('createdDate'));
    return (request, response) => response.end(options.toJson(catalogue));
};