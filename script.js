const values = [5, 6, 8]

const loader = document.getElementById('loader')
const list = document.getElementById('list')
const btnSequence = document.getElementById('btns')
const btnParallel = document.getElementById('btnp')

const fetchItem = async (val) => {
  const res = await fetch(
    'http://localhost:8080/api/factorial?timeout=' + 2000 + '&value=' + val
  )
  const result = await res.json()
  const item = document.createElement('li')
  item.innerText = `${val}! = ${result}`
  list.append(item)
}

async function runInSequence() {
  list.innerHTML = ''
  loader.style.display = 'block'
  for (let val of values) {
    await fetchItem(val)
  }
  loader.style.display = 'none'
}

async function runInParallel() {
  list.innerHTML = ''
  loader.style.display = 'block'
  await Promise.all(
    values.map(async (val) => {
      await fetchItem(val)
      loader.style.display = 'none'
    })
  )
}

btnSequence.addEventListener('click', runInSequence)
btnParallel.addEventListener('click', runInParallel)
