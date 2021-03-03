import algoliasearch from "algoliasearch";

const ATTR_REGEXP = /\s*(?:[a-z]+)\s*:\s*(?:.(?![a-z]*\s*:))*/gi;
const QUERY_REGEXP = /^((?:(?:[^\s:]+(?![a-z]*\s*:))\s*)*)/i;
const filterMapping = {
  author: "owner.name",
  type: "moduleTypes"
};

function parseQuery(queryString) {
  const query = queryString.match(QUERY_REGEXP)[0].trim();
  const substr = queryString.substr(query.length);
  const filters = [];
  let match;

  while ((match = ATTR_REGEXP.exec(substr)) !== null) {
    let temp = match[0].split(":");

    if (filterMapping[temp[0].trim()]) {
      filters.push(filterMapping[temp[0].trim()] + ":" + temp[1].trim());
    }
  }

  return {
    query,
    facetFilters: filters.join(",")
  };
}

class Api {
  constructor(apiKey, appId) {
    this.apiKey = apiKey;
    this.appId = appId;

    this.algolia = algoliasearch(this.apiKey, this.appId, {
      protocol: "https"
    });
    this.index = this.algolia.initIndex("npm-search");
  }

  searchPackages(queryString, page) {
    return Promise.resolve().then(() => {
      const parsed = parseQuery(queryString);
      const options = {
        page: page - 1, // hack for avoid 0 page from user
        hitsPerPage: 10,
        attributesToHighlight: [],
        attributesToRetrieve: ['deprecated', 'description', 'githubRepo', 'homepage', 'keywords', 'license', 'name', 'owner', 'version', 'modified', 'popular', 'downloadsLast30Days'],
      };

      return this.index.search(parsed.query, options).then(response => {
        return { response };
      });
    });
  }

  getPackageByName(name) {
    return Promise.resolve().then(() => {
      return this.index.getObject(name).then((pkg) => pkg)
    })
  }
}

const api = new Api('OFCNCOG2CU', 'f54e21fa3a2a0160595bb058179bfb1e');

export default api;
