const getTemplate = ((templateName) => {
  return document.querySelector(`#${templateName}-template`).innerHTML
})

let instantSearchDataSource = {}

const search = instantsearch({
  appId: 'BPCMSKIJ9Y',
  apiKey: '757e12f735af4c715aace2aeecbb8579',
  indexName: 'demo',
  distinct: 1,
  searchParameters: {
    filters: 'approved:true'
  },
  searchFunction(helper) {
    instantSearchDataSource = {}
    const searchResults = $('.hit')
    const mostRecent = $('#mostRecentContainer')
    if (helper.state.query === '') {
      searchResults.hide()
      mostRecent.show()
      return
    }
    helper.search()
    searchResults.show()
    mostRecent.hide()
  }
})

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchinput',
    queryHook: (query, searchObj) => {
      search.helper.setQuery(query).search()
    }
  })
)

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
      item: getTemplate('hit'),
      // empty: getTemplate('no-results'),
    },
    transformData: (obj) => {
      if(instantSearchDataSource[obj.name]) return {}
      instantSearchDataSource[obj.name] = obj.tag
      return obj
    }
  })
)


const client = algoliasearch('BPCMSKIJ9Y', '757e12f735af4c715aace2aeecbb8579')
const index = client.initIndex('demo')

autocomplete('#searchinput', {
  hint: false,
  templates: {
    dropdownMenu: getTemplate('search-drop-down')
  },
}, [{
  source: autocomplete.sources.hits(index, {
    distinct: 1,
    filters: 'approved:true',
    hitsPerPage: 5
  }),
  displayKey: 'query',
  templates: {
    suggestion(suggestion) {
      return suggestion._highlightResult.query.value
    }
  }
}]).on('autocomplete:empty', () => {
  search.helper.setQuery("").search()
  // return getTemplate('no-results')
}).on('autocomplete:selected', (event, suggestion) => {
  search.helper.setQuery(suggestion.query).search()
}).on('autocomplete:autocompleted', (event, suggestion) => {
  search.helper.setQuery(suggestion).search()
})

search.start()

const searchServer = (() => {
  const searchQuery = document.getElementById('searchinput').value
  const url = `/search`
  const getResultsUrl = `${url}?searchQuery=${searchQuery}`
  const responsePromise = fetch(getResultsUrl)
  return responsePromise
    .then(response => response.json())
    .then(() => {
      search.helper.setQuery(searchQuery).search()
    })
})
