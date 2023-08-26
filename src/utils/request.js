export const getListType = () => {
  return fetch('/prod-api/news/pc/listType').then((d) => d.json())
}

export const getNewsList = (typeId, index = 1, pageSize = 5) => {
  return fetch(`/prod-api/news/pc/listNews/${index}/${pageSize}?newsTypeId=${typeId}`).then((d) =>
    d.json()
  )
}

export const getNewsInfo = (newsId) => {
  return fetch(`/prod-api/news/pc/news/${newsId}`).then((d) => d.json())
}
