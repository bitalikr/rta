const getTemplate = ((templateName) => {
  return document.querySelector(`#${templateName}-template`).innerHTML;
})

search = instantsearch({
  appId: 'BPCMSKIJ9Y',
  apiKey: '757e12f735af4c715aace2aeecbb8579',
  indexName: 'demo',
  searchParameters: {
    filters: 'approved:true'
  },

  // searchFunction(helper) {
  //   if (helper.state.query === '') {
  //     return
  //   }
  //
  //   helper.search()
  // }
})

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
      item: getTemplate('hit'),
      empty: getTemplate('no-results'),
    },
  })
)
let nonRepeatingDataSource = {}
const client = algoliasearch('BPCMSKIJ9Y', '757e12f735af4c715aace2aeecbb8579')
const index = client.initIndex('demo')
autocomplete('#searchKW', {
  hint: false
}, [{
  source: autocomplete.sources.hits(index, {
    distinct: 1,
    filters: 'approved:true',
    // hitsPerPage: 1
  }),
  displayKey: 'query',
  templates: {
    suggestion(suggestion) {
      // Unique from suggestions
      const result = suggestion._highlightResult.query.value
      const setQuery = search.helper.setQuery(suggestion.query).search()
      
      if(nonRepeatingDataSource[result])
        return null
      nonRepeatingDataSource[result] = result
        return result
    }
  }
}]).on('autocomplete:empty', (event, suggestion, dataset) => {
  search.helper.setQuery("").search()
  nonRepeatingDataSource = {}
  return getTemplate('no-results')
}).on('autocomplete:selected', (event, suggestion, dataset) => {
  nonRepeatingDataSource = {}
  search.helper.setQuery(suggestion.query).search()
}).on('autocomplete:autocompleted', (event, suggestion, dataset) => {
  nonRepeatingDataSource = {}
  search.helper.setQuery(suggestion).search()
}).on('autocomplete:cursorremoved', (event, suggestion, dataset) => {
  search.helper.setQuery("").search()
})
const keyCheck = (() => {
  let box = document.getElementById('searchKW')
  let key = event.keyCode
  if (key == 8) {
    
    nonRepeatingDataSource = {}
    
    if (box.value.length == 1) {
      search.helper.setQuery("").search()
    } else {
      search.helper.setQuery(box.value).search()
    }
  }
})

document.onkeydown = keyCheck;

search.start()

const searchServer = (() => {
  const searchQuery = document.getElementById('searchKW').value
  const url = `/search`
  const getResultsUrl = `${url}?searchQuery=${searchQuery}`
  const responsePromise = fetch(getResultsUrl)
  return responsePromise
    .then(response => response.json())
    .then(jsonData => {
      let query = jsonData[0]
      let resultbox = document.getElementById('result')
      resultbox.setAttribute("class", "borderer hit")
      resultbox = document.getElementById('querytag')
      resultbox.setAttribute("class", "hit-price")
      if(!query) {
        document.getElementById('queryurl').innerText = "No matching service found"
        document.getElementById('querytag').innerText = null
        document.getElementById('querytext').innerText = null
      }
      if(query) {
        document.getElementById('querytag').innerText = query.name
        document.getElementById('queryurl').innerText = query.URL
        document.getElementById('querytext').innerText = query.name
      }
    })
})
