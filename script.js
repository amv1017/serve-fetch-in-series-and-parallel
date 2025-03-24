const values = [270, 180, 90]

const loader = document.getElementById('loader')
const list = document.getElementById('list')
const btnSequence = document.getElementById('btns')
const btnParallel = document.getElementById('btnp')

const fetchItem = async (val) => {
  const res = await fetch(`/api/sin/${val}`)
  const { result } = await res.json()
  const item = document.createElement('li')
  item.innerText = `sin ( ${val}° ) = ${result}`
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
