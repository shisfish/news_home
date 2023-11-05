export const getListType = () => {
  return fetch('/prod-api/news/pc/listType').then((d) => d.json())
}

export const getNewsList = (typeId, subject, index = 1, pageSize = 5) => {
  const params = {};
  if (typeId != undefined) {
    params.newsTypeId = typeId
  }
  if (subject != undefined) {
    params.subject = subject
  }
  const str = new URLSearchParams(params).toString()
  return fetch(`/prod-api/news/pc/listNews/${index}/${pageSize}?${str}`).then((d) => d.json())
}

export const getNewsListWithImage = (typeId, index = 1, pageSize = 5) => {
  return fetch(`/prod-api/news/pc/listNewsWithImage/${index}/${pageSize}?newsTypeId=${typeId}`).then((d) =>
    d.json()
  )
}

export const getNewsInfo = (newsId) => {
  return fetch(`/prod-api/news/pc/news/${newsId}`).then((d) => d.json())
}
