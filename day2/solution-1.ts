import parseData from '../utils/data-parser'

const data = await parseData(Bun.file('day2/data.txt'))
const test = await parseData(Bun.file('day2/test1.txt'))

type Balls = {
  amount: number
  color: string
}

type Set = {
  balls: Balls[]
}

type Game = {
  id: number
  sets: Set[]
}

//Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green

const parseToGame = (unparsedGame: string): Game => {
  const id = Number(unparsedGame.split(':')[0].split(' ')[1])
  const unparsedSets = unparsedGame.split(': ')[1].split('; ')

  const sets: Set[] = []

  for (const set of unparsedSets) {
    const balls: Balls[] = []

    const colors = set.split(', ')

    for (const color of colors) {
      const result = color.split(' ')
      balls.push({ amount: +result[0], color: result[1] })
    }

    sets.push({ balls })
  }

  return { id, sets }
}

const solution = (data: string[]) => {
  const games = data.map(parseToGame)

  const possibleGames = games.filter((game) => {
    for (const set of game.sets) {
      for (const ball of set.balls) {
        switch (ball.color) {
          case 'red': {
            if (ball.amount > 12) {
              return false
            }
            break
          }
          case 'blue': {
            if (ball.amount > 14) {
              return false
            }
            break
          }
          case 'green': {
            if (ball.amount > 13) {
              return false
            }
            break
          }
        }
      }
    }
    return true
  })

  return possibleGames.reduce((acc, curr) => {
    return acc + curr.id
  }, 0)
}

// const result = solution(test)
// console.log(result)
const result = solution(data)
console.log(result)
