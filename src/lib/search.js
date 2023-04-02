import TrackService from '@/lib/trackService'

const trackService = new TrackService()

class Search {
  async search(inputs, searchType) {
    let items
    switch (searchType) {
      case 'track': {
        items = await trackService.getAllItems('tracks')
        break
      }
      case 'playlist': {
        items = await trackService.getAllItems('playlists')
        break
      }
    }
    const result = []
    for (const item of items) {
      let score = 0
      for (const keyword of item.keywords) {
        for (const input of inputs) {
          if (input && keyword.match(new RegExp('^' + input + '$', 'ig'))) {
            score += 2
          } else if (input && keyword.match(new RegExp('^' + input, 'ig'))) {
            score += 1
          }
        }
      }
      if (score > 0) result.push({ track: item, score: score })
    }
    result.sort((a, b) => b.score - a.score)
    if (result.length === 0) {
      return -1
    } else {
      return result.map((e) => e.track)
    }
  }
}

export default Search
