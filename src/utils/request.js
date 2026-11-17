// 安全整改（2026-11-16）：门户接口由静态 homeToken 改为 HMAC-SHA256 请求签名。
// 注意：纯静态前端无法真正保密密钥，此机制仅提升伪造/重放门槛，不防逆向提取密钥。
const SIGN_SECRET = 'sxdj-home-2026-sign-key'

/**
 * 将浏览器原生 ArrayBuffer 转小写 hex
 */
function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * 生成随机 nonce（防重放）
 */
function makeNonce() {
  const arr = new Uint8Array(16)
  crypto.getRandomValues(arr)
  return toHex(arr.buffer)
}

/**
 * 计算 HMAC-SHA256 签名，与后端 SignUtil.sign 逐字对齐：
 * 原文 = method + "\n" + path + "\n" + timestamp + "\n" + nonce
 * path 去掉 /prod-api 前缀且不含 query（后端 request.getRequestURI() 天然不含 query）
 */
async function sign(method, url) {
  // crypto.subtle 仅在 HTTPS / localhost 安全上下文可用；生产为 https://sxdj.gov.cn
  if (!globalThis.crypto || !crypto.subtle) {
    throw new Error('签名不可用：当前页面非 HTTPS 安全上下文')
  }
  const timestamp = String(Date.now())
  const nonce = makeNonce()

  // 去掉 query
  let path = url.split('?')[0]
  // 与后端 normalizePath 一致：去掉 /prod-api 前缀
  if (path.startsWith('/prod-api')) {
    path = path.slice('/prod-api'.length)
  }

  const message = `${method}\n${path}\n${timestamp}\n${nonce}`
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(SIGN_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message))

  return {
    'X-Sign-Timestamp': timestamp,
    'X-Sign-Nonce': nonce,
    'X-Sign': toHex(signature)
  }
}

/**
 * 统一带签名的 GET 请求
 */
async function signedFetch(url) {
  const headers = await sign('GET', url)
  return fetch(url, { headers }).then((d) => d.json())
}

export const getListType = () => {
  return signedFetch('/prod-api/news/pc/listType')
}

export const getNewsList = (typeId, subject, index = 1, pageSize = 5) => {
  const params = {}
  if (typeId != undefined) {
    params.newsTypeId = typeId
  }
  if (subject != undefined) {
    params.subject = subject
  }
  const str = new URLSearchParams(params).toString()
  return signedFetch(`/prod-api/news/pc/listNews/${index}/${pageSize}?${str}`)
}

export const getNewsListWithImage = (typeId, index = 1, pageSize = 5) => {
  return signedFetch(`/prod-api/news/pc/listNewsWithImage/${index}/${pageSize}?newsTypeId=${typeId}`)
}

export const getNewsInfo = (newsId) => {
  return signedFetch(`/prod-api/news/pc/news/${newsId}`)
}
