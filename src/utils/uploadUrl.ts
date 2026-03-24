const UPLOAD_BASE = import.meta.env.VITE_UPLOAD_BASE_URL ?? ''

/** /uploads/... 경로를 절대 URL로 변환 (카페24: 그대로, gh-pages: 도메인 prefix 추가) */
export const toAbsUrl = (url: string | null | undefined): string => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return UPLOAD_BASE + url
}

/** content HTML 내 /uploads/ 이미지 경로를 절대 URL로 변환 */
export const resolveContentUrls = (html: string): string =>
  html.replace(/src="(\/uploads\/)/g, `src="${UPLOAD_BASE}$1`)
