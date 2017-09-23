import format from 'date-fns/format'

export const fmtDateTime = (time) => {
  return format(time, 'YYYY-MM-DD HH:mm')
}

export const fmtDate = (time) => {
  return format(time, 'YYYY-MM-DD')
}

export const truncate = (str, size) => {
  if (str === undefined || str.length <= size) {
    return str
  } else {
    return str.substr(0, size) + ' ...'
  }
}
