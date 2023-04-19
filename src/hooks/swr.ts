import axios from 'axios'

export const fetcher = (url: string) => axios.get(url).then(res => res.data)
export const creator = (url: string, { arg }: { arg: any }) => axios.post(url, arg).then(res => res.data)
export const updater = (url: string, { arg }: { arg: any }) => axios.put(url, arg).then(res => res.data)
export const deleter = (url: string, { arg }: { arg: any }) => axios.delete(url, arg).then(res => res.data)