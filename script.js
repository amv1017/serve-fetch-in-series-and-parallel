const values = [1, 2, 3]

const loader = document.getElementById('loader')
const list = document.getElementById('list')
const btnSequence = document.getElementById('btns')
const btnParallel = document.getElementById('btnp')

const fetchItem = async (val) => {
  const res = await fetch(`/api/${val}`)
  const { text } = await res.json()
  // console.log(text)
  const item = document.createElement('li')
  item.innerText = text
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
